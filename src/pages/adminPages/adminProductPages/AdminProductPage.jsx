import React from 'react'
import { Link } from 'react-router-dom'
import AdminSideBar from '../../../components/admin/AdminSideBar'

const AdminProductPage = () => {
  return (
    <div className='w-full'>
        <div className='bg-gray-100 h-screen w-full flex p-10 gap-5'>
            <Link to={'new-product'} className='btn bg-white'>New Product</Link>
            <Link to={'all-product'} className='btn bg-white'>All Products</Link>
        </div>
    </div>
  )
}

export default AdminProductPage