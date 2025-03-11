import { Link } from "react-router-dom"
import AdminSideBar from "../../../components/admin/AdminSideBar"

const AdminStaffManagement = () => {

  return (
    <div className='w-full'>
        <div className="min-h-screen w-full border-l border-gray-400 px-5">
            <div className='font-[arial] p-4 hero text-xl font-semibold text-gray-700'>STAFF MANAGEMENT</div>
            <Link to={'/admin/staff/new-staff'} className="btn">Add Staff</Link>
            <Link to={'/admin/staff/all-staff'} className='btn bg-white'>All Staff</Link>
        </div>
    </div>
  )
}

export default AdminStaffManagement
