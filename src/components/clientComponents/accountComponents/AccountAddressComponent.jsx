import React, { useRef, useState } from 'react'

import AddNewAddressComponent from './AddNewAddressComponent';
import EditAddressComponent from './EditAddressComponent.jsx';
import { MdDelete, MdEdit } from "react-icons/md";
import useAddressStore from '../../../store/addressStore.js';
import { toast } from 'react-toastify';

const AccountAddressComponent = () => {

    const address = useAddressStore(state=> state.address)

    const [editingAddress , setEditingAddress] = useState(null)

  return (
    <div className=''>
        <div className='text-xl font-medium pb-3 pt-3 text-sky-800 '>Addresses</div>

        { editingAddress ?
            <div className='relative '>
                <EditAddressComponent address = {editingAddress} />
                <button onClick={()=>setEditingAddress(null)} className="font-medium text-gray-600 py-1.5 rounded-md absolute right-24 bottom-[26px] hover:text-cyan-500 px-5" >Cancel</button>
            </div>
        : 
        <div>
            <AddNewAddressComponent />
            <div className='pt-5 '>
                <div className=' border-[3px]'>
                    {address?.map((address, index) => (
                        <div className=' border-b-[3px] flex rounded justify-between' key={index}>     
                            <div className='p-5 w-4/5 font-medium text-gray-800 pt-7'>
                                <div className='flex gap-3'>
                                    <div className='bg-sky-100 p-1 px-2 tracking-wide font-semibold text-sky-700 capitalize rounded'>{address.address_type}</div>
                                    { address.is_default && <div className='bg-gray-100 p-1 px-2 tracking-wide font-semibold text-gray-700 capitalize rounded'>default</div>}
                                </div>
                                <div className='space-x-6 text-[19px] mt-3 font-semibold  '>
                                    <span>{address.name}</span> <span>{address.phone_number}</span>
                                </div>
                                <div className=' tracking-wide mt-2 text-lg'>
                                    <span>{address.house_no && `${address.house_no}, `} {address.landmark && `${address.landmark}, `} {address.area && `${address.area}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} </span>
                                    <span>- {address.pincode}</span> 
                                    <div>{address.alternate_phone_number && `Alternate Phone : ${address.alternate_phone_number}`}</div>
                                </div>
                            </div>

                            <div className="flex text-center gap-1 text-gray-700 p-5">
                                <div onClick={()=>setEditingAddress(address)} className='hover:text-blue-600 hover:bg-blue-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdEdit/></div>
                                <div onClick={()=>toast.warn("not done yet")} className='hover:text-red-600 hover:bg-red-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdDelete/></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        }


    </div>
  )
}

export default AccountAddressComponent