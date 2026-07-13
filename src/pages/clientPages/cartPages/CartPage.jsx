import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import useCartStore from '../../../store/cartStore'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { IoArrowDown } from 'react-icons/io5'

const CartPage = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleRef = useRef(true)

    const cart = useCartStore(state => state.cart)
    const fetchFullCart = useCartStore(state => state.fetchFullCart)
    const cartLoading = useCartStore(state => state.loading)
     
    
    useEffect(() => {
        const initialize = async () => {
            const res = await fetchFullCart();
            if (!res) {setError(true)}
        };
        if(handleRef.current){
            initialize();
        }
    }, []);

    console.log("cart page",cart)


    let mrp = 0
    let price = 0

    const addProductCart = async(product)=>{
        try {
           
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addProductCart :" , error)
        } finally { setLoading(false) }
    } 

    const minusProductCart = async(product)=>{
        try {
          
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addProductCart :" , error)
        } finally { setLoading(false) }
    }
    
    const removeProductFromCart = async(id)=>{
        try {
          
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in removeProductFromCart :" , error)
        } finally { setLoading(false) }
        
    }

    const discountCalculator = (product) => {
        const discount = ((product.mrp - product.selling_price) / product.mrp) * 100 
        return discount.toFixed(0)
    }

    if( loading || cartLoading){return <LoadingSpinner />}
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
    <div className='flex justify-center min-h-screen'>
    <div className='overflow-x-auto p-10 max-w-[1920px] w-full '>
        <div className='text-2xl font-medium text-gray-900'>My Shopping Cart</div>
        <div className='flex gap-8'>
            <div className='w-full mt-5 space-y-3 p-5 rounded-lg border'>
                { cart.map((product, index)=>(
                    <div key={index} className=' rounded-md flex bg-white shadow '>
                        <div className='h-36 min-w-36 '>
                            <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo?.url}`} alt={product.product_name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className='w-full px-3 pt-5'>
                            <div className=' text-xl font-medium text-gray-700 '>{product.product_name}</div>
                            <div className=' font-medium text-gray-500 mt-1 '>{product.size}{product.product_UOM}</div>
                            <div className='flex gap-2 mt-3 items-center font'>
                                <span className='text-xl font-semibold text-green-500 flex items-center'><IoArrowDown size={28}  />{discountCalculator(product)}%</span>
                                <span className='text-lg font-semibold text-gray-500 line-through flex items-center'><FaIndianRupeeSign size={17} />{product.mrp}</span>
                                <span className='text-xl font-semibold flex items-center text-gray-700'><FaIndianRupeeSign size={20} />{product.selling_price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='min-w-80 rounded-lg p-5 border mt-5'>
                <div>Order Summary</div>
            </div>

        </div>
        <div>
            {/* <button onClick={()=>navigate('/checkout')} className='text-2xl text-white bg-green-500 px-4 rounded-2xl p-2 hover:bg-green-600'>Checkout</button> */}
        </div>
    </div>
    </div>

  )
}

export default CartPage