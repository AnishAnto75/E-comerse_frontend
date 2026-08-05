import React from 'react'
import { MdDoneAll } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';

const AdminOrderSeeAllUpdateComponent = ({order_status}) => {

    const navigate = useNavigate()

    const placed = order_status.placed
    const confirmed = order_status.confirmed
    const out = order_status.out
    const delivered = order_status.delivered 
    const cancelled = order_status.cancelled 

    const date_time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy p")}`
    }

    if(!order_status){return}

  return (
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
            <p className='pt-1.5'>Confirmed by : <span onClick={()=>navigate(`/admin/staff/${confirmed.confirmation_by}`)} className='text-sky-500 cursor-pointer'>{confirmed.confirmation_by}</span></p>
        </div>
       
        {/* Out */}
        <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${out.status && 'border-green-400 border-2'}`}>
            {out.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center font-semibold text-green-500'>Out For Delivery</h2>
            <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(out.date)}</span></p>
            <p className='pt-1.5'>Delivery Staff : <span onClick={()=>navigate(`/admin/staff/${out.taken_by}`)} className='text-sky-500 cursor-pointer'>{out.taken_by}</span></p>
            <p className='pt-1.5'>Confirmation By : <span onClick={()=>navigate(`/admin/staff/${out.confirmation_by}`)} className='text-sky-500 cursor-pointer'>{out.confirmation_by}</span></p>
        </div>
       
        {/* Delivered */}
        <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${delivered.status && 'border-green-400 border-2'}`}>
            {delivered.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center font-semibold text-green-500'>Delivered</h2>
            <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(delivered.date)}</span></p>
            <p className='pt-1.5'>Delivered By : <span onClick={()=>navigate(`/admin/staff/${delivered.delivered_by}`)} className='text-sky-500 cursor-pointer'>{delivered.delivered_by}</span></p>
            <p className='pt-1.5' >OTP Verified : <span className='text-gray-600'>{delivered.otp_verified}</span></p>
        </div>
       
        {/* Cancelled */}
        <div className={` relative col-span-1 border-[3px] p-3 rounded-md text-lg bg-white ${cancelled.status && 'border-green-400 border-2'}`}>
            {cancelled.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center font-semibold text-green-500'>Cancelled</h2>
            <p className='pt-2' >Date : <span className='text-gray-600'>{date_time(cancelled.date)}</span></p>
            <p className='pt-1.5'>Delivered By : {cancelled.canceled_by} <span onClick={()=>navigate(`/admin/staff/${cancelled.cancelled_staff_id}`)} className='text-sky-500 cursor-pointer'>{cancelled.cancelled_staff_id}</span></p>
            <p className='pt-1.5' >Reason : <span className='text-gray-600'>{cancelled.reason}</span></p>
        </div>

    </div>
    )
}

export default AdminOrderSeeAllUpdateComponent