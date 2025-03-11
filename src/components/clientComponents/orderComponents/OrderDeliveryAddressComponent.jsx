import React from 'react'

const OrderDeliveryAddressComponent =  ({delivery_address}) => {
    return (
      <div className=' col-span-1 bg-white p-4'>
          <h2 className='text-xl underline underline-offset-4 '>Delivery Address</h2>                
          <div className='py-4 px-2 tracking-wide'>
              <span className='bg-gray-200 p-1 text-xs font-bold text-gray-500 rounded '>
                  {delivery_address.addressType}
              </span>
              <div className='gap-4 flex text-sm font-medium text-gray-700 mt-2 '>
                  <span>{delivery_address.name}</span>
                  <span>{delivery_address.phoneNo}</span>
              </div>
              <div className='text-[0.85rem] text-gray-700'>
                  {delivery_address.houseNo && `${delivery_address.houseNo}, `}
                  {delivery_address.landMark && `${delivery_address.landMark}, `}
                  {delivery_address.city && `${delivery_address.city}, `}
                  {delivery_address.district && `${delivery_address.district}, `}
                  {delivery_address.state && `${delivery_address.state}`} 
                  <span className='text-[14px] font-medium text-gray-600'> -{delivery_address.pincode}</span> 
                  {delivery_address.alternatePhoneNo && 
                      <span className='block'>Alternate Phone: {delivery_address.alternatePhoneNo}</span>
                  }
              </div>
          </div>
      </div>
        )
  }
  

export default OrderDeliveryAddressComponent