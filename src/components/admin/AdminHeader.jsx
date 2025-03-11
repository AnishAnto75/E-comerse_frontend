import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isUserValid, logout } from '../../slices/authSlice/authSlice'

const AdminHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validUser = useSelector(isUserValid)

    const logoutUser = ()=>{
        dispatch(logout())
    }
  return (
    <div>
        <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
            <Link to={'/admin'} className='px-3 text-xl font-[arial] font-bold tracking-wide flex items-center '>TIFTO</Link>
            <div>Admin</div>
            <div className='px-3 font-[arial] items-center flex '>
                {validUser ?
                    <div onClick={()=>logoutUser()}>Logout</div>  
                    :
                    <button onClick={()=>navigate('/auth/login')}>Login</button>
                }
            </div>
        </div>
    </div>
  )
}

export default AdminHeader