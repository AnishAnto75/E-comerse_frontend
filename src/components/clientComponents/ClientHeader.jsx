import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import useUserStore from '../../store/authStore';
import { FaShoppingCart } from 'react-icons/fa';
import useCartStore from '../../store/cartStore';
import { useState } from 'react';
import { BsBox, BsCart4 } from 'react-icons/bs';
import { BiCart, BiHeart, BiLogOut } from 'react-icons/bi';
import { IoCartOutline, IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';

const ClientHeader = () => {
    const navigate = useNavigate()

    const isAuthenticated = useUserStore( (state) => state.isAuthenticated );
    const user = useUserStore( (state) => state.user );
    const logout = useUserStore(state => state.logout);

    const cartCount = useCartStore(state=>state.cartCount)

  return (
    <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
        <Link to={'/'} className='px-3 text-xl font-semibold flex items-center '>TIFTO</Link>
        { isAuthenticated ?
            <div className='flex gap-10 pr-10'>
                <Link to={'/cart'} className='relative text-gray-800'>
                    <FaShoppingCart size={28}/>
                    <div className='absolute top-[-10px] right-[-10px] text-white p-[3px] font-semibold rounded-full text-xs px-2 bg-red-500 '>{cartCount}</div>
                </Link>

                <div className="relative inline-block group">
                    <div className='flex items-center gap-1 font-medium text-lg capitalize text-gray-800 cursor-pointer'> <CgProfile size={25}/> {user.name}</div>
                    <div className="absolute right-0 hidden group-hover:block z-50">
                        <div className='mt-3 p-3 px-5 w-72 rounded-lg border font-medium text-lg bg-white'>
                            <div className='text-xl p-2 font-bold text-sky-700'>Your Account</div>
                            <Link to={'/profile'} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-0.5 flex items-center gap-2"><CgProfile size={25}/>My Profile</Link>
                            <Link to={'/orders'} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-0.5 flex items-center gap-2"><BsBox size={25}/>Orders</Link>
                            <Link to={'/cart'} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-0.5 flex items-center gap-2"><IoCartOutline size={25}/>Cart</Link>
                            <Link to={'/wishlist'} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-0.5 flex items-center gap-2"><BiHeart size={25}/>Wishlist</Link>
                            <Link to={'/settings'} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-0.5 flex items-center gap-2"><IoSettingsOutline size={25}/>Settings</Link>
                            <div onClick={logout} className=" w-full p-2 text-left hover:bg-gray-100 rounded-xl mb-2 flex items-center gap-2 cursor-pointer"><BiLogOut size={25}/>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
            : 
            <Link to={"/auth/login"}>Login</Link>
        }
    </div>
  )
}

export default ClientHeader