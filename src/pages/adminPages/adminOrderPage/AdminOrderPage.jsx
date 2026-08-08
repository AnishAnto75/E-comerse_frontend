import React, { useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp, FaEye, FaIndianRupeeSign } from 'react-icons/fa6'
import AdminOrderHeaderComponent from '../../../components/admin/AdminOrderComponents/AdminOrderHeaderComponent'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent'
import { format } from 'date-fns'
import { IoIosStar } from 'react-icons/io'
import { CiFilter } from 'react-icons/ci'
import { IoCloseSharp, IoFilter } from 'react-icons/io5'
import { toast } from 'react-toastify'
import AdminOrderPreviewComponent from '../../../components/admin/AdminOrderComponents/AdminOrderPreviewComponent'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const AdminOrderPage = () => {
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selected_order, setSelectedOrder ] = useState(null)

    const [data, setData] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_page`, {withCredentials: true})
                console.log("fetchOrderPage payload : " , res.data)
                setData(res.data.data)
            } catch (error){
                setError(true)
                toast.error("Internal Server Error")
                console.error("error in fetchOrderPage :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])


    const getStatusColor = (status)=>{
        return status === 'cancelled' ? "bg-red-500" : status === 'delivered' ? "bg-green-500" : "bg-sky-500"
    }

    const getPaymentColor = (status) => {
        return status === "Pending" ? "bg-amber-500" : status === "Paid" ? "bg-green-500" : status === "Failed" ? "bg-red-500" : status === "Refunded" && "bg-sky-500"
    }

    const pendingOrders = data?.pendingOrders
    const orders = data?.orders

    if(loading){return <LoadingSpinner/>}
    if(error || !data){return <ErrorComponent/>}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className='w-full p-5 font-inter text-gray-800 text-lg font-medium pt-7'>
            <div className='text-3xl font-semibold'>Orders</div>
            <div className='py-2 text-gray-600'>Manage your recent orders and get through it</div>
            
            <AdminOrderHeaderComponent pendingOrders={pendingOrders}/>

            <div className='flex justify-between pt-5'>
                {/* Search Orders */}
                <div className="items-center md:w-72 relative">
                    <input type='text' placeholder='Search' className='shadow border-2 py-2 px-2 pr-9 w-full rounded-lg text-gray-900 text-[15px] focus:outline-none'/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 absolute top-2 right-2 text-gray-700 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                </div>
                <div onClick={()=>toast.warn("function Not added")} className='border-[3px] border-blue-100 p-[5.5px] rounded-xl px-5 text-lg font-inter font-medium text-blue-500 mr-3 tracking-wide flex items-center gap-1 cursor-pointer'><IoFilter className='text-2xl'/>Filter</div>
            </div>

            <div className='mt-5 h-[calc(100vh-40px)] overflow-y-auto border shadow-md font-inter tracking-tight rounded-xl px-5'>
                {/* Table */}
                <table className='w-full mt-3'>
                    <thead className='sticky top-0 bg-white'>
                        <tr className='text-gray-500'>
                            <th className='py-4' />
                            <th className='py-4 text-start'>Order Id</th>
                            <th className='py-4 text-start'>Customer</th>
                            <th className='py-4'>Quantity</th>
                            <th className='py-4'>Payment</th>
                            <th className='py-4'>Amount</th>
                            <th className='py-4'>Status</th>
                            <th className='py-4'>Ratings</th>
                            <th className='py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) =>(
                            <tr key={index} onClick={()=>setSelectedOrder(order.order_id)} className={`text-center border-b-[3px] border-gray-50 text-gray-800 ${ selected_order == order.order_id ? "bg-gray-50" : ''}`}>
                                <td className='text-gray-600 font-semibold'>{index+1})</td>
                                <td className='text-start py-4'>
                                    <span className='block font-semibold'>#{order.order_id}</span>
                                    <span className='text-gray-500'>{format(new Date(order.createdAt) , "dd / MM / yy - p")}</span>
                                </td>
                                <td className='flex flex-col text-start py-4 '>
                                    <span>{order?.delivery_address?.name}</span>
                                    <span className='text-gray-500'>{order?.delivery_address?.phone_number}</span>
                                </td>
                                <td className='py-4 '>{order.total_quantity} items</td>
                                <td className='justify-items-center py-4'>
                                    <span className={`${getPaymentColor(order.payment.status)} p-2 block capitalize w-28 text-center text-white tracking-wide rounded-2xl`}>{order.payment.status}</span>
                                </td>
                                <td className='flex flex-col py-4'>
                                    <span className=' items-center flex justify-center'><FaIndianRupeeSign size={16} />{order?.total_amount?.toLocaleString()}</span>
                                    <span className='text-gray-500'>{order.payment.method}</span>
                                </td>
                                <td className='justify-items-center py-4'>
                                    <span className={`${getStatusColor(order.current_status)} p-2 block capitalize w-28 text-center text-white tracking-wide rounded-2xl`}>{order.current_status}</span>
                                </td>
                                <td>
                                    { order.rating ?
                                        <span className='flex gap-0.5 py-4 items-center justify-center'>
                                            <IoIosStar className='h-5 w-5 text-amber-500'/>
                                            <span className='text-[18px] text-gray-600 font-medium'>{order.rating.score}</span>
                                        </span>
                                    : 
                                    <span className='font-bold'>---</span>
                                    }
                                </td>
                                <td className='text-center h-full align-middle'>
                                    <FaEye onClick={() => navigate(`/admin/orders/${order.order_id}`)} className='cursor-pointer text-2xl inline-block' />
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        {selected_order &&
            <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
                <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow border overflow-y-auto p-3'>
                    <IoCloseSharp onClick={()=>setSelectedOrder(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
                    <AdminOrderPreviewComponent order_id = {selected_order}/>
                </div>
            </div> 
        } 
    </div>
  )
}

export default AdminOrderPage
