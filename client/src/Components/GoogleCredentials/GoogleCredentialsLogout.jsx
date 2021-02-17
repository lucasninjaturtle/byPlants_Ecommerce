import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {useHistory} from "react-router"
import { logout } from '../../Redux/actions/userActions';
import { useDispatch } from 'react-redux';
import styles from './googlestyles.module.css'

const clientId = '515747986042-aams7flhu6mhnr1boi3mnm0pdqlih0il.apps.googleusercontent.com'

function GoogleCredentialsLogout() {
    const history = useHistory()
    const dispatch = useDispatch();
    const onSuccess = () => {
        dispatch(logout())
        window.location = '/';
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                render={renderProps => (
                    <h6 onClick={renderProps.onClick} disabled={renderProps.disabled} className={styles.logout}>  
                        Salir
                    </h6>
                )}
                buttonText='Salir'
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default GoogleCredentialsLogout;