import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { emptyCart, getCart, getCartDeliveryCharge, getCartNoOfProductsInCart, } from '../../../slices/clientSlice/CartSlice.js';
import { emptyCheckOut, getCheckOutAddress, getCheckOutPaymentMethod, getCheckOutProducts } from '../../../slices/clientSlice/OrderSlice.js'
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner.jsx';
import { toast } from 'react-toastify';

const VerifyCheckOutOrderPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRef = useRef(true)
    const [loading, setLoading] = useState(false)

    const delivery_address = useSelector(getCheckOutAddress)
    const cart_product = useSelector(getCheckOutProducts)
    const payment_method = useSelector(getCheckOutPaymentMethod)
    const delivery_charges = useSelector(getCartDeliveryCharge)
    // const total_amount = total_price - delivery_charges
    const total_amount = delivery_charges
    const total_no_of_product = useSelector(getCartNoOfProductsInCart)

    // let total_mrp = 0
    // let total_price = 0

    // if(products.length){
    //     products?.map?.((product, index)=>{
    //         total_mrp += (product?.product_id?.product_inventory_id?.product_stock[0]?.mrp * product.quantity) 
    //         total_price += (product?.product_id?.product_inventory_id?.product_stock[0]?.price * product.quantity) 
    //     })
    // }

    const product_details = cart_product
    // ?.map((product)=>{
    //     const data = {
    //         product_id : product.product_id._id,
    //         product_barcode : product.product_id.product_barcode,
    //         product_batch_no : product.product_id.product_stock.batch_no,
    //         product_name : product.product_id.product_name,
    //         product_mrp : product.product_id.product_stock.mrp,
    //         product_price : product.product_id.product_stock.price,
    //         product_manufacture_date : product.product_id.product_stock.manufacture_date,
    //         product_expire_date : product.product_id.product_stock.expire_date,
    //         no_of_product : product.quantity,
    //     }
    //     return data
    // })

    useEffect(()=>{
        // if(!total_mrp || !total_price || !delivery_charges || !total_amount || !total_no_of_product || !payment_method || !delivery_address || !product_details.length ){
        if(!delivery_charges || !total_amount || !total_no_of_product || !payment_method || !delivery_address || !product_details.length ){
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
            const data = { delivery_charges, total_amount, payment_method, delivery_address , product_details, total_no_of_product }
            console.log({data})
            // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}order/create-order` , {data})
            // console.log("createOrder :", res.data)
            // toast.success(res.data.message)
            // dispatch(emptyCart())
            // navigate('/cart')
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
