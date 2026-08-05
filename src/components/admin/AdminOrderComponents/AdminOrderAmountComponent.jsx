import React from 'react'

const AdminOrderAmountComponent = ({order}) => {

    const discount = order?.total_mrp - order?.total_price
    
  return (
    <div className=' bg-white rounded-xl w-full p-5 text-lg '>
        <div className='mb-3 text-xl text-sky-800 '>Price Details </div> 
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <span>Mrp</span>
                <span >{order?.total_mrp}</span>
            </div>
            <div className='flex justify-between'>
                <span>Price</span>
                <span>{order?.total_price}</span>
            </div>
            <div className='flex justify-between'>
                <span>Delivery Charge</span>
                <span>{order?.delivery_charges}</span>
            </div>
            <div className='flex justify-between'>
                <span>Discount</span>
                <span>{discount ? `- ${discount}` : 0}</span>
            </div>
            <div className='flex justify-between border-t-[3px] pt-2 text-xl text-gray-700 font-semibold'>
                <span>Total Amount</span>
                <span>{order?.total_amount}</span>
            </div>
        </div>
    </div>
  )
}

export default AdminOrderAmountComponent