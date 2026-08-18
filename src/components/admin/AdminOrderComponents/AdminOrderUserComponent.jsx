import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOrderUserComponent = ({user}) => {

    const navigate = useNavigate()

  return (
    <div className=' w-full p-5 bg-white rounded-xl'>
        <div className='mb-3 text-xl text-sky-800 '>Customer Details</div> 
        <table className='border-separate border-spacing-3 text-lg '>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td className=' capitalize'>: &nbsp; {user?.name || "---"}</td>
                </tr>
                <tr>
                    <td>Phone No &nbsp;&nbsp;</td>
                    <td>: &nbsp; {user?.phoneNumber || "---"}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>: &nbsp; {user?.email || "---"}</td>
                </tr>
                <tr>
                    <td>User Id</td>
                    <td>: &nbsp; <span onClick={()=>navigate(`/admin/customer/customer_id/${user?.user_id}`)} className='underline underline-offset-2 cursor-pointer hover:text-blue-500'>{user?.user_id}</span></td>
                </tr>
            </tbody>
        </table>  
    </div>
    )
}

export default AdminOrderUserComponent