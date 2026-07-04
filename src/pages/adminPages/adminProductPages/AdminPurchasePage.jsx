import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaEye, FaIndianRupeeSign, FaPlus } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import AdminSupplierTopRequestedComponent from '../../../components/admin/AdminSupplierComponent.jsx/AdminSupplierTopRequestedComponent'
import AdminPurchaseChartComponent from '../../../components/admin/AdminPurchaseComponents/AdminPurchaseChartComponent'

const AdminPurchasePage = () => {
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selectedPurchase, setSelectedPurchase ] = useState(null)
    
    const data = {
        totalPurchaseInvoice:{
            value: 1025,
            increment: 15,
            chartData: [
                {
                    name: 'Mar',
                    invoices: 4000,
                },
                {
                    name: 'Apr',
                    invoices: 3000,
                },
                {
                    name: 'May',
                    invoices: 2000,
                },
                {
                    name: 'Jun',
                    invoices: 2780,
                },
                {
                    name: 'Jul',
                    invoices: 1890,
                },
                {
                    name: 'Aug',
                    invoices: 2390,
                },
                {
                    name: 'Sep',
                    invoices: 3490,
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
        totalPurchaseValue :{
            value: 16123152,
            increment: -25,
            chartData: [
                {
                    name: 'Mar',
                    purchase_value: 2000,
                },
                {
                    name: 'Apr',
                    purchase_value: 3000,
                },
                {
                    name: 'May',
                    purchase_value: 2000,
                },
                {
                    name: 'Jun',
                    purchase_value: 2780,
                },
                {
                    name: 'Jul',
                    purchase_value: 1890,
                },
                {
                    name: 'Aug',
                    purchase_value: 2390,
                },
                {
                    name: 'Sep',
                    purchase_value: 2090,
                },
            ]
        },
        requested_products: [
            {
                product_name: "Apple Charger",
                request_count: 10
            },
            {
                product_name: "Speaker",
                request_count: 10
            },
            {
                product_name: "Sony TV",
                request_count: 10
            },
            {
                product_name: "Office Chair",
                request_count: 10
            },
            {
                product_name: "Gaming Keyboard",
                request_count: 10
            },
            {
                product_name: "Monitor",
                request_count: 10
            },
            {
                product_name: "Laptop",
                request_count: 10
            },
            {
                product_name: "Mobile",
                request_count: 10
            },
            {
                product_name: "Samsung galaxy g55 128gb",
                request_count: 10
            },
        ],
        purchases: [
            {
                _id: "69e503c93fd2367d0fbea215",
                supplier_id: {
                    _id: "69da818e3233da093c184147",
                    supplier_id: "SUP0411345754",
                    supplier_name: "nila agencies",
                    supplier_phone: "8148222505",
                },
                invoice_no: "nila-3",
                products: [
                    {
                        product_barcode: "UP",
                        quantity_recieved: 50,
                    },
                    {
                        product_barcode: "SP",
                        quantity_recieved: 50,
                    },
                    {
                        product_barcode: "KVR",
                        quantity_recieved: 50,
                    },
                ],
                total_purchase_amount: 2500,
                added_by : {
                    staff_username: "Anish",
                    staff_id: "STF0627732539"
                },
                createdAt: "2026-04-19T16:33:13.482Z",
            },
            {
                _id: "69e5222309d99ca0d29455ef",
                supplier_id: {
                    "_id": "69da818e3233da093c184147",
                    supplier_id: "SUP0411345754",
                    supplier_name: "Nila agencies",
                    supplier_phone: "9080996465",
                },
                invoice_no: "nila-5",
                products: [
                    {
                        "product_barcode": "CO",
                        "quantity_recieved": 51,
                    }
                ],
                total_purchase_amount: 1071,
                added_by: {
                    staff_username: "Anish",
                    staff_id: "STF0627732539"
                },
                createdAt: "2026-04-19T18:42:43.932Z"
            }
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

    const orders = data.orders
    
    const totalPurchaseInvoice = data.totalPurchaseInvoice
    const totalRevenue = data.totalRevenue
    const totalPurchaseValue = data.totalPurchaseValue
    const requested_products = data.requested_products
    const purchases = data.purchases

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className="flex-1 min-w-0 min-h-screen p-5 font-inter">

            {/* This page is running by sample data */}
            <div className='text-3xl text-red-500'>This page is running by sample data</div>
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Purchases</h1>
                    <p className="text-gray-600 mt-2"> Every purchase, tracked and organized in one place.</p>
                </div>
                <button onClick={()=>navigate('/admin/purchase/purchase-entry')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Entry</button>
            </div>

            <AdminPurchaseChartComponent totalPurchaseInvoice={totalPurchaseInvoice} totalPurchaseValue={totalPurchaseValue} totalRevenue={totalRevenue} />

            <AdminSupplierTopRequestedComponent requested_products={requested_products} />

            <div className="h-[calc(100vh-40px)] border flex flex-col mt-8 rounded-2xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input type="text" placeholder="Search invoices, supplier" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                    </div>

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Deleted</option>
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto mt-5 mx-5">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-white shadow-sm">
                            <tr className="text-gray-500">
                                <th className='py-4' />
                                <th className='py-4'>Invoice No.</th>
                                <th className='py-4 text-start'>Supplier</th>
                                <th className='py-4'>Items</th>
                                <th className='py-4'>Amount</th>
                                <th className='py-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {purchases?.map((purchase, index) =>(
                            <tr key={index} onClick={()=>setSelectedPurchase(purchase.purchase_id)} className={`text-center border-b-[3px] border-gray-50 text-gray-800 text-base ${ selectedPurchase == purchase._id ? "bg-gray-50" : ''}`}>
                                <td className='text-gray-600 font-semibold'>{index+1})</td>
                                <td className='py-4 font-medium text-lg text-gray-700'>{purchase?.invoice_no}</td>
                                <td className='text-start py-4'>
                                    <div className="flex flex-col">
                                        <span className='mb-0.5 font-semibold uppercase'>{purchase?.supplier_id?.supplier_name}</span>
                                        <span className='text-gray-500 text-[16.5px]'>{purchase?.supplier_id?.supplier_phone}</span>
                                    </div>
                                </td>
                                <td className='py-4 font-medium text-lg text-gray-700'>{purchase?.products?.length} items</td>
                                <td className='py-4 font-medium text-lg text-gray-700'>
                                    <div className='flex justify-center items-center'><FaIndianRupeeSign />{purchase?.total_purchase_amount?.toLocaleString()}</div>
                                </td>
                                <td className='text-center h-full align-middle'>
                                    <FaEye onClick={() => navigate(`/admin/orders/order_id/${order.order_id}`)} className='cursor-pointer text-2xl inline-block' />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="pt-7 pb-2 flex justify-center border-t ">
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
    </div>
  )
}

export default AdminPurchasePage