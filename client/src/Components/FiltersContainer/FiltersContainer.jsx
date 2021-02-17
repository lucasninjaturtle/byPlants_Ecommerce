import React, {Fragment} from 'react';
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'
import InputFilter from '../InputFilter/InputFilter'
import styles from './filterscontainer.module.css'
import {FaTrashAlt} from 'react-icons/fa'

const FiltersContainer = (
    {categories,handleCategory,categorySelected,handleInputFilter, handleCleanFilters, value, count, sortProducts}) => {
    
    return ( 
        <Fragment>
            <div className="d-flex justify-content-between align-items-center p-2">
                <div className={`${styles.searchBarContainer}`}>
                    <div>
                        <span className={`${styles.counterSpan}`}>
                            ({count}){count === 1 ? ' Producto' : ' Productos'}
                        </span>
                    </div>
                    <div>
                        <InputFilter 
                            handleInputFilter={handleInputFilter}
                            value={value}
                        />
                    </div>
                </div>
                <div className={`${styles.precioContainer}`}>
                    <span>Precio: </span>
                    <select 
                        className={`${styles.precioSearchbar} form-control`}
                        onChange={sortProducts}
                    >
                        <option>Precio</option>
                        <option value="menorPrecio">Menor precio</option>
                        <option value="mayorPrecio">Mayor precio</option>
                    </select>
                </div>
                <div className={`${styles.categoriesFilterContainer}`}>
                    <div className="">
                        <CategoriesFilter 
                            categories={categories}
                            handleCategory={handleCategory}
                            categorySelected={categorySelected}
                        />
                    </div>
                </div>
                <div className={`${styles.trashButtonContainer}`}>
                    <button 
                        className={`btn ${styles.trashButton}`} 
                        onClick={handleCleanFilters}>
                        <FaTrashAlt size={20}/>
                    </button>
                </div>
            </div>
        </Fragment>
     );
}
 
export default FiltersContainer;