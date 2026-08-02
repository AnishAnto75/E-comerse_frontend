import React, { useState } from 'react'
import { HiPlus } from "react-icons/hi";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAddressStore from '../../../store/addressStore';
import LoadingSpinner from '../../LoadingSpinner';
import LoadingComponent from '../../LoadingComponent';


// Shares in profile page and checkout page
const AddNewAddressComponent = ({page}) => {
    
    const [newAddress , setNewAddress] = useState(false)

    const [name , setName] = useState('')
    const [phone_number , setPhoneNumber] = useState('')
    const [alternate_phone_number , setAlternatePhoneNumber] = useState('')
    const [house_no , setHouseNo] = useState('')    
    const [area , setArea] = useState('')    
    const [landmark , setLandMark] = useState('')
    const [city , setCity] = useState('')
    const [district , setDistrict] = useState('')
    const [state , setState] = useState('')
    const [pincode , setPincode] = useState('')
    const [address_type , setAddressType] = useState('home')
    const [is_default , setIsDefault] = useState(false)

    const addAddress = useAddressStore(state => state.addAddress)
    const addressLoading = useAddressStore(state => state.loading)


    const handleSubmit = async()=>{

        if (!name || !phone_number || !house_no || !area || !city || !district || !state || !pincode ){ toast.warn("Fill all the required data"); return}

        const data = {name, phone_number, alternate_phone_number, house_no, area, landmark, city, district, state, pincode, address_type, is_default}
        const res = await addAddress(data)

        if(!res){return}

        reset()
        setNewAddress(false)
    }

    const reset = ()=>{
        setName('')
        setPhoneNumber('')
        setAlternatePhoneNumber('')
        setHouseNo('')
        setArea('')
        setLandMark('')
        setCity('')
        setDistrict("")
        setState('')
        setPincode('')
        setAddressType('home')
        setIsDefault(false)
    }

  return (
    <div className='relative'>
    { page === 'profile' ?
        <div onClick={()=> setNewAddress(true)} className={` absolute top-[-50px] right-0 py-2 px-3 text-white rounded-xl cursor-pointer flex gap-1 font-medium tracking-wide text-lg items-center bg-sky-500 ${newAddress && "hidden"}`}><HiPlus size={22}/>Add</div>
    : page === 'checkout' &&
        <div onClick={()=> setNewAddress(true)} className={` absolute top-[-35px] right-0 py-2 px-3 text-sky-500 rounded-xl cursor-pointer flex gap-1 font-medium tracking-wide text-lg items-center`}><HiPlus size={22}/>Add</div>
    }

    { newAddress &&
        <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"/>
            <div className="flex min-h-screen items-center justify-center ">               
                <div className="grid gap-5 p-16 pt-10 rounded-xl max-w-screen-xl bg-white z-50 font-medium grid-cols-10 text-lg">

                    <div className='col-span-10 text-2xl font-semibold text-sky-800 mb-3 text-center'>Add Address</div>
                    
                    <div className="md:col-span-4">
                        <label>Name <span className='text-red-600'>*</span></label>
                        <input type="text" autoComplete="off" value={name} onChange={(e)=>setName(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>
                    
                    <div className="md:col-span-3">
                        <label>Phone No.<span className='text-red-600'>*</span></label>
                        <input type="Number" autoComplete="off" value={phone_number} onChange={(e)=>setPhoneNumber(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-3">
                        <label>Alternate Phone No.</label>
                        <input type="number" value={alternate_phone_number} onChange={(e)=>setAlternatePhoneNumber(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-2">
                        <label >House No<span className='text-red-600'>*</span></label>
                        <input type="text" autoComplete="off" value={house_no} onChange={(e)=>setHouseNo(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-3">
                        <label>Area<span className='text-red-600'>*</span></label>
                        <input type="text" autoComplete="off" value={area} onChange={(e)=>setArea(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-5">
                        <label>LandMark</label>
                        <input type="text" autoComplete="off" value={landmark} onChange={(e)=>setLandMark(e.target.value)}className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-2">
                        <label>City <span className='text-red-600'>*</span></label>
                        <input type="text" autoComplete="off" value={city} onChange={(e)=>setCity(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-3">
                        <label>District <span className='text-red-600 text-lg'>*</span></label>
                        <input type='text' autoComplete="off" value={district} onChange={(e)=>setDistrict(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-3">
                        <label>State <span className='text-red-600 text-lg'>*</span></label>
                        <input type='text' autoComplete="off" value={state} onChange={(e)=>setState(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className="md:col-span-2">
                        <label>Pincode <span className='text-red-600'>*</span></label>
                        <input type="number" autoComplete="off" value={pincode} onChange={(e)=>setPincode(e.target.value)} className="p-3 border mt-3 rounded px-4 w-full bg-white" />
                    </div>

                    <div className='col-span-7 flex mt-2'>
                        <div className='pr-5'>Address Type</div>
                        <div className='flex items-center'>
                            <input type="radio" name="radio-3" checked={address_type === 'home'} onChange={()=>setAddressType('home')} className="h-6 w-6"/>&nbsp;Home
                        </div>
                        <div className='flex items-center ml-10'>
                            <input type="radio" name="radio-3" checked={address_type === 'work'} onChange={()=>setAddressType('work')} className="h-6 w-6"/>&nbsp;Work
                        </div>
                    </div>
                    
                    <div className='col-span-3 flex mt-2 items-center'>
                        <div className='pr-5 text-gray-800'>Default Address</div>
                        <div onClick={()=>setIsDefault(!is_default)} className={`flex items-center text-center border-[3px] p-1 rounded-lg cursor-pointer border-gray-500 ${is_default && "text-sky-500"} `}>
                            { is_default ? <FaCheck size={14}/> : <div className='h-[14px] w-[14px] '/> }
                        </div>
                    </div>

                    <div className="md:col-span-10 flex gap-5 mt-5">
                        <button onClick={()=>{ reset(); setNewAddress(false)}} className='font-semibold bg-gray-800 text-white p-3 rounded-md w-full tracking-wide hover:bg-gray-700'>Cancel</button>
                        {addressLoading ?
                            <div className='w-full bg-gray-200 rounded-md'> <LoadingComponent height={8} width={8}/> </div>
                        :
                        <button onClick={()=>handleSubmit()} className="font-semibold bg-sky-500 text-white p-3 rounded-md w-full tracking-wide hover:bg-sky-600 " >Submit</button>
                        }
                    </div>
                </div>
           </div>
        </div>
    }
    </div>
  )
}

export default AddNewAddressComponent