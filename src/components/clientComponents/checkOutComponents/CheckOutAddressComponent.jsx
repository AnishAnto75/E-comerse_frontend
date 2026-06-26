import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../../slices/clientSlice/AddressSlice'
import { getCheckOutAddress, setCheckOutAddress } from '../../../slices/clientSlice/OrderSlice'
import AddNewAddressComponent from '../accountComponents/AddNewAddressComponent'

const CheckOutAddressComponent = () => {

    const dispatch  = useDispatch()
    const addresses = useSelector(getAddress)
    const checkOutAddress = useSelector(getCheckOutAddress)

    const setAddress = (address)=>{
        dispatch(setCheckOutAddress(address))
    }

  return (
     <div className='space-y-4 border-b py-2 pb-4'>
        <AddNewAddressComponent />
        {addresses?.map((address , index)=>(
            <div className='shadow flex break-words bg-white rounded-xl' key={index}>
                <div className='min-w-14 max-w-14 content-center text-center'>
                    <input type="checkbox" checked= {address?._id == checkOutAddress?._id} onChange={()=>setAddress(address)}  className=" h-5 w-5 ml-2 mt-3 cursor-pointer " />
                </div>
                <div className='py-4 px-2 tracking-wide'>
                    <span className='bg-gray-100 p-1 text-sm font-semibold text-gray-600 rounded '>{address.addressType}</span>
                        <div className='gap-4 flex text-sm font-medium text-gray-700 pt-2 '>
                        <span>{address.name}</span> <span>{address.phoneNo}</span>
                    </div>
                    <div className='text-sm text-gray-700'>
                        {address.houseNo && `${address.houseNo}, `} {address.landMark && `${address.landMark}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} 
                        <span className='text-base font-medium text-gray-600'> -{address.pincode}</span> 
                        <span className='block'>{address.alternatePhoneNo && `Alternate Phone: ${address.alternatePhoneNo}`}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CheckOutAddressComponent