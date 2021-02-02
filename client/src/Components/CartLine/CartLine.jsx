import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './cartline.module.css'
const {REACT_APP_BACKEND_URL} = process.env;

function CartLine ({product, imgs, userId}){
    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
    
    const handleDelete = (productID) =>{
        if(!logged){
          let dataStorage = JSON.parse(localStorage.getItem('Cart'))
          let data = dataStorage.Products.filter(x=>x.id !== productID)
          localStorage.setItem('Cart', JSON.stringify({Products: data}))
          window.location = '/cart'
          alert('El Producto se elimino del carrito')
        }else{
          axios.delete(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${productID}`)
          .then(res=>{
            console.log(res);
            window.location = '/cart'
            alert('El Producto se elimino del carrito')
        })
        }
    }

    return (
        <div>
            <div className={`container ${styles.containerCartline}`}>
                <div className={`${styles.imgContainer}`}>
                    <img 
                        src={`${product.imgs ? product.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} 
                        alt="" className={`${styles.imgCartline}`}
                    />
                </div>
                <div className={`container ${styles.detailsContainer}`}>
                    <div className=''>
                        <h6 className={`${styles.productName}`}>{product.name}</h6>
                    </div>
                    <div className={`container ${styles.productDetails}`}>
                        <span className=""> ARS$ {logged ? product.price : product.price} </span>
                        <span className=""> Cantidad: {logged ? product.orderline.quantity : product.quantity} </span>
                        <span> Total: {logged ? product.price * product.orderline.quantity : product.price * product.quantity} </span>
                    </div>
                </div>
                <div>
                    <button className='btn btn-danger float-right rounded-circle' onClick={()=> handleDelete(product.id)}>X</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.firstReducer.userId
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)