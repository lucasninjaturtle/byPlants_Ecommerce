import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './navbar.module.css'
import Logout from '../Logout/Logout'
import { useSelector} from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
    const userLogin = useSelector(state => state.userLogin)
    const cartItems = useSelector(state => state.cart.cartItems)
    return (
        <header id="header" className={`fixed-top ${styles.header, styles.headerText}`}>
            <nav className={`navbar navbar-expand-lg navbar-light ${styles.byPlantasNavbar}`}>
                <h1 className={`navbar-brand ${styles.h1Margin, styles.headerLogo}`}><Link className={styles.linkLogo} to="/">byPlantas</Link></h1>
                <div className={`${styles.collapseDiv}`}>
                    <div className={`${styles.collapseButton}`}>   
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
                <div className={`collapse navbar-collapse justify-content-end ${styles.collapseDiv}`} id="navbarNav">
                    <ul className={`navbar-nav ${styles.ulMargin}`}>
                        <li className={`nav-item ${styles.liMargin}`}>
                            <NavLink className={`${styles.link}`} activeClassName={`${styles.alink}`} exact to="/products" >Catálogo</NavLink>
                        </li>
                        {userLogin.userLogin === null || userLogin.userLogin.role !== "ADMIN_ROLE" ?
                            <li className={`nav-item ${styles.liMargin}`}>
                                <NavLink className={`${styles.link}`} activeClassName={`${styles.alink}`} exact to="/cart" ><FaShoppingCart size={25}/></NavLink>
                                <span class="badge badge-info">{cartItems.length === 0 ? '' : cartItems.length}</span>
                            </li>
                            : ""}
                        {userLogin.userLogin && userLogin.userLogin.role === "ADMIN_ROLE" ?
                            <li className={`nav-item ${styles.liMargin}`}>
                                    <NavLink className={`${styles.link}`} activeClassName={`${styles.alink}`} exact to="/admins" >Admin</NavLink>
                            </li>
                            : ""}
                        <li className={`nav-item ${styles.liMargin}`}>
                            {userLogin.userLogin ? 
                            (
                                <Logout />
                            ) : 
                                <NavLink className={`${styles.link}`} activeClassName={`${styles.alink}`} exact to="/login" >Login</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar