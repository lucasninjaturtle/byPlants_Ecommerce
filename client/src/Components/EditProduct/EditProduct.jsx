import axios from 'axios';
import Swal from 'sweetalert2'
import React, {Fragment, useState, useEffect} from 'react'
const {REACT_APP_BACKEND_URL} = process.env;

              //funciones productos

const EditProduct = ({product}) => { 

  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };


  const [prod, setProduct ] = useState(product)
  const handleInpedit = (e) => {
    setProduct({
      ...prod,
      [e.target.name]:e.target.value
    })
  } 

  const handleButtonEdit = (e) => {
    handleSubmitCat()
    let body = {...prod}
    console.log(prod)
    axios.put(`${REACT_APP_BACKEND_URL}/products/${prod.id}`,body, config)
    .then(res => {
      Swal.fire({
        title: 'Se edito el producto correctamente',
        icon: 'success'
      })
      window.location = '/productslist'
    })
  }


                  //FUNCIONES CATEGORIAS

  const [category, setCategory] = useState({name: ''})

    const handleChangeCat = e => {
        setCategory({
            ...category,
            [e.target.name]:e.target.value
        })
    }
  
  //handle SUBMIT (POSTEA) categorias + product

  const handleSubmitCat = e => {
    axios.post(`${REACT_APP_BACKEND_URL}/products/${prod.id}/category/setCategories`,checks, config)//variable del .env
    .then(resp=>{
        console.log(resp)
    })
    .catch(err=>{console.log(err)})
}

  const [categories, setCategories] = useState([])

 
  
  //este useeffect agarra las categorias y las guarda en el estado categories
  useEffect(()=>{
    axios.get(`${REACT_APP_BACKEND_URL}/products/category`, config)
    .then(resp=>{setCategories(resp.data)})
    .catch(err=>{console.log(err)})
  }, [])

  // levanto los items del check de categorias
  const [checks, setChecks] = useState([])

  const handleClick = e => {
    if(e.target.checked){
      setChecks([...checks, parseInt(e.target.id)])
    }else{
      const newChecks = checks.filter(x=>x!==parseInt(e.target.id))
      setChecks(newChecks)
    }
  }
            
  
 return ( 
   <Fragment>
     
      <button type="button" className="btn btnByPlantas" data-toggle="modal" data-target={`#id${product.id}`}>
        Edit
      </button>

      <div className="modal" id={`id${product.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Editar Producto</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <label>Nombre</label>
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Nombre" 
                onChange={(e) => handleInpedit(e)}
                value={prod.name}
                name='name'
                />
              <label>Descripción</label>
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Descripción"  
                value={prod.description}
                name='description'
                onChange={(e) => handleInpedit(e)}
                />
              <label>Precio</label>
              <input 
                type="number
                " className="form-control my-2" 
                placeholder="Precio"  
                value={prod.price}
                name='price'
                onChange={(e) => handleInpedit(e)}
                />
              <label>Stock</label>
              <input 
                type="number" 
                className="form-control my-2" 
                placeholder="Stock"  
                value={prod.stock}
                name='stock'
                onChange={(e) => handleInpedit(e)}
                />
                <div>

            <label>Categorias</label>
              {categories.map((x,index)=>{
                return(
                  <div key={index}>
                    <input type='checkbox' className='form-check-input' id={x.id} name={x.name} onChange={handleChangeCat} onClick={handleClick}/>
                    <label className='form-check-label text-dark' htmlFor={x.id}>{x.name}</label>
                  </div>
                )
              })}
          </div> 

            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btnByPlantas" 
                data-dismiss="modal"
                onClick={(e)=>{handleButtonEdit(e)}}
                >
                Editar
              </button>

              <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>

          </div>
        </div>
      </div>

  </Fragment>
  )
}


export default EditProduct;
