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

const AdminOrderPage = () => {
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selected_order, setSelectedOrder ] = useState(null)
    
    const data = {
        totalOrders:{
            value: 1648,
            increment: 25,
            chartData: [
                {
                    name: 'Mar',
                    orders: 4000,
                },
                {
                    name: 'Apr',
                    orders: 3000,
                },
                {
                    name: 'May',
                    orders: 2000,
                },
                {
                    name: 'Jun',
                    orders: 2780,
                },
                {
                    name: 'Jul',
                    orders: 1890,
                },
                {
                    name: 'Aug',
                    orders: 2390,
                },
                {
                    name: 'Sep',
                    orders: 3490,
                },
            ]
        },
        totalRevenue:{
            value: 161238152,
            increment: -25,
            chartData: [
                {
                    name: 'Mar',
                    revenue: 2000,
                },
                {
                    name: 'Apr',
                    revenue: 3000,
                },
                {
                    name: 'May',
                    revenue: 2000,
                },
                {
                    name: 'Jun',
                    revenue: 2780,
                },
                {
                    name: 'Jul',
                    revenue: 1890,
                },
                {
                    name: 'Aug',
                    revenue: 2390,
                },
                {
                    name: 'Sep',
                    revenue: 3490,
                },
            ]
        },
        pendingOrders: {
            value: 400,
            increment: 5,
            chartData: [
                {
                    name: "Pending Orders",
                    placed: 900,
                    confirmed: 580,
                    out: 20,
                },
            ]
        },
        orders:[
            {
                order_id : "ORD062792963341",
                delivery_address : {
                    name: "Anish",
                    phoneNo: "78745245225",
                    pincode:854526
                },
                total_no_of_products: "5",
                total_amount : 8452,
                payment_method: "UPI",
                order_status: {
                    placed: {
                        status: true,
                        date: "2026-06-27T12:58:48.408Z"
                    },
                    confirmed: {
                        status: false
                    },
                    out: {
                        status: false
                    },
                    delivered: {
                        "status": false
                    },
                    canceled: {
                        "status": false
                    }
                },
                order_rating: 5
            },
            {
                order_id : "ORD062738902526",
                delivery_address : {
                    name: "Anish",
                    phoneNo: "78745245225",
                    pincode:854526
                },
                total_no_of_products: "5",
                total_amount : 8452,
                payment_method: "UPI",
                order_status: {
                    placed: {
                        status: true,
                        date: "2026-06-27T12:58:48.408Z"
                    },
                    confirmed: {
                        status: true
                    },
                    out: {
                        status: true
                    },
                    delivered: {
                        "status": false
                    },
                    canceled: {
                        "status": false
                    }
                },
                order_rating: 5
            },
            {
                order_id : "ORD062710921516",
                delivery_address : {
                    name: "Anish",
                    phoneNo: "78745245225",
                    pincode:854526
                },
                total_no_of_products: "5",
                total_amount : 8452,
                payment_method: "UPI",
                order_status: {
                    placed: {
                        status: true,
                        date: "2026-06-27T12:58:48.408Z"
                    },
                    confirmed: {
                        status: true
                    },
                    out: {
                        status: false
                    },
                    delivered: {
                        "status": false
                    },
                    canceled: {
                        "status": false
                    }
                },
                order_rating: 5
            },
            {
                order_id : "ORD062790229407",
                delivery_address : {
                    name: "Anish",
                    phoneNo: "78745245225",
                    pincode:854526
                },
                total_no_of_products: "2",
                total_amount : 8452,
                payment_method: "UPI",
                order_status: {
                    placed: {
                        status: true,
                        date: "2026-06-27T12:58:48.408Z"
                    },
                    confirmed: {
                        status: false
                    },
                    out: {
                        status: false
                    },
                    delivered: {
                        "status": false
                    },
                    canceled: {
                        "status": false
                    }
                },
                order_rating: 5
            },           
        ]
    }

    const findOrderStatus = (order_status)=> {
        const placed = order_status.placed
        const confirmed = order_status.confirmed 
        const out = order_status.out
        const delivered = order_status.delivered 
        const canceled = order_status.canceled  
        return canceled.status ? {value: "Canceled", color:"bg-red-500"} : 
            delivered.status ? {value: "Delivered", color:"bg-green-500"} : 
            out.status ? {value: "Out", color:"bg-green-500"} : 
            confirmed.status ? {value: "Confirmed", color:"bg-blue-500"} : 
            placed.status ? {value: "Placed", color:"bg-blue-500"} : 
            {value: "NaN", color:"yellow", date: "NaN"}
    }

    const totalOrders = data.totalOrders
    const totalRevenue = data.totalRevenue
    const pendingOrders = data.pendingOrders
    const orders = data.orders

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className='w-full p-5 font-inter'>
            {/* This page is running by sample data */}
            <div className='text-3xl text-red-500'>This page is running by sample data</div>
            <div className='text-3xl tracking-tight text-gray-800 font-semibold pt-1'>Orders</div>
            <div className='py-[10px] text-gray-500 tracking-tight font-medium'>Manage your recent orders and get through it</div>
            
            <AdminOrderHeaderComponent totalOrders={totalOrders} totalRevenue={totalRevenue} pendingOrders={pendingOrders}/>

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
                            <th className='py-4'>Amount</th>
                            <th className='py-4'>Status</th>
                            <th className='py-4'>Ratings</th>
                            <th className='py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) =>{
                            const status = findOrderStatus(order.order_status)
                            return(
                            <tr key={index} onClick={()=>setSelectedOrder(order.order_id)} className={`text-center border-b-[3px] border-gray-50 text-gray-800 text-base ${ selected_order == order.order_id ? "bg-gray-50" : ''}`}>
                                <td className='text-gray-600 font-semibold'>{index+1})</td>
                                <td className='text-start py-4'>
                                    <span className='text-lg text-gray-700 block pb-0.5 font-semibold'>#{order.order_id}</span>
                                    <span className='text-gray-500 text-[17px]'>{format(new Date(order.order_status?.placed?.date) , "dd/MM - p")}</span>
                                </td>
                                <td className='flex flex-col text-start py-4 font-medium '>
                                    <span className='text-lg text-gray-800 pb-0.5'>{order?.delivery_address?.name}</span>
                                    <span className='text-gray-500'>{order?.delivery_address?.phoneNo}</span>
                                </td>
                                <td className='py-4 font-medium text-lg text-gray-700'>{order.total_no_of_products} items</td>
                                <td className='flex flex-col py-4'>
                                    <span className='text-lg text-gray-800 pb-0.5 font-medium items-center flex justify-center'><FaIndianRupeeSign size={16} />{order?.total_amount?.toLocaleString()}</span>
                                    <span className='text-gray-500'>{order.payment_method}</span>
                                </td>
                                <td className='justify-items-center py-4'>
                                    <span className={`${status.color} p-2 block w-28 text-center text-white tracking-wide rounded-2xl`}>{status.value}</span>
                                </td>
                                <td>
                                    <span className='flex gap-0.5 py-4 items-center justify-center'>
                                        <IoIosStar className='h-5 w-5 text-amber-500'/>
                                        <span className='text-[18px] text-gray-600 font-medium'>{order.order_rating}</span>
                                    </span>
                                </td>
                                <td className='text-center h-full align-middle'>
                                    <FaEye onClick={() => navigate(`/admin/orders/order_id/${order.order_id}`)} className='cursor-pointer text-2xl inline-block' />
                                </td>
                            </tr>
                            )
                        })}
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




// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import LoadingSpinner from '../../../components/LoadingSpinner'
// import ErrorComponent from '../../../components/ErrorComponent'
// import { Button, Chip } from '@material-tailwind/react'
// import { format } from 'date-fns'
// import AdminSideBar from '../../../components/admin/AdminSideBar'

// const AdminOrderPage = () => {

//     const handleRef = useRef(true)
//     const navigate = useNavigate()
//     const [loading , setLoading] = useState(false)
//     const [error , setError ] = useState(false)
//     const [response, setResponse] = useState(null) 
//     const [orders , setOrders] = useState(null)

//     const [search_order_id, setSearchOrderId] = useState('')

//     useEffect(()=>{
//         const fetchAllOrder = async()=>{
//             try {
//                 setLoading(true)
//                 axios.defaults.withCredentials = true
//                 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order-page`)
//                 console.log("fetchAllOrder Payload : " , res.data)
//                 setResponse(res.data.data)
//                 setOrders(res.data.data.orders)
//             } catch (error) {
//                 console.error("error in fetchAllOrder function",error)
//                 setError(true)   
//             } finally {
//                 setLoading(false)
//             }
//         }
//         if(handleRef.current) {
//             fetchAllOrder()
//             handleRef.current = false
//         }
//     } , [])

//     const requestOrderById = async () => {
//         if(search_order_id.length > 10){
//             try {
//                 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order-page/search/${search_order_id}`)
//                 console.log("requestOrderById: ",res.data)
//                 setOrders(res.data?.data ? [res.data.data] : null) 
//             } catch (error) {
//                 console.error("error in requestOrderById :" , error)
//             }
//         }
//     }

