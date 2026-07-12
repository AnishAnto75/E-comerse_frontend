import axios from 'axios'
import { lowerCase } from 'lodash'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useUserStore from '../../store/authStore'

const LoginPage = () => {

    const navigate = useNavigate()

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const login = useUserStore((state) => state.login);

    const loginFormSubmit = async(e)=> {
        e.preventDefault()
        try {
            if(!email || !password){ toast.warn("fill required fields"); return }

            const result = await login(email, password);

            if(result.success){ 
                navigate("/");
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.error( "login response : ",error)
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
                    <form onSubmit={(e)=>loginFormSubmit(e)} className='grid grid-cols-1 md:grid-cols-6 pr-5 my-auto gap-5 '>
                        <div className='col-span-6'>
                            <label className='text-lg font-semibold text-'>Email</label>
                            <input type="text" required value={email} onChange={(e)=>setEmail(e.target.value.toLowerCase().trim())}
                                className="input bg-gray-100 p-3 rounded-md w-full mt-2" />
                        </div>
                        <div className='col-span-6'>
                            <label className='my-3'>Password</label>
                            <input type="text" required value={password} onChange={(e)=>setPassword(e.target.value)}
                                className="input bg-gray-100 p-3 rounded-md w-full mt-2" />
                        </div>
                        <div className='col-span-6 tracking-normal underline text-sm text-red-500 py-4'>
                            <div onClick={()=>toast.warn("Forget password page not created yet")} className='p-1 hover:cursor-pointer text-end'>Forget Password</div>
                        </div>
                        <div className='flex gap-5 font-semibold font-sans col-span-6'>
                            <button type='submit' className='bg-blue-500 text-white p-5 w-full text-center rounded-xl'>Log In</button>
                            <div onClick={()=>navigate('/auth/signup')} className=' bg-blue-100 text-blue-500 p-5 w-full text-center rounded-xl hover:cursor-pointer'>Create Account</div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='container bg-gray-50 rounded-xl justify-center flex flex-col p-20 tracking-wider font-sans'>
                <div className='text-gray-500 text-lg font-semibold pb-4 '>Welcome to</div>
                <div className='text-3xl pb-7 border-b-2 font-bold border-gray-400'>Tifto</div>
                <div className='text-gray-500 text-lg pt-10 font-semibold '>Login to Dashboard</div>
            </div>
        </div>     
    </div>
  )
}

export default LoginPage
