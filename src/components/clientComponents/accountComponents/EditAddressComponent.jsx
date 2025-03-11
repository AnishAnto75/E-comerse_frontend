import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editAddress } from '../../../slices/clientSlice/AddressSlice'

const EditAddressComponent = ({address}) => {
    const dispatch = useDispatch()

    const handleRef = useRef(true)

    const [name , setName] = useState('')
    const [phoneNo , setPhoneNo] = useState('')
    const [alternatePhoneNo , setAlternatePhoneNo] = useState('')
    const [pincode , setPincode] = useState('')    
    const [houseNo , setHouseNo] = useState('')    
    const [landMark , setLandMark] = useState('')
    const [city , setCity] = useState('')
    const [district , setDistrict] = useState('')
    const [state , setState] = useState('')
    const [addressType , setAddressType] = useState('')
    const [_id , set_id] = useState('')

    if(handleRef.current && address){
        setName(address.name ? address.name : ''); 
        setPhoneNo(address.phoneNo ? address.phoneNo : ''); 
        setAlternatePhoneNo(address.alternatePhoneNo ? address.alternatePhoneNo : ''); 
        setPincode(address.pincode ? address.pincode : ''); 
        setHouseNo(address.houseNo ? address.houseNo : ''); 
        setLandMark(address.landMark ? address.landMark : '');
        setCity(address.city ? address.city : ''); 
        setDistrict(address.district ? address.district : ''); 
        setState(address.state ? address.state : ''); 
        setAddressType(address.addressType ? address.addressType : '')
        set_id(address._id ? address._id : '')

        handleRef.current = false
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = { name, phoneNo, alternatePhoneNo, pincode, houseNo, landMark, city, district, state, addressType , _id}

        dispatch(editAddress(data))
    }

  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)} >
        <div className="bg-gray-50 rounded border-2 p-6 mb-6">
            <div className='text-2xl font-medium  font-[arial] hero mb-5'>Edit Address</div>
            <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-9">

                <div className="md:col-span-3">
                    <label htmlFor="name">Full Name <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type="text" 
                        name="name"
                        id="name"
                        required
                        autoComplete="off"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="phoneNo">Phone No <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type="number" 
                        name="phoneNo" 
                        id="phoneNo" 
                        required
                        autoComplete="off"
                        value={phoneNo}
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white " />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="alternatePhoneNo">Alternate Phone No <span className=' text-gray-50 text-lg'>*</span></label>
                    <input 
                        type="number" 
                        name="alternatePhoneNo" 
                        id="alternatePhoneNo"
                        value={alternatePhoneNo} 
                        onChange={(e)=>setAlternatePhoneNo(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white " />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="pincode">Pincode <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type="number" 
                        name="pincode" 
                        id="pincode" 
                        required
                        autoComplete="off"
                        value={pincode} 
                        onChange={(e)=>setPincode(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white hide-arrow"/>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="houseNo">House No / Flat No <span className=' text-gray-50 text-lg'></span></label>
                    <input 
                        type="text" 
                        name="houseNo" 
                        id="houseNo" 
                        autoComplete="off"
                        value={houseNo} 
                        onChange={(e)=>setHouseNo(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-5">
                    <label htmlFor="landMark">LandMark <span className=' text-gray-50 text-lg'></span></label>
                    <input 
                        type="text" 
                        name="landMark" 
                        id="landMark" 
                        autoComplete="off"
                        value={landMark} 
                        onChange={(e)=>setLandMark(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="city">City <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        required
                        autoComplete="off"
                        value={city} 
                        onChange={(e)=>setCity(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="district">District <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type='text'
                        name="district" 
                        id="district" 
                        required
                        autoComplete="off"
                        value={district} 
                        onChange={(e)=>setDistrict(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="state">State <span className='text-red-600 text-lg'>*</span></label>
                    <input 
                        type='text'
                        name="state" 
                        id="state" 
                        required
                        autoComplete="off"
                        value={state} 
                        onChange={(e)=>setState(e.target.value)}
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-9 flex gap-5">
                    <button type='submit'className="font-bold bg-cyan-500 text-white py-2 px-4 rounded-md w-full" >
                        Submit
                    </button>
                    <div className='px-4 w-full'/>
                </div>
            </div>
        </div>
    </form>

    </>  )
}

export default EditAddressComponent