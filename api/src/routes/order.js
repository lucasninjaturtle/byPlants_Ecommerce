const server = require("express").Router();
const { Order, User, Orderline } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

server.put('/:id', (req,res,next) => {
    let {date, status, id} = req.body
    Order.update(
        {
            date,
            status
        },
        { returning: true, where: { id } }
    )
    .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
})



server.post('/:userId/cart', (req, res) => {
    console.log(req.body);
    const currentItem ={ 
        productId: req.body.productId,
        userId: req.params.idUser,
        quantity: req.body.quantity,
        price: req.body.price,
        total: (req.body.quantity * req.body.price)
    }
    Order.findOne({ 
           where: { 
               userId: req.params.idUser, 
               status: "active"
            } 
        })
        .then((order) => {
            order.addProduct({ 
                productId: req.body.productId,
                userId: req.params.idUser,
                quantity: req.body.quantity,
                price: req.body.price,
                total: (req.body.quantity * req.body.price)
             })
             .then(Orderline => res.status(201).json({message: "Item was added to Order"}))
             .catch(error => {
                 res.status(400).json({message: "Internal error"})
             })
        })
    })

     
//vaciar carrito
server.put('/:userId/cart', (req, res) => {
    Order.findOne({ where: { userId: req.params.userId, status: "active" } })
        .then((orders) => {
            Orderline.update({
                price:"",
                quantity:"",
                discount:"",
                total:""
            }, {
             where:{id: orderId } 
            })
        
           .then(
            res.status(200).json({ message: "El carrito fue vaciado" })
                )
        })
        .catch(function (err) {
            res.status(400).json({ message: "No se pudo vaciar el carrito.", error: err })
        })
})



    
    
// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
// GET /users/:id/orders
server.get('/:id/orders', (req, res, next) => {
    Order.findAll({where:{ id: req.params.id }})
        .then(orders => res.status(201).json(orders))
        .catch(error => res.send(400).json({message:"We couldn't find your request"}))
})  
//S46 : Crear Ruta que retorne una orden en particular.
//GET /orders/:id
 server.get('/:id', (req,res,next) => {
     Order.findByPk({ where: { id: req.params.id} })
        .then(result => { res.status(201).json(orders)})
        .catch(next)
 })

/*  server.post('/', (req, res) => {
     console.log(req.body)
     Order.create({
        userId: req.body.userId
     })
     .then(order => {
        Orderline.create({
            price: req.body.price,
            quantity: req.body.quantity,
            discount: req.body.discount,
            total: req.body.total,
            userId: order.userId,
            orderId: order.id,
            productId: 1
        })
        .then(orderline => {
            console.log(orderline)
            order.setOrderlines(orderline)
               .then(result => {
                   console.log(result, 'aca')
                   res.json(order)
               })
        })
         res.json(order)
     })
     .catch(e => console.log(e))
 }) */

module.exports = server

