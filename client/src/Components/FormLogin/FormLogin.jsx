import React, { useEffect} from 'react';
import styles from './formlogin.module.css';
import { useFormik } from 'formik';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../Redux/actions/userActions';
import Spinner from '../Spinner/Spinner'
import { useHistory } from "react-router"

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido';
  }
  if (!values.password) {
    errors.password = 'Password es requerida';
  } else if (values.password.length < 5) {
    errors.password = 'Al menos debe tener 5 caracteres';
  }

  return errors;
};

const FormLogin = ({ location, ...props }) => {

  let history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      props.dispatch(login(values.email, values.password));
      const { userLogin} = props.userLogin;
      if(userLogin.email !== null){
        history.push("/")
      }
    },
  });

  const { userLogin, isFetching, error } = props.userLogin;

  useEffect(() => {
    if (userLogin) {
      history.push('/');
    } 
  }, [history, userLogin]);  
  
  return (
    <div className={`${styles.formLoginContainer}`}>
      {error && (
        <div className='alert alert-primary' role='alert'>
          {error}
        </div>
      )}
      {isFetching && <Spinner/>}
      {props.history.location.state?.message && 
        <div className="alert alert-primary" role="alert">
          {props.history.location.state.message}
        </div>
      }
      <form onSubmit={formik.handleSubmit}>
        <h4 className={`${styles.titles}`}>Ingresa a tu cuenta!</h4>
        <label htmlFor='inputLoginEmail' className='form-label'>
          Escribe tu Email
        </label>
        <input
          id='inputLoginEmail'
          name='email'
          className='form-control'
          type='email'
          placeholder='Email...'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? <p className='my-2 error'>{formik.errors.email}</p> : null}
        
        <label htmlFor='inputLoginPassword' className='form-label'>
          Escribe tu Contraseña
        </label>
        <input
          id='inputLoginPassword'
          name='password'
          className='form-control'
          type='password'
          placeholder='Password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className='my-2 error'>{formik.errors.password}</p>
        ) : null}
        <div className={`${styles.buttonContainer}`}>
          <button
            className={`btn btnByPlantas`}
            type='submit'
            disabled={Object.keys(formik.errors).length > 0}>
            Ingresa
          </button>
        </div>
        <div className={`${styles.linkContainer}`}>
          <Link className={`link`}to={`/login/reset`}>Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userLogin: state.userLogin,
  };
};

export default connect(mapStateToProps)(FormLogin);
