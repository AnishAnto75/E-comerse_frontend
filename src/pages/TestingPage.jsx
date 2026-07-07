import React, { useState } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp, FaEye, FaIndianRupeeSign } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { IoIosStar } from 'react-icons/io'
import { CiFilter } from 'react-icons/ci'
import { IoCloseSharp, IoFilter } from 'react-icons/io5'
import { toast } from 'react-toastify'
import AdminSideBar from "../components/admin/AdminSideBar"

const TestingPage = () => {
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

    // if(loading){return <LoadingSpinner />}
    // if(error){return <ErrorComponent />}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className='w-full p-5 font-inter'>
            {/* This page is running by sample data */}
            <div className='text-3xl text-red-500'>This page is running by sample data</div>
            <div className='text-3xl tracking-tight text-gray-800 font-semibold pt-1'>Good Morning, Admin</div>
            <div className='py-[10px] text-gray-500 tracking-normal font-medium'>Here's an overview of today's business performance.</div>
            
            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className='col-span-1 shadow-md border rounded-xl p-5'>
                    <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Orders</div>
                    <div className='flex items-center gap-3 py-3 font-inter'>
                        <span className='text-3xl font-semibold text-gray-800'>{totalOrders.value.toLocaleString()}</span>
                        <span className={`flex items-center font-medium ${totalOrders.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                            {totalOrders.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                            {Math.abs(totalOrders.increment)}%
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>            
                        <AreaChart data={totalOrders.chartData}>
                            <defs>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0}  padding={{ left: 12, right: 10 }} />
                            <Tooltip cursor={false}/>
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorOrders)"
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={1100}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className='col-span-1 rounded-xl shadow-md border p-5'>
                    <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Total Revenue</div>
                    <div className='flex items-center gap-3 py-3 font-inter'>
                        <span className='text-3xl font-semibold text-gray-800 flex items-center'><FaIndianRupeeSign size={26} />{totalRevenue.value.toLocaleString()}</span>
                        <span className={`flex items-center font-medium ${totalRevenue.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                            {totalRevenue.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                            {Math.abs(totalRevenue.increment)}%
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>            
                        <AreaChart data={totalRevenue.chartData}>
                            <defs>
                                <linearGradient id="colordata" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} padding={{ left: 12, right: 10 }} />
                            <Tooltip cursor={false}/>
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="green"
                                fillOpacity={1}
                                fill="url(#colordata)"
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={1100}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className='col-span-1 rounded-xl shadow-md border p-5'>
                    <div className='text-gray-600 font-medium tracking-tight text-[16.5px]'>Pending Orders</div>
                    <div className='flex items-center gap-3 py-3 font-inter'>
                        <span className='text-3xl font-semibold text-gray-800'>{pendingOrders.value.toLocaleString()}</span>
                        <span className={`flex items-center font-medium ${pendingOrders.increment < 0 ? "text-red-500" : "text-green-500"}`}>
                            {pendingOrders.increment < 0 ? <FaArrowDown /> : <FaArrowUp />}
                            {Math.abs(pendingOrders.increment)}%
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={143}>
                        <BarChart data={pendingOrders.chartData} layout="vertical" barSize={120} margin={{bottom:10}}>
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip cursor={false}/>
                            <Bar dataKey="placed" stackId="pending" fill="#3B82F6" radius={[8, 0, 0, 8]}/>
                            <Bar dataKey="confirmed" stackId="pending" fill="#F59E0B"/>
                            <Bar dataKey="out" stackId="pending" fill="#10B981" radius={[0, 8, 8, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-5 mt-2 text-s font-inter tracking-tight ">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span>Placed ({pendingOrders.chartData[0].placed})</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span>Confirmed ({pendingOrders.chartData[0].confirmed})</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>Out ({pendingOrders.chartData[0].out})</span>
                        </div>
                    </div>
                </div>

            </div>

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
    </div>
  )
}

export default TestingPage