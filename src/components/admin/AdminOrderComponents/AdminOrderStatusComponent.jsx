import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import { FaGreaterThan } from "react-icons/fa6";
import LoadingSpinner from '../../LoadingSpinner';

const AdminOrderStatusComponent = ({order}) => {

    const [order_status , setOrderStatus] = useState(order)
    const [loading , setLoading] = useState(false)

    // modal open or close
    const [isCancelModal, setCancelModal] = useState(false);
    const [isConfirmedModal, setConfirmedModal] = useState(false);
    const [isOutModal, setOutModal] = useState(false);
    const [isDeliveredModal, setDeliveredModal] = useState(false);

    // inputs for payloads 
    const [reason_for_cancel, setReasonForCancel] = useState('')
    const [taken_by, setTakenBy] = useState('')


    // focusing the inputs
    const input1Ref = useRef(null)
    const input2Ref = useRef(null)



    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy")}`
    }
    const time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "h:mm aa")}`
    }

    // functions for requests
    const ADMIN_ORDER_URL = `${import.meta.env.VITE_BACKEND_URL}admin/order`
    const cancelOrder = () =>{
        if(reason_for_cancel.length < 10){ 
            input1Ref.current.focus(); 
            toast.info("Minimum 10 character")
            return
        }
        try {
            const data = {reason_for_cancel}
            console.log({data})
            toast.warn("Not finished the function ")
        } catch (error) {
            console.log("error in cancelOrder :", error)
        }finally {
            setReasonForCancel('')
            setCancelModal(false)
        }
    }

    const confirmOrder = () =>{
        try {
            toast.warn("Confirm order function not yet finished ")
        } catch (error) {
            console.log("error in confirmOrder :", error)
        }finally {
            setConfirmedModal(false)
        }
    }

    const outOrder = () =>{
        if(!taken_by){ 
            input2Ref.current.focus(); 
            toast.info("Select the Delivery Staff")
            return
        }
        try {
            toast.warn("Out for order function not yet finished ")
        } catch (error) {
            console.log("error in outOrder :", error)
        }finally {
            setTakenBy('')
            setOutModal(false)
        }
    }

    const deliveredOrder = () =>{
        try {
            toast.warn("Delivery function not yet finished ")
        } catch (error) {
            console.log("error in deliveredOrder :", error)
        }finally {
            setDeliveredModal(false)
        }
    }

    const placed = order_status.placed
    const confirmed = order_status.confirmed
    const out = order_status.out
    const delivered = order_status.delivered 
    const canceled = order_status.canceled 
    const returnRequested = order_status.return 
    const returned = order_status.returned
    const refund = order_status.refund

    const getStatusColor = () => {
        if (canceled.status ) return 'bg-red-500'
        if (returnRequested.status) return 'bg-yellow-500'
        if (returned.status) return 'bg-purple-500' 
        return 'bg-green-500'
    };
    const getProgressWidth = () => {
        if (canceled.status || returnRequested.status || returned.status ){ return '100%' }
        return delivered.status ? "100%" : out.status? "80%" : confirmed.status? "55%" : placed.status? "25%" : '0%'
    };

    if(loading) return <LoadingSpinner/>
    return (
        <>
        <div className='relative'>
            <div className=' text-xl md:text-center px-2 md:pt-5 md:pb-8 text-gray-700 font-medium md:underline underline-offset-2'>Delivery status</div>
            <span onClick={()=> setCancelModal(true)} className='absolute top-1 right-2 text-sm cursor-pointer p-1 hover:bg-red-500 rounded hover:text-white text-red-500 '>Cancel</span>

            {/* Cancel Modal */}
            {isCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button onClick={() => {setCancelModal(false); setReasonForCancel('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
                    <p className="text-gray-700 mb-1 font-poppins ">What is the reason for cancel ?</p>
                    <input type="text" name='reason_for_cancel' id='reason_for_cancel' ref={input1Ref}
                        value={reason_for_cancel} onChange={(e)=>setReasonForCancel(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                    <div className="mt-6 flex justify-end gap-5"> 
                        <button onClick={()=> {setCancelModal(false); setReasonForCancel('')}} className="px-12 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">Close</button>
                        <button onClick={cancelOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Cancel Order</button>
                    </div>
                </div>
            </div>
            )}
        </div>   

        <div className="m-4 px-10">
            <div className="flex justify-between items-center mb-4">
                {/* placed */}
                <div className={`flex flex-col items-center`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ placed.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {placed.status && ( <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Placed</span>
                    {placed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center">
                        <span className='pr-1'>{date(placed.date)}</span><span> {time(placed.date)}</span>
                    </span>)}
                </div>

                {/* Confirmed */}
                <div className={`flex-col items-center ${!confirmed.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ confirmed.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {confirmed.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Confirmed</span>
                    {!confirmed.status && 
                        <div>
                            <span onClick={()=> setConfirmedModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 

                            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 ${!isConfirmedModal && 'hidden'} `}>
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                    <button onClick={() => {setConfirmedModal(false)}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                    <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
                                    <p className="text-gray-700 mb-1 font-poppins ">Are You Sure, You Want to Confirm This Order ?</p>
                                    <div className="mt-6 flex justify-end">
                                        <button onClick={confirmOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all ">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {confirmed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(confirmed.date)}</span><span>{time(confirmed.date)}</span></span>)}
                </div>

                {/* Out */}
                <div className={`flex-col items-center ${!out.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ out.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {out.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Out for Delivery</span>
                    {!out.status && confirmed.status && 
                        <div>
                            <span onClick={()=> setOutModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 

                            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 ${!isOutModal && 'hidden'} `}>
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                    <button onClick={() => {setOutModal(false); setTakenBy('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                    <h2 className="text-xl font-bold mb-4">Out For Delivery</h2>
                                    <p className="text-gray-700 mb-1 font-poppins ">Delivery Staff</p>
                                    <input type="text" name='reason_for_cancel' id='reason_for_cancel' ref={input2Ref}
                                        value={taken_by} onChange={(e)=>setTakenBy(e.target.value)}
                                        className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                    <div className="mt-6 flex justify-end gap-5"> 
                                        <button onClick={()=> {setOutModal(false); setTakenBy('')}} className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">Close</button>
                                        <button onClick={outOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {out.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(out.date)}</span><span>{time(out.date)}</span></span>)}
                </div>

                {/* Delivered */}
                <div className={`flex-col items-center ${canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ delivered.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {delivered.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Delivered</span>
                    { !delivered.status && out.status && confirmed.status && 
                        <div>
                            <span onClick={()=> setDeliveredModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 

                            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 ${!isDeliveredModal && 'hidden'} `}>
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                    <button onClick={() => setDeliveredModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                    <h2 className="text-xl font-bold mb-4">Confirm Delivery</h2>
                                    <p className="text-gray-700 mb-1 font-poppins ">Is the Customer Recieved the Order?</p>
                                    <div className="mt-6 flex justify-end gap-5"> 
                                        <button onClick={()=> setDeliveredModal(false)} className="px-5 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">No</button>
                                        <button onClick={deliveredOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {delivered.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(delivered.date)}</span><span>{time(delivered.date)}</span></span>)}
                </div>

                {/* Canceled */}
                <div className={`flex-col items-center ${delivered.status ? "hidden" : !canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ canceled.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {canceled.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Canceled</span>
                    {canceled.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(canceled.date)}</span><span>{time(canceled.date)}</span></span>)}
                </div>
                {/* Return Requested */}
                <div className={`flex-col items-center ${!returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ returnRequested.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {returnRequested.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Return Requested</span>
                    {returnRequested.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(returnRequested.date)}</span><span>{time(returnRequested.date)}</span></span>)}
                </div>
                {/* Returned */}
                <div className={`flex-col items-center ${!returned.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ returned.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {returned.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Returned</span>
                    {returned.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(returned.date)}</span><span>{time(returned.date)}</span></span>)}
                </div>
                {/* Refund */}
                <div className={`flex-col items-center ${!refund.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ refund.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {refund.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Refund</span>
                    {refund.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1'>{date(refund.date)}</span><span>{time(refund.date)}</span></span>)}
                </div>
            </div>
        </div>
        <div className="bg-gray-200 h-1 rounded-full m-5 flex">
            <div className={`${getStatusColor()} h-1 rounded-full`} style={{ width: getProgressWidth() }}/>
        </div>
        <div className='px-5 text-sm tracking-wide pb-2 text-sky-400 flex justify-end'>
            <button className='relative pr-5 font-poppins'>
                <span>See All Updates</span>
                <span className='absolute text-xl top-[-3.5px] right-[8px]'>&gt;</span>
            </button>
        </div>
        </>
    )
}

export default AdminOrderStatusComponent