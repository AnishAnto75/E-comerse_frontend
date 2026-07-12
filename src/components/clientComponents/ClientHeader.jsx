import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import useUserStore from '../../store/authStore';

const ClientHeader = () => {
    const navigate = useNavigate()

    const isAuthenticated = useUserStore( (state) => state.isAuthenticated );
    const user = useUserStore( (state) => state.user );

    const logout = useUserStore(state => state.logout);

  return (
    <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
        <Link to={'/'} className='px-3 text-xl font-[arial] font-bold tracking-wide flex items-center '>TIFTO</Link>
        { isAuthenticated ?
            <div className='flex gap-5'>
                <div>{user.name}</div>
                <div onClick={logout}>logout</div>
            </div>
            : 
            <Link to={"/auth/login"}>Login</Link>
        }
    </div>
  )
}

export default ClientHeader