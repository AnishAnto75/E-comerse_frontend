import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate} from 'react-router-dom'

import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import useAddressStore from "../../../store/addressStore";
import useCartStore from "../../../store/cartStore";
import ErrorComponent from "../../../components/ErrorComponent";
import AddNewAddressComponent from "../../../components/clientComponents/accountComponents/AddNewAddressComponent";
import { BiX } from "react-icons/bi";
import { FaArrowLeftLong, FaIndianRupeeSign } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";

const CheckOutPage = () => {

    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

    const addresses = useAddressStore(state => state.address)
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)
    const fetchFullCart = useCartStore(state => state.fetchFullCart)

    const handleRef = useRef(true)

    useEffect(() => {
        const initialize = async() => {
    
            const res = await fetchFullCart();
            if (!res) {setError(true); return}

            const address = addresses.filter(address => address?.is_default)
            if(address.length > 1) {setError(true); return}
            setSelectedAddress(address[0])

            handleRef.current = false
        };
        if(handleRef.current && addresses.length){
            initialize();
        }
    }, [addresses]);

    // change address popup
    const [changingAddress, setChangingAddress] = useState(false)

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

    const discountCalculator = (product) => {
        const discount = ((product.mrp - product.selling_price) / product.mrp) * 100 
        return discount.toFixed(0)
    }

    const handleSubmit = async()=>{

        if(!selectedAddress || !selectedAddress._id){toast.warn("Select the address");return}
        if(!selectedPaymentMethod){toast.warn("Select the payment method");return}

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}user/order/create`, {address_id: selectedAddress._id , payment_method: selectedPaymentMethod}, { withCredentials: true, });
            console.log("createOrder Data : ",res)
            if(res){
                toast.success(res.data?.message)
                clearCart()
                navigate('/products')
            }
        } catch (error) { 
            console.error("error in createOrder : ",error);
        } finally {setLoading(false)}

    }

    if(loading ){return <LoadingSpinner />}
    if(error || !cart.length){return <ErrorComponent />}

    return (
    <div className="flex justify-center bg-gray-100 ">
        <div className='px-10 pb-7 pt-7 gap-10 max-w-screen-xl w-full '>

            <div className='text-2xl mb-5 font-medium text-gray-900 flex items-center gap-3'>
                <Link to={'/cart'} className=' cursor-pointer'><FaArrowLeftLong /></Link>
                <div>Checkout</div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-xl font-medium text-gray-900 min-h-[170px]">
                { selectedAddress ?
                    <div>
                        <div className="flex items-center font-semibold tracking-wide gap-2">
                            <div className="text-xl text-sky-700 ">Delivering To : </div>
                            <div className='text-lg capitalize '>{selectedAddress.address_type}</div>
                        </div>
                        <div className=" flex px-4 rounded justify-between">     
                            <div className='w-full font-medium text-[16.5px] text-gray-800'>
                                <div className='space-x-1 mt-3 text-lg font-semibold '>
                                    <span>{selectedAddress.name}</span> <span>( {selectedAddress.phone_number} )</span>
                                </div>
                                <div className=' tracking-wide mt-1.5'>
                                    <span>{selectedAddress.house_no && `${selectedAddress.house_no}, `} {selectedAddress.landmark && `${selectedAddress.landmark}, `} {selectedAddress.area && `${selectedAddress.area}, `} {selectedAddress.city && `${selectedAddress.city}, `} {selectedAddress.district && `${selectedAddress.district}, `} {selectedAddress.state && `${selectedAddress.state}`} - {selectedAddress.pincode}</span>
                                    <div>{selectedAddress.alternate_phone_number && `Alternate Phone : ${selectedAddress.alternate_phone_number}`}</div>
                                </div>
                            </div>
                            <div>
                                <button onClick={()=>setChangingAddress(true)} className="border-[3px] border-gray-50 rounded-lg py-2 px-3 text-sky-500 hover:text-sky-400">Change</button>
                            </div>
                        </div>
                    </div>
                : 
                    <AddNewAddressComponent page={"checkout"}/>                    
                }
                {changingAddress && 
                    <div className="fixed inset-0 overflow-y-auto z-50">
                        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"/>
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className='bg-white z-50 text-lg font-medium p-10 pb-6 shadow max-w-screen-lg w-full rounded-xl'>

                                <div className='text-2xl tracking-wide text-center border-b-[3px] border-dashed pb-5'>Select Delivery Address</div>
                                <div className='text-xl mt-5 tracking-wide text-start '>Saved Addresses</div>

                                <AddNewAddressComponent page={"checkout"} />

                                <div className="mt-5 h-[calc(100vh-350px)] overflow-y-auto">
                                    {addresses?.map((address, index) => (
                                        <div onClick={()=>setSelectedAddress(address)} className={` ${(index % 2 == 0 )  && "bg-gray-50"} flex items-center rounded-xl pl-5 cursor-pointer `} key={address._id}>
                                            <div className="border p-1.5 rounded-full bg-white">
                                                <div className={`${ selectedAddress._id == address._id && "bg-sky-500"} p-[7px] rounded-full`}/>
                                            </div>
                                            <div className='p-5 font-medium text-gray-800'>
                                                <div className='flex gap-3'>
                                                    <div className='bg-sky-100 p-1 px-2 tracking-wide font-semibold text-sky-700 capitalize rounded'>{address.address_type}</div>
                                                    { address.is_default && <div className='bg-gray-100 p-1 px-2 tracking-wide font-semibold text-gray-700 capitalize rounded'>default</div>}
                                                </div>
                                                <div className='space-x-1 mt-3 font-semibold  '>
                                                    <span>{address.name}</span> <span>( {address.phone_number} )</span>
                                                </div>
                                                <div className=' tracking-wide mt-2'>
                                                    <span>{address.house_no && `${address.house_no}, `} {address.landmark && `${address.landmark}, `} {address.area && `${address.area}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} </span>
                                                    <span>- {address.pincode}</span> 
                                                    <div>{address.alternate_phone_number && `Alternate Phone : ${address.alternate_phone_number}`}</div>
                                                </div>
                                            </div>        
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end border-t pt-5"> 
                                    <div onClick={()=> selectedAddress ? setChangingAddress(false) : toast.warn("Select address") } className="bg-sky-500 text-white py-2 px-3 rounded-xl cursor-pointer hover:bg-sky-600">CONFIRM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className="grid grid-cols-3 gap-5">

                {/* Cart */}
                <div className="h-[calc(100vh-445px)] col-span-2 w-full flex bg-white p-5 pr-2 mt-5 rounded-lg ">
                    <div className='w-full space-y-1 pr-3 flex-1 overflow-y-auto'>
                        { cart.map((product, index)=>(
                            <div key={index} className='rounded-md border '>
                                <div className='flex'>
                                    <div className='h-36 min-w-36'>
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo?.url}`} alt={product.product_name} className="w-full h-full object-contain p-2" />
                                    </div>
                                    <div className='w-full px-3 pt-5'>
                                        <div className='text-xl font-medium text-gray-700 '>{product.product_name}</div>
                                        <div className=' font-medium text-gray-500 mt-1 '>{product.size}{product.product_UOM}</div>
                                        <div className='flex gap-2 mt-3 items-center font'>
                                            <span className='text-xl font-semibold text-green-500 flex items-center'><IoArrowDown size={28} />{discountCalculator(product)}%</span>
                                            <span className='text-lg font-semibold text-gray-500 line-through flex items-center'><FaIndianRupeeSign size={17} />{product.mrp}</span>
                                            <span className='text-xl font-semibold flex items-center text-gray-700'><FaIndianRupeeSign size={20} />{product.selling_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 ">
                    {/* Payment Mode */}
                    <div className="bg-white mt-5 p-6 rounded-xl font-medium text-xl text-gray-700 space-y-2.5">
                        <div className="text-[22px] text-sky-700 ">Payment Method</div>
                        <div className= "flex p-1 items-center rounded-xl gap-5">
                            <div onClick={()=>setSelectedPaymentMethod("UPI")} className="border p-1.5 rounded-full bg-white cursor-pointer">
                                <div className={`${ selectedPaymentMethod === 'UPI' && "bg-sky-500"} p-[7px] rounded-full`}/>
                            </div>
                            <div>UPI</div>        
                        </div>
                        <div className= "flex p-1 items-center rounded-xl gap-5">
                            <div onClick={()=>setSelectedPaymentMethod("COD")} className="border p-1.5 rounded-full bg-white cursor-pointer">
                                <div className={`${ selectedPaymentMethod === 'COD' && "bg-sky-500"} p-[7px] rounded-full`}/>
                            </div>
                            <div>Cash On Delivery</div>        
                        </div>
                    </div>
                
                    {/* Order Summary */}
                    <div className='bg-white font-medium text-gray-700 text-[18px] rounded-lg p-5 py-7 mt-5'>
                        <div className="text-[22px] text-sky-700 mb-5">Order Summary</div>
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

                    </div>
                </div>
            </div>

            <div onClick={()=>handleSubmit()} className="bg-green-500 text-white rounded-lg p-3 text-center text-2xl mt-5 font-medium tracking-wide hover:bg-emerald-500 cursor-pointer">Place order</div>

        </div>
    </div>
  )
}

export default CheckOutPage




// import { useEffect, useRef, useState } from "react";
// import {useNavigate} from 'react-router-dom'

// import { FaCheckCircle } from "react-icons/fa";
// import { FaCircleCheck } from "react-icons/fa6"

// import CheckOutAddressComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAddressComponent";
// import CheckOutProductsComponent from "../../../components/clientComponents/checkOutComponents/CheckOutProductsComponent";
// import CheckOutAmountComponent from "../../../components/clientComponents/checkOutComponents/CheckOutAmountComponent";
// import CheckOutPaymentMethodComponent from "../../../components/clientComponents/checkOutComponents/CheckOutPaymentMethodComponent";
// import axios from "axios";
// import LoadingSpinner from "../../../components/LoadingSpinner";
// import { toast } from "react-toastify";
// import { FaCheck } from "react-icons/fa6";

// const CheckOutPage = () => {

//     const navigate = useNavigate()

//     const handleRef = useRef(true)
    
//     const [checkedAccordion , setCheckedAccordion] = useState(1)

//     const [loading, setLoading] = useState(false)
//     const [error , setError] = useState(false)

//     const checkOutAddress = 1
//     const checkOutProducts = 1
//     const checkOutPaymentMethod = 1
//     const deliveryCharge = 1

//     const [cartProducts , setCartProducts] = useState([])

//     if(loading ){return <LoadingSpinner />}
//     if(error){return <div>Error Occured Kindly refresh the page</div>}

//     return (
//     <div className="flex justify-center">
//     <div className='flex mt-10 gap-10 max-w-screen-2xl w-full '>
//         <div className='rounded-md space-y-1 w-full'>

//             <div className="border p-5 w-full rounded-t-lg">
//                 <div onClick={()=>setCheckedAccordion(1)} className="flex cursor-pointer">
//                     <div className='text-xl text-gray-800 tracking-wide flex gap-1 font-medium'> Delivery Address {checkOutAddress && <FaCircleCheck size={18} className="text-sky-500"/>}</div>
//                 </div>
//                 { checkedAccordion === 1 &&
//                     <div>
//                         <CheckOutAddressComponent /> 
//                         <button onClick={()=> {!checkOutAddress ? toast.warn("Select address") : setCheckedAccordion(2)}} className="mt-2 font-medium bg-green-500 text-white p-2 rounded-xl ">Deliver Here</button>
//                     </div>
//                 }
//             </div>

//             <div className="border-2 p-4 rounded">
//                 <div onClick={()=>setCheckedAccordion(2)} className="flex font-[arial] cursor-pointer ">
//                     <span className='text-xl flex gap-1'>Order Summary<FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutProducts ? "block" : "hidden"}`}/> </span>
//                 </div>
//                 {checkedAccordion ==2 &&
//                     <div>
//                         <div className="border-b my-2"/>
//                         <CheckOutProductsComponent cartProducts = {cartProducts} /> 
//                         <div className="flex px-2 py-5 gap-5 ">
//                             <button onClick={()=>{dispatch(setCheckOutProducts(cartProducts)) ; setCheckedAccordion(3)}} className="bg-blue-500 text-white p-2 rounded-xl">Place Order</button>
//                             <button onClick={()=>navigate('/cart')} className="text-lg text-green-600 font-medium font-sans tracking-wider hover:bg-green-100/70 p-2 rounded-xl px-5 ">Edit</button>
//                         </div>
//                     </div>
//                 }
//             </div>

//             <div className="border-2 p-4 rounded">
//                 <div onClick={()=>setCheckedAccordion(3)} className="flex font-[arial] cursor-pointer">
//                     <span className='text-xl flex gap-1'>
//                         Payment Options
//                         <FaCheckCircle className={`h-4 text-blue-400 mt-1 ${checkOutPaymentMethod ? "block" : "hidden"}`}/>
//                     </span>
//                 </div>
//                 {checkedAccordion == 3 &&
//                     <div>
//                         <div className="border-b my-2" />
//                         <CheckOutPaymentMethodComponent />
//                         <button onClick={()=>{!checkOutPaymentMethod || !checkOutAddress || !checkOutProducts ? toast.warn("Select address & payment") : navigate('/checkout/verify_checkout_order')}} className="mt-2 bg-blue-500 p-2 rounded-xl text-white">Place Order</button>
//                         <button onClick={()=>console.log({checkOutAddress, checkOutPaymentMethod, checkOutProducts})}>kjn</button>
//                     </div>
//                 }
//             </div>
//         </div>
//         <div className='md:w-1/4 w-full p-5 md:h-60 rounded-md shadow-md md:block sticky top-2 '>
//             <CheckOutAmountComponent products = {cartProducts}/>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default CheckOutPage