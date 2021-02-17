import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnCart from '../Commons/BtnCart';
import BtnUpdateCart from  '../Commons/BtnUpdateCart/BtnUpdateCart'
import { removeFromCart, removeFromCartGuest } from '../../Redux/actions/cartActions';
import {FaTrashAlt,FaPlusSquare} from 'react-icons/fa'
import styles from './cartline.module.css'

const CartLine = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;
  const userLogin = useSelector(state => state.userLogin)
  const cart = useSelector(state => state.cart)
  const isAuth =  userLogin.userLogin
  const dispatch = useDispatch();

  let totalCartline = cart.cartItems.length > 0 ? cart.cartItems.find(it => it.productId === productId) : null
  let totalCartlineGuest = cart.cartItemsGuest.length > 0 ? cart.cartItemsGuest.find(it => it.productId === productId) : null

  const removeItem = id => {
    let itemCart = cart.cartItems.find(element => element.productId === id)
    let itemCartGuest = cart.cartItemsGuest.find(element => element.productId === id)
    if(itemCart){
      dispatch(removeFromCart(id))
    }
    if(itemCartGuest){
      dispatch(removeFromCartGuest(id))
    }
  };
  return (
    <div className={`${styles.cartlineContainer}`}>
      <div className={`${styles.imgTitleContainer}`}>
        <div className={`${styles.imgContainer}`}>
          <img src={imgs ? imgs : imgDefault} className={`${styles.img} img-fluid img-thumbnail`} alt='' />
        </div>
        <div className={`${styles.titleContainer}`}>
          <h5 className={`${styles.titleCart}`}>{productName || product.name}</h5>
        </div>
      </div>
      <div className={`${styles.buttonDetailsContainer}`}>
        <div className={`${styles.buttonContainer}`}>
          {
            product.orderId ? 
              <BtnUpdateCart 
              productId={productId} 
              quantity={quantity}
              />
            :
            <BtnCart 
              productId={productId} 
              quantity={quantity}
            />
          }
        </div>
        <div className={`${styles.textContainer}`}>
          <span>Precio: ARS {isAuth ? totalCartline?.total : totalCartlineGuest?.total}</span>
          <span>Cant: {quantity}</span>
        </div>
      </div>
      <div className={`${styles.buttonTrashContainer}`}>
        <button className={`${styles.btnCierre}`} onClick={() => removeItem(productId)}>
          <FaTrashAlt/>
        </button>
      </div>
    </div>
  );
};

export default CartLine;
