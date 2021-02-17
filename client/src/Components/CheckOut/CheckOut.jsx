import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "./checkout.module.css";
import CartCheckOut from "../CartCheckOut/CartCheckOut";
import { useSelector } from "react-redux";
import Payment from "../Payment/Payment";
import ShippingDetail from "../ShippingDetail/ShippingDetail";
import {useFormik} from 'formik'

const { REACT_APP_BACKEND_URL } = process.env;
const CheckOut = () => {
  //Levanto los datos del local para poder enviar con la variante config todos los datos del token
  //con la variante config, por eso la paso como parametro en config (el header)
  let userLocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: userLocalstorage !== null ? userLocalstorage.token : null,
    },
  };

  //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector((state) => state.userLogin);
  var logged = userLogin.userLogin;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  

  //FORM
  //
  //
  function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'El nombre del receptor es obligatorio';
    } else if ((input.name.length <3)) {
        errors.name = 'Nombre invalido';
    }
    if (!input.lastname) {
    errors.lastname = 'El apellido del receptor es obligatorio';
    } else if ((input.lastname.length <3)) {
    errors.lastname = 'Apellido invalido';
    }
    if (!input.identifier) {
      errors.identifier = 'Ingrese la identificacion del receptor Ejemplo: 99.999.999 => ingresa 99999999';
  } else if ((input.identifier.length <7)) {
      errors.identifier = 'Identificador invalido';
  }
  if (!input.address) {
  errors.address = 'Ingrese la dirección de entrega';
  } else if ((input.address.length <5)) {
  errors.address = 'Dirección invalida';
  }
  if (!input.postalcode) {
    errors.postalcode = 'Ingrese el codigo postal de su dirección de entrega';
} else if ((input.postalcode.length <3)) {
    errors.postalcode = 'Codigo postal invalido';
}
if (!input.clarification) {
errors.clarification = 'Ingresar un detalle';
} else if ((input.clarification.length <1)) {
errors.clarification = 'Ingresar un detalle';
}
    
    return errors;
    };

    

    const [errors, setErrors] = React.useState({
      errors: "",
      
    });
    console.log(errors)
  const [input, setInput] = React.useState({
    name: '',
    lastname: '',
    identifier: '',
    address: '',
    postalcode: '',
    clarification: '',
  });

  const handleInputChange = (e) => {
    console.log(input)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
  const [btnDisabled, setbtnDisabled] = useState(true)

  console.log(errors)

  const handleSubmit = (e) => {
    e.preventDefault()
    let erroresestrueono = Object.keys(errors).length === 0
    Object.keys(errors).length === 0 ? setbtnDisabled(false) : setbtnDisabled(true)
    localStorage.removeItem('cartItems');    
  }


  //
  //

  
  return (
    <div className={`${styles.checkoutContainer}`}>
      <div>
        <h2 className={`m-0 text-left p-5`}>¿Estas listo para comprar?</h2>
      </div>
      <div className={`${styles.checkoutShippingAddress}`}>
        <div className={`${styles.checkout}`}>
            {cart ? (
              cartItems.map((product, index) => (
                <div key={index}>
                  <CartCheckOut product={product} />
                </div>
              ))
            ) : (
              <h1>El carrito esta vacio</h1>
            )}
        </div>
        <div className={`${styles.shippingdetail}`}>
        {/* disabled={Object.keys(errors).length > 0} */}
          <form onSubmit={handleSubmit} className={`${styles.shippingForm} mx-auto`} >
            <h4 className={`m-0 text-center pb-3`}>Datos de envío</h4>
            <div className={`m-auto pb-3`}>
              <label>Nombre:</label>
              <input
                className={`${errors.name && "danger"}`}
                type="text"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              />
              {errors.name && <p className="my-2 error">{errors.name}</p>}
          
            <br></br>
              <label>Apellido:</label>
              <input
                className={`${errors.lastname && "danger"}`}
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={input.lastname}
              />
              {errors.lastname && <p className="my-2 error">{errors.lastname}</p>}
            
            <br></br>
              <label>Identificador:</label>
              <input
                className={`${errors.identifier && "danger"}`}
                type="text"
                name="identifier"
                onChange={handleInputChange}
                value={input.identifier}
              />
              {errors.identifier && <p className="my-2 error">{errors.identifier}</p>}
            
            <br></br>
              <label>Dirección de envio:</label>
              <input
                className={`${errors.address && "danger"}`}
                type="text"
                name="address"
                row='5'
                onChange={handleInputChange}
                value={input.address}
              />
              {errors.address && <p className="my-2 error">{errors.address}</p>}

            <br></br>
              <label>Codigo Postal:</label>
              <input
                className={`${errors.postalcode && "danger"}`}
                type="text"
                name="postalcode"
                onChange={handleInputChange}
                value={input.postalcode}
              />
              {errors.postalcode && <p className="my-2 error">{errors.postalcode}</p>}

            <br></br>
              <label>Aclaración:</label>
              <input
                className={`${errors.clarification && "danger"}`}
                type="text"
                name="clarification"
                onChange={handleInputChange}
                value={input.clarification}
              />
              {errors.clarification && <p className="my-2 error">{errors.clarification}</p>}
            </div>
            <button className={`btn btnByPlantas ${styles.shippingButton}`} type='submit' disabled={Object.keys(errors).length > 0}>Pagar</button>
          </form>
        </div>
      </div>
      <div className={`${styles.payment}`}>
        { btnDisabled ? '' :
        <Payment btnDisabled={btnDisabled}/>
        }
      </div>
    </div>
  );
};

export default CheckOut;
