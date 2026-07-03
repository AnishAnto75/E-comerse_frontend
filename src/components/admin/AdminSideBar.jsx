import React from 'react'

import { AiOutlineStock } from "react-icons/ai";
import { BsBagCheck, BsBoxSeam } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoIosNotificationsOutline, IoMdHelpCircleOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlinePerson3, MdSettings } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';
import { BiSolidLogOut } from 'react-icons/bi';

const AdminSideBar = () => {
    const location = useLocation();
    const menuUrl = location.pathname.split("/")[2]

  return (
    <div className='hidden md:block'>
    <div className='sticky top-1 border-r min-h-screen'>
        <div className='bg-white min-w-64 max-w-64 font-sans'>
            {/* Logo */}
            <img src="/tiftoLogo.jpeg" alt="Logo" className=" w-44 ml-2 max-h-32 pt-3 object-cover"/>
            <div className='mx-4 px-1 pb-5 pt-3 border-t'>
                <div className='text-gray-700 text-[17px] pb-4'>Menu</div>

                <Link to={'/admin/home'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75 ${menuUrl == "home" ? "bg-blue-400 text-white ": ""}`}>
                    <IoHomeOutline className='mr-2 text-xl'/><span>Home</span>
                </Link>

                <Link to={'/admin/dashboard'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "dashboard" ? "bg-blue-400 text-white ": ""}`}>
                    <RxDashboard className='mr-2 text-xl'/><span>Dashboard</span>
                </Link>
                
                <Link to={'/admin/orders'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "orders" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBagCheck className='mr-2 text-xl '/><span>Orders</span>
                </Link>
                
                <Link to={'/admin/supplier'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "supplier" ? "bg-blue-400 text-white ": ""}`}>
                    <CiDeliveryTruck className='mr-2 text-2xl '/><span>Supplier</span>
                </Link>

                <Link to={'/admin/products'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "products" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBoxSeam className='mr-2 text-xl '/><span>Products</span>
                </Link>
                
                <Link to={'/admin/customer'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "customer" ? "bg-blue-400 text-white ": ""}`}>
                    <GoPerson className='mr-2 text-xl '/><span>Customers</span>
                </Link>

                <Link to={'/admin/purchase'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "purchase" ? "bg-blue-400 text-white ": ""}`}>
                    <TfiLayoutMediaCenterAlt className='mr-2 text-xl '/><span>Purchase</span>
                </Link>

                <Link to={'/admin/stock'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "stock" ? "bg-blue-400 text-white ": ""}`}>
                    <AiOutlineStock className='mr-2 text-xl '/><span>Stock</span>
                </Link>

                <Link to={'/admin/notification'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "notification" ? "bg-blue-400 text-white ": ""}`}>
                    <IoIosNotificationsOutline className='mr-2 text-[22px] '/><span>Notification</span>
                </Link>

                <Link to={'/admin/staff'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "staff" ? "bg-blue-400 text-white ": ""}`}>
                    <MdOutlinePerson3 className='mr-2 text-xl '/><span>Staff Management</span>
                </Link>

                <Link to={'/admin/payments'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "payments" ? "bg-blue-400 text-white ": ""}`}>
                    <IoWalletOutline className='mr-2 text-xl '/><span>Payments</span>
                </Link>

                <Link to={'/admin/banners'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "banners" ? "bg-blue-400 text-white ": ""}`}>
                    <TfiLayoutMediaCenterAlt className='mr-2 text-xl '/><span>Banners</span>
                </Link>

                <Link to={'/testing'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "banners" ? "bg-blue-400 text-white ": ""}`}>
                    <TfiLayoutMediaCenterAlt className='mr-2 text-xl '/><span>testing</span>
                </Link>

                <div className='text-gray-700 pt-5 text-lg pb-4'>Settings</div>
                <Link to={'/admin/help'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "help" ? "bg-blue-400 text-white ": ""}`}>
                    <IoMdHelpCircleOutline className='mr-2 text-xl '/><span>Help</span>
                </Link>
                <Link to={'/admin/settings'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "settings" ? "bg-blue-400 text-white ": ""}`}>
                    <MdSettings className='mr-2 text-xl '/>
                    <span>Settings</span>
                </Link>
                <Link to={'/admin/logout'} className={`flex items-center text-[17.5px] text-gray-700 py-2 px-5 mb-1 hover:bg-gray-300 hover:text-white rounded-xl transition-all delay-75 `}>
                    <BiSolidLogOut className='mr-2 text-[22px] '/>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    </div>
    </div>

  )
}

export default AdminSideBar