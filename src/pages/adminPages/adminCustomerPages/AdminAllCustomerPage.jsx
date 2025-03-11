import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminAllCustomerPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [users , setUsers ] = useState([])
    const handleRef = useRef(true) 

    useEffect(()=>{
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    const fetch = async()=>{
        setLoading(true)

        axios.defaults.withCredentials = true
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/allUser`).catch((error)=>{
            console.error("fetchAll User",error)
            setError(true)
            setLoading(false)
            return
        })
        console.log("User : " , res.data.data)

        const users = res.data.data
        setUsers(users)

        setLoading(false)
    }

    let content = <div>loading...</div>

    if(error){
        content = <div>Error</div>
    } else if (loading) {
        content = <div>Loading ...</div>
    } else {
        content = <div className='w-full min-h-screen border-l border-gray-400'>
            <div className='font-[arial] p-4 hero text-xl font-semibold text-gray-700'>All USER</div>
            <div className='md:mx-5'> 
                <div className="overflow-auto h-screen w-full bg-white rounded-2xl border-2">
                    <table className="table table-zebra text-center ">
                        <thead className='sticky top-0'>
                            <tr className='text-sm bg-gray-600 text-white font-[arial] tracking-wide'>
                                <th></th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE NUMBER</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                        {users?.map((user , index) =>
                            <tr 
                                key={user._id}
                                >
                                <th className='border-r'>{index+1}</th>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber ? user.phoneNumber : "Nil"}</td>
                                <td className='rounded-xl flex p-0 '>
                                    <button
                                        onClick={()=>navigate(user._id)}
                                        className='bg-slate-500 text-white font-[arial]  rounded-xl hero m-1  p-2'>view</button>
                                </td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                    {
                        users.length==0 &&
                        <div className='w-full tex-lg font-semibold hero pb-10 h-full'>No products created yet</div>
                    }
                </div>
            </div>
        </div>
    }

  return (
    <div className='w-full'>
        { content } 
    </div>
  )
}

export default AdminAllCustomerPage
