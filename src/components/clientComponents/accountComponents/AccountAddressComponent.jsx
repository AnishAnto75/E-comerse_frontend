import React, { useRef, useState } from 'react'

import AddNewAddressComponent from './AddNewAddressComponent';
import EditAddressComponent from './EditAddressComponent.jsx';
import { MdDelete, MdEdit } from "react-icons/md";
import useAddressStore from '../../../store/addressStore.js';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import LoadingComponent from '../../LoadingComponent.jsx';

const AccountAddressComponent = () => {

    const addresses = useAddressStore(state=> state.address)
    const addressLoading = useAddressStore(state=> state.loading)
    const delAddress = useAddressStore(state=> state.deleteAddress)
    const [deletingAddress , setDeletingAddress] = useState(null)

    const [editingAddress , setEditingAddress] = useState(null)

    const deleteAddress = async()=>{
        console.log(deletingAddress)
        const res = await delAddress(deletingAddress._id)
        if(res){ setDeletingAddress(null)}
    }

  return (
    <>
        <div className='text-xl font-medium pb-3 pt-3 text-sky-800 '>Addresses</div>

        { editingAddress ?
            <div className='relative '>
                <EditAddressComponent address = {editingAddress} />
                <button onClick={()=>setEditingAddress(null)} className="font-medium text-gray-600 py-1.5 rounded-md absolute right-24 bottom-[26px] hover:text-cyan-500 px-5" >Cancel</button>
            </div>
        :
        <div>
            <AddNewAddressComponent page={"profile"}/>
            <div className='pt-5 '>
                { addressLoading ?
                    <div className='h-96'><LoadingComponent height={28} width={28}/></div>
                :
                addresses.length ?
                    <div className=' border border-gray-100 rounded-md'>
                        {addresses?.map((address, index) => (
                            <div className={` ${(index % 2 == 0 )  && "bg-gray-50"} border-b border-gray-100 flex rounded justify-between`} key={address._id}>     
                                <div className='p-5 w-4/5 font-medium text-gray-800'>
                                    <div className='flex gap-3'>
                                        <div className='bg-sky-100 p-1 px-2 tracking-wide font-semibold text-sky-700 capitalize rounded'>{address.address_type}</div>
                                        { address.is_default && <div className='bg-gray-100 p-1 px-2 tracking-wide font-semibold text-gray-700 capitalize rounded'>default</div>}
                                    </div>
                                    <div className='space-x-1 text-[19px] mt-3 font-semibold  '>
                                        <span>{address.name}</span> <span>( {address.phone_number} )</span>
                                    </div>
                                    <div className=' tracking-wide mt-2 text-lg'>
                                        <span>{address.house_no && `${address.house_no}, `} {address.landmark && `${address.landmark}, `} {address.area && `${address.area}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} </span>
                                        <span>- {address.pincode}</span> 
                                        <div>{address.alternate_phone_number && `Alternate Phone : ${address.alternate_phone_number}`}</div>
                                    </div>
                                </div>

                                <div className="flex text-center gap-1 text-gray-700 p-5 pt-10">
                                    <div onClick={()=>setEditingAddress(address)} className='hover:text-blue-600 hover:bg-blue-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdEdit/></div>
                                    <div onClick={()=>setDeletingAddress(address)} className='hover:text-red-600 hover:bg-red-50 p-2 h-10 rounded-full text-2xl cursor-pointer'><MdDelete/></div>
                                </div>
                            </div>
                        ))}
                    </div>
                : 
                    <div className='flex justify-center items-center h-96 text-xl font-medium text-gray-400'>NO ADDRESS CREATED YET</div>
                }
            </div>
            {deletingAddress &&
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div onClick={()=>setDeletingAddress(null)} className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"/>
                    <div className="flex min-h-screen items-center justify-center p-4 text-center">
                        <div className='bg-white z-50 text-lg font-medium p-10 shadow w-1/2 max-w-screen-sm  rounded-xl'>
                            <div className='text-start text-2xl tracking-wide uppercase'>Deletion Confirmation</div>
                            <div className='text-lg mt-5 leading-8 text-start text-gray-700'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Are you sure you want to delete this address? This action cannot be undone.</div>
                            <div className='flex gap-5 mt-10 justify-end'>
                                <button onClick={()=>setDeletingAddress(null)} className='bg-sky-500 p-3 px-5 tracking-wide rounded-xl text-white'>Cancel</button>
                                <button onClick={()=>deleteAddress()} className='bg-red-500 p-3 px-5 tracking-wide rounded-xl text-white'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        }
    </>
  )
}

export default AccountAddressComponent