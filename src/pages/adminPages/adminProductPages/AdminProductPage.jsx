import React, { useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { FaArrowDown, FaArrowUp, FaEye } from 'react-icons/fa6'
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

const AdminProductPage = () => {
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selected_order, setSelectedOrder ] = useState(null)

    const data = {
        total_products : 4500,
        total_inventory: 100000,
        total_inventory_value: 35987450,
        low_in_stock: 450,
        out_of_stock: 542,
        active_products: 3800,

        orders:[
            {
                order_id : "ORD062792963341",
                delivery_address : {
                    name: "Anish",
                    phoneNo: "78745245225",
                    pincode:854526
                },
                total_no_of_produc: "5",
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
                total_no_of_produc: "5",
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
                total_no_of_produc: "5",
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
                total_no_of_produc: "5",
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
            <div className='text-3xl tracking-tight text-gray-800 font-semibold pt-1'>Products</div>
            <div className='py-[10px] text-gray-500 tracking-tight font-medium'>Manage all your products and inventory</div>

            {/* Header Cards */}
            <div className="grid grid-cols-6 gap-5 mt-3 ">
                <div className="bg-white rounded-xl border-t-4 border-blue-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Total Products</div>
                    <div className="text-4xl font-bold text-blue-600 mt-2">{data.total_products.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-xl border-t-4 border-green-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Total Inventory</div>
                    <div className="text-4xl font-bold text-green-600 mt-2">{data.total_inventory.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-xl border-t-4 border-indigo-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Inventory Value</div>
                    <div className="text-4xl font-bold text-indigo-600 mt-2">₹{data.total_inventory_value.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-xl border-t-4 border-amber-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Low Stock</div>
                    <div className="text-4xl font-bold text-amber-600 mt-2">{data.low_in_stock.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-xl border-t-4 border-red-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Out of Stock</div>
                    <div className="text-4xl font-bold text-red-600 mt-2">{data.out_of_stock.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-xl border-t-4 border-cyan-500 shadow-md p-5">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Active Products</div>
                    <div className="text-4xl font-bold text-cyan-600 mt-2">{data.active_products.toLocaleString()}</div>
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
                        <tr className='text-blue-gray-500'>
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
                                    <td className='py-4 font-medium text-lg text-gray-700'>{order.total_no_of_produc} items</td>
                                    <td className='flex flex-col py-4'>
                                        <span className='text-lg text-gray-800 block pb-0.5 font-medium'>{order.total_amount.toLocaleString()}</span>
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

export default AdminProductPage




// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip,} from "@material-tailwind/react";
// import { debounce } from 'lodash';
// import LoadingSpinner from '../../../components/LoadingSpinner';
// import ErrorComponent from '../../../components/ErrorComponent';
// import AdminSideBar from '../../../components/admin/AdminSideBar';
// import { FaEye } from 'react-icons/fa';
// import { MdEdit } from 'react-icons/md';

// const AdminProductPage = () => {
    
//     const navigate = useNavigate()
//     const [loading , setLoading] = useState(false)
//     const [error , setError] = useState(false)
//     const [response, setResponse] = useState(null)
//     const [products, setProducts] = useState(null)
//     const handleRef = useRef(true) 

//     const [search_products_name, setSearchProductsName] = useState('')

//     useEffect(()=>{
//         const fetchForProductPage = async()=>{
//             try {
//                 setLoading(true)
//                 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/product-page`)
//                 console.log("fetchForProductPage payload : " , res.data)
//                 setResponse(res.data?.data)
//                 setProducts(res.data?.data?.products)
//             } catch (error) {
//                 setError(true)
//                 toast.error(error.response?.data?.message)
//                 console.log("error in fetchForProductPage :" , error)
//             } finally { setLoading(false) }
//         }
//         if(handleRef.current) {
//             fetchForProductPage()
//             handleRef.current = false
//         }
//     } , [])

//     const requestProductsByName = debounce(async (term) => {
//         if(term.length > 1){
//             try {
//                 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/search?name=${term}`)
//                 setProducts(res.data.data) 
//             } catch (error) {
//                 console.error("error in requestProductsByName :" , error)
//             }
//         }
//     },500)

//     const handleSearchProducts = (e) => {
//         const term = e.target.value;
//         setSearchProductsName(term)
//         if(term?.length > 1){requestProductsByName(term)}
//         else{setProducts(response.products)}
//     }

//     if(loading){return <LoadingSpinner/>}
//     if(error){return <ErrorComponent/>}
//     if(!response){return <ErrorComponent/>}

//   return (
//     <div className='flex'>
//     <AdminSideBar />
//     <div className='p-2 w-full bg-white'>
//         <div className=' col-span-8 grid grid-cols-3 gap-5 w-full px-3 pt-3 text-gray-800'>
//             <div onClick={()=> navigate('/admin/products/all-products')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
//                 <span>Total Products</span>
//                 <span className='text-5xl w-full px-5 h-full items-center flex'>{response?.total_products ? response.total_products : "NaN"}</span>
//             </div>            
//             <div onClick={()=> navigate('/admin/products/low-in-stock')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
//                 <span className=''>Low Stock Products</span>
//                 <span className='text-5xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.low_in_stock ? response.low_in_stock : "NaN"}</span>
//             </div>     
//             <div onClick={()=>navigate('/admin/stock')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
//                 <span>Total Stock</span>
//                 <span className='text-4xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.total_stock ? response.total_stock : "NaN"}</span>
//             </div>         
//         </div>
//         <div className="w-full p-2">
//             <div className="rounded-none p-4">
//                 <div className="flex justify-between gap-4 ">
//                     <div className="items-center md:w-72 relative">
//                         <input type='text' value={search_products_name} onChange={(e)=>handleSearchProducts(e)} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
//                     </div>
//                     <div className="flex shrink-0 items-center gap-2">
//                         <Button onClick={()=>navigate(`/admin/products/all-products`)} variant="outlined" color='blue' size="sm">view all</Button>
//                         <Button onClick={()=>navigate(`/admin/brands`)} size="sm" color='blue' variant='gradient'>Brands</Button>
//                         <Button onClick={()=>navigate(`/admin/groups-categories`)} size="sm" color='blue' variant='gradient'>Groups & Categories</Button>
//                         <Button onClick={()=>navigate(`/admin/products/new-product`)} size="sm" color='blue' variant='gradient'>Add Product</Button>
//                     </div>
//                 </div>
//             </div>
//             <div className="pt-2 px-0">
//                 <table className="w-full min-w-max table-auto text-left ">
//                     <thead>
//                         <tr className='border-y border-blue-gray-100 text-center'>
//                             <th className="bg-blue-gray-50/50 p-4 text-start">
//                                 <div className="font-normal text-sm  text-gray-600 tracking-wider leading-none pl-5">Particulars</div>
//                             </th>
//                             <th className="bg-blue-gray-50/50 p-4">
//                                 <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Brand</div>
//                             </th>
//                             <th className="bg-blue-gray-50/50 p-4">
//                                 <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Stock</div>
//                             </th>
//                             <th className="bg-blue-gray-50/50 p-4">
//                                 <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Actions</div>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className=''>
//                         {products?.map((product, index) => {
//                             const isLast = index === products?.length - 1;
//                             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
//                             return (
//                                 <tr key={index} className='hover:bg-gray-50 text-center'>
//                                 <td className={`${classes}`}>
//                                     <div className="flex items-center text-start gap-3">
//                                         <Avatar src={product.product_photos ? product.product_photos : '/3-08.webp'} alt={product.product_brand} size="md" />
//                                         <div className="flex flex-col text-sm">
//                                             <div className="font-normal text-blue-gray-700 line-clamp-1">{product.product_name}</div>
//                                             <div className="font-normal text-blue-gray-700 opacity-70">{product.product_barcode}</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className={classes}>
//                                     <div className="text-sm text-blue-gray-800 line-clamp-1">{product?.product_brand?.Brand_name}</div>
//                                 </td>
//                                 <td className={classes}>
//                                     <div className="text-sm text-blue-gray-800 line-clamp-1">{product?.product_inventory_id?.product_total_stock}</div>
//                                 </td>
//                                 <td className={classes}>
//                                     <div className='flex justify-center gap-2 h-full w-full text-gray-700'>
//                                         <FaEye onClick={()=>navigate(`product_id/${product.product_barcode}`)} className='text-2xl cursor-pointer h-10 w-7'/>
//                                         <MdEdit onClick={()=>navigate(`edit/${product.product_barcode}`)} className='text-2xl cursor-pointer h-10 w-7' />
//                                     </div>
//                                 </td>
//                             </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default AdminProductPage