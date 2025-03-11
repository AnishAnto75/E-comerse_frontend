import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeEditAddressStatus, deleteAddress, getAddress, getEditAddressStatus } from '../../../slices/clientSlice/AddressSlice.js'

import { HiOutlineDotsVertical } from "react-icons/hi";

import AddNewAddressComponent from './AddNewAddressComponent';
import EditAddressComponent from './EditAddressComponent.jsx';

const AccountAddressComponent = () => {

    const dispatch = useDispatch()
    
    const addresses = useSelector(getAddress)

    const [editingAddress , setEditingAddress] = useState(null)

  return (
    <div className='break-words'>
        <div className='text-xl pb-6 font-[arial] text-center'>Address</div>

        <AddNewAddressComponent />

        { editingAddress && 
            <div className='relative '>

                <EditAddressComponent address = {editingAddress} />
                <button onClick={()=>setEditingAddress(null)} className="font-medium text-gray-600 py-1.5 rounded-md absolute right-24 bottom-[26px] hover:text-cyan-500 px-5 " >
                    Cancel
                </button>
            </div>
        }

        <div className='border-2'>
            {addresses?.map(address=>(
                <div className='border-b flex relative' key={address._id}>     
                    <div className='p-4 md:w-2/3 tracking-wide'>
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

                    <div className="dropdown dropdown-hover dropdown-left absolute top-3 right-3 text-gray-600">
                        <div tabIndex={0} role="button" className="mt-2">
                            <HiOutlineDotsVertical/>
                        </div>

                        <ul tabIndex={0} className="dropdown-content bg-base-100 rounded z-[1] w-24 font-[arial] text-sm tracking-wide p-2 shadow">
                            <li onClick={()=>setEditingAddress(address)} className='pb-2 hover:text-cyan-400 cursor-pointer'>Edit</li>
                            <li onClick={()=>dispatch(deleteAddress({_id: address._id}))} className='hover:text-cyan-400 cursor-pointer'>Delete</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AccountAddressComponent