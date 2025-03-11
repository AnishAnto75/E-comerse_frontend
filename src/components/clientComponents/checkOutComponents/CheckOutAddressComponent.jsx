import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../../slices/clientSlice/AddressSlice'
import { setCheckOutAddress } from '../../../slices/clientSlice/OrderSlice'

const CheckOutAddressComponent = () => {

    const dispatch  = useDispatch()
    const addresses = useSelector(getAddress)

    const setAddress = (address)=>{
        console.log(address)
        dispatch(setCheckOutAddress(address))
    }

  return (
     <div className='border-2 break-words'>
        {addresses?.map((address , index)=>(
            <div className='border-b flex break-words' key={index}>
                <div className='min-w-12 max-w-12 hero bg-bue-100'>
                    <input type="radio" name="radio-7" onChange={()=>setAddress(address)}  className="radio radio-info h-4 w-4 ml-2 hero" />
                </div>
                <div className='py-4 px-2 tracking-wide'>
                    <span className='bg-gray-200 p-1 text-xs font-bold text-gray-500 rounded '>
                        {address.addressType}
                    </span>
                    <div className='gap-4 flex text-sm font-medium text-gray-700 mt-2 '>
                        <span>{address.name}</span>
                        <span>{address.phoneNo}</span>
                    </div>
                    <div className='text-[0.85rem] text-gray-700'>
                        {address.houseNo && `${address.houseNo}, `}
                        {address.landMark && `${address.landMark}, `}
                        {address.city && `${address.city}, `}
                        {address.district && `${address.district}, `}
                        {address.state && `${address.state}`} 
                        <span className='text-[14px] font-medium text-gray-600'> -{address.pincode}</span> 
                        <span className='block'>
                            {address.alternatePhoneNo && `Alternate Phone: ${address.alternatePhoneNo}`}
                        </span>
                    </div>
                </div>
            </div>
        ))}
        <div className='m-1'>
            <button className='btn btn-neutral hero'>
                Add Address
            </button>
        </div>
    </div>
  )
}

export default CheckOutAddressComponent