import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/admin/AdminSideBar'
import AdminHeader from '../components/admin/adminHeader'

const AdminLayout = () => {

  return (
    <div>
        <AdminHeader />
        <Outlet />
    </div>
  )
}

export default AdminLayout