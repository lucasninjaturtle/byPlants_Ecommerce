import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './cartcheckout.module.css'


const CartCheckOut = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;

  const dispatch = useDispatch();
  
  return (
    <div className={`${styles.cartCheckOutContainer}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={imgs ? imgs : imgDefault} className={`${styles.img} img-fluid img-thumbnail`} alt='' />
      </div>
        <div className={`${styles.detailsCartcheckout}`}>
          <div className={`${styles.infoContainer}`}>
            <h5 className={`${styles.title}`}>{productName}</h5>
            <span className={`${styles.span}`}>Precio Unit: ARS {productPrice}</span>
          </div>
          <div className={`${styles.infoContainer}`}>
            <span className={`${styles.spanInfo}`}>Cant: {quantity}</span>
            <span className={`${styles.spanInfo2}`}>Precio Total: ${quantity*productPrice}</span>
          </div>
        </div>
    </div>
  );
};

export default CartCheckOut;
