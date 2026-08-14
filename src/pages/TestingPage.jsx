import React, { useState } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp, FaEye, FaIndianRupeeSign } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { IoIosStar } from 'react-icons/io'
import { CiFilter } from 'react-icons/ci'
import { IoCloseSharp, IoFilter } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorComponent from '../components/ErrorComponent'
import AdminOrderHeaderComponent from '../components/admin/AdminOrderComponents/AdminOrderHeaderComponent'
import AdminOrderPreviewComponent from '../components/admin/AdminOrderComponents/AdminOrderPreviewComponent'
import AdminSideBar from '../components/admin/AdminSideBar'
import LoadingComponent from '../components/LoadingComponent'

const AdminOrderPage = () => {
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [selected_order, setSelectedOrder] = useState(null)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [status, setStatus] = useState("all")

    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const [pagination, setPagination] = useState(null)
    const [pendingOrders, setPendingOrders] = useState(null)
    const [orders, setOrders] = useState(null)


    // Fetch orders
    useEffect(() => {
        const controller = new AbortController();
        const fetchOrderPage = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/order/order_page`, { params: { page, limit, status, search: search.trim() }, withCredentials: true, signal: controller.signal });
                console.log("fetchOrderPage payload:", res.data);
                const data = res.data?.data;
                setPendingOrders(data?.pendingOrders)
                setOrders(data?.orders)
                setPagination(data?.pagination)
            } catch (error) {
                if (error.name === "CanceledError") { return }
                if (axios.isCancel(error)) { return }
                console.error("Error in fetchOrderPage:", error);
                setError(true);
            } finally { if (!controller.signal.aborted) { setLoading(false) }}
        }
        fetchOrderPage();
        return () => { controller.abort() }
    }, [page, limit, status, search])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim());
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchInput])

    const getStatusColor = (status)=>{
        return status === 'cancelled' ? "bg-red-500" : status === 'delivered' ? "bg-green-500" : "bg-sky-500"
    }

    const getPaymentColor = (status) => {
        return status === "Pending" ? "bg-amber-500" : status === "Paid" ? "bg-green-500" : status === "Failed" ? "bg-red-500" : status === "Refunded" && "bg-sky-500"
    }

    // if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className='w-full p-5 font-inter text-gray-800 text-lg font-medium pt-7'>
            <div className='text-3xl font-semibold'>Orders</div>
            <div className='py-2 text-gray-600'>Manage your recent orders and get through it</div>
            
            { !loading && pendingOrders ?
                <AdminOrderHeaderComponent pendingOrders={pendingOrders}/>
                :
                <div className='rounded-xl shadow-md border mt-5 h-64'><LoadingComponent /></div>
            }

            <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value); setPage(1) }} type="text" placeholder="Search order id" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>
                    <div className="flex flex-wrap gap-3 text-gray-800 font-medium">
    
                        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="border rounded-xl px-4 py-3">
                            <option value={"all"}>Order Status</option>
                            <option value={"placed"}>Placed</option>
                            <option value={"confirmed"}>Confirmed</option>
                            <option value={"out"}>Out For Delivery</option>
                            <option value={"delivered"}>Delivered</option>
                            <option value={"cancelled"}>Cancelled</option>
                        </select>

                        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="border rounded-xl px-4 py-3">
                            <option value={"all"}>Order Status</option>
                            <option value={"placed"}>Placed</option>
                            <option value={"confirmed"}>Confirmed</option>
                            <option value={"out"}>Out For Delivery</option>
                            <option value={"delivered"}>Delivered</option>
                            <option value={"cancelled"}>Cancelled</option>
                        </select>
                        <div onClick={()=>toast.warn("function Not added")} className='border-[3px] border-gray-100 p-[5.5px] rounded-xl px-5 text-lg font-inter font-medium text-gray-600 mr-3 tracking-wide flex items-center gap-1 cursor-pointer'><IoFilter className='text-2xl'/>Filter</div>
                    </div>
                </div>
    
                <div className="flex-1 overflow-y-auto mt-5">

                    { loading ? 
                            <LoadingComponent />
                        :
                        <table className="w-full border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 shadow-sm">
                                <tr className="text-gray-600">
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
                            { orders?.map((order, index) =>(
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
                                    <td className='py-4 '>{order.items.length} / {order.total_quantity} items</td>
                                    <td className='justify-items-center py-4'>
                                        <span className={`${getPaymentColor(order.payment.status)} p-2 block capitalize w-28 text-center text-white tracking-wide rounded-2xl`}>{order.payment.status}</span>
                                    </td>
                                    <td className='flex flex-col py-4'>
                                        <span className=' items-center flex justify-center'><FaIndianRupeeSign size={16} />{order?.total_amount?.toLocaleString()}</span>
                                        <span className='text-gray-500'>{order.payment.method}</span>
                                    </td>
                                    <td className='justify-items-center py-4'>
                                        <span className={`${getStatusColor(order?.current_status)} p-2 block capitalize w-28 text-center text-white tracking-wide rounded-2xl`}>{order.current_status}</span>
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
                            ))}
                            </tbody>
                        </table>
                    }
                </div>
                { !loading && pagination &&

                <div className="pt-5 flex justify-between items-center px-3 border-t ">
                    <div className="text-gray-500">
                        Showing page <span className="text-gray-600">{pagination.current_page}</span> of <span className="text-gray-700">{pagination.total_pages}</span>
                        <span className="mx-3">•</span>
                        {pagination.total_orders} results found
                    </div>
                    <div className="flex items-center gap-2">
                        <button disabled={!pagination.has_previous_page || loading} onClick={() => setPage(prev => prev - 1)} className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronLeft /></button>
                        {Array.from({ length: pagination.total_pages }, (_, index) => index + 1).map((pageNumber) => (
                            <button key={pageNumber} disabled={loading} onClick={() => setPage(pageNumber)} className={` w-11 h-11 rounded-xl font-semibold " ${ pagination.current_page === pageNumber ? "bg-blue-600 text-white cursor-default" : "border border-gray-200 text-gray-600 hover:bg-gray-50" }`}>
                                {pageNumber}
                            </button>
                        ))}
                        <button disabled={!pagination.has_next_page || loading} onClick={() => setPage(prev => prev + 1)} className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"><FaChevronRight /></button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Show</span>
                        <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }} className=" px-3 py-2 border border-gray-100 rounded-lg text-base outline-none ">
                            <option value={1}>1</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-gray-600">per page</span>
                    </div>
                </div>
                }
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
