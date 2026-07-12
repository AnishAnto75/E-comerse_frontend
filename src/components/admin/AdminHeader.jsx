import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <div>
        <div className='border-b p-5 pl-4 border-gray-400 flex justify-between'>
            <Link to={'/'} className='px-3 text-xl font-[arial] font-bold tracking-wide flex items-center '>TIFTO</Link>
            <div>Admin</div>
        </div>
    </div>
  )
}

export default AdminHeader