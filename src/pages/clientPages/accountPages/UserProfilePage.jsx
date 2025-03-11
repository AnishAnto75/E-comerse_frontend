import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../slices/authSlice/authSlice'
import AccountAddressComponent from '../../../components/clientComponents/accountComponents/AccountAddressComponent'

const UserProfilePage = () => {

    const dispatch = useDispatch()
    const [email , setEmail] = useState('') 
    const [name , setName] = useState('')
    const [phoneNumber , setPhoneNumber] = useState('')

    const user = useSelector(getUser)

    const handleRef = useRef(true)
    useEffect(()=>{
        if(user && handleRef.current ){
            user.email && setEmail(user.email)
            user.name && setName(user.name)
            user.phoneNumber && setPhoneNumber(user.phoneNumber) 
            handleRef.current=false
        }
    },[user])

    const handleSubmit = (e)=>{
        e.preventDefault()

        const data = {
            name ,
            phoneNumber,
        }    
        console.log(data)
        return
    }

  return (
      <div className="min-h-full p-6 flex items-center justify-center lg:my-10">
        <div className="container xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto">
            <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-base grid-cols-1 lg:grid-cols-5">
                    <div className='space-y-2 lg:border-r-2 '>
                        <p className="text-amber-500 text-xl">User profile</p>
                        <p className='text-gray-600 text-sm'>Please fill out all the fields before placing your order.</p>
                        <div className='divider'/>
                    </div>
                    <div className="lg:col-span-4">
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className='text-xl pb-6 font-[arial] text-center'>Persnol information</div>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                <div className="md:col-span-3">
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        autoComplete="off"
                                        placeholder={email}
                                        disabled
                                        className="h-10 border mt-1 rounded px-4 w-full bg-white placeholder:text-black" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="name">Full Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        autoComplete="off" 
                                        name="name" 
                                        id="name" 
                                        value={name} 
                                        onChange={(e)=>setName(e.target.value)} 
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        className="h-10 border mt-1 rounded px-4 w-full bg-white" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input 
                                        type="number" 
                                        name="phoneNumber" 
                                        id="phoneNumber"
                                        required
                                        value={phoneNumber} 
                                        onChange={(e)=>setPhoneNumber(e.target.value)}
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        className="h-10 border mt-1 rounded px-4 w-full bg-white hide-arrow" />
                                </div>
                            </div>
                        </form>

                        <div className='border-b-2 border-gray-300 my-5'/>
                        <AccountAddressComponent />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserProfilePage