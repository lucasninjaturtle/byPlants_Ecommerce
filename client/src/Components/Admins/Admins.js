import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
const {REACT_APP_BACKEND_URL} = process.env;


const Admins = (props) => {
  
  

  
    return (


      
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <Link to='/orders' className="btn btnByPlantas">ADMIN - Listar y modificar ORDENES</Link>
          </div>
          <div className="p-2 bd-highlight">
          <Link to='/productslist' className="btn btnByPlantas">ADMIN - Inventario de Productos y Categorias</Link>
          </div>
          
        </div>
       
                            
                
            
    )}        


export default Admins;
