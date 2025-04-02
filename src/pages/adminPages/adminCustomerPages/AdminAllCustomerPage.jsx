import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent'
import AdminSideBar from '../../../components/admin/AdminSideBar'

const AdminAllCustomerPage = () => {

    const handleRef = useRef(true)
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [response, setResponse] = useState(null) 
    const [customers , setCustomers] = useState(null)

    const [search_customer_id, setSearchCustomerId] = useState('')

    useEffect(()=>{
        const fetchCustomer = async()=>{
            try {
                setLoading(true)
                axios.defaults.withCredentials = true
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/customer-page`)
                console.log("fetchCustomer Payload : " , res.data)
                setResponse(res.data?.data)
                setCustomers(res.data?.data?.customers)
            } catch (error) {
                console.error("error in fetchCustomer function",error)
                setError(true)   
            } finally {
                setLoading(false)
            }
        }
        if(handleRef.current) {
            fetchCustomer()
            handleRef.current = false
        }
    } , [])

    const requestCustomerById = async () => {
        if(search_customer_id.length > 10){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/customer-page/search/${search_customer_id}`)
                console.log("requestCustomerById: ",res.data)
                setCustomers(res.data?.data ? [res.data.data] : null  ) 
            } catch (error) {
                console.error("error in requestCustomerById :" , error)
            }
        }
    }

    const handleSearchCustomerId = (e)=>{
        const term = e.target.value
        setSearchCustomerId(term)
        if(term.length == 0){ setCustomers(response.customers)}
    }

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className='p-2 w-full'>
         <div className="pb-3 p-2">
            <div className="items-center md:w-72 relative">
                <input type='text' value={search_customer_id} onChange={(e)=>handleSearchCustomerId(e)} onKeyDown={e => e.key == 'Enter' && requestCustomerById()} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
        </div>
        <table className="w-full min-w-max table-auto text-left ">
            <thead>
                <tr className='p-5 text-center border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-gray-600 tracking-wider'>
                    <th className="font-normal p-4"></th>
                    <th className="text-start font-normal p-4">Customer Id</th>
                    <th className='p-4 font-normal'>Name</th>
                    <th className='p-4 font-normal'>Email</th>
                    <th className='p-4 font-normal'>Phone No</th>
                </tr>
            </thead>
            <tbody className=''>
                {customers?.length &&
                customers?.map(({ user_id, name, email, phoneNumber }, index) => {
                     const classes = index === customers?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
                     return (
                        <tr key={index} className='hover:bg-blue-gray-50/50 text-center text-sm text-blue-gray-800' onClick={()=>navigate(`/admin/customer/customer_id/${user_id}`)}>
                            <td className={`${classes} text-start w-5 border-r border-blue-gray-50 border-b-0 `}>{index+1}</td>
                            <td className={`${classes} text-start`}>{user_id ? user_id  : '---'}</td>
                            <td className={`${classes}`}>{name ? name : "---"}</td>
                            <td className={`${classes}`}>{email ? email : "---"}</td>
                            <td className={`${classes}`}>{phoneNumber ? phoneNumber : "---"}</td>
                        </tr>
                     );
                })}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default AdminAllCustomerPage
