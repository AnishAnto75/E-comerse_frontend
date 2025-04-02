import React from 'react'

import { AiOutlineStock } from "react-icons/ai";
import { BsBagCheck, BsBoxSeam } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div className='hidden md:block'>
    <div className='sticky top-1 border-r'>
        <div className='bg-white min-w-52 max-w-52 '>
            <ul className='p-2 pt-5 text-sm text-gray-800 space-y-2'>
                <Link to={'/admin'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <IoHomeOutline className='mr-3 text-gray-300 text-xl'/> 
                    <span>Home</span>
                </Link>
                <Link to={'/admin/dashboard'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <AiOutlineStock className='mr-3 text-gray-300 text-xl'/> 
                    <span>Dashboard</span>
                </Link>
                <Link to={'/admin/orders'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <BsBagCheck className='mr-3 text-gray-300 text-xl '/>
                    <span>Orders</span>
                </Link>
                <Link to={'/admin/supplier'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <CiDeliveryTruck className='mr-3 text-gray-300 text-2xl '/>
                    <span>Supplier</span>
                </Link>
                <Link to={'/admin/products'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <BsBoxSeam className='mr-3 text-gray-300 text-xl '/>
                    <span>Products</span>
                </Link>
                <Link to={'/admin/entry'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <TfiLayoutMediaCenterAlt className='mr-3 text-gray-300 text-xl '/>
                    <span>Entry</span>
                </Link>
                <Link to={'/admin/customer'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <GoPerson className='mr-3 text-gray-300 text-xl '/>
                    <span>Customers</span>
                </Link>
                <Link to={'/admin/stock'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <AiOutlineStock className='mr-3 text-gray-300 text-xl '/>
                    <span>Stock</span>
                </Link>
                <Link to={'/admin/notification'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <IoIosNotificationsOutline className='mr-3 text-gray-300 text-[22px] '/>
                    <span>Notification</span>
                </Link>
                <Link to={'/admin/staff'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <MdOutlinePerson3 className='mr-3 text-gray-300 text-xl '/>
                    <span>Staff Management</span>
                </Link>
                <Link to={'/admin/payments'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <IoWalletOutline className='mr-3 text-gray-300 text-xl '/>
                    <span>Payments</span>
                </Link>
                <Link to={'/admin/banners'} className='flex p-3 px-5 hover:bg-gray-400 hover:text-white rounded-xl hover:px-5 transition-all delay-75'>
                    <TfiLayoutMediaCenterAlt className='mr-3 text-gray-300 text-xl '/>
                    <span>Banners</span>
                </Link>
            </ul>
        </div>
    </div>
    </div>

  )
}

export default AdminSideBar