import React from 'react';
import styles from './reviewcard.module.css'
import StarRatingComponent from 'react-star-rating-component';
import { FaLeaf } from 'react-icons/fa';

const ReviewCard = ({title,comment,stars,name,lastname}) => {
    return (

        <div className={`${styles.cardreview}`}>
            <div className={`${styles.titlecontainer}`}>
                <h5 className={`${styles.cardtitle}`}>"{title}"</h5>
                <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    renderStarIcon={() => <span><FaLeaf size={17}/></span>}
                    starCount={5}
                    value={stars}
                />
            </div>
            <div className={`${styles.cardbody}`}>
                <p>{comment}</p>
                <div className={`${styles.namecard} d-flex justify-content-end`}>
                        <cite>-{name}</cite>
                </div>
            </div>
        </div>
     );
}
 
export default ReviewCard;