
import React, {useEffect,useState} from 'react';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {updateItem} from '../../../Redux/actions/cartActions'
import {FaEdit} from 'react-icons/fa'
import Swal from 'sweetalert2'


const BtnUpdateCart = ({productId,quantity}) => {
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const [qty,setQty] = useState('')
    const isAuth =  userLogin.userLogin

    useEffect(()=>{
        // setQty(quantity)
    },[])

    const handleChangeQty = (event) => {
        setQty(parseInt(event.target.value));
    }

    const handleUpdate = () => {
        if(qty === 0){
            setQty('')
            Swal.fire({
            title: 'Ingrese un valor mayor a 0!',
            icon: 'error'
        })
        }else{
            dispatch(updateItem(productId,qty))
            setQty('')
            Swal.fire({
                title: 'Se edito la cantidad!',
                icon: 'success'
            })
        }
    }

    return ( 
    <div className="form-group">
        <input 
            type="number" 
            className="form-control form-control-sm my-3" 
            onChange={handleChangeQty}
            value={qty}
            min={1}
            />
        <button 
            className="btn btnByPlantas my-3"
            onClick={handleUpdate}
        >
            <FaEdit/> Editar
        </button>
    </div>
    );
}
 
export default BtnUpdateCart;