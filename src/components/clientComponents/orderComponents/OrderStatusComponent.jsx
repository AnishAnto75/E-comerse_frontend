import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import { debounce } from 'lodash';
import { Button } from '@material-tailwind/react';
import { BiX } from 'react-icons/bi';
import { FaCheck } from "react-icons/fa6";
import { BsPerson } from 'react-icons/bs';
import LoadingComponent from '../../LoadingComponent';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { MdDoneAll } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import AdminOrderSeeAllUpdateComponent from '../../admin/AdminOrderComponents/AdminOrderSeeAllUpdateComponent';
import { useNavigate } from 'react-router-dom';

const OrderStatusComponent = ({order}) => {

    const navigate = useNavigate()
    
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [ord , setOrd] = useState(order)

    const [isAllUpdates, setAllUpdates] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)

    const placed = ord.order_status.placed
    const confirmed = ord.order_status.confirmed
    const out = ord.order_status.out
    const delivered = ord.order_status.delivered 
    const cancelled = ord.order_status.cancelled 

    // Cancel
    const [cancelModelOpen, setCancelModelOpen] = useState(false)
    const [reason_for_cancel, setReasonForCancel] = useState('')

    const cancelOrder = async() =>{
        if ( ord.current_status == "out" ){ toast.warn("Cannot cancel order after out for delivery"); return }
        if ( reason_for_cancel.trim().length < 10 ){ toast.warn("Minimum 10 character"); return }
        if ( reason_for_cancel.length > 500) { toast.warn("Cancellation reason cannot exceed 500 characters."); return }
        if ( ord.current_status == "delivered" ){ toast.warn("Order Already Delivered "); return }
        if ( ord.current_status == "cancelled" ){ toast.warn("Order Already Cancelled"); return }

        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}user/order/cancel/order_id/${order.order_id}`, {reason: reason_for_cancel} , {withCredentials: true})
            if(res){ setOrd(res.data?.data)}
            toast.success(res.data?.message)
            console.log("cancelOrder Response: ", res)
            setReasonForCancel('')
            setCancelModelOpen(false)
        } catch (error){
            toast.error(error.response?.data?.message)
            console.error("error in cancelOrder :", error)
        }finally{
            setLoading(false)
        }
    }

    const date_time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy p")}`
    }

    const getStatusColor = () => {
        if (cancelled.status ) return 'bg-red-500'
        if (delivered.status ) return 'bg-green-500'
        return 'bg-sky-500'
    }
    const getProgressWidth = () => { return cancelled.status ? "100%" : delivered.status ? "100%" : out.status? "75%" : confirmed.status? "50%" : placed.status && "25%" }

    if(loading) return <div className='h-[267px] border bg-white mt-5 rounded-xl'><LoadingComponent height={28} width={28}/></div>

    return (
        <div className='bg-white mt-5 border rounded-xl p-10 w-full '>

        <div className="flex justify-between items-center">
            {/* placed */}
            <div className={`flex flex-col items-center`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ placed.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200 " }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Placed</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(placed.date)}</div>
            </div>
            
            {/* Confirmed */}
            <div className={`flex flex-col items-center`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ confirmed.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Confirmed</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(confirmed.date)}</div>
            </div>
            
            {/* Out */}
            <div className={`flex flex-col items-center`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ out.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Out For Delivery</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(out.date)}</div>
            </div>
            
            {/* Delivered */}
            <div className={`flex flex-col items-center ${cancelled.status && "hidden"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ delivered.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Delivered</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(delivered.date)}</div>
            </div>
         
            {/* Cancelled */}
            <div className={`flex flex-col items-center ${!cancelled.status && "hidden"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ cancelled.status ? "bg-red-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Cancelled</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(cancelled.date)}</div>
            </div>
        </div>

        { cancelModelOpen &&
             <div className='fixed flex inset-0 z-50 items-center justify-center bg-black/10 backdrop-blur-sm bg-opacity-50'>              
                <div className="bg-white rounded-lg w-full max-w-screen-md p-6 z-50 text-lg relative">
                    <button onClick={() => {setCancelModelOpen(false); setReasonForCancel('')}} className="absolute bg-red-50 text-red-500 p-1 rounded-full top-6 right-6 hover:text-red-700"><BiX size={25}/></button>
                    <h2 className="text-2xl font-semibold text-gray-500 mb-4">Cancel Order</h2>
                    <div className='px-5'>
                        <p className="mb-2 text-xl ">Reason for cancel ?</p>
                        <input type="text" autoComplete='off' value={reason_for_cancel} onChange={(e)=>setReasonForCancel(e.target.value)}className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button className='bg-sky-500 p-2 px-3 rounded-xl text-white hover:bg-sky-600' onClick={()=>cancelOrder()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        }

        <div className="bg-gray-200 h-1 rounded-full my-5 flex">
            <div className={`${getStatusColor()} h-1 rounded-full`} style={{ width: getProgressWidth() }}/>
        </div>

        <div className='w-full flex items-center justify-between text-lg'>
            {  ord.current_status != 'out' && ord.current_status != 'delivered'  && ord.current_status != 'cancelled' ? 
                <button onClick={()=> {setCancelModelOpen(true); setModelOpen(false)}} className=' bg-red-500 rounded-lg px-4 py-2 text-white' >Cancel</button> : <div/>
            }
            { !isAllUpdates ? <button  onClick={()=>setAllUpdates(true)} className=' text-sky-500'>See All Updates</button> : <div/>} 
        </div>

        {isAllUpdates &&
            <div className='border-t relative mt-10'>
                <button onClick={()=>setAllUpdates(false)} className='absolute top-7 right-1 hover:bg-red-100 bg-red-50 text-red-500 rounded-full p-1'><BiX size={30}/></button>
                <div className='pt-10 text-xl text-center pb-5'>All Updates</div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {/* placed */}
                    <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${placed.status && 'border-green-400 border-2'}`}>
                        {placed.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
                        <h2 className='text-center font-semibold text-green-500'>Placed</h2>
                        <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(placed.date)}</span></p>
                    </div>
                    
                    {/* Confirmed */}
                    <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${confirmed.status && 'border-green-400 border-2'}`}>
                        {confirmed.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
                        <h2 className='text-center font-semibold text-green-500'>Confirmed</h2>
                        <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(confirmed.date)}</span></p>
                    </div>
                    
                    {/* Out */}
                    <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${out.status && 'border-green-400 border-2'}`}>
                        {out.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
                        <h2 className='text-center font-semibold text-green-500'>Out For Delivery</h2>
                        <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(out.date)}</span></p>
                    </div>
                    
                    {/* Delivered */}
                    <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${delivered.status && 'border-green-400 border-2'}`}>
                        {delivered.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
                        <h2 className='text-center font-semibold text-green-500'>Delivered</h2>
                        <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(delivered.date)}</span></p>
                        <p className='pt-1.5' >OTP Verified : <span className='text-gray-600'>{delivered.otp_verified}</span></p>
                    </div>
                    
                    {/* Cancelled */}
                    <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${cancelled.status && 'border-green-400 border-2'}`}>
                        {cancelled.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
                        <h2 className='text-center font-semibold text-green-500'>Cancelled</h2>
                        <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(cancelled.date)}</span></p>
                        <p className='pt-1.5 capitalize'>Cancelled By : {cancelled.cancelled_by} <span onClick={()=>navigate(`/admin/staff/${cancelled.cancelled_staff_id}`)} className='text-sky-500 cursor-pointer'>{cancelled.cancelled_staff_id}</span></p>
                        <p className='pt-1.5' >Reason : <span className='text-gray-600'>{cancelled.reason}</span></p>
                    </div>
            
                </div>
            </div>
        }
        </div>
    )
}

export default OrderStatusComponent
