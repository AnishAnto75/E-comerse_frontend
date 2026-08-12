import React, { useState } from "react";

import { FaSearch, FaEdit, FaEye, FaChevronRight, FaChevronLeft, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminCustomerPreviewComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerPreviewComponent";
import { FiUserCheck, FiUserMinus, FiUsers, FiUserX } from "react-icons/fi";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { toast } from "react-toastify";

const AdminCustomerPage = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    
    const [pagination , setPagination] = useState(null)

    const [summary, setSummary] = useState(null)
    const [customers, setCustomers] = useState(null)
    
    const [selectedCustomer , setSelectedCustomer] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/customer/customer_page`, { params: { page, limit }, withCredentials: true });
                console.log("fetchCustomerPage payload : " , res.data)
                setSummary(res.data?.data?.summary)
                setCustomers(res.data?.data?.customers)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                console.error("Error in fetchCustomerPage:", error);
                toast.error( error?.response?.data?.message)
            } finally { setLoading(false);}
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <LoadingSpinner/>}
    if(error || !customers || !summary || !pagination){return <ErrorComponent/>}

  return (
    <div className="flex">
        <AdminSideBar />

        <div className="w-full p-5 font-inter font-medium text-lg text-gray-900">
            
            <h1 className="text-3xl font-semibold">Customers</h1>
            <p className="text-gray-600 mt-2">Manage customers and their activities.</p>

            <div className="grid grid-cols-4 gap-3 mt-5">
                <div className='bg-white rounded-2xl border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sky-500 font-semibold">TOTAL CUSTOMERS</p>
                            <h2 className='text-2xl mt-2 font-bold text-sky-600'>{summary.total_customers.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-sky-50 p-2 rounded-2xl`}>
                            <FiUsers size={35} className="text-sky-600"/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-emerald-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-emerald-500 font-semibold">ACTIVE CUSTOMERS</p>
                            <h2 className='text-2xl mt-2 font-bold text-emerald-600'>{summary.active_customers.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-emerald-50 p-2 rounded-2xl`}>
                            <FiUserCheck size={35} className="text-emerald-600"/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-amber-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-amber-500 font-semibold">INACTIVE CUSTOMERS</p>
                            <h2 className='text-2xl mt-2 font-bold text-amber-600'>{summary.inactive_customers.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-amber-50 p-2 rounded-2xl`}>
                            <FiUserMinus size={35} className="text-amber-600"/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-red-500 font-semibold">BLOCKED CUSTOMERS</p>
                            <h2 className='text-2xl mt-2 font-bold text-red-600'>{summary.blocked_customers.toLocaleString()}</h2>
                        </div>
                        <div className={`bg-red-50 p-2 rounded-2xl`}>
                            <FiUserX size={35} className="text-red-600"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input type="text" placeholder="Search customer / phone no. / email" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Blocked</option>
                        <option>Deleted</option>
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto mt-5 mx-5">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-white shadow-sm">
                            <tr className="text-gray-500">
                                <th></th>
                                <th className="py-4 text-start">Customer</th>
                                <th className="py-4">Phone</th>
                                <th className="py-4">Gender</th>
                                <th className="py-4">DOB</th>
                                <th className="py-4">Joined</th>
                                <th className="py-4">Status</th>
                                <th className="py-4">Ratings</th>
                                <th className="py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {customers?.map((customer, index) =>{
                            return(
                                <tr onClick={()=>setSelectedCustomer(customer?.user_id)} key={index} className={`text-center  hover:bg-gray-50 ${selectedCustomer === customer.user_id && "bg-gray-100"} `}>
                                    <td className='text-gray-600 font-semibold pl-2'>{index+1})</td>
                                    <td className="px-6 py-5 text-start">
                                        <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 text-2xl rounded-full bg-sky-100 flex items-center justify-center uppercase text-sky-500 font-bold">{customer?.name?.charAt(0)}</div>
                                        <div>
                                            <h3 className="font-semibold line-clamp-1 capitalize">{customer?.name}</h3>
                                            <p className="text-gray-500 line-clamp-1">{customer?.email}</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td className='py-4'>{customer?.phoneNumber || "--"}</td>
                                    <td className='py-4 capitalize'>{customer?.gender}</td>
                                    <td className='py-4'>{customer?.DOB ? format(customer?.DOB , 'dd/MM/yyy') : "--"}</td>
                                    <td className='py-4'>{format(customer?.createdAt , 'dd MMM yyy')}</td>
                                    <td className='py-4 capitalize' >
                                        <span className={`p-2 rounded-xl px-3 capitalize text-white ${ customer?.status == "active" ? "bg-sky-500" : customer?.status == "inactive" ? "bg-gray-600" : customer?.status == "blocked" && "bg-red-500" }`}>{customer?.status}</span>
                                    </td>
                                    <td>
                                        <span className='flex gap-0.5 py-4 items-center justify-center'>
                                            <IoIosStar className='h-5 w-5 text-amber-400'/>
                                            <span className='text-amber-500 font-medium'>{customer.score}</span>
                                        </span>
                                    </td>
                                    <td className='space-x-2 text-2xl '>
                                        <FaEdit onClick={() => navigate(`/admin/customer/edit/customer_id/${customer?.user_id}`)} className='cursor-pointer inline-block text-orange-500' />
                                        <FaEye onClick={() => navigate(`/admin/customer/customer_id/${customer?.user_id}`)} className='cursor-pointer text-cyan-600 inline-block' />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="pt-5 flex justify-center border-t ">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"><FaChevronLeft /></button>
                            <button className="w-11 h-11 rounded-xl bg-blue-600 text-white font-semibold">1</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">2</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">3</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">4</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100">5</button>
                            <button className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"><FaChevronRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {selectedCustomer &&
        <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
            <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
                <IoCloseSharp onClick={()=>setSelectedCustomer(null)} className='absolute top-4 right-4 text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
                <AdminCustomerPreviewComponent user_id = {selectedCustomer}/>
            </div>
        </div> 
        }
    </div>
  );
};

export default AdminCustomerPage