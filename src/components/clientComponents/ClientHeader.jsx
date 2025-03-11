import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout , isUserValid, getUser } from "../../slices/authSlice/authSlice.js";
import { CgProfile } from "react-icons/cg";

const ClientHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validUser = useSelector(isUserValid)
    const user = useSelector(getUser)


    const logoutUser = ()=>{
        dispatch(logout())
    }

  return (
    <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
        <Link to={'/'} className='px-3 text-xl font-[arial] font-bold tracking-wide flex items-center '>TIFTO</Link>
        <div className={'px-3 gap-10 font-[arial] items-center flex '}>
            <button onClick={()=>navigate('/profile')} className={`flex gap-1.5 ${!validUser && "hidden"}`}>
                <CgProfile className='text-2xl'/> {user?.name}
            </button>
            {validUser ?
                <div onClick={()=>logoutUser()}>Logout</div>  
                :
                <button onClick={()=>navigate('/auth/login')}>Login</button>
            }
        </div>
    </div>
  )
}

export default ClientHeader