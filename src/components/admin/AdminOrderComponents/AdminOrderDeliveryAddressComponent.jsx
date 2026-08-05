import React from 'react'

const AdminOrderDeliveryAddressComponent = ({delivery_address: address}) => {
  return (
    <div className=' bg-white rounded-xl w-full p-5 text-lg'>
        <div className='mb-3 text-xl text-sky-800 '>Delivery Address</div> 
        <div >     
            <span className='bg-sky-100 p-1 px-2 tracking-wide font-semibold text-sky-700 capitalize rounded'>{address.address_type}</span>
            <div className='space-x-1 text-[19px] mt-3 font-semibold  '>
                <span>{address.name}</span> <span>( {address.phone_number} )</span>
            </div>
            <div className='mt-2 mb-1'>{address.house_no && `${address.house_no}, `} {address.landmark && `${address.landmark}, `} {address.area && `${address.area}, `} {address.city && `${address.city}, `} </div>
            <div className='mb-1'>{address.district && `${address.district}, `} {address.state && `${address.state}`} {address.pincode && `- ${address.pincode}`}</div> 
            <div>{address.alternate_phone_number && `Alternate Phone : ${address.alternate_phone_number}`}</div>
        </div>
    </div>
    )
}

export default AdminOrderDeliveryAddressComponent