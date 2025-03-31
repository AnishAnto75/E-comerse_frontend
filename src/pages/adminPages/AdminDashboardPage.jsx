import React from 'react'

import AdminSideBar from '../../components/admin/AdminSideBar';

const AdminDashboardPage = () => {
  return (
    <div className='w-full flex'>
        <AdminSideBar />
        <div className='bg-gray-100 h-screen flex items-cnter justify-center w-full'>
            <div className='container p-10 items-center justify-center  '>
                <div className='font-[arial] mb-5'>Assigned Orders</div>
                <div className="overflow-auto h-full w-full bg-white rounded-2xl border-2">
                    <table className="table table-zebra text-center ">
                        {/* head */}
                        <thead>
                        <tr className='text-sm bg-gray-600 text-white font-[arial] tracking-wide'>
                            <th></th>
                            <th className='p-5'>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Status</th>
                            <th>Assigned Staff</th>
                            <th>Contact Number</th>
                        </tr>
                        </thead>
                        <tbody>                    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminDashboardPage