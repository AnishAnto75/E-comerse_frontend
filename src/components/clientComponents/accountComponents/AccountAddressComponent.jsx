import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeEditAddressStatus, deleteAddress, getAddress, getEditAddressStatus } from '../../../slices/clientSlice/AddressSlice.js'

import AddNewAddressComponent from './AddNewAddressComponent';
import EditAddressComponent from './EditAddressComponent.jsx';
import { MdDelete, MdEdit } from "react-icons/md";

const AccountAddressComponent = () => {

    const dispatch = useDispatch()
    
    const addresses = useSelector(getAddress)

    const [editingAddress , setEditingAddress] = useState(null)

  return (
    <div className='break-words font-inter'>
        <div className='text-xl pb-6 text-center'>Address</div>

        { !editingAddress && <AddNewAddressComponent />}
        { editingAddress && 
            <div className='relative '>
                <EditAddressComponent address = {editingAddress} />
                <button onClick={()=>setEditingAddress(null)} className="font-medium text-gray-600 py-1.5 rounded-md absolute right-24 bottom-[26px] hover:text-cyan-500 px-5" >Cancel</button>
            </div>
        }

        <div className=''>
            {!editingAddress && 
                addresses?.map(address=>(
                <div className=' shadow mb-3 flex bg-white rounded justify-between' key={address._id}>     
                    <div className='p-4 md:w-2/3'>
                        <span className='bg-gray-100 p-1 text-sm font-semibold text-gray-500 rounded'>{address.addressType}</span>
                        <div className='gap-4 flex text-sm font-medium text-gray-700 pt-2 '>
                            <span>{address.name}</span> <span>{address.phoneNo}</span>
                        </div>
                        <div className='text-sm text-gray-700'>
                            {address.houseNo && `${address.houseNo}, `} {address.landMark && `${address.landMark}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} 
                            <span className='text-base font-medium text-gray-600'> -{address.pincode}</span> 
                            <span className='block'>{address.alternatePhoneNo && `Alternate Phone: ${address.alternatePhoneNo}`}</span>
                        </div>
                    </div>

                    <div className="flex text-center gap-1 text-gray-700 p-5">
                        <div onClick={()=>setEditingAddress(address)} className='hover:text-blue-600 hover:bg-blue-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdEdit/></div>
                        <div onClick={()=>dispatch(deleteAddress({_id: address._id}))} className='hover:text-red-600 hover:bg-red-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdDelete/></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AccountAddressComponent