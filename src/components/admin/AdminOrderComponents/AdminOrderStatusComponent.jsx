import axios from 'axios'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import {toast} from 'react-toastify'
import LoadingSpinner from '../../LoadingSpinner';
import { debounce } from 'lodash';
import AdminOrderSeeAllUpdateComponent from './AdminOrderSeeAllUpdateComponent';
import { Button } from '@material-tailwind/react';
import { BiX } from 'react-icons/bi';
import { FaCheck } from "react-icons/fa6";
import { BsPerson } from 'react-icons/bs';

const AdminOrderStatusComponent = ({order}) => {

    const [order_status , setOrderStatus] = useState(order?.order_status)
    
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [isAllUpdates, setAllUpdates] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)

    const placed = order_status.placed
    const confirmed = order.order_status.confirmed
    const out = order.order_status.out
    const delivered = order.order_status.delivered 
    const cancelled = order.order_status.cancelled 

    // Cancel
    const [cancelModelOpen, setCancelModelOpen] = useState(false)
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
        
        toast.warn("backend not done")
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
    // confirmed
    const confirmOrder = async() =>{

        if(order.current_status != "placed") return


        toast.warn("backend not done")
        return

        // not done yet

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


    const date_time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy p")}`
    }

    const getStatusColor = () => {
        if (cancelled.status ) return 'bg-red-500'
        if (delivered.status ) return 'bg-green-500'
        return 'bg-sky-500'
    }
    const getProgressWidth = () => {
        if (order.current_status == "cancelled"){ return '100%' }
        return delivered.status ? "100%" : out.status? "75%" : confirmed.status? "50%" : placed.status? "25%" : '0%'
    }

    if(loading) return <LoadingSpinner/>

    return (
        <div className='bg-white mt-5 rounded-xl p-10 w-full '>

        <div className="flex justify-between items-center">
            {/* placed */}
            <div className={`flex flex-col items-center`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ placed.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
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
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ cancelled.status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-200" }`}><FaCheck size={30} /></div>
                <div className="mt-2 text-lg">Cancelled</div>
                <div className="mt-1 text-gray-500 flex flex-wrap items-center">{date_time(cancelled.date)}</div>
            </div>
        </div>

        { cancelModelOpen &&
             <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>              
                <div className="bg-white rounded-lg w-full max-w-screen-md p-6 z-50 text-lg relative">
                    <button onClick={() => {setCancelModelOpen(false); setReasonForCancel('')}} className="absolute bg-red-50 text-red-500 p-1 rounded-full top-6 right-6 hover:text-red-700"><BiX size={25}/></button>
                    <h2 className="text-2xl font-semibold text-gray-500 mb-4">Cancel Order</h2>
                    <div className='px-5'>
                        <p className="mb-2 text-xl ">Reason for cancel ?</p>
                        <input type="text" autoComplete='off' ref={input1Ref} value={reason_for_cancel} onChange={(e)=>setReasonForCancel(e.target.value)}className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button className='bg-sky-500 p-2 px-3 rounded-xl text-white hover:bg-sky-600' onClick={()=>cancelOrder()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        }

        { modelOpen &&
            <div className='fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50'>              
                <div className="bg-white rounded-lg w-full max-w-screen-md p-6 z-50 text-lg relative">
                    <button onClick={() => setModelOpen(false)} className="absolute bg-red-50 text-red-500 p-1 rounded-full top-4 right-4 hover:text-red-700"><BiX size={30}/></button>
                    <div className='text-center text-2xl font-bold text-gray-600'>Update Status</div>
                    { order.current_status === "delivered" || order.current_status === "cancelled" ?

                        <div className='min-h-80 flex items-center justify-center text-xl font-semibold text-gray-500'>Order is {order.current_status} on {date_time(order.order_status[order.current_status].date)}</div>

                    : order.current_status != "out" ?

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Delivery</h2>
                            <div className='px-10'>
                                <div className="mb-2 ">Verify OTP</div>
                                <input type="text" autoComplete='off' ref={input2Ref} value={taken_by_id} onChange={(e)=>setTakenByid(e.target.value)} className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                                <div className="mt-6 flex justify-end gap-5"> 
                                    <button className='bg-sky-500 px-4 py-2 text-white rounded-xl tracking-wide hover:bg-sky-600' onClick={deliveredOrder}>Confirm</button>
                                </div>
                            </div>
                        </div>

                    : order.current_status === "confirmed" ?

                        <div className='mt-6'>
                            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Out For Delivery</h2>
                            <div className='flex gap-5'>
                                <div className='w-full'>
                                    <p className='mb-2'>Delivery staff Id</p>
                                    <form onSubmit={(e)=>searchDeliverBoyById(e)}>
                                        <input type="text" autoComplete='off' ref={input2Ref} value={taken_by_id} onChange={(e)=>setTakenByid(e.target.value)} className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                                    </form>
                                </div>
                                <div className='w-full'>
                                    <p className="mb-2">Delivery staff name</p>
                                    <div className='relative'>
                                        <input type="text" name='reason_for_cancel' id='reason_for_cancel' autoComplete='off' value={taken_by_name} onChange={(e)=>handleDeliverStaffName(e)} className='border text-gray-800 outline-none rounded-md p-2 w-full'/>
                                        <div className={`absolute w-full rounded bg-white z-50 border p-2 flex flex-col ${!searchedDeliveryStaff || !searchedDeliveryStaff.length ? "hidden" : '' } `}>
                                            {searchedDeliveryStaff?.map((staff, index)=>(
                                                <div key={index} onClick={()=>handleSuggestedDeliveryStaffNameClick(staff)} className="hover:bg-gray-100 rounded-lg text-gray-800 cursor-pointer p-1 text-sm flex justify-between">{staff.staff_username} <span/> {staff.staff_id} </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 h-40 flex items-center justify-center'>
                                {taken_by ?
                                    <div className='flex gap-5'>
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${ taken_by?.photo?.url || "/uploads/products/62dfbb8f-6c5b-4f74-94bb-dd6d4e12f6df.jpeg"}`} alt={""} className=' object-contain h-36 w-36 p-1 border rounded-xl'/>
                                        <table>
                                            <tbody>
                                                <tr><td className='p-1'>Name</td><td className='p-1 pl-2'>: &nbsp; {taken_by?.name}</td></tr>
                                                <tr><td className='p-1'>Role</td><td className='p-1 pl-2'>: &nbsp; {taken_by?.role}</td></tr>
                                                <tr><td className='p-1'>Gender</td><td className='p-1 pl-2'>: &nbsp; {taken_by?.gender}</td></tr>
                                                <tr><td className='p-1'>Phone</td><td className='p-1 pl-2'>: &nbsp; {taken_by?.phone_number}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    : 
                                    <div className='border-4 border-dashed text-gray-200 flex items-center justify-center h-36 w-36 rounded-xl'><BsPerson size={100} /></div>
                                }
                            </div>
                            <div className="mt-5 pt-5 text-end border-t-[3px] border-gray-100"> 
                                <button onClick={()=>outOrder()} className='bg-sky-500 py-2 px-3 rounded-xl text-white hover:bg-sky-600' >Confirm</button>
                            </div>
                        </div>

                    : order.current_status === "placed" &&

                        <div className='mt-10'>
                            <h2 className="text-xl tracking-wider text-gray-500 font-bold text-center">CONFIRM ORDER</h2>
                            <div className="my-6 flex justify-center">
                                <button onClick={()=>confirmOrder()} className='tracking-wide text-lg uppercase bg-sky-500 p-1.5 px-3 rounded-xl text-white hover:bg-sky-600'>Confirm</button>
                            </div>
                        </div>

                    }

                </div>
            </div>
        }

        {isDeliveredModal &&
            <div className={`fixed flex inset-0 z-50 items-center justify-center bg-black bg-opacity-50 `}>
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
        }

        <div className="bg-gray-200 h-1 rounded-full my-5 flex">
            <div className={`${getStatusColor()} h-1 rounded-full`} style={{ width: getProgressWidth() }}/>
        </div>

        <div className='w-full flex items-center justify-between text-lg'>
            { order.current_status != 'delivered'  && order.current_status != 'cancelled' ? 
                <button onClick={()=> {setCancelModelOpen(true); setModelOpen(false)}} className=' bg-red-500 rounded-lg px-4 py-2 text-white' >Cancel</button> : <div/>
            }
            { order.current_status != 'delivered'  && order.current_status != 'cancelled' ? 
                <button onClick={()=>{setModelOpen(true); setCancelModelOpen(false)}} className='bg-sky-500 text-white p-2 px-4 rounded-xl'>Update Status</button> : <div/>
            }
            {!isAllUpdates ? <button  onClick={()=>setAllUpdates(true)} className=' text-sky-500'>See All Updates</button> : <div/>} 
        </div>

        {isAllUpdates &&
        <div className='border-t relative mt-10'>
            <button onClick={()=>setAllUpdates(false)} className='absolute top-7 right-1 hover:bg-red-100 bg-red-50 text-red-500 rounded-full p-1'><BiX size={30}/></button>
            <div className='pt-10 text-xl text-center pb-5'>All Updates</div>
            <AdminOrderSeeAllUpdateComponent order_status={order_status}/>
        </div>
        }
        </div>
    )
}

export default AdminOrderStatusComponent