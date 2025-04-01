import React from 'react'

const AdminOrderAmountComponent = ({order}) => {

    const discount = order?.total_mrp - order?.total_price
    
  return (
    <div className=' bg-gray-50 text-gray-700 w-full min-w-64 text-sm p-3'>
        <div className='text-base text-gray-600 font-sans font-medium mb-3 '>Price Details </div> 
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <span>Mrp ({order.total_no_of_product})</span>
                <span>{order?.total_mrp}</span>
            </div>
            <div className='flex justify-between'>
                <span>Price ({order.total_no_of_product})</span>
                <span>{order?.total_price}</span>
            </div>
            <div className='flex justify-between'>
                <span>Delivery Charge</span>
                <span>{order?.delivery_charges}</span>
            </div>
            <div className='flex justify-between'>
                <span>Discount</span>
                <span>{discount ? `-  ${discount}` : discount === 0 ? 0 : ''}</span>
            </div>
            <div className='flex justify-between text-gray-700 font-sans border-t border-gray-400 pt-2 font-medium'>
                <span>Total Amount</span>
                <span>{order?.total_amount}</span>
            </div>
        </div>
    </div>
  )
}

export default AdminOrderAmountComponent