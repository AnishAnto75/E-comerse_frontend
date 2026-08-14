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
    <div className='hidden md:block font-medium text-[17.5px] text-gray-800'>
    <div className='sticky top-1'>
        <div className='bg-white min-w-[260px] max-w-[260px] font-sans'>
            {/* Logo */}
            <img src="/tiftoLogo.jpeg" alt="Logo" className=" w-44 ml-2 max-h-32 pt-3 object-cover"/>
            <div className='mx-4 px-1 pt-3 border-t'>
                <div className=' pb-4'>Menu</div>

                <Link to={'/admin/dashboard'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "dashboard" ? "bg-blue-400 text-white ": ""}`}>
                    <RxDashboard className='mr-2 text-xl'/><span>Dashboard</span>
                </Link>
                
                <Link to={'/admin/orders'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "orders" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBagCheck className='mr-2 text-xl '/><span>Orders</span>
                </Link>
                
                <Link to={'/admin/supplier'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "supplier" ? "bg-blue-400 text-white ": ""}`}>
                    <CiDeliveryTruck className='mr-2 text-2xl '/><span>Supplier</span>
                </Link>

                <Link to={'/admin/products'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "products" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBoxSeam className='mr-2 text-xl '/><span>Products</span>
                </Link>
                
                <Link to={'/admin/brands'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "brands" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBoxSeam className='mr-2 text-xl '/><span>Brands</span>
                </Link>
                
                <Link to={'/admin/groups-categories'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "groups-categories" ? "bg-blue-400 text-white ": ""}`}>
                    <BsBoxSeam className='mr-2 text-xl '/><span>Groups & Categories</span>
                </Link>
                
                <Link to={'/admin/customer'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "customer" ? "bg-blue-400 text-white ": ""}`}>
                    <GoPerson className='mr-2 text-xl '/><span>Customers</span>
                </Link>

                <Link to={'/admin/purchase'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "purchase" ? "bg-blue-400 text-white ": ""}`}>
                    <TfiLayoutMediaCenterAlt className='mr-2 text-xl '/><span>Purchase</span>
                </Link>

                <Link to={'/admin/staff'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "staff" ? "bg-blue-400 text-white ": ""}`}>
                    <MdOutlinePerson3 className='mr-2 text-xl '/><span>Staff Management</span>
                </Link>

                <Link to={'/admin/recent-activity'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "recent-activity" ? "bg-blue-400 text-white ": ""}`}>
                    <IoIosNotificationsOutline className='mr-2 text-[22px] '/><span>Recent Activity</span>
                </Link>

                <Link to={'/admin/transactions'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "transactions" ? "bg-blue-400 text-white ": ""}`}>
                    <IoWalletOutline className='mr-2 text-xl '/><span>Payments</span>
                </Link>

                <Link to={'/testing'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "banners" ? "bg-blue-400 text-white ": ""}`}>
                    <TfiLayoutMediaCenterAlt className='mr-2 text-xl '/><span>testing</span>
                </Link>

                <div className=' pt-5 text-lg pb-4'>Settings</div>
                <Link to={'/admin/help'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "help" ? "bg-blue-400 text-white ": ""}`}>
                    <IoMdHelpCircleOutline className='mr-2 text-xl'/><span>Help</span>
                </Link>
                <Link to={'/admin/settings'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75  ${menuUrl == "settings" ? "bg-blue-400 text-white ": ""}`}>
                    <MdSettings className='mr-2 text-xl '/>
                    <span>Settings</span>
                </Link>
                <Link to={'/admin/logout'} className={`flex items-center  py-2 px-5 mb-1 hover:bg-gray-400 hover:text-white rounded-xl transition-all delay-75 `}>
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