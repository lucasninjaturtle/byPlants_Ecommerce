const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const {
    SENDGRID_API,
    EMAIL_PRUEBA
} = process.env;

const auth = {
  auth: {
    api_key: SENDGRID_API,
  }
}
const nodemailerSendgrid= nodemailer.createTransport(sendGridTransport(auth));


function passwordReset(user) {
  const token = jwt.sign({user}, SECRET,{ expiresIn: 60*60*60 })

  var modelEmail = `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  </head>
  
  <body style=" font-family: 'Open Sans', 'Arial Narrow', Arial, sans-serif; ">
    <div
      style="height: 100%; padding: 2em; background-image: url('https://static.vecteezy.com/system/resources/previews/000/245/854/original/banana-leaf-background-vector.jpg'); background-size: 100%;">
      <div style="border-radius: 2em;text-align: -webkit-center;background-color: #ffffff;z-index: 1;position: relative;">
        <img src="https://plantasenmicrogravedad.files.wordpress.com/2014/03/logo-profundiza.jpg" width="80px" height="80px"
          style="position: relative; margin-top: 1em;">
        <h1 style="color: #000000;margin: .2em; font-size: 2em; font-weight: 150;">By Plantas</h1>
        <p
          style="color: #ffffff;font-weight: 850;background-color:#507b00;padding:2em;">
          %username% , Recibimos una peticion para restablecer su contraseña, si fue usted Haga click en el siguiente boton , de no ser asi reportelo con nuestro equipo</p>
        %resetlink%
      </div>
    </div>
  
  </body>
  
  </html>`

  const resetButton = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: #507b00; color:#ffffff; margin:.5em; border-radius:.5em;"href="https://byplantas-three.vercel.app/login/reset/${token}">Recuperar Contraseña</a>`
  modelEmail = modelEmail.replace("%username%", user.firstname.toUpperCase());
  modelEmail = modelEmail.replace("%resetlink%", resetButton)


  nodemailerSendgrid.sendMail({
    from: EMAIL_PRUEBA,
    to: user.email,
    subject: 'Recuperar Contraseña',
    html: modelEmail
  }, function (error, info) {
    if (error) {
      console.error({
        status:"error",
        message:error.message
      });
    } else {
      console.error({
        status:info.message
      });
    }
  });

  return modelEmail;
}
module.exports = {
  passwordReset
}