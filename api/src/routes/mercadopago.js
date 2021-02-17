const server = require('express').Router();

const { Order, User} = require('../db.js');
const {sendEmail} = require('../util/sendEmail')


const {REACT_APP_BACKEND_URL} = process.env;
const {REACT_APP_FRONTEND_URL} = process.env;

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales

mercadopago.configure({
  access_token: ACCESS_TOKEN
});

//Ruta que genera la URL de MercadoPago
server.post("/", (req, res) => {
    
let orderId = 0;
  req.body.cartItems.forEach(e=> orderId = e.orderId)
  let userId = req.body.userLogin.userLogin.id
  let orderUserSeparator = '.'


    const items_ml = req.body.cartItems.map(i => ({
      title: i.productName,
      unit_price: i.productPrice,
      quantity: i.quantity,
    }))

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml ,
    external_reference : `${orderId}`+`${orderUserSeparator}`+`${userId}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `${REACT_APP_BACKEND_URL}/mercadopago/pagos`,
      failure: `${REACT_APP_BACKEND_URL}/mercadopago/pagos`,
      pending: `${REACT_APP_BACKEND_URL}/mercadopago/pagos`,
    },
    shipments: {
      receiver_address: {
        zip_code: '',
        street_name: '',
        street_number: 11,
        floor: '',
        apartment: '',
        
      }
    }
    
  };


  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('respondio')
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(response.body)
    res.json({ id: global.id });
  
  })
  .catch(function(error){
    console.log(error);
  })
}) 


//Ruta que recibe la información del pago
server.get("/pagos", (req, res)=>{
  console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference.split('.')
  const orderId = external_reference[0];
  const userId = external_reference[1]
  const merchant_order_id= req.query.merchant_order_id
  console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  Order.findByPk(orderId)
  .then(async (order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "complete"
    console.info('Salvando order')
    order.save()
    let user = await User.findOne({
      where: {
        id: order.userId , 
      }
    });
    sendEmail(user.firstname,user.email, user.lastname, order.id)
    Order.create({
      userId: userId,
    })
    .then((_) => {
      
      // res.json({ok: true, message : 'se completo la order'})
      console.info('redirect success')
    
      return res.redirect(`${REACT_APP_FRONTEND_URL}/mercadopago/pagos`)
    })
    .catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`${REACT_APP_FRONTEND_URL}/?error=${err}&where=al+salvar`)
    })
  })
  .catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`${REACT_APP_FRONTEND_URL}/?error=${err}&where=al+buscar`)
  })

  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = server;