//     const handleSearchOrderId = (e)=>{
//         const term = e.target.value
//         setSearchOrderId(term)
//         if(term.length == 0){ setOrders(response.orders)}
//     }

//     const findOrderStatus = (order_status)=> {
//         const placed = order_status.placed
//         const confirmed = order_status.confirmed 
//         const out = order_status.out
//         const delivered = order_status.delivered 
//         const canceled = order_status.canceled  
//         return canceled.status ? {value: "Canceled", color:"red", date: `${format(new Date(canceled?.date) , "dd-MM-yyyy")}`} : 
//             delivered.status ? {value: "Delivered", color:"green", date: `${format(new Date(delivered?.date) , "dd-MM-yyyy")}`} : 
//             out.status ? {value: "Out", color:"blue", date: `${format(new Date(out?.date) , "dd-MM-yyyy")}`} : 
//             confirmed.status ? {value: "Confirmed", color:"blue", date: `${format(new Date(confirmed?.date) , "dd-MM-yyyy")}`} : 
//             placed.status ? {value: "Placed", color:"blue", date: `${format(new Date(placed?.date) , "dd-MM-yyyy")}`} : 
//             {value: "NaN", color:"yellow", date: "NaN"}
//     }

//     if(loading){return <LoadingSpinner/>}
//     if(error){return <ErrorComponent/>}

//   return (
//     <div className='flex'>
//     <AdminSideBar />
//     <div className='p-2 bg-white w-full'>
//         <div className=' col-span-8 grid grid-cols-3 gap-5 w-full px-3 pt-3 text-gray-800 '>
//             <div onClick={()=>navigate('/admin/orders/all')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
//                 <span>Total Orders</span>
//                 <span className='text-5xl w-full px-5 h-full items-center flex'>{response?.total_orders ? response.total_orders : "NaN"}</span>
//             </div>
//             <div className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col '>
//                 <span className=''>Pending Orders</span>
//                 <span className='text-5xl w-full px-5 h-full items-center flex'>{response?.pending_orders ? response.pending_orders : "NaN"}</span>
//             </div>     
//             <div className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col '>
//                 <span>Today's Order</span>
//                 <span className='text-5xl w-full px-5 h-full items-center flex'>{response?.todays_order ? response.todays_order : response?.todays_order == 0 ? 0 : "NaN"}</span>
//             </div>         
//         </div>
//          <div className="w-full p-2">
//             <div className="rounded-none p-4">
//                 <div className="flex justify-between gap-4 ">
//                     <div className="items-center md:w-72 relative">
//                         <input type='text' value={search_order_id} onChange={(e)=>handleSearchOrderId(e)} onKeyDown={e => e.key == 'Enter' && requestOrderById()} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
//                     </div>
//                     <div><Button onClick={()=>navigate(`/admin/orders/all`)} size="sm" color='blue' variant='gradient'>View All</Button></div>
//                 </div>
//             </div>
//         </div>
//         <table className="w-full min-w-max table-auto text-left ">
//             <thead>
//                 <tr className='p-5 text-center border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-gray-600 tracking-wider'>
//                     <th className="font-normal p-4"></th>
//                     <th className="text-start font-normal p-4">Order Id</th>
//                     <th className='p-4 font-normal'>User</th>
//                     <th className='p-4 font-normal'>Products</th>
//                     <th className='p-4 font-normal'>Status</th>
//                     <th className='p-4 font-normal'>Amount</th>
//                 </tr>
//             </thead>
//             <tbody className=''>
//                 {orders?.length &&
//                 orders?.map(({ order_id, user_id, total_no_of_product, order_status, total_amount }, index) => {
//                     const status = findOrderStatus(order_status)
//                     const classes = index === orders?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
//                     return (
//                         <tr key={index} className='hover:bg-blue-gray-50/50 text-center text-sm text-blue-gray-800' onClick={()=>navigate(`/admin/orders/order_id/${order_id}`)}>
//                         <td className={`${classes} text-start w-5 border-r border-blue-gray-50 border-b-0 `}>{index+1}</td>
//                         <td className={`${classes} text-start hero`}><div className='tracking-wider'>{order_id}</div><div className="text-blue-gray-500">{status?.date}</div></td>
//                         <td className={classes}>{user_id?.name}</td>
//                         <td className={classes}>{total_no_of_product}</td>
//                         <td className={`${classes} place-items-center `}><Chip size='sm' className='w-24' color={status?.color ? status.color : "yellow"} variant='ghost'  value={status?.value ? status.value : "NaN"}/></td>
//                         <td className={classes}>{total_amount}</td>
//                     </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     </div>
//     </div>
//   )
// }

// export default AdminOrderPage

