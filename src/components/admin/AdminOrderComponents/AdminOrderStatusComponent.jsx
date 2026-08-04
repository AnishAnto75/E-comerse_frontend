import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import LoadingSpinner from '../../LoadingSpinner';
import { debounce } from 'lodash';
import AdminOrderSeeAllUpdateComponent from './AdminOrderSeeAllUpdateComponent';
import { Button } from '@material-tailwind/react';
import { BiX } from 'react-icons/bi';

const AdminOrderStatusComponent = ({order}) => {

    const [order_status , setOrderStatus] = useState(order?.order_status)
    const [loading , setLoading] = useState(false)

    const [isAllUpdates, setAllUpdates] = useState(false)

    const placed = order_status.placed
    const confirmed = order_status.confirmed
    const out = order_status.out
    const delivered = order_status.delivered 
    const canceled = order_status.canceled 

// Cancel
    const [isCancelModal, setCancelModal] = useState(false);                        
    const [reason_for_cancel, setReasonForCancel] = useState('')
    const input1Ref = useRef(null)                                                  //focus in reason_for_cancel

    const cancelOrder = async() =>{
        if(reason_for_cancel.trim().length < 10){ 
            input1Ref.current.focus(); 
            toast.warn("Minimum 10 character")
            return
        }
        if ( order.current_status == "delivered" ){ toast.warn("Order Already Delivered "); return }
        if ( order.current_status == "cancelled" ){ toast.warn("Order Already Cancelled"); return }
        
        toast.success("backend not done")
        return

        // not done yet
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/cancel/${order.order_id}`, {data : {reason_for_cancel}})
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

// Confirmed
    const [isConfirmedModal, setConfirmedModal] = useState(false);

    const confirmOrder = async() =>{
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/confirmed/${order.order_id}`)
            if(res){ setOrderStatus(res.data?.data)}
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
    const outOrder = async() =>{                                                    // changing the order status to out
        if(!taken_by){
            input2Ref.current.focus(); 
            toast.info("Select the Delivery Staff")
            return
        }
        try {
            setLoading(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/order/update/out/${order.order_id}`, {data : {taken_by}})
            if(res){ setOrderStatus(res.data?.data)}
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
            if(res){ setOrderStatus(res.data?.data)}
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


    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy")}`
    }
    const time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "h:mm aa")}`
    }  

    const getStatusColor = () => {
        // if (canceled.status ) return 'bg-red-500'
        // if (!delivered.status ) return 'bg-blue-500'
        return 'bg-green-500'
    }
    const getProgressWidth = () => {
        // if (canceled.status){ return '100%' }
        // return delivered.status ? "100%" : out.status? "80%" : confirmed.status? "55%" : placed.status? "25%" : '0%'
    }

    if(loading) return <LoadingSpinner/>

    return (
        <div className='w-full'>
        <div className='relative'>
            <div className=' md:text-center px-2 md:pt-5 md:pb-8 text-gray-800 '>Order Status</div>
            { order.current_status != "delivered" && order.current_status != "cancelled" &&
                <div className='absolute top-5 right-5'> <button onClick={()=> setCancelModal(true)} className=' text-red-500 font-medium border-[3px] rounded-lg px-2 py-1 border-red-100' >Cancel</button></div>
            }

            {isCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-full max-w-screen-md p-6 relative font-medium">
                    <button onClick={() => {setCancelModal(false); setReasonForCancel('')}} className="absolute bg-red-50 text-red-500 p-1 rounded-full top-6 right-6 hover:text-red-700">
                        <BiX size={25}/>
                    </button>
                    <h2 className="text-xl font-semibold text-gray-500 mb-4">Cancel Order</h2>
                    <p className="text-gray-700 mb-1 text-lg ">Reason for cancel ?</p>
                    <input type="text" autoComplete='off' ref={input1Ref} value={reason_for_cancel} onChange={(e)=>setReasonForCancel(e.target.value)}className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button className='bg-sky-500 p-2 px-3 rounded-xl text-white hover:bg-sky-600' onClick={()=>cancelOrder()}>Cancel Order</button>
                    </div>
                </div>
            </div>
            )}
        </div>   




        // not done

        <div className="m-4 px-10">
            <div className="flex justify-between items-center mb-4">
                {/* placed */}
                <div className={`flex flex-col items-center`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ getStatusColor() }`}>
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Placed</span>
                    {placed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center">
                        <span className='pr-1 hero'>{date(placed.date)}</span><span className='hero'>{time(placed.date)}</span>
                    </span>)}
                </div>

                {/* Confirmed */}
                {/* <div className={`flex-col items-center ${!confirmed.status && canceled.status ? "hidden" : "flex"}`}> */}
                <div className={`flex-col items-center flex`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ getStatusColor() } `}>
                        {/* {confirmed.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)} */}
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Confirmed</span>
                    {/* {!confirmed.status &&  */}
                    { 
                        <span onClick={()=> setConfirmedModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 
                    }
                    {isConfirmedModal && 
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                <button onClick={() => {setConfirmedModal(false)}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                                <h2 className="text-lg font-poppins mb-4 tracking-wider">CONFIRM ORDER</h2>
                                <p className="text-gray-700 mb-1 tracking-wider">Confirm this order</p>
                                <div className="mt-6 flex justify-end">
                                    <Button color='blue' variant='gradient' size='sm' className='tracking-widest text-center' onClick={confirmOrder}>Yes</Button>
                                </div>
                            </div>
                        </div>
                    }
                    {/* {confirmed.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(confirmed.date)}</span><span className='hero'>{time(confirmed.date)}</span></span>)} */}
                </div>

                {/* Out */}
                <div className={`flex-col items-center flex `}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ getStatusColor() }`}>
                        {/* {out.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)} */}
                        {(<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Out for Delivery</span>
                    {/* {!out.status && confirmed.status && */}
                    {
                        <span onClick={()=> setOutModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span>
                    }
                    {isOutModal &&
                        <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative ">
                                <button onClick={() => {setOutModal(false); setTakenBy(''); setTakenByName(''); setTakenByid('')}} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
                                <h2 className="text-lg font-poppins mb-4 tracking-wider">OUT FOR DELIVERY</h2>
                                <p className="text-gray-800 p-1 tracking-[1px] text-sm">Delivery staff Id</p>
                                <form onSubmit={(e)=>searchDeliverBoyById(e)}>
                                    <input type="text" name='staff_id' id='staff_id' autoComplete='off' ref={input2Ref} value={taken_by_id} onChange={(e)=>setTakenByid(e.target.value)} className='border border-gray-300 text-gray-800 outline-none focus:border-blue-500 rounded-md p-2 w-full text-sm'/>
                                </form>
                                <p className="text-gray-800 p-1 mt-2 tracking-[1px] text-sm">Delivery staff name</p>
                                <div className='relative'>
                                    <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' value={taken_by_name} onChange={(e)=>handleDeliverStaffName(e)} className='border border-gray-300 text-gray-800 outline-none focus:border-blue-500 rounded-md p-2 w-full text-sm'/>
                                    <div className={`absolute w-full rounded bg-white z-50 border p-2 flex flex-col ${!searchedDeliveryStaff || !searchedDeliveryStaff.length ? "hidden" : '' } `}>
                                        {searchedDeliveryStaff?.map((staff, index)=>(
                                            <div key={index} onClick={()=>handleSuggestedDeliveryStaffNameClick(staff)} className="hover:bg-gray-100 rounded-lg text-gray-800 cursor-pointer p-1 text-sm flex justify-between">{staff.staff_username} <span/> {staff.staff_id} </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-5"> 
                                    <Button variant='text' size='sm' color='red' onClick={()=> {setOutModal(false); setTakenBy(''); setTakenByName(''); setTakenByid('')}} >Close</Button>
                                    <Button variant='gradient' size='sm' color='blue' onClick={outOrder} >Confirm</Button>
                                </div>
                            </div>
                        </div>
                    }
                    {/* {out.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(out.date)}</span><span className='hero'>{time(out.date)}</span></span>)} */}
                </div>

                {/* Delivered */}
                {/* <div className={`flex-col items-center ${canceled.status ? "hidden" : "flex"}`}> */}
                <div className={`flex-col items-center flex`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center getStatusColor() `}>
                        {/* {delivered.status && (<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)} */}
                        {(<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>)}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Delivered</span>
                    {/* { !delivered.status && out.status && confirmed.status &&  */}
                    {  
                        <div>
                            <span onClick={()=> setDeliveredModal(true)} className='text-sm cursor-pointer p-1 text-green-500 hover:text-emerald-500 font-poppins'>Update</span> 

                            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 ${!isDeliveredModal && 'hidden'} `}>
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative font-poppins">
                                    <button onClick={() => setDeliveredModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                    <h2 className="text-lg font-poppins mb-2 tracking-wider">Order Delivery</h2>
                                    <p className="text-gray-700 m-1 ">Customer Recieved the Order</p>
                                    <div className="mt-6 flex justify-end gap-5"> 
                                        <Button variant='text' size='sm' color='red' onClick={()=> setDeliveredModal(false)}>No</Button>
                                        <Button variant='gradient' size='sm' color='blue' onClick={deliveredOrder}>Yes</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* {delivered.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(delivered.date)}</span><span className='hero'>{time(delivered.date)}</span></span>)} */}
                </div>

                {/* Canceled */}
                {/* <div className={`flex-col items-center ${delivered.status ? "hidden" : !canceled.status ? "hidden" : "flex"}`}> */}
                <div className={`flex-col items-center `}>
                    {/* <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ canceled.status ? getStatusColor() : 'bg-gray-300'}`}> */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-300`}>
                    {/* {canceled.status && ( */}
                    {
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    }
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Canceled</span>
                    {/* {canceled.date && (<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(canceled.date)}</span><span className='hero'>{time(canceled.date)}</span></span>)} */}
                    {/* {(<span className="mt-1 text-xs text-gray-500 flex flex-wrap items-center"><span className='pr-1 hero'>{date(canceled.date)}</span><span className='hero'>{time(canceled.date)}</span></span>)} */}
                </div>
            </div>
        </div>
        <div className="bg-gray-200 h-1 rounded-full m-5 flex">
            <div className={`${getStatusColor()} h-1 rounded-full`} style={{ width: getProgressWidth() }}/>
        </div>
        <div className='px-5 text-sm tracking-wide pb-2 text-sky-400 flex justify-end'>
            <button hidden={isAllUpdates} onClick={()=>setAllUpdates(true)} className='relative pr-5 font-poppins hover:text-blue-500'>
                <span>See All Updates</span>
                <span className='absolute text-xl top-[-3.5px] right-[8px]'>&gt;</span>
            </button>
        </div>
        {isAllUpdates &&

        <div className='border-t p-2 mx-5 relative'>
            <button onClick={()=>setAllUpdates(false)} className='absolute top-2 right-1 hover:bg-gray-200 rounded-full p-1'><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
            <div className='text-blue-gray-800 pt-3'>All Updates</div>
            {/* <AdminOrderSeeAllUpdateComponent order_status={order_status}/> */}
        </div>
        }
        </div>
    )
}

export default AdminOrderStatusComponent