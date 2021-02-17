import React, { useEffect, useState } from 'react';
import styles from './productDetail.module.css'
import axios from 'axios'
import BtnCart from '../Commons/BtnCart';
import ReviewContainer from '../ReviewContainer/ReviewContainer'
import Spinner from '../Spinner/Spinner'
import {connect} from 'react-redux'
import { useSelector} from 'react-redux'
import {fetchReviews} from '../../Redux/actions/reviewActions'
import StarRatingComponent from 'react-star-rating-component';
import { FaLeaf } from 'react-icons/fa';

const {REACT_APP_BACKEND_URL} = process.env;

const ProductDetail = ({match, ...props}) =>{

  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };


    const [prod, setProd] = useState({})
    const [revAverage, setRevAverage] = useState(0)
    
    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`, config)
        .then(res => {
            setProd(res.data)
        })
        getReviewAverage()
        props.dispatch(fetchReviews(match.params.id))
    },[])

    const getReviewAverage = () =>{
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}/reviewaverage`)
        .then(res=>{
          setRevAverage(res.data.average)
        })
    }

    const cartItems = useSelector(state => state.cart.cartItems)
    let item = cartItems.find(item => item.productId === parseInt(match.params.id))

    let {stock, name, price, imgs, description} = prod
    return(
        <div className={`${styles.productDetailContainer}`}>
            <h2 className={`m-0 text-center p-5`}>{name}</h2>
            <div className={`${styles.productDetailCard}`}>
               <div className={`${styles.imgButtonCard}`}>
                    <img src={`${imgs ? imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} alt="" className={`${styles.imgCard} img-fluid`}/>
                    <BtnCart 
                        productId={parseInt(match.params.id)}
                        quantity={item !== undefined ? item.quantity : 0}
                    />
               </div>
               <div className={`${styles.detailsCard}`}>
                    <span className={`${styles.description}`}>{description}</span>
                    <hr className={`${styles.hrDetails}`}/>
                    <span className={`${styles.spanDetails1}`}>Precio: ARS$ {price}</span>
                    <hr className={`${styles.hrDetails}`}/>
                    <div className={`${styles.reviewsDetails}`}>
                        <span className={`${styles.spanDetails2}`}>Calificación Promedio: </span>
                            {revAverage > 0 ?
                            <StarRatingComponent
                                editing={false}
                                renderStarIcon={() => <span><FaLeaf size={17}/></span>}
                                starCount={5}
                                value={revAverage}
                            />
                        : <span>No Hay Reseñas</span>}
                    </div>
                </div>
            </div>
           <div className="row">
               {props.isFetching ? <Spinner /> :
                   <ReviewContainer 
                        reviews={props.reviews}
                        match={match}
                    />

               }
           </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews.reviews,
        isFetching: state.reviews.isFetching
    }
    
}
export default connect(mapStateToProps)(ProductDetail)