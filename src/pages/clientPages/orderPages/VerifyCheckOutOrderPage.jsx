import React, { useEffect, useReducer, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner.jsx';
import { toast } from 'react-toastify';

const VerifyCheckOutOrderPage = () => {

    const navigate = useNavigate()
    const handleRef = useRef(true)
    const [loading, setLoading] = useState(true)

    const product_details = cart_product?.map((product)=>{
        const data = {
            product_id : product.product_id._id,
            product_barcode : product.product_id.product_barcode,
            product_batch_no : product.product_id.product_inventory_id.product_stock[0].batch_no,
            product_name : product.product_id.product_name,
            product_mrp : product.product_id.product_inventory_id.product_stock[0].mrp,
            product_price : product.product_id.product_inventory_id.product_stock[0].price,
            product_manufacture_date : product.product_id.product_inventory_id.product_stock[0].manufacture_date,
            product_expire_date : product.product_id.product_inventory_id.product_stock[0].expire_date,
            no_of_product : product.quantity,
        }
        return data
    })

    let total_mrp = 0
    let total_price = 0

    product_details?.map?.((product, index)=>{
        total_mrp += (product.product_mrp * product.no_of_product) 
        total_price += (product.product_price * product.no_of_product) 
    })
    const delivery_charges = useSelector(getCartDeliveryCharge)
    const total_amount = total_price + delivery_charges
    const payment_method = useSelector(getCheckOutPaymentMethod)
    const total_no_of_product = useSelector(getCartNoOfProductsInCart)
    const delivery_address = useSelector(getCheckOutAddress)
    
    useEffect(()=>{
        if(total_mrp < 1 || total_price < 1 || !total_amount || !payment_method || !total_no_of_product || !delivery_address || !product_details.length ){
            navigate('/404')
            return
        }
        if(handleRef.current && product_details.length){
            createOrder()
            handleRef.current = false
        }
    },[])

    const createOrder = async()=>{
        try {
            setLoading(true)
            const data = { total_mrp, total_price, delivery_charges, total_amount, payment_method, total_no_of_product, delivery_address , product_details }

            console.log({data})
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}order/create-order` , {data})
            console.log("createOrder :", res.data)
            toast.success(res.data.message)
            dispatch(emptyCart())
            navigate('/cart')
            return
        } catch (error) {
            console.log("error in createOrder function", error)
            toast.error(error.response.data.message)
            navigate('/cart')
            return
        } finally {
            dispatch(emptyCheckOut())
            setLoading(false)
        }
    }

    if(loading){ return <LoadingSpinner/> }
  return (
    <div>Your order is in process dont refresh the page</div>
  )
}

export default VerifyCheckOutOrderPage
