import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'

const CartPage = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [cart , setCart] = useState([])

    const handleRef = useRef(true)

    useEffect(()=>{
        const fetchCart = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}cart/fetch-cart`)
                console.log("fetchCart payload : " , res.data)
                setCart(res.data?.data?.cart)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in fetchCart :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetchCart()
            handleRef.current = false
        }
    } , [])

    let mrp = 0
    let price = 0

    if(cart.length){
        cart?.map?.((product, index)=>{
            mrp += (product?.product_id?.product_inventory_id?.product_stock[0]?.mrp * product.quantity) 
            price += (product?.product_id?.product_inventory_id?.product_stock[0]?.price * product.quantity) 
        })
    }

    const addProductCart = async(product)=>{
        try {
            if(!product){return}
            const data = {product_barcode : product.product_id.product_barcode , quantity : product.quantity + 1 }
            setLoading(true) 
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}cart/alter-product-cart` , {data})
            console.log("addProductCart response", res.data)
            setCart(res.data?.data?.data1)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addProductCart :" , error)
        } finally { setLoading(false) }
    } 

    const minusProductCart = async(product)=>{
        try {
            if(!product){return}
            if(product.quantity == 1){ return }
            const data = {product_barcode : product.product_id.product_barcode , quantity : product.quantity - 1 }
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}cart/alter-product-cart` , {data})
            console.log("addProductCart response", res.data)
            setCart(res.data?.data?.data1)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addProductCart :" , error)
        } finally { setLoading(false) }
    }
    
    const removeProductFromCart = async(id)=>{
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}cart/remove-product-from-cart` , {data : id})
            console.log("removeProductFromCart response", res.data)
            setCart(res.data?.data?.data1)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in removeProductFromCart :" , error)
        } finally { setLoading(false) }
        
    }

    if(cartStatus == 'loading' || loading ){return <LoadingSpinner />}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

    if(!cart?.length){
        return(
            <div className='min-h-screen flex'> 
                <button className='btn btn-neutral m-3' onClick={()=>navigate('/')}>back</button>
                <div className='flex flex-col hero justify-center gap-5'>
                    <span className='block text-2xl font-[arial]'>No Product In Cart</span>
                    <button className='block btn btn-info text-white' onClick={()=>navigate('/product')}>Add Products</button>
                </div>
            </div>
        )
    }

  return (
    <div className='overflow-x-auto m-3 font-inter'>
        <div className='text-3xl font-medium text-center mx-2 mb-5'>Cart</div>
        <table className='w-full'>
            <thead>
                <tr className='text-center bg-blue-400 text-white text-sm w-full'>
                    <th className='p-4'>INDEX</th>
                    <th className='p-4'>Brand</th>
                    <th className='p-4'>Name</th>
                    <th className='p-4'>MRP</th>
                    <th className='p-4'>PRICE</th>
                    <th className='p-4'>OPTIONS</th>
                    <th className='p-4'>DELETE</th>
                </tr>
            </thead>
            <tbody>
            {cart?.map((product , index) => 
                <tr key={index} className='text-center border-b border-blue-100'>
                    <td className='p-3'>{index+1}</td>
                    <td className='p-3'>{product?.product_id?.product_brand?.Brand_name}</td>
                    <td className='p-3'>{product?.product_id?.product_name}</td>
                    <td className='p-3'>{product?.product_id?.product_inventory_id?.product_stock[0]?.mrp}</td>
                    <td className='p-3'>{product?.product_id?.product_inventory_id?.product_stock[0]?.price}</td>
                    <td >
                        <div className='border-2 border-blue-600 rounded-lg flex max-w-28'>
                            <button onClick={()=>minusProductCart(product)} className="bg-blue-600 rounded-tl-md rounded-bl-md max-w-8 px-3 p-1 text-white hover:bg-gray-700">-</button>
                            <div className='p-1 w-full'>{product.quantity}</div>             
                            <button onClick={()=>addProductCart(product)} className="hero bg-blue-600 rounded-tr-md rounded-br-md max-w-8 px-3 p-1 text-white hover:bg-gray-700">+</button>
                        </div>
                    </td>
                    <td><button onClick={()=> removeProductFromCart(product?.product_id?._id)} className="rounded-xl bg-red-500 text-sm text-white p-2 px-4 hover:bg-red-700">Delete</button></td>
                </tr>            
            )}  
            </tbody>
        </table>
        <div className='text-xl flex justify-between mx-10 my-5'>
            <p>Total Price : {mrp}</p> 
            <p>Discount : {mrp-price}</p>
            <p>Price : {price}</p>
            <p>No of Products : {no}</p>
        </div>
        <div>
            <button onClick={()=>navigate('/checkout')} className='text-2xl text-white bg-green-500 px-4 rounded-2xl p-2 hover:bg-green-600'>Checkout</button>
        </div>
    </div>
  )
}

export default CartPage