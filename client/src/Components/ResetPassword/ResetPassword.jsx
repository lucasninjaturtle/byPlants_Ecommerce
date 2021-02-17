import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHistory ,useParams} from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../Redux/actions/userActions";
import Swal from 'sweetalert2';
import Axios from "axios";
const { REACT_APP_BACKEND_URL } = process.env;


const Reset=(props)=> {
  const history = useHistory()
  const [error, setError] = useState({})
  let {token} = useParams();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      props.dispatch(resetPassword(values.password, token,values.email));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contraseña modificada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      history.push("/login");
    }
  });
  const formikReset = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      await Axios.post(`${REACT_APP_BACKEND_URL}/users/reset/password`, { email });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Email enviado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      history.push("/");
    }
  });

  useEffect(() => {
    let error = {}
    if (!formik.values.password) {
      error.password = 'Escriba una contraseña';
    } else if (!/(?=.*[0-9])/.test(formik.values.password)) {
      error.password = 'La contraseña es invalida, debe tener al menos un numero';
    }
    if (formik.values.password !== formik.values.passwordRepeat) {
      error.passwordRepeat = 'Las contraseñas no coinciden'
    }
    setError(error)
  }, [formik.values])


  return (
    <>
          {
            token ?
            <div className='container col-md-6 justify-content-center'>
              <form className={` w-50 py-3 needs-validation mx-auto  d-flex flex-column flex-wrap`} onSubmit={formik.handleSubmit}>
              <h2 className={`m-0 text-center p-5`}>Recupera tu contraseña</h2>
              <label htmlFor='inputLoginPassword' className='text-center form-label'>
          Ingresa tu correo electronico
        </label>
              <input
                  name="email"
                  type="email"
                  placeholder="Ingrese su correo electronico"
                  autoComplete="on"
                  className={"mb-2 form-control"}
                  onChange={formik.handleChange}
                />
                <span className={"text-center"}>Cambiar contraseña</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Nueva contraseña"
                  className={"form-control"}
                  onChange={formik.handleChange}
                />
                {error.password && (<p className={"text-center"}>{error.password}</p>)}
                <input
                className={"mb-2 mt-3 form-control"}
                  name="passwordRepeat"
                  type="password"
                  placeholder="Repite contraseña"
                  autoComplete="on"
                  onChange={formik.handleChange}
                />
                {error.passwordRepeat && (<p>{error.passwordRepeat}</p>)}
                <input
                className={"btn mt-2 mb-3 my-auto btnByPlantas"}
                  type="submit"
                  value="Cambiar"
                />
              </form>
            </div>
              : <div className='container col-md-6 justify-content-center'><form onSubmit={formikReset.handleSubmit}  className={` w-50 py-3 needs-validation mx-auto  d-flex flex-column`}>
                <h2 className={`m-0 text-center p-5`}>Recupera tu contraseña</h2>
                <span className={"text-center"}>Cambiar contraseña</span>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={formikReset.handleChange}
                  className={"mb-2 form-control"}
                />
                <label className={"text-center mt-2"}>Ingrese su dirección de correro electrónico para enviarle el email de restauración</label>
                <input
                  type="submit"
                  value="Enviar"
                  className={"btn mt-2 mb-3 my-auto btnByPlantas"}
                />
              </form>
              </div>}
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    resetPassword: () => dispatch(resetPassword()),
  };
}

export default connect(mapDispatchToProps)(Reset);