import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { emptyCart, getCart, getCartDeliveryCharge, getCartNoOfProductsInCart, getCartTotalAmount, getCartTotalMrp, getCartTotalSellingPrice } from '../../../slices/clientSlice/CartSlice.js';
import { emptyCheckOut, getCheckOutAddress, getCheckOutPaymentMethod } from '../../../slices/clientSlice/OrderSlice.js'
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner.jsx';
import { toast } from 'react-toastify';

const VerifyCheckOutOrderPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRef = useRef(true)
    const [loading, setLoading] = useState(false)

    const cart_product = useSelector(getCart)

    const total_mrp = useSelector(getCartTotalMrp)
    const total_price = useSelector(getCartTotalSellingPrice)
    const delivery_charges = useSelector(getCartDeliveryCharge)
    const total_amount = useSelector(getCartTotalAmount)
    const total_no_of_product = useSelector(getCartNoOfProductsInCart)
    const payment_method = useSelector(getCheckOutPaymentMethod)
    const delivery_address = useSelector(getCheckOutAddress)
    const product_details = []

    cart_product?.map((product)=>{
        const data = {
            product_id : product.product_id._id,
            product_barcode : product.product_id.product_barcode,
            product_batch_no : product.product_id.product_stock.batch_no,
            product_name : product.product_id.product_name,
            product_mrp : product.product_id.product_stock.mrp,
            product_price : product.product_id.product_stock.price,
            product_manufacture_date : product.product_id.product_stock.manufacture_date,
            product_expire_date : product.product_id.product_stock.expire_date,
            no_of_product : product.quantity,
        }
        product_details.push(data)
    })

    useEffect(()=>{
            if(!total_mrp || !total_price || !delivery_charges || !total_amount || !total_no_of_product || !payment_method || !delivery_address || !product_details.length ){
            navigate('/404')
            return
        }
        if(handleRef.current){
            createOrder()
            handleRef.current = false
        }
    },[])

    const createOrder = async()=>{
        try {
            setLoading(true)
            const data = { total_mrp, total_price, delivery_charges, total_amount, payment_method, delivery_address , product_details, total_no_of_product }
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