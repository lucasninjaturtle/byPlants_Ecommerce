import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = (btnDisabled) =>{

  
  

const [datos, setDatos] = useState("")

const cartItems = useSelector(state => state.cart.cartItems)
const userLogin = useSelector(state => state.userLogin)



  useEffect(()=>{
    
    axios.post("http://localhost:3001/mercadopago", {cartItems, userLogin})
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 
  },[])


  console.log(btnDisabled)
//DIRECTO DE LA API DE MERCADOLIBRE - RENDERIZA EL BOTON DE PAGAR
useEffect(()=>{
  let flag;
  if(datos){
    flag = true
  }
  if(flag === true){
  const script = document.createElement('script'); //Crea un elemento html script
  const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute

  
  attr_data_preference.value = datos.id  //Le asigna como valor el id que devuelve MP

  //Agrega atributos al elemento script
  script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  script.setAttributeNode(attr_data_preference)  

  
  //Agrega el script como nodo hijo del elemento form
  
  
  
  let form1 = document.getElementById('form1')
  
  
  document.getElementById('form1').appendChild(script)
  return () =>{
    //Elimina el script como nodo hijo del elemento form
    
    document.getElementById('form1').removeChild(script);
    
  
  
}}},[datos])

//DIRECTO DE LA API DE MERCADOLIBRE
//
let totalPayment = 0;
cartItems.forEach(e=>totalPayment = e.total + totalPayment )
// //
//payment status


return (
  <div className={`${styles.payment}`}>
    <h3 className={`m-0 text-center p-2`}>Opciones de Pago</h3>
    <p className={`${styles.pagoTotal}`}>Total: ARS ${totalPayment}</p>
      <div>
        <span className={`${styles.mercadoPago}`}>MercadoPago</span>
        <form id='form1' className={`${styles.boton}`}>
        </form>
      </div>
    </div>
  )
}

export default Payment;