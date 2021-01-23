
import React, {useState, useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;
// levanto los datos de forma local para probar, se debe cambiar


const Catalog = () => {

    const [ products, setProducts ] = useState([])
    console.log(products)
    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/products`)
        .then(resp=>{
            // console.log(resp)
            setProducts(resp.data)
            
        })
        .catch(error=>{
            console.log(error)
        })
    
    
    
    }, [])


    return (
        <div className='Catalog'>
            HOLA
            
            {products.map(product=> <ProductCard
            id = {product.id}
            nameProduct = {product.nameProduct}
            descriptionProduct = {product.descriptionProduct}
            priceProduct = {product.priceProduct}
            stockProducts = {product.stockProduct}
            urlProduct = {product.urlProduct}
            />)}

        </div>
    )

}

export default Catalog;