import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/admin/AdminSideBar'
import AdminHeader from '../components/admin/adminHeader'

const AdminLayout = () => {

  return (
    <div>
        <AdminHeader />
        <div className='flex'>
            <AdminSideBar />
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout