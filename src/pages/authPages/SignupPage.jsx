import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const SignupPage = () => {

    const navigate = useNavigate()
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [gender , setGender] = useState('')

    const signupFormSubmit = async(e)=> {
        e.preventDefault()
        try {
            if(password !== confirmPassword){toast.error("Password doesn't match"); return }
            if(!password || !email || !name || !gender){toast.error("Required all fields"); return}
            const data = {name, email, password, gender}
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/signup`, {data})
            if (res.status == 201){navigate('/auth/login')}
            toast.success(res.data.message)
            console.log("Signup response :",res)
        } catch (error){
            toast.error(error.response?.data?.message)
            console.error( "Signup response : ",error)
        }
    }

  return (
    <div className="h-screen flex p-10 px-20 bg-gray-50 font-[arial] tracking-wide ">
        <div className='bg-white flex rounded-xl container p-10'>
            <div className='container p-5 pr-10 flex '>
                <div className='container flex flex-col'>
                    <div className='font-bold text-xl flex tracking-normal'>
                        <button onClick={()=>navigate('/')}>TIFTO</button>
                    </div>
                    <form onSubmit={(e)=>signupFormSubmit(e)} className='grid grid-cols-1 md:grid-cols-6 pr-5 my-auto gap-5 '>
                        <div className='col-span-6'>
                            <label htmlFor="name" className='font-sans font-semibold my-2 tracking-normal'>Full Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Username' required
                                value={name} onChange={(e)=>setName(e.target.value)}
                                className="input bg-gray-100 w-full mt-2" />
                        </div>
                        <div className='col-span-6'>
                            <label htmlFor="email" className='font-sans font-semibold my-2 tracking-normal'>Email</label>
                            <input type="text" name="email" id="email" placeholder='Enter Email' required
                                value={email} onChange={(e)=>setEmail(e.target.value)}
                                className="input bg-gray-100 w-full mt-2" />
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="password" className='font-sans font-semibold my-3 tracking-normal'>Password</label>
                            <input type="text" name="password" id="password" placeholder='xxxxxxx' required
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                className="input bg-gray-100 w-full mt-2 placeholder:tracking-widest" />
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor="confirmPassword" className='font-sans font-semibold my-3 tracking-normal'>Confirm Password</label>
                            <input type="text" name="confirmPassword" id="confirmPassword" placeholder='xxxxxxx' required
                                value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                                className="input bg-gray-100 w-full mt-2 placeholder:tracking-widest" />
                        </div>
                        <div className='col-span-6 flex'>
                            <div className='pr-5'>Gender</div>
                            <input type="radio" name="radio-3" checked={gender=='male'} onChange={()=>setGender('male')} className="radio radio-neutral"/>&nbsp;Male
                            <input type="radio" name="radio-3" checked={gender=='female'} onChange={()=>setGender('female')} className="radio radio-neutral ml-5"/>&nbsp;Female
                            <input type="radio" name="radio-3" checked={gender=='other'} onChange={()=>setGender('other')} className="radio radio-neutral ml-5"/>&nbsp;Other
                        </div>
                        <div className='flex my-10 gap-5 font-semibold font-sans col-span-6'>
                            <button type='submit' className='bg-blue-500 text-white p-5 w-full text-center rounded-xl'>Sign Up</button>
                            <div onClick={()=>navigate('/auth/login')} className=' bg-blue-100 text-blue-500 p-5 w-full text-center rounded-xl hover:cursor-pointer'>Login</div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='container bg-gray-50 rounded-xl justify-center flex flex-col p-20 tracking-wider font-sans'>
                <div className='text-gray-500 text-lg font-semibold pb-4 '>Welcome to</div>
                <div className='text-3xl pb-7 border-b-2 font-bold border-gray-400'>Tifto</div>
                <div className='text-gray-500 text-lg pt-10 font-semibold '>SignUp to Dashboard</div>
            </div>
        </div>     
    </div>
  )
}

export default SignupPage