import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOrderUserComponent = ({user}) => {

    const navigate = useNavigate()

  return (
    <div className='bg-gray-50 text-gray-700 w-full p-3 content-center'>
    <div className='text-base text-gray-600 font-sans font-medium mb-2 '>Customer Details</div> 
    <table className='border-separate border-spacing-2 text-sm '>
        <tbody>
            <tr>
                <td>Name</td>
                <td>: {user?.name ? user?.name : "NaN"}</td>
            </tr>
            <tr>
                <td>Phone No &nbsp;&nbsp;</td>
                <td>: {user?.phoneNumber ? user?.phoneNumber : "NaN"}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>: {user?.email ? user?.email : "NaN"}</td>
            </tr>
            <tr>
                <td>User Id</td>
                <td>: <span onClick={()=>navigate(`/admin/customer/customer_id/${user?.user_id}`)} className='underline underline-offset-2 cursor-pointer hover:text-blue-500'>{user?.user_id}</span></td>
            </tr>
        </tbody>
    </table>  
    </div>
    )
}

export default AdminOrderUserComponent