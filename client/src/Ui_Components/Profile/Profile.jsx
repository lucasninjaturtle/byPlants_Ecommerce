import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import { getOrderUser } from '../../Redux/actions/orderActions';
import styles from './profile.module.css'
import { FaLeaf } from 'react-icons/fa';

const Profile = (props) => {
    const userLogin = useSelector(state => state.userLogin)
    const userOrders = useSelector(state => state.orders.orderUser)
    let isAuth = userLogin.userLogin
    // console.log(userLogin.userLogin)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getOrderUser())
    }, [])
    return ( 
        isAuth ?
        <div className={`${styles.profileContainer}`}>
            <div className={`${styles.profile}`}>
                <div className={`${styles.photocontainer}`}>
                    <img 
                        src="https://image.flaticon.com/icons/png/512/16/16363.png" alt=""
                        className={`${styles.photo}`}
                    />
                </div>
                <div className='d-flex'>
                    <span>Nombre:</span>
                    <span className="px-2">{userLogin.userLogin.firstname}</span>
                </div>
                <div className='d-flex'>
                    <span>Apellido:</span>
                    <span className="px-2">{userLogin.userLogin.lastname}</span>
                </div>
                <div className='d-flex'>
                    <span>Email:</span>
                    <span className="px-2">{userLogin.userLogin.email}</span>
                </div>
                {/* <div className='d-flex'>
                    <span>Rol:</span>
                    <span className="px-2">{userLogin.userLogin.role}</span>
                </div> */}
                <div className='d-flex'>
                    <span>Dirección:</span>
                    <span className="px-2">{userLogin.userLogin.address}</span>
                </div>
            </div>
            <div className={`${styles.tableDiv}`}>
                <table className={`table table-hover table-bordered table-dark ${styles.table}`}>
                    <caption className={styles.tableCaption}>
                        En esta tabla se ven tus ordenes de compra si aun no tiene una, te invitamos a dar un vistaso a nuestro <Link to="/products" className={styles.tableCaptionLink}>Catalogo!</Link>
                    </caption>
                    <thead>
                        <tr>
                            <th scope='col'>Orden #</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userOrders.map((x,index)=>(
                            <tr key={index}>
                                <td>{x.id}</td>
                                <td>{x.status}</td>
                                <td>
                                    {x.products.map((a,ind)=>(
                                        <p className={`${styles.tableP}`}><FaLeaf /> {a.name}: {a.orderline.quantity}</p>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        :
        <Redirect to={{
            pathname: '/login',
            state: {
              message: 'Debes estar logueado.'
            }
          }}/>
     );
}
 
export default Profile;