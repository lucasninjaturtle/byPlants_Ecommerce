import React from 'react';
import axios from 'axios';
import styles from './formuser.module.css'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }
    if (!values.password) {
        errors.password = 'Contraseña requerida';
    }else if (values.password.length < 5) {
        errors.password = 'Al menos debe tener 5 caracteres';
    }

    if(!values.password2){
        errors.password2 = 'Contraseña requerida';
    }else if (values.password2 !== values.password) {
        errors.password = 'No coinciden las contraseñas';
    }
  
    return errors;
  };

export default function FormUser (){

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          password2: '',
          firstname: '',
          lastname: '',
          address: '',
          birthdate: '',
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/users/register`, values)
            .then(resp=>{
                Swal.fire({
                    title: 'Se registro correctamente',
                    icon: 'success'
                })
            window.location = "/";
            })
            .catch(err=>{console.log(err)})
        }
    })

    return (
        <div>
            <form className={`w-50 needs-validation mx-auto`} onSubmit={formik.handleSubmit}>
            <h2 className={`m-0 text-center p-5`}>Registra tus datos</h2>
                <label htmlFor='inputEmailUser' className='form-label col-4'>Ingresa un Email</label>
                <input 
                    id='inputEmailUser' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Email' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                {formik.errors.email && formik.touched.email ? <p className="my-2 error">{formik.errors.email}</p> : null}

                <label htmlFor='inputUserPassword' className='form-label col-4'>Ingresa una Contraseña</label>
                <input 
                    id='inputUserPassword' 
                    name='password' 
                    className='form-control' 
                    type='password' 
                    placeholder='Contraseña' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? <p className="my-2 error">{formik.errors.password}</p> : null}

                <label htmlFor='inputUserPassword2' className='form-label col-4'>Reingresa la Contraseña</label>
                <input 
                    id='inputUserPassword2' 
                    name='password2' 
                    className='form-control' 
                    type='password' 
                    placeholder='Reingresa la Contraseña' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password2}
                    />
                {formik.errors.password2 && formik.touched.password2 ? <p className="my-2 error">{formik.errors.password2}</p> : null}

                <label htmlFor='inputFirstName' className='form-label col-5'>Ingresa tu Nombre</label>
                <input 
                    id='inputFirstName' 
                    name='firstname' 
                    className='form-control' 
                    type='text' 
                    placeholder='Nombre' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    />
                {formik.errors.firstname && formik.touched.firstname ? <p className="my-2 error">{formik.errors.firstname}</p> : null}
                
                <label htmlFor='inputLastName' className='form-label col-5'>Ingresa tu Apellido</label>
                <input 
                    id='inputLastName' 
                    name='lastname' 
                    className='form-control' 
                    type='text' 
                    placeholder='Apellido' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    />
                {formik.errors.lastname && formik.touched.lastname ? <p className="my-2 error">{formik.errors.lastname}</p> : null}
                
                <label htmlFor='inputAddress' className='form-label'>Ingresa tu Dirección de Envío</label>
                <input 
                    id='inputAddress' 
                    name='address' 
                    className='form-control' 
                    type='textarea' 
                    rows='3'
                    placeholder='Dirección de Envío' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    />
                {formik.errors.address && formik.touched.address ? <p className="my-2 error">{formik.errors.address}</p> : null}
                
                <label htmlFor='inputBirthdate' className='form-label'>Cual fue tu dia de Nacimiento?</label>
                <input 
                    id='inputBirthdate' 
                    name='birthdate' 
                    className='form-control' 
                    type='date'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                    />
                {formik.errors.birthdate && formik.touched.birthdate ? <p className="my-2 error">{formik.errors.birthdate}</p> : null}

                <button 
                    className={`btn btnByPlantas mt-2 mb-3 my-auto`} 
                    type='submit'
                    disabled={Object.keys(formik.errors).length > 0}
                >Registrate</button>
            </form>
        </div>
    )
}