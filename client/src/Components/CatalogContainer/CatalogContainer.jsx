import React, {Fragment, useEffect, useState} from 'react';
import styles from './catalogContainer.module.css'
import axios from 'axios'
import Catalog from '../Catalog/Catalog'
import FiltersContainer from '../FiltersContainer/FiltersContainer'
import Spinner from '../Spinner/Spinner'
import {connect} from 'react-redux'
import {fetchProducts} from '../../Redux/actions/productsActions'

const {REACT_APP_BACKEND_URL} = process.env;

/* 
    Componente contenedor de los filtros y el listado del catalogo
*/
const CatalogContainer = (props) => {
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState('')
    const [inpfilter, setInpfilter] = useState('')
    const [sort, setSort] = useState('')

    useEffect(()=>{
        props.dispatch(fetchProducts())
        getCategories()
    }, [])

    const sortProducts = event => {
        setSort(event.target.value) 
    }
    
    const getCategories = () => {
        axios.get(`${REACT_APP_BACKEND_URL}/category`)
            .then(res => {
                setCategories(res.data)
            })
    }

    const handleCategory = (event) => {
        setCategorySelected(event.target.value)
    }
    const handleInputFilter = (event) => {
        setInpfilter(event.target.value)
    }
    const productsFiltered = () => {
        if(!categorySelected && !inpfilter){
            return props.products.filter(product => 
                (product.stock > 0))
        }
        if(!categorySelected && inpfilter){
            return props.products.filter(product => 
                (product.stock > 0) && (product.name.concat(product.description)).toLowerCase().includes(inpfilter.toLocaleLowerCase()))
        }
        return props.products.filter(product => {
            return product.categories.some(cat => cat.name === categorySelected) && (product.name.concat(product.description)).toLowerCase().includes(inpfilter.toLocaleLowerCase())
        })
    }
 
    let sortProductos = () => {
        let aux = productsFiltered()
        if(sort === 'menorPrecio'){
            return aux.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))
        }
        if(sort === 'mayorPrecio'){
            return aux.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))
        }
        return aux
    } 
    const handleCleanFilters = () => {
        setCategorySelected('')
        setInpfilter('')
        setSort('')
    }
    return ( 
        <Fragment>
            {props.isFetching ? 
                <Spinner />
                    :
                    <div >
                        <div className = {`${styles.catalogContainer}`}>
                                <h2 className={`m-0 text-center p-5`}>Busca en nuestra gran oferta de productos!</h2>
                                <div className={`col-10  ${styles.catalogSearchBar}`}>
                                    <FiltersContainer 
                                        categories={categories}
                                        handleCategory={handleCategory}
                                        categorySelected={categorySelected}
                                        handleInputFilter={handleInputFilter}
                                        handleCleanFilters={handleCleanFilters}
                                        value={inpfilter}
                                        count={productsFiltered().length}
                                        sortProducts={sortProducts}
                                    />
                                </div>
                                <div className={`col-12 p-2`}>
                                    <Catalog 
                                        products={sortProductos()}
                                    />
                                </div>
                        </div>
                    </div>
            }
        </Fragment>
     );
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        isFetching: state.products.isFetching
    }
    
}
export default connect(mapStateToProps)(CatalogContainer)