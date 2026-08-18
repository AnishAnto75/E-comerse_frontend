import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import useUserStore from '../../store/authStore';
import { IoMdPerson } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import LoadingComponent from '../LoadingComponent';

const ClientSidebar = () => {

    const user = useUserStore( (state) => state.user );
    const userLoading = useUserStore( (state) => state.loading );

    const location = useLocation();
    const url = location.pathname.split("/")[1]

  return (
    <div className='border max-h-[650px] shadow rounded-lg p-5 col-span-2 '>
        { userLoading ?
            <LoadingComponent/>
        :
            <div>
                <div className='flex items-center gap-4 border-b-[3px] rounded-xl pb-5'>
                    <div className='bg-sky-50 p-3 text-sky-500 rounded-full'><IoMdPerson size={50} /></div>
                    <div className='text-gray-700'>
                        <span className='text-lg tracking-wide font-medium '>Hello!</span>
                        <span className='line-clamp-1 font-semibold text-xl capitalize'>{user?.name}</span>
                    </div>
                </div>
                <div className='text-xl font-medium text-gray-800 mt-8 gap-2 flex flex-col'>
                    <Link to={"/profile"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "profile" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}><CgProfile size={25} /> Profile Information</Link>
                    <Link to={"/orders"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "orders" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>Orders</Link>
                    <Link to={"/wishlist"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "wishlist" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>Wishlist</Link>
                    <Link to={"/coupons"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "coupons" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>Coupons</Link>
                    <Link to={"/review-rating"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "review-rating" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>My reviews & ratings</Link>
                    <Link to={"/contact-us"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "contact-us" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>Contact Us</Link>
                    <Link to={"/settings"} className={`p-3 cursor-pointer rounded-lg flex items-center gap-2 ${url === "settings" ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}>Settings</Link>
                </div>
            </div>
        }
    </div>
  )
}

export default ClientSidebar