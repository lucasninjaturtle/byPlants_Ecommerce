import React, {useState} from 'react';
import axios from 'axios';
import styles from './formuser.module.css'
import Swal from 'sweetalert2'
const {REACT_APP_BACKEND_URL} = process.env;

export default function FormUser (){
    const [user, setUser] = useState({email: '', password: ''})
    const [valid, setValid] = useState(false)

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleRepeat = e => {
        if(e.target.value === user.password){
            setValid(true)
        }else{
            setValid(false)
        }
    }

    const emailPattern = new RegExp(/[A-Za-z0-9_.]+\@\w+\.\w\w+/, 'i'); //valida que tenga un '@' seguido de un string seguido de '.' seguido por lo menos 2 caracteres
    const passwordPattern = new RegExp(/[A-Za-z0-9_.]{8,}/, 'i'); //valida que tengo por lo menos 8 caracteres
    const handleSubmit = e => {
        e.preventDefault()
        if(!emailPattern.test(user.email)){
            Swal.fire({
                title: 'Email inválido',
                icon: 'error'
            })
        }else if(!passwordPattern.test(user.password)){
            Swal.fire({
                title: 'Contraseña inválida',
                icon: 'error'
            })
        }else if(!valid){
            Swal.fire({
                title: 'Contraseñas deben coincidir',
                icon: 'error'
            })
        }else{
            axios.post(`${REACT_APP_BACKEND_URL}/users/register`, user)
            .then(resp=>{
                Swal.fire({
                    title: 'Se registro correctamente',
                    icon: 'success'
                })
            })
            .catch(err=>{console.log(err)})
        }
        
    }

    return (
        <div className='container col-md-6 justify-content-center'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={handleSubmit}>
                <h4 className={`${styles.titles}`}>Registra tus datos!</h4>
                <label htmlFor='inputEmailUser' className='form-label'>Ingresa un Email</label>
                <input 
                    id='inputEmailUser' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Email...' 
                    value={user.email} 
                    onChange={handleChange} 
                    required/>
                <label htmlFor='inputUserPassword' className='form-label'>Ingresa una Contraseña</label>
                <input 
                    id='inputUserPassword' 
                    name='password' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password' 
                    value={user.password} 
                    onChange={handleChange} 
                    required/>
                <label htmlFor='inputUserPassword2' className='form-label'>Reingresa la Contraseña</label>
                <input 
                    id='inputUserPassword2' 
                    name='password2' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password...' 
                    onChange={handleRepeat} 
                    required/>
                <button className={`btn btnByPlantas mt-2 mb-3 my-auto`} type='submit'>Registrate</button>
            </form>
        </div>
    )
}