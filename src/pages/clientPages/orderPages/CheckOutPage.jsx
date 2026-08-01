import { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'

import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

import CheckOutAddressComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAddressComponent";
import CheckOutProductsComponent from "../../../components/clientComponents/checkOutComponents/CheckOutProductsComponent";
import CheckOutAmountComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAmountComponent";
import CheckOutPaymentMethodComponent from "../../../components/clientComponents/checkOutComponents/CheckOutPaymentMethodComponent";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";

const CheckOutPage = () => {

    const navigate = useNavigate()

    const handleRef = useRef(true)
    
    const [checkedAccordion , setCheckedAccordion] = useState(1)

    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const checkOutAddress = 1
    const checkOutProducts = 1
    const checkOutPaymentMethod = 1
    const deliveryCharge = 1

    const [cartProducts , setCartProducts] = useState([])

    if(loading ){return <LoadingSpinner />}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

    return (
    <div className="flex justify-center">
    <div className='flex mt-10 gap-10 max-w-screen-2xl w-full '>
        <div className='rounded-md space-y-1 w-full'>

            <div className="border p-5 w-full rounded-t-lg">
                <div onClick={()=>setCheckedAccordion(1)} className="flex cursor-pointer">
                    <div className='text-xl text-gray-800 flex gap-1 font-medium'> Delivery Address {checkOutAddress && <FaCheckCircle size={18} className='text-sky-500'/> }</div>
                </div>
                { checkedAccordion === 1 &&
                    <div>
                        <div className="border-b my-2"/>
                        <CheckOutAddressComponent /> 
                        <button onClick={()=> {!checkOutAddress ? toast.warn("Select address") : setCheckedAccordion(2)}} className="mt-2 font-medium bg-green-500 text-white p-2 rounded-xl ">Deliver Here</button>
                    </div>
                }
            </div>

            <div className="border-2 p-4 rounded">
                <div onClick={()=>setCheckedAccordion(2)} className="flex font-[arial] cursor-pointer ">
                    <span className='text-xl flex gap-1'>Order Summary<FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutProducts ? "block" : "hidden"}`}/> </span>
                </div>
                {checkedAccordion ==2 &&
                    <div>
                        <div className="border-b my-2"/>
                        <CheckOutProductsComponent cartProducts = {cartProducts} /> 
                        <div className="flex px-2 py-5 gap-5 ">
                            <button onClick={()=>{dispatch(setCheckOutProducts(cartProducts)) ; setCheckedAccordion(3)}} className="bg-blue-500 text-white p-2 rounded-xl">Place Order</button>
                            <button onClick={()=>navigate('/cart')} className="text-lg text-green-600 font-medium font-sans tracking-wider hover:bg-green-100/70 p-2 rounded-xl px-5 ">Edit</button>
                        </div>
                    </div>
                }
            </div>

            <div className="border-2 p-4 rounded">
                <div onClick={()=>setCheckedAccordion(3)} className="flex font-[arial] cursor-pointer">
                    <span className='text-xl flex gap-1'>
                        Payment Options
                        <FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutPaymentMethod ? "block" : "hidden"}`}/>
                    </span>
                </div>
                {checkedAccordion == 3 &&
                    <div>
                        <div className="border-b my-2" />
                        <CheckOutPaymentMethodComponent />
                        <button onClick={()=>{!checkOutPaymentMethod || !checkOutAddress || !checkOutProducts ? toast.warn("Select address & payment") : navigate('/checkout/verify_checkout_order')}} className="mt-2 bg-blue-500 p-2 rounded-xl text-white">Place Order</button>
                        <button onClick={()=>console.log({checkOutAddress, checkOutPaymentMethod, checkOutProducts})}>kjn</button>
                    </div>
                }
            </div>
        </div>
        <div className='md:w-1/4 w-full p-5 md:h-60 rounded-md shadow-md md:block sticky top-2 '>
            <CheckOutAmountComponent products = {cartProducts}/>
        </div>
    </div>
    </div>
  )
}

export default CheckOutPage