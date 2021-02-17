import React, {useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import {useFormik} from 'formik'
import styles from '../home.module.css'
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Requerimos tu email para poder responderte';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email inválido';
      }

    if (!values.content) {
        errors.description = '¿Qué nos quieres decir?';
      }
    return errors;
  };

const ContactForm = () => {
    
    const formik = useFormik({
        initialValues: {
          email: '',
          content: '',
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/users/contact`, values)// No se la ruta aun
        .then(resp=>{
            Swal.fire({
                title: `Tu correo se envió correctamente. Pronto nos pondremos en contacto contigo!`,
                icon: 'success'
            })
        })
        window.location = "/"
        .catch(err=>{console.log(err)})
        }
      })

    return(
        <div className={`${styles.contact}`}>
            <form className={`${styles.contactForm} needs-validation`} onSubmit={formik.handleSubmit}>
                <h2 className={`${styles.titles}`}>Contáctanos!</h2>
                <label htmlFor='inputEmail' className='form-label'>Email</label>
                <input 
                    id='inputEmail' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Dinos tu email' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? <p className="my-2 error">{formik.errors.email}</p> : null}
                <div id="emailHelp" className="form-text">Nunca compartiremos tu email con otras personas</div>
                
                <label htmlFor='inputContent' className='form-label mt-4'>Mensaje</label>
                <textarea 
                    id='inputContent' 
                    name='content' 
                    className='form-control' 
                    rows="5" 
                    placeholder='Escribe tu mensaje' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    />
                   {formik.errors.content && formik.touched.content ? <p className="my-2 error">{formik.errors.content}</p> : null}
                <button 
                    className='btn btnByPlantas mt-4' 
                    type='submit'
                    disabled={Object.keys(formik.errors).length > 0}
                    >
                    Enviar
                </button>
            </form>
        </div>
    )
}
  
  export default ContactForm;