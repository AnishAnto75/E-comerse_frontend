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
    const canceled = order_status.canceled 

    const date_time = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy, h:mm aa")}`
    }

    if(!order_status){return}

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 space-y-5'>
        {/* placed */}
        <div className={` relative col-span-1 border p-2 rounded-md -space-y-1 bg-white mt-5 ${placed.status && 'border-green-500 border-2'}`}>
            {placed.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center text-base font-sans font-semibold pb-2 text-green-500 '>Placed</h2>
            <p className='pt-3' ><span className=' font-sans font-medium'>Placed on : </span><span className='font-poppins'>{date_time(placed.date)}</span></p>
        </div>

        {/* Confirmed */}
        <div className={`col-span-1 border p-2 rounded-md -space-y-1 bg-white relative ${confirmed.status && 'border-green-500 border-2'}`}>
            {confirmed.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center text-base font-sans font-semibold pb-2 text-green-500 '>Confirmed</h2>
            <p className='pt-3'><span className=' font-sans font-medium'>Confirmed on : </span><span className='font-poppins'>{date_time(confirmed.date)}</span></p>
            <p className='pt-1.5'><span className=' font-sans font-medium'>Confirmed by : </span><span onClick={()=>navigate(`/admin/staff/${confirmed.confirmation_by}`)} className='font-poppins hover:text-sky-500 cursor-pointer'>{confirmed.confirmation_by}</span></p>
        </div>

        {/* out */}
        <div className={`col-span-1 border p-2 rounded-md -space-y-1 bg-white relative ${out.status && 'border-green-500 border-2'}`}>
            {out.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center text-base font-sans font-semibold pb-2 text-green-500 '>Out For Delivery</h2>
            <p className='pt-2'><span className=' font-sans font-medium'>Out on : </span><span className='font-poppins'>{date_time(out.date)}</span></p>
            <p className='pt-1.5'><span className=' font-sans font-medium'>Taken by : </span><span onClick={()=>navigate(`/admin/staff/${out.taken_by}`)} className='font-poppins hover:text-sky-500 cursor-pointer'>{out.taken_by}</span></p>
            <p className='pt-1.5'><span className=' font-sans font-medium'>Confirmed by : </span><span onClick={()=>navigate(`/admin/staff/${out.confirmation_by}`)} className='font-poppins hover:text-sky-500 cursor-pointer'>{out.confirmation_by}</span></p>
        </div>

        {/* Delivered */}
        <div className={`col-span-1 border p-2 rounded-md -space-y-1 bg-white relative ${delivered.status && 'border-green-500 border-2'}`}>
            {delivered.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-green-500 p-1'/>) }
            <h2 className='text-center text-base font-sans font-semibold pb-2 text-green-500 '>Delivered</h2>
            <p className='pt-2'><span className=' font-sans font-medium'>Delivered on : </span><span className='font-poppins'>{date_time(delivered.date)}</span></p>
            <p className='pt-1.5'><span className=' font-sans font-medium'>Delivered by : </span><span onClick={()=>navigate(`/admin/staff/${delivered.delivered_by}`)} className='font-poppins hover:text-sky-500 cursor-pointer'>{delivered.delivered_by}</span></p>
        </div>

        {/* canceled */}
        {!delivered.status && 
            <div className={`col-span-1 border p-2 rounded-md -space-y-1 bg-white relative ${canceled.status && 'border-red-500 border-2'}`}>
            {canceled.status && (<MdDoneAll className='bg-white rounded-full absolute h-10 w-10 -top-5 text-red-500 p-1'/>) }
            <h2 className={`text-center text-base font-sans font-semibold pb-2 ${canceled.status ? 'text-red-500' : 'text-green-500'} `}>Canceled</h2>
            <p className='pt-2'><span className=' font-sans font-medium'>Canceled on : </span><span className='font-poppins'>{date_time(canceled.date)}</span></p>
            <p className='pt-1.5'><span className=' font-sans font-medium'>Canceled by : </span><span className='font-poppins'>{canceled.canceled_by}</span></p>
            {canceled.canceled_by === 'staff' && <p className='pt-1.5'><span className=' font-sans font-medium'>Canceled Staff Id : </span><span onClick={()=>navigate(`/admin/staff/${canceled.canceled_by}`)} className='font-poppins hover:text-sky-500 cursor-pointer'>{canceled.canceled_staff_id}</span></p>}
            <p className='pt-1.5'><span className=' font-sans font-medium'>Reason For Cancel : </span><span className='font-poppins '>{canceled.reason_for_cancel}</span></p>
        </div>
        }
    </div>
    )
}

export default AdminOrderSeeAllUpdateComponent