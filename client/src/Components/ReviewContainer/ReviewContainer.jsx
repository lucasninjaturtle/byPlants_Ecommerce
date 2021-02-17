import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import styles from './reviewcard.module.css'
import FormReview from '../FormReview/FormReview'
import {connect} from 'react-redux'

const ReviewContainer = ({ reviews, match }) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  return (
    <div className={`${styles.reviewContainer}`}>
      <h4 className={`${styles.titlereviews} d-flex justify-content-center`}>Reseñas</h4>
      <div className={`${styles.reviews}`}>
        {open && <FormReview idProd={match.params.id}/>}
        {
          userLocalstorage &&

          <div className={`${styles.addReviewButton}`}>
            <button 
              className="btn btnByPlantas btn-sm"
              onClick={handleClick}
              >
                Agregar Review
              </button>
          </div>
        }
      </div>
      <div className={`${styles.containercards}`}>
        {reviews.map(review => (
          <ReviewCard
              title={review.title}
              comment={review.comment}
              stars={review.stars}
              name={review.user.firstname}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      userLogin: state.userLogin.userLogin,
  }
  
}
export default connect(mapStateToProps)(ReviewContainer)