import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import useUserStore from '../../store/authStore';
import { FaShoppingCart } from 'react-icons/fa';
import useCartStore from '../../store/cartStore';

const ClientHeader = () => {
    const navigate = useNavigate()

    const isAuthenticated = useUserStore( (state) => state.isAuthenticated );
    const user = useUserStore( (state) => state.user );
    const logout = useUserStore(state => state.logout);

    const cartCount = useCartStore(state=>state.cartCount)

  return (
    <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
        <Link to={'/'} className='px-3 text-xl font-[arial] font-bold tracking-wide flex items-center '>TIFTO</Link>
        { isAuthenticated ?
            <div className='flex gap-5'>
                <Link to={'/cart'} className='relative'>
                    <FaShoppingCart size={28}/>
                    <div className='absolute top-[-10px] right-[-10px] text-white p-[3px] font-semibold rounded-full text-xs px-2 bg-red-500 '>{cartCount}</div>
                </Link>
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