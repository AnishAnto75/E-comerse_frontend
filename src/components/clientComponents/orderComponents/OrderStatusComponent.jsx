import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import LoadingSpinner from '../../LoadingSpinner';
import { debounce } from 'lodash';

const OrderStatusComponent = ({order}) => {

    const [order_status , setOrderStatus] = useState(order?.order_status)
    const [loading , setLoading] = useState(false)

    const placed = order_status.placed
    const confirmed = order_status.confirmed
    const out = order_status.out
    const delivered = order_status.delivered 
    const canceled = order_status.canceled 
    const returnRequested = order_status.return_requested
    const returned = order_status.returned
    const refund = order_status.refund

// Cancel
    const [isCancelModal, setCancelModal] = useState(false);                        
    const [reason_for_cancel, setReasonForCancel] = useState('')
    const input1Ref = useRef(null)

    const cancelOrder = async() =>{
        if(reason_for_cancel.length < 10){ 
            input1Ref.current.focus(); 
            toast.info("Minimum 10 character")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}order/cancel/${order.order_id}`, {data : {reason_for_cancel}})
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("cancelOrder Response: ", res)
            setReasonForCancel('')
            setCancelModal(false)
        } catch (error){
            toast.error(error.response?.data?.message)
            console.error("error in cancelOrder :", error)
        }finally{
            setLoading(false)
        }
    }


//  Return
    const [isReturnModal, setReturnModal] = useState(false)
    const [reason_for_return, setReasonForReturn] = useState('')
    const input2Ref = useRef(null)

    const returnOrder = async() =>{
        if(reason_for_return.length < 10){ 
            input2Ref.current.focus(); 
            toast.info("Minimum 10 character")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}order/return/${order.order_id}`, {data : {reason_for_return}})
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("returnOrder Response: ", reason_for_return)
            setReasonForReturn('')
            setReturnModal(false)
        } catch (error){
            toast.error(error.response?.data?.message)
            console.error("error in returnOrder :", error)
        }finally{
            setLoading(false)
        }
    }


    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy")}`
    }
    const time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "h:mm aa")}`
    }  

    const getStatusColor = () => {
        if (canceled.status ) return 'bg-red-500'
        if (refund.status) return 'bg-blue-500'
        if (returned.rejected) return 'bg-red-500'
        if (returned.status) return 'bg-blue-500' 
        if (returnRequested.rejected) return 'bg-red-500'
        if (returnRequested.status) return 'bg-blue-500'
        return 'bg-green-500'
    };
    const getProgressWidth = () => {
        if (canceled.status || returnRequested.status || returned.status ){ return '100%' }
        return delivered.status ? "100%" : out.status? "80%" : confirmed.status? "55%" : placed.status? "25%" : '0%'
    };

    if(loading) return <LoadingSpinner/>
    return (
        <>
        <div className='relatie'>
            <div className=' text-xl md:text-center px-2 md:pt-5 md:pb-8 text-gray-700 font-medium md:underline underline-offset-2'>Delivery status</div>

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
                        <span className='pr-1 hero'>{date(placed.date)}</span><span className='hero'>{time(placed.date)}</span>
                    </span>)}
                </div>

                {/* Confirmed */}
                <div className={`flex-col items-center ${!confirmed.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ confirmed.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {confirmed.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Confirmed</span>
                    {confirmed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(confirmed.date)}</span><span className='hero'>{time(confirmed.date)}</span></span>)}
                </div>

                {/* Out */}
                <div className={`flex-col items-center ${!out.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ out.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {out.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Out for Delivery</span>
                    {out.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(out.date)}</span><span className='hero'>{time(out.date)}</span></span>)}
                </div>

                {/* Delivered */}
                <div className={`flex-col items-center ${canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ delivered.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {delivered.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Delivered</span>
                    {delivered.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(delivered.date)}</span><span className='hero'>{time(delivered.date)}</span></span>)}
                </div>

                {/* Canceled */}
                <div className={`flex-col items-center ${delivered.status ? "hidden" : !canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ canceled.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {canceled.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Canceled</span>
                    {canceled.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(canceled.date)}</span><span className='hero'>{time(canceled.date)}</span></span>)}
                </div>

                {/* Return Requested */}
                <div className={`flex-col items-center ${!returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ returnRequested.rejected? 'bg-red-500' : returnRequested.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {returnRequested.status && !returnRequested.rejected && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                        {returnRequested.rejected && (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Return Requested</span>
                    {returnRequested.date && !returnRequested.rejected && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(returnRequested.date)}</span><span className='hero'>{time(returnRequested.date)}</span></span>)}
                    {returnRequested.rejected && returnRequested.rejected_date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(returnRequested.rejected_date)}</span><span className='hero'>{time(returnRequested.rejected_date)}</span></span>)}
                </div>

                {/* Returned */}
                <div className={`flex-col items-center ${ !delivered.status ? 'hidden' : canceled.status ? "hidden" : !returnRequested.status ? 'hidden' : returnRequested.rejected ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ returned.status ? getStatusColor() : returned.rejected? "bg-red-500" : 'bg-gray-300'}`}>
                        {returned.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                        {returned.rejected && (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Returned</span>
                    {returned.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(returned.date)}</span><span className='hero'>{time(returned.date)}</span></span>)}
                </div>

                {/* Refund */}
                <div className={`flex-col items-center ${!returned.status ? "hidden" : returned.rejected ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ refund.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {refund.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Refund</span>
                    {!refund.status && returned.status && <div className='flex flex-col text-xs hero text-gray-500'><span>Money will</span><span>be refund within</span><span>2 or 3 working days</span></div>}
                    {refund.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(refund.date)}</span><span className='hero'>{time(refund.date)}</span></span>)}
                </div>
            </div>
        </div>
        <div className="bg-gray-200 h-1 rounded-full m-5 flex">
            <div className={`${getStatusColor()} h-1 rounded-full`} style={{ width: getProgressWidth() }}/>
        </div> 

     
        <div className='px-5 text-sm font-poppins pb-2 flex justify-between'>
            {/* Cancel Modal */}
            <button className='pr-5 text-sky-400'>See All Updates</button>
            {!canceled.status && !delivered.status && (<button onClick={()=>setCancelModal(true)} className='text-red-500 hover:bg-red-500 hover:text-white rounded p-1'>Cancel</button>)}
            {isCancelModal && !delivered.status && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button onClick={() => {setCancelModal(false); setReasonForCancel('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
                    <p className="text-gray-700 mb-1 font-poppins ">What is the reason for cancel ?</p>
                    <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' ref={input1Ref}
                        value={reason_for_cancel} onChange={(e)=>setReasonForCancel(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                    <div className="mt-6 flex justify-end gap-5"> 
                        <button onClick={()=> {setCancelModal(false); setReasonForCancel('')}} className="px-6 py-2 rounded-lg hover:text-red-600 transition-all">Close</button>
                        <button onClick={cancelOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Cancel</button>
                    </div>
                </div>
            </div>
            )}

            {/* Return */}

            {!returnRequested.status && delivered.status && (
                <button onClick={()=>setReturnModal(true)} className='text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white rounded p-1'>Return</button>
            )}
            {isReturnModal && delivered.status && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button onClick={() => {setReturnModal(false); setReasonForReturn('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">Return Order</h2>
                        <p className="text-gray-700 mb-1 font-poppins ">What is the reason for Return ?</p>
                        <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' ref={input2Ref}
                            value={reason_for_return} onChange={(e)=>setReasonForReturn(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                        <div className="mt-6 flex justify-end gap-5"> 
                            <button onClick={()=> {setReturnModal(false); setReasonForReturn('')}} className="px-6 py-2 rounded-lg hover:text-red-600 transition-all">Close</button>
                            <button onClick={returnOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default OrderStatusComponent