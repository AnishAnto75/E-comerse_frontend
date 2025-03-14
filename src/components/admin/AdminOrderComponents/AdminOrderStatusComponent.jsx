import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import LoadingSpinner from '../../LoadingSpinner';
import { debounce } from 'lodash';

const AdminOrderStatusComponent = ({order}) => {

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
    const [reason_for_cancel, setReasonForCancel] = useState('')                    // request payload
    const input1Ref = useRef(null)                                                  //focus in reason_for_cancel

    const cancelOrder = async() =>{
        if(reason_for_cancel.length < 10){ 
            input1Ref.current.focus(); 
            toast.info("Minimum 10 character")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/cancel/${order.order_id}`, {data : {reason_for_cancel}})
            if(res){ setOrderStatus(res.data?.data?.order_status)}
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

// Confirmed
    const [isConfirmedModal, setConfirmedModal] = useState(false);

    const confirmOrder = async() =>{
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/confirmed/${order.order_id}`)
            if(res){ setOrderStatus(res.data?.data?.order_status)}
            toast.success(res.data?.message)
            console.log("confirmOrder Response: ", res)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in confirmOrder :", error)
        }finally {
            setLoading(false)
            setConfirmedModal(false)
        }
    }


// Out
    const [isOutModal, setOutModal] = useState(false);     
    const [taken_by, setTakenBy] = useState('')                                     // request payload

    const [searchedDeliveryStaff, setSearchedDeliveryStaff] = useState(null)        // searched delivery staff details by name
    const [taken_by_id, setTakenByid] = useState('')                                // value of delivery staff id 
    const [taken_by_name, setTakenByName] = useState('')                            // value of delivery staff Name 
    const input2Ref = useRef(null)                                                  // focus in taken_by_id

    const searchDeliverBoyByName = debounce(async (term) => {                       // searching deliveryStaff details by name
        if(!term.length){ return }
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/get_staff/out/${term}`)
            setSearchedDeliveryStaff(res.data.data) 
            console.log({searchedDeliveryStaffs : res.data.data})
        } catch (error) {
            console.error("error in searchDeliverBoyByName :" , error)
        }
    },500)
    const handleDeliverStaffName = (e) => {
        const term = e.target.value;
        setTakenByName(term)
        if(term.length){searchDeliverBoyByName(term)}
        else{setSearchedDeliveryStaff(null)}
    }
    const handleSuggestedDeliveryStaffNameClick = (staff)=>{
        console.log({staff})
        setTakenByid(staff.staff_id)
        setTakenByName(staff.staff_username)
        setTakenBy(staff.staff_id)
        setSearchedDeliveryStaff(null)
    }
    const searchDeliverBoyById = async(e)=>{                                       // searched delivery staff details by name 
        e.preventDefault()
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/get_staff/out/id/${taken_by_id}`)
            if(res.data.data){
                const staff = res.data.data
                setTakenByName(staff.staff_username)
                setTakenBy(staff.staff_id)
            }
            console.log({DeliveryStaff_id : res.data})
        } catch (error) {
            console.error("error in handleDeliveryStaffId :" , error)
        }
    }
    const outOrder = async() =>{                                                    // changing the order status to out
        if(!taken_by){
            input2Ref.current.focus(); 
            toast.info("Select the Delivery Staff")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/out/${order.order_id}`, {data : {taken_by}})
            if(res){ setOrderStatus(res.data?.data?.order_status)}
            toast.success(res.data?.message)
            console.log("outOrder Response: ", res)        
            setOutModal(false)
            setTakenBy('')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in outOrder :", error)
        }finally {
            setLoading(false)
        }
    }


// Delivered
    const [isDeliveredModal, setDeliveredModal] = useState(false);

    const deliveredOrder = async() =>{
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/delivered/${order.order_id}`)
            if(res){ setOrderStatus(res.data?.data?.order_status)}
            toast.success(res.data?.message)
            console.log("deliveredOrder Response: ", res.data)        
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in deliveredOrder :", error)
        }finally {
            setDeliveredModal(false)
            setLoading(false)
        }
    }


// Reject Return Request

    const [isRejectRequestModal, setRejectRequestModal] = useState(false);
    const [reason_to_reject_return_req, setReasonToRejectReturnReq] = useState('');
    const input5Ref = useRef(null)

    const rejectReturnRequest = async()=>{
        if(reason_to_reject_return_req.length < 10){
            input5Ref.current.focus(); 
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/reject_return_request/${order.order_id}`, {data: {reason_for_rejection: reason_to_reject_return_req }})
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("rejectReturnRequest Response: ", res.data)        
            setRejectRequestModal(false)
            setReasonToRejectReturnReq('')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in rejectReturnRequest :", error)
        }finally {
            setLoading(false)
        }
    }

// Returned
    const [isReturnedModal, setReturnedModal] = useState(false);
    
    const returnedOrder = async() =>{
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/returned/${order.order_id}`)
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("returnedOrder Response: ", res.data)        
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in returnedOrder :", error)
        }finally {
            setReturnedModal(false)
            setLoading(false)
        }
    }
    
    // Reject Return
    const [reject_return, setRejectReturn] = useState(false);
    const [reason_for_rejection, setReasonForRejection] = useState('');
    const input3Ref = useRef(null)

    const rejectReturnedOrder = async() =>{
        if(reason_for_rejection.length < 10){
            input3Ref.current.focus(); 
            toast.info("Describe the reason for not reciving the order")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/reject_returned/${order.order_id}`, {data: {reason_for_rejection}})
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("rejectReturnedOrder Response: ", res.data)        
            setReasonForRejection('')
            setReturnedModal(false)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in rejectReturnedOrder :", error)
        }finally {
            setLoading(false)
        }
    }

// Refund

    const [isRefundModal, setRefundModal] = useState(false)
    const [refund_amount, setRefundAmount] = useState('')
    const input4Ref = useRef(null)

    const refundOrder = async() =>{
        if(!refund_amount){
            input3Ref.current.focus(); 
            toast.info("Enter the amount")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/refund/${order.order_id}`, {data: {refund_amount}})
            if(res){ setOrderStatus(res.data?.data)}
            toast.success(res.data?.message)
            console.log("refundOrder Response: ", res.data)        
            setRefundModal(false)
            setRefundAmount('')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in refundOrder :", error)
        }finally {
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
    }
    const getProgressWidth = () => {
        if (canceled.status || returnRequested.status || returned.status ){ return '100%' }
        return delivered.status ? "100%" : out.status? "80%" : confirmed.status? "55%" : placed.status? "25%" : '0%'
    }

    if(loading) return <LoadingSpinner/>
    return (
        <>
        <div className='relative'>
            <div className=' text-xl md:text-center px-2 md:pt-5 md:pb-8 text-gray-700'>Delivery status</div>
            { !delivered.status && !canceled.status && <span onClick={()=> setCancelModal(true)} className='absolute top-1 right-2 text-sm cursor-pointer p-1 hover:bg-red-500 rounded hover:text-white text-red-500 '>Cancel</span>}

            {/* Cancel Modal */}
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
                        <span className='pr-1 hero'>{date(placed.date)}</span><span className='hero'>{time(placed.date)}</span>
                    </span>)}
                </div>

                {/* Confirmed */}
                <div className={`flex-col items-center ${!confirmed.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ confirmed.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {confirmed.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Confirmed</span>
                    {!confirmed.status && 
                        <span onClick={()=> setConfirmedModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 
                    }
                    {isConfirmedModal && 
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>
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
                    }
                    {confirmed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(confirmed.date)}</span><span className='hero'>{time(confirmed.date)}</span></span>)}
                </div>

                {/* Out */}
                <div className={`flex-col items-center ${!out.status && canceled.status ? "hidden" : returnRequested.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ out.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {out.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Out for Delivery</span>
                    {!out.status && confirmed.status &&
                        <span onClick={()=> setOutModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span>
                    }
                    {isOutModal &&
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative ">
                                <button onClick={() => {setOutModal(false); setTakenBy(''); setTakenByName(''); setTakenByid('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
                                <h2 className="text-xl font-bold mb-4 ">Out For Delivery</h2>
                                <p className="text-gray-700 mb-1 font-poppins ">Delivery Staff Id</p>
                                <form onSubmit={(e)=>searchDeliverBoyById(e)}>
                                    <input type="text" name='staff_id' id='staff_id' autoComplete='off' ref={input2Ref} value={taken_by_id} onChange={(e)=>setTakenByid(e.target.value)} className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                </form>
                                <p className="text-gray-700 mb-1 font-poppins ">Delivery Staff Name</p>
                                <div className='relative'>
                                    <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' value={taken_by_name} onChange={(e)=>handleDeliverStaffName(e)} className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                    <div className={`absolute w-full bg-white border p-2 flex flex-col ${!searchedDeliveryStaff || !searchedDeliveryStaff.length ? "hidden" : '' } `}>
                                        {searchedDeliveryStaff?.map((staff, index)=>(
                                            <div key={index} onClick={()=>handleSuggestedDeliveryStaffNameClick(staff)} className="hover:bg-gray-100 cursor-pointer p-1 font-poppins flex justify-between">{staff.staff_username} <span/> {staff.staff_id} </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-5"> 
                                    <button onClick={()=> {setOutModal(false); setTakenBy(''); setTakenByName(''); setTakenByid('')}} className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">Close</button>
                                    <button onClick={outOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Confirm</button>
                                </div>
                            </div>
                        </div>
                    }
                    {out.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(out.date)}</span><span className='hero'>{time(out.date)}</span></span>)}
                </div>

                {/* Delivered */}
                <div className={`flex-col items-center ${canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ delivered.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {delivered.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Delivered</span>
                    { !delivered.status && out.status && confirmed.status && 
                        <div>
                            <span onClick={()=> setDeliveredModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 

                            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 ${!isDeliveredModal && 'hidden'} `}>
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative font-poppins">
                                    <button onClick={() => setDeliveredModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                    <h2 className="text-xl font-bold mb-4">Confirm Delivery</h2>
                                    <p className="text-gray-700 mb-1 ">Is the Customer Recieved the Order?</p>
                                    <div className="mt-6 flex justify-end gap-5"> 
                                        <button onClick={()=> setDeliveredModal(false)} className="px-5 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">No</button>
                                        <button onClick={deliveredOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {delivered.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(delivered.date)}</span><span className='hero'>{time(delivered.date)}</span></span>)}
                </div>

                {/* Canceled */}
                <div className={`flex-col items-center ${delivered.status ? "hidden" : !canceled.status ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ canceled.status ? getStatusColor() : 'bg-gray-300'}`}>
                    {canceled.status && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
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
                    {returnRequested.status && !returnRequested.rejected && !returned.status && !returned.rejected && (<span onClick={()=>setRejectRequestModal(true)} className='text-sm cursor-pointer p-1 text-red-500 hover:text-red-500 font-poppins'>Reject</span>)}
                    {isRejectRequestModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                <button onClick={() => {setRejectRequestModal(false); setReasonToRejectReturnReq('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                                <h2 className="text-xl font-bold mb-4">Reject Return Request</h2>
                                <p className="text-gray-700 mb-1 font-poppins ">What is the reason to reject return request ?</p>
                                <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' ref={input5Ref}
                                    value={reason_to_reject_return_req} onChange={(e)=>setReasonToRejectReturnReq(e.target.value)}
                                    className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                <div className="mt-6 flex justify-end gap-5"> 
                                    <button onClick={()=> {setRejectRequestModal(false); setReasonToRejectReturnReq('')}} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">Close</button>
                                    <button onClick={rejectReturnRequest} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Reject</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Returned */}
                <div className={`flex-col items-center ${ !delivered.status ? 'hidden' : canceled.status ? "hidden" : !returnRequested.status ? 'hidden' : returnRequested.rejected ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ returned.status ? getStatusColor() : returned.rejected? "bg-red-500" : 'bg-gray-300'}`}>
                        {returned.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                        {returned.rejected && (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Returned</span>
                    <span onClick={()=> setReturnedModal(true)} className={`text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins ${returned.status ? "hidden" : returned.rejected ? "hidden" : ''}`}>Update</span> 
                    {returned.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(returned.date)}</span><span className='hero'>{time(returned.date)}</span></span>)}
                    {isReturnedModal &&
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative font-poppins">
                                <button onClick={() => {setReturnedModal(false); setRejectReturn(false)}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                                {!reject_return &&
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Order Picked Up</h2>
                                        <p className="text-gray-700 mb-1">Is the order picked from the customer?</p>
                                        <div className="mt-6 flex justify-end gap-5">
                                            <button onClick={()=>setRejectReturn(true)} className="px-5 py-2 text-red-500 hover:text-white rounded-lg hover:bg-red-600">Reject</button>
                                            <button onClick={returnedOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Confirm</button>
                                        </div>
                                    </div>
                                }
                                {reject_return &&
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Reject Order return</h2>
                                        <p className="text-gray-700 mb-1">What's the reason to reject the returning order?</p>
                                        <input type="text" name='reason_for_rejection' id='reason_for_rejection' autoComplete='off' ref={input3Ref}
                                            value={reason_for_rejection} onChange={(e)=>setReasonForRejection(e.target.value)}
                                            className='border border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                        <div className="mt-6 flex justify-end gap-5">
                                            <button onClick={()=>setRejectReturn(false)} className="px-4 py-2 text-red-500 rounded-lg hover:bg-gray-800 hover:text-white">Cancel</button>
                                            <button onClick={rejectReturnedOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>

                {/* Refund */}
                <div className={`flex-col items-center ${!returned.status ? "hidden" : returned.rejected ? "hidden" : "flex"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ refund.status ? getStatusColor() : 'bg-gray-300'}`}>
                        {refund.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Refund</span>
                    {!refund.status && returned.status && <div className='flex flex-col text-xs hero text-gray-500'><span>Money will</span><span>be refund within</span><span>2 or 3 working days</span></div>}
                    {refund.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(refund.date)}</span><span className='hero'>{time(refund.date)}</span></span>)}
                    <span onClick={()=> setRefundModal(true)} className={`text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins ${refund.status ? "hidden" : ''}`}>Update</span> 
                    {isRefundModal && 
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 '>
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                <button onClick={() => {setRefundModal(false); setRefundAmount('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                                <h2 className="text-xl font-bold mb-4">Refund Confirmation</h2>
                                <p className="text-gray-700 mb-1 font-poppins ">How much Amount wants to be refund</p>
                                <div className='grid grid-cols-6 gap-1'>
                                    <input type="number" name='refund_amount' id='refund_amount' autoComplete='off' ref={input4Ref}
                                        value={refund_amount} onChange={(e)=>setRefundAmount(e.target.value)}
                                        className='border col-span-5 border-gray-300 rounded-md p-2 px-5 w-full text-[15px]'/>
                                    <button onClick={()=>setRefundAmount(order.total_amount)} className='border text-sm hover:bg-gray-600 hover:text-white rounded-lg'>Full</button>
                                </div>
                                <div className="mt-6 flex justify-end gap-5"> 
                                    <button onClick={()=> {setRefundModal(false); setRefundAmount('')}} className="px-12 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">Close</button>
                                    <button onClick={refundOrder} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Cancel Order</button>
                                </div>
                            </div>
                        </div>
                    }
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