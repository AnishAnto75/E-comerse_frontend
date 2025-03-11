import React, { useState } from 'react'
import { addNewAddress } from '../../../slices/clientSlice/AddressSlice'
import { useDispatch } from 'react-redux'

const AddNewAddressComponent = () => {
    
    const dispatch = useDispatch()
    const [newAddress , setNewAddress] = useState(false)

    const [name , setName] = useState('')
    const [phoneNo , setPhoneNo] = useState('')
    const [alternatePhoneNo , setAlternatePhoneNo] = useState('')
    const [pincode , setPincode] = useState('')    
    const [houseNo , setHouseNo] = useState('')    
    const [landMark , setLandMark] = useState('')
    const [city , setCity] = useState('')
    const [district , setDistrict] = useState('')
    const [state , setState] = useState('')
    const [addressType , setAddressType] = useState('home')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {name, phoneNo, alternatePhoneNo, pincode, houseNo, landMark, city, district, state, addressType }
        dispatch(addNewAddress(data))
        reset()
    }

    const reset = ()=>{
        setName('')
        setPhoneNo('')
        setAlternatePhoneNo('')
        setPincode('')
        setHouseNo('')
        setLandMark('')
        setCity('')
        setDistrict("")
        setState('')
        setAddressType('home')
    }

  return (
    <>
    <div onClick={()=> setNewAddress(true)} className={`border-2 p-2 hero btn btn-neutral mb-5 ${newAddress && "hidden"}`}>Add New Address</div>
    <form onSubmit={(e)=>handleSubmit(e)} className={!newAddress ? "hidden" : "block"}>
        <div className="bg-gray-50 rounded border-2 p-6 mb-6">
            <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-9">

                <div className="md:col-span-3">
                    <label htmlFor="name">Full Name <span className='text-red-600 text-lg'>*</span></label>
                    <input type="text" name="name" id="name" autoComplete="off" required
                        value={name} onChange={(e)=>setName(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>
                
                <div className="md:col-span-3">
                    <label htmlFor="phoneNo">Phone No <span className='text-red-600 text-lg'>*</span></label>
                    <input type="Number" name="phoneNo" 
                        id="phoneNo" autoComplete="off" required
                        value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white " />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="alternatePhoneNo">Alternate Phone No <span className=' text-gray-50 text-lg'>*</span></label>
                    <input type="number" name="alternatePhoneNo" id="alternatePhoneNo" 
                        value={alternatePhoneNo} onChange={(e)=>setAlternatePhoneNo(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white " />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="pincode">Pincode <span className='text-red-600 text-lg'>*</span></label>
                    <input type="number" name="pincode" id="pincode" autoComplete="off" required
                        value={pincode} onChange={(e)=>setPincode(e.target.value)}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white hide-arrow"/>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="houseNo">House No / Flat No <span className=' text-gray-50 text-lg'></span></label>
                    <input type="text" name="houseNo" id="houseNo" autoComplete="off"
                        value={houseNo} onChange={(e)=>setHouseNo(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-5">
                    <label htmlFor="landMark">LandMark <span className=' text-gray-50 text-lg'></span></label>
                    <input type="text" name="landMark" id="landMark" autoComplete="off"
                        value={landMark} onChange={(e)=>setLandMark(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="city">City <span className='text-red-600 text-lg'>*</span></label>
                    <input type="text" name="city" id="city" autoComplete="off" required
                        value={city} onChange={(e)=>setCity(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="district">District <span className='text-red-600 text-lg'>*</span></label>
                    <input type='text' name="district" id="district" autoComplete="off" required
                        value={district} onChange={(e)=>setDistrict(e.target.value)}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="state">State <span className='text-red-600 text-lg'>*</span></label>
                    <input type='text' name="state" id="state" autoComplete="off" required
                        value={state} onChange={(e)=>setState(e.target.value)}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-white" />
                </div>
                <div className='col-span-6 flex  mt-2'>
                    <div className='pr-5'>Address Type</div>
                    <input type="radio" name="radio-3" checked={addressType =='home'} onChange={()=>setAddressType('home')} className="radio radio-neutral"/>&nbsp;Home
                    <input type="radio" name="radio-3" checked={addressType =='work'} onChange={()=>setAddressType('work')} className="radio radio-neutral ml-5"/>&nbsp;Work
                </div>

                <div className="md:col-span-9 flex gap-5 mt-5">
                    <button type='submit'className="font-bold bg-cyan-500 text-white py-2 px-4 rounded-md w-full" >
                        Submit
                    </button>
                    <button className='font-bold bg-gray-700 text-white py-2 px-4 rounded-md w-full'
                        onClick={()=>{ 
                            setNewAddress(false) 
                            reset()
                        }} >cancel</button>
                </div>
            </div>
        </div>
    </form>

    </>
  )
}

export default AddNewAddressComponent