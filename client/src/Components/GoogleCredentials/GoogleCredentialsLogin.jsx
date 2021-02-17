import React from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios'
import {useHistory} from "react-router"
import { FaGoogle } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import { googleLogin } from '../../Redux/actions/userActions';
const { client_id } = process.env;
const {REACT_APP_BACKEND_URL} = process.env;


function GoogleCredentialsLogin() {
    const history = useHistory()
    const dispatch = useDispatch()
    const onSuccess = (res) => {
        axios.post(`${REACT_APP_BACKEND_URL}/users/login/${res.profileObj.email}`)
        .then(resp=>{
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: resp.data,
              });
            history.push("/");
        })
        .catch(e => console.log(e))
      }
    
    const onFailure = (res) => {
        console.log(res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={client_id}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`btn btnByPlantas justify-content-center align-content-center`}>  
                    <i><FaGoogle size={13}/></i> Login
                    </button>
                )}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleCredentialsLogin;