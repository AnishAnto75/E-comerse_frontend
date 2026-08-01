import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import useCartStore from '../../../store/cartStore'
import { FaArrowLeftLong, FaIndianRupeeSign, FaMinus, FaPlus, FaTrash, FaTrashCan } from 'react-icons/fa6'
import { IoArrowDown } from 'react-icons/io5'
import { BiPlus } from 'react-icons/bi'

const CartPage = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleRef = useRef(true)

    const cart = useCartStore(state => state.cart)
    const fetchFullCart = useCartStore(state => state.fetchFullCart)
    const cartLoading = useCartStore(state => state.loading)
    const addToCart = useCartStore(state => state.addToCart);
    const minusToCart = useCartStore(state => state.minusToCart);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

    useEffect(() => {
        const initialize = async () => {
            const res = await fetchFullCart();
            if (!res) {setError(true)}
        };
        if(handleRef.current){
            initialize();
        }
    }, []);

    const orderSummary = useMemo(() => {

        return cart.reduce((acc, item) => {

            acc.totalItems += item.quantity;
            acc.mrpAmount += item.mrp * item.quantity;
            acc.discount += (item.mrp * item.quantity) - (item.selling_price * item.quantity) ;
            return acc;
        }, {
            totalItems : 0,
            mrpAmount : 0,
            discount : 0,
        });

    }, [cart]);

    const deliveryCharges = (orderSummary.mrpAmount - orderSummary.discount) >= 500 ? 0 : 50
    const grandTotal = (orderSummary.mrpAmount - orderSummary.discount) + deliveryCharges
    const savedAmount = orderSummary.discount + (deliveryCharges ? 0 : 50 ) 

    const addProductCart = async(product)=>{
        const data = {
            product_id: product.product_id,
            quantity: 1
        }
        await addToCart(data);
    }
    
    const minusProductCart = async(product)=>{
        
        if (product.quantity-1 < product.min_order_quantity) {
            toast.error(`Minimum quantity is ${product.min_order_quantity}`)
            return
        }
        const data = { product_id: product.product_id}
        await minusToCart(data)
    }
    
    const removeFromCart = async(product)=>{
        const data = { product_id: product.product_id,}
        await removeProductFromCart(data);
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
    <div className='flex justify-center'>
    <div className='overflow-x-auto pt-8 max-w-screen-2xl w-full '>
        <div className='text-2xl font-medium text-gray-900 flex items-center gap-3'>
            <Link to={'/products'} className=' cursor-pointer'><FaArrowLeftLong /></Link>
            <div>My Shopping Cart</div>
        </div>
        <div className='flex gap-8'>
            <div className="h-[calc(100vh-185px)] w-full flex flex-col border p-5 pr-2 mt-5 rounded-lg ">
                <div className="flex-1 overflow-y-auto ">
                    <div className='w-full space-y-3 pr-3 '>
                        { cart.map((product, index)=>(
                            <div key={index} className='rounded-md grid grid-cols-12 bg-white border '>
                                <div className='col-span-10 flex'>
                                    <div onClick={()=>navigate(`/products/${product.product_barcode}`)} className='h-36 min-w-36 cursor-pointer'>
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo?.url}`} alt={product.product_name} className="w-full h-full object-contain p-2" />
                                    </div>
                                    <div className='w-full px-3 pt-5'>
                                        <Link to={`/products/${product.product_barcode}`} className='text-xl font-medium text-gray-700 cursor-pointer '>{product.product_name}</Link>
                                        <div className=' font-medium text-gray-500 mt-1 '>{product.size}{product.product_UOM}</div>
                                        <div className='flex gap-2 mt-3 items-center font'>
                                            <span className='text-xl font-semibold text-green-500 flex items-center'><IoArrowDown size={28} />{discountCalculator(product)}%</span>
                                            <span className='text-lg font-semibold text-gray-500 line-through flex items-center'><FaIndianRupeeSign size={17} />{product.mrp}</span>
                                            <span className='text-xl font-semibold flex items-center text-gray-700'><FaIndianRupeeSign size={20} />{product.selling_price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2 flex justify-center items-center gap-5 '>
                                    <div className='flex rounded-lg'>
                                        <div onClick={()=>minusProductCart(product)} className='w-8 py-1 bg-sky-600 rounded-l-lg text-white cursor-pointer flex items-center justify-center'><FaMinus /></div>
                                        <div className='w-8 py-1 text-center bg-sky-50'>{product.quantity}</div>
                                        <div onClick={()=>addProductCart(product)} className='w-8 py-1 bg-sky-600 rounded-r-lg text-white cursor-pointer flex items-center justify-center'><FaPlus /></div>
                                    </div>
                                    <div onClick={()=>removeFromCart(product)} className='text-red-500 hover:bg-red-100 p-2 cursor-pointer rounded-full'><FaTrash size={22}/></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='min-w-96 max-h-96 bg-white font-medium text-gray-500 text-[17px] rounded-lg border shadow-md p-6 pt-8 mt-5'>
                <div className="font-semibold text-lg text-sky-600 mb-5">Order Summary</div>
                <div className="flex justify-between mb-3">
                    <span>MRP Amount</span>
                    <span className="text-slate-700 font-semibold">₹{orderSummary.mrpAmount}</span>
                </div>
                <div className="flex justify-between mb-3">
                    <span>Discount</span>
                    <span className="text-slate-700 font-semibold">- ₹{orderSummary.discount}</span>
                </div>
                <div className="flex justify-between mb-3">
                    <span>Delivery Charges</span>
                    <span className="text-slate-700 font-semibold">₹{deliveryCharges}</span>
                </div>
                <div className="flex justify-between text-xl border-t-[3px] border-dashed py-3 pb-4 ">
                    <span>Grand Total</span>
                    <span className="text-sky-600 font-bold">₹{grandTotal}</span>
                </div>
                <div className='text-green-500 text-center mt-2 font-semibold'>You have saved (₹{savedAmount}) from this order</div>

                <div onClick={()=>navigate("/checkout")} className='bg-green-500 text-white p-3 text-center rounded-xl tracking-wide text-lg mt-5 cursor-pointer'>Place Order</div>

            </div>
        </div>
    </div>
    </div>
  )
}

export default CartPage