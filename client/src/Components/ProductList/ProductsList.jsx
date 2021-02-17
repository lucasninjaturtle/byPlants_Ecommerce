import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditProduct from '../EditProduct/EditProduct';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import styles from './productslist.module.css'
import {Redirect} from 'react-router-dom'
import { useSelector} from 'react-redux'
const {REACT_APP_BACKEND_URL} = process.env;


const ProductsList = (props) => {
  const userLogin = useSelector(state => state.userLogin)
  
  const [products, setProducts] = useState([]);

   useEffect(()=>{
    getProducts()
   },[])

  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };

    const getProducts = () => {
      axios.get(`${REACT_APP_BACKEND_URL}/products`, config)
            .then(res => {
              setProducts(res.data)
      })
    }

      const handleDelete = id => {
        Swal.fire({
          title: 'Esta seguro de eliminar el producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${REACT_APP_BACKEND_URL}/products/${id}`, config)
            .then(res =>{
                setProducts(products.filter(p => p.id !== id))
            })
            Swal.fire({
              title:'Eliminado!',
              icon:'success'
            })
          }
        })
      }
      
    let isAuth = userLogin.userLogin && userLogin.userLogin?.role === 'ADMIN_ROLE'
    return (
      isAuth ?
        <div className="container">
          <h2 className={`m-0 text-center p-5`}>Inventario de Productos</h2> 
            <div className="d-flex justify-content-center pb-3">
              <Link to='/addProduct' className={`text-center btn btnByPlantas ${styles.btnEdit}`}>Agregar Producto</Link>
              <Link to='/addCategory' className={`text-center btn btnByPlantas ${styles.btnEdit}`}>Agregar Categoría</Link>
            </div>
            <table className="table table-hover table-dark thfontsize">
                <thead>
                 <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categorias</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                 </tr>
                </thead>
                     <tbody>
                       {
                       products.map((p)=>{
                        return(
                                <tr>
                                  <td>{p.name}</td>
                                  <td>{p.description}</td>
                                  <td>{p.price}</td>
                                  <td>{p.stock}</td>
                                  <td>
                                    <div>
              {p.categories.map((x,index)=>{
                return(
                  <div key={index}>
                    <label className='form-check-label' htmlFor={x.id}>{x.name}</label>
                  </div>
                )
              })}
          </div> 
                                    </td>
              <td>
                <EditProduct product={p}/>
              </td>
              <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(p.id)}>Eliminar</button></td>
              </tr>
              )
            })
          }
          </tbody>
          </table>
      </div>
      :
      <Redirect to={{
        pathname: '/login',
        state: {
          message: 'Debes estar logueado y ser ADMIN para ver Productos'
        }
      }}/>
    )}        


export default ProductsList;
