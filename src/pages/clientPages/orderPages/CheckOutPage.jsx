import { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'

import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import useAddressStore from "../../../store/addressStore";
import ErrorComponent from "../../../components/ErrorComponent";
import AddNewAddressComponent from "../../../components/clientComponents/accountComponents/AddNewAddressComponent";
import { BiX } from "react-icons/bi";

const CheckOutPage = () => {

    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [selectedAddress, setSelectedAddress] = useState(null)

    const addresses = useAddressStore(state => state.address)

    const handleRef = useRef(true)

    useEffect(() => {
        const initialize = () => {
    
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
    
    if(loading ){return <LoadingSpinner />}
    if(error){return <ErrorComponent />}

    return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
        <div className='fle p-10 gap-10 max-w-screen-xl w-full '>

            <div className="bg-white p-6 rounded-xl font-medium text-gray-900">
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
                    <div>Add New Address</div>
                }
            </div>

            {changingAddress && 
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div onClick={()=>setChangingAddress(false)} className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"/>
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