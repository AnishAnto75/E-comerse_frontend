import { useState } from "react";
import {useNavigate} from 'react-router-dom'

import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { getCheckOutAddress , getCheckOutPaymentMethod, getCheckOutProduct, setCheckOutProducts } from "../../../slices/clientSlice/OrderSlice";

import CheckOutAddressComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAddressComponent";
import CheckOutProductsComponent from "../../../components/clientComponents/checkOutComponents/CheckOutProductsComponent";
import { getCart } from "../../../slices/clientSlice/CartSlice";
import CheckOutAmountComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAmountComponent";
import CheckOutPaymentMethodComponent from "../../../components/clientComponents/checkOutComponents/CheckOutPaymentMethodComponent";

const CheckOutPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [checkedAccordion , setCheckedAccordion] = useState(1)

    const checkOutAddress = useSelector(getCheckOutAddress)
    const checkOutProducts = useSelector(getCheckOutProduct)
    const checkOutPaymentMethod = useSelector(getCheckOutPaymentMethod)
    const cartProducts = useSelector(getCart)

    const setCheckoutProduct = ()=>{
        dispatch(setCheckOutProducts(cartProducts))
    }

    return (
    <div className='flex flex-col md:flex-row md:p-5 p-2 gap-5 justify-center min-h-screen '>
        <div className='md:w-3/5 w-full rounded-md space-y-1'>

            <div className="border-2 p-4 rounded">
                <div onClick={()=>setCheckedAccordion(1)} className="flex cursor-pointer">
                    <span className='text-xl flex gap-1'>
                        Delivery Address 
                        <FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutAddress ? "block" : "hidden"}`}/> 
                    </span>
                </div>
                { checkedAccordion == 1 &&
                    <div>
                        <div className="divider my-2"/>
                        <CheckOutAddressComponent /> 
                        <button onClick={()=>setCheckedAccordion(2)} disabled={!checkOutAddress} className="btn mt-2 btn-neutral text-white">Deliver Here</button>
                    </div>
                }
            </div>

            <div className="border-2 p-4 rounded">
                <div onClick={()=>setCheckedAccordion(2)} className="flex font-[arial] cursor-pointer ">
                    <span className='text-xl flex gap-1'>
                        Order Summary 
                        <FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutProducts ? "block" : "hidden"}`}/> 
                    </span>
                </div>
                {checkedAccordion ==2 &&
                    <div>
                        <div className="divider my-2"/>
                        <CheckOutProductsComponent /> 
                        <div className="flex">
                            <div onClick={()=>{setCheckoutProduct(); setCheckedAccordion(3)}} className="btn mt-5 bg-info text-white">
                                Place Order
                            </div>
                            <div onClick={()=>navigate('/cart')} className="font-[arial] tracking-[-0.2px] mt-[36px] ml-8 cursor-pointer hover:text-red-500">Edit Products</div>
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
                {checkedAccordion ==3 &&
                    <div> 
                        <div className="divider my-2"/>
                        <CheckOutPaymentMethodComponent />
                        <button onClick={()=>navigate('/checkout/verify_checkout_order')} disabled={!checkOutPaymentMethod || !checkOutAddress || !checkOutProducts} className="btn mt-2 bg-info text-white">Place Order</button>
                    </div>
                }
            </div>
        </div>
        <div className='md:w-1/4 w-full p-5 md:h-60 rounded-md shadow-md md:block sticky top-2 '>
            <CheckOutAmountComponent />
        </div>
    </div>
  )
}

export default CheckOutPage