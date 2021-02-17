import React, { useEffect, useState } from 'react';
import styles from './productCard.module.css';
import { NavLink } from 'react-router-dom';
import BtnCart from '../Commons/BtnCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { FaLeaf } from 'react-icons/fa';
import axios from 'axios';
const { REACT_APP_BACKEND_URL } = process.env;

const ProductCard = ({ name, description, price, imgs, stock, id }) => {
  const [revAverage, setRevAverage] = useState(0)

  const cartItems = useSelector(state => state.cart.cartItems)
  let item = cartItems.find(item => item.productId === id)

  useEffect(()=>{
    getReviewAverage()
  },[])

  const getReviewAverage = () =>{
    axios.get(`${REACT_APP_BACKEND_URL}/products/${id}/reviewaverage`)
    .then(res=>{
      setRevAverage(res.data.average)
    })
  }

  return (
    <div className={`${styles.productCard} card`}>
      <div className={`${styles.imgContainer}`}>
        <NavLink to={`/products/${id}`}>
          <img
            src={imgs ? imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}
            className={`${styles.productImg} img-thumbnail`}
          />
        </NavLink>
      </div>
      <div className={`${styles.bodyContainer} card-body`}>
        <h5 className={`${styles.titleBody} card-title`}>{name}</h5>
        <hr/>
        <span className={`${styles.priceBody} card-text`}>Precio: ARS$ {price}</span>
        <div className={`${styles.starAverage}`}>
          {revAverage > 0 ?
          <StarRatingComponent
                      editing={false}
                      renderStarIcon={() => <span><FaLeaf size={17}/></span>}
                      starCount={5}
                      value={revAverage}
                  />
          : <p className='card-text'>No Hay Reseñas</p>}
        </div>
        
        <BtnCart 
          productId={id} 
          quantity={item !== undefined ? item.quantity : 0}
        />
      </div>
    </div>
  );
};
export default ProductCard;
