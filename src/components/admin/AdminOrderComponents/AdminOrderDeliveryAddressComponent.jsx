import React from 'react'

const AdminOrderDeliveryAddressComponent = ({delivery_address}) => {
  return (
    <div className=' bg-gray-50 text-gray-700 w-full text-sm p-3'>
        <div className='text-base text-gray-600 font-sans font-medium mb-3 '>Delivery Address </div> 
        <div className='px-2 tracking-wider'>
            <div className='pb-2'><span className='bg-gray-300/75 p-1 text-xs font-roboto font-medium uppercase rounded '>{delivery_address.addressType}</span></div>
            <div className='gap-1 flex pb-1'>
                <span>{delivery_address?.name ? delivery_address?.name : "NaN"},</span>
                <span>{delivery_address?.phoneNo ? delivery_address?.phoneNo : "NaN"}</span>
            </div>
            <div>
                {delivery_address?.houseNo && `${delivery_address.houseNo}, `}
                {delivery_address?.landMark && `${delivery_address.landMark}, `}
                {delivery_address?.city && `${delivery_address.city},`}
            </div>
            <div>
                {delivery_address?.district && `${delivery_address.district}, `}
                {delivery_address?.state && `${delivery_address.state}`} 
                <span className='font-medium font-sans'> -{delivery_address?.pincode}</span> 
            </div>
            {delivery_address?.alternatePhoneNo && <div><span className='font-sans text-gray-600 font-medium '>Alternate Phone: </span>{delivery_address.alternatePhoneNo}</div>}
        </div>
    </div>
    )
}

export default AdminOrderDeliveryAddressComponent