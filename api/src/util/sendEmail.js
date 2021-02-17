const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { SENDGRID_API, EMAIL_PRUEBA } = process.env;

// const icono = require('PONER LINK CLOUDINARY') 
//TODO importar

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

let sendEmail = (firstname='', email='', lastname='', orderId=0) =>{
    transporter.sendMail({
        to: email,
        from: EMAIL_PRUEBA,
        subject: 'byPlantas - Compra realizada exitosa!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
          <meta charset='utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1'>
        </head>
        
        <body style=" font-family: 'Open Sans', 'Arial Narrow', Arial, sans-serif; ">
          <div
            style="height: 100%; padding: 2em; background-image: url('https://static.vecteezy.com/system/resources/previews/000/245/854/original/banana-leaf-background-vector.jpg%27'); background-size: 100%;">
            <div style="border-radius: 2em;text-align: -webkit-center;background-color: #ffffff;z-index: 1;position: relative;">
              <img src="https://res.cloudinary.com/byplants/image/upload/v1613508452/byplantsmedia/byplants_ylsv15.png" width="75px" height="75px"
                style="position: relative; margin-top: 1em;">
              <h1 style="color: #000000;margin: .2em; font-size: 2em; font-weight: 100;">byPlantas</h1>
              <p style="color: #ffffff;font-weight: 800;font-size:3rem;background-color: #507b00;margin-bottom: 0;padding:1em;">
                Hola ${firstname} ${lastname} Tu compra #${orderId} fue realizada exitosamente </p>
                <p> Muchas Gracias por elegirnos!</p>
                <p> byPlantas Henry Team </p>
            </div>
          </div>
        
        </body>
        
        </html>`,
    }).then(resp => {
        return resp
    }).catch(err=>{
        return err
    })
}

module.exports = {
    sendEmail
}