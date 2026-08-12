import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaEye, FaIndianRupeeSign, FaPlus } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ErrorComponent from '../../../components/ErrorComponent'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { FiClock, FiFileText } from 'react-icons/fi'
import { BiRupee } from 'react-icons/bi'

const AdminPurchasePage = () => {
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    const [pagination , setPagination] = useState(null)
        
    const [summary, setSummary] = useState(null)
    const [purchases, setPurchases] = useState(null)
    
    const data = {
        summary: {
            total_purchases: 500,
            pending_purchases: 3,
            partialy_paid_purchases: 50
        },
        purchases: [
            {
                purchase_id: "PUR971487484",
                supplier: {
                    _id: "69da818e3233da093c184147",
                    supplier_id: "SUP0411345754",
                    supplier_name: "nila agencies",
                    supplier_phone: "8148222505",
                },
                supplier_invoice_no: "9274",
                invoice_date: "2026-04-19T16:33:13.482Z",
                delivery_date: "2026-04-19T16:33:13.482Z",
                grand_total: "2000",
                balance_amount: 0,
                payment_status: "Partially",
                total_items: 5
            },
        ]
    }

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/purchase/purchase_page`, { params: { page, limit }, withCredentials: true });
                console.log("fetchPurchasePage payload : " , res.data)
                setSummary(res.data?.data?.summary)
                setPurchases(res.data?.data?.purchases)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                console.error("Error in fetchPurchasePage:", error);
                toast.error( error?.response?.data?.message)
            } finally { setLoading(false);}
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])
    
    const dateFormat = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd MMM yyyy")}`
    }

    if(loading){return <LoadingSpinner/>}
    if(error || !purchases || !summary || !pagination){return <ErrorComponent/>}

    return (
    <div className='flex'>
        <AdminSideBar />
        <div className="w-full p-5 font-inter font-medium text-lg text-gray-">

            <div className="flex justify-between items-center mb-5 mt-3">
                <div>
                    <h1 className="text-3xl font-semibold">Purchases</h1>
                    <p className="text-gray-600 mt-2">Every purchase, tracked and organized in one place.</p>
                </div>
                <button onClick={()=>navigate('purchase-entry')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Entry</button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
                <div className='bg-white rounded-2xl border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sky-500 font-semibold">TOTAL PURCHASES</p>
                            <h2 className='text-2xl mt-2 font-bold text-sky-600'>{summary?.total_purchases?.toLocaleString() || 0}</h2>
                        </div>
                        <div className={`bg-sky-50 text-sky-600 p-2 rounded-2xl`}>
                            <FiFileText size={35}/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-amber-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-amber-500 font-semibold">PARTIALLY PAID PURCHASES</p>
                            <h2 className='text-2xl mt-2 font-bold text-amber-600'>{summary?.partialy_paid_purchases?.toLocaleString() || 0}</h2>
                        </div>
                        <div className={`bg-amber-50 p-2 text-amber-600 rounded-2xl`}>
                            <BiRupee size={35}/>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-red-500 font-semibold">PENDING CASH PURCHASES</p>
                            <h2 className='text-2xl mt-2 font-bold text-red-600'>{summary?.pending_purchases?.toLocaleString() || 0}</h2>
                        </div>
                        <div className={`bg-red-50 p-2 text-red-600 rounded-2xl`}>
                            <FiClock size={35} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-[18px] text-gray-400" />
                        <input type="text" placeholder="Search invoices, supplier" className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none"/>
                    </div>

                    <select className="border rounded-xl px-4 py-3">
                        <option disabled>Status</option>
                        <option>All</option>
                        <option>Paid</option>
                        <option>Partially</option>
                        <option>Pending</option>
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto mt-5 mx-5">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20 bg-white shadow-sm">
                            <tr className="text-gray-500">
                                <th className='py-4' />
                                <th className='py-4 font-semibold text-start'>Supplier</th>
                                <th className='py-4 font-semibold text-start'>Invoice</th>
                                <th className='py-4 font-semibold'>Items</th>
                                <th className='py-4 font-semibold'>Amount</th>
                                <th className='py-4 font-semibold'>Payment Status</th>
                                <th className='py-4 font-semibold'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {purchases?.map((purchase, index) =>(
                            <tr key={index} className={`text-center hover:bg-gray-50 `}>
                                <td className='text-gray-600 font-semibold'>{index+1})</td>
                                <td className='text-start py-4'>
                                    <div className="flex flex-col">
                                        <span className='mb-0.5 font-semibold uppercase'>{purchase?.supplier?.supplier_name}</span>
                                        <span className='text-gray-500 text-base'>{purchase?.supplier?.supplier_phone}</span>
                                    </div>
                                </td>
                                <td className='py-4 '>
                                    <div className="flex flex-col text-start">
                                        <span className='mb-0.5 font-semibold'>{purchase?.supplier_invoice_no}</span>
                                        <span className='text-gray-500 text-base'>{dateFormat(purchase?.invoice_date)}</span>
                                    </div>
                                </td>
                                <td className='py-4 text-gray-700'>{purchase?.total_items} items</td>
                                <td className='py-4 '>
                                    <div className="flex flex-col text-gray-700">
                                        <div className='flex justify-center items-center mb-0.5 font-semibold'><FaIndianRupeeSign />{purchase?.grand_total?.toLocaleString()}</div>
                                        { purchase.balance_amount ? <div className='flex justify-center items-center text-gray-500 text-base'><FaIndianRupeeSign />{purchase.balance_amount.toLocaleString()}</div> : <div /> }
                                    </div>
                                </td>
                                <td className='py-4 capitalize' >
                                    <span className={`p-2 rounded-xl px-3 capitalize text-white ${ purchase?.payment_status == "Paid" ? "bg-green-500" : purchase?.payment_status == "Partial" ? "bg-amber-500" : purchase?.payment_status == "Pending" && "bg-red-500" }`}>{purchase?.payment_status}</span>
                                </td>
                                <td className='text-center h-full align-middle'>
                                    <FaEye onClick={() => navigate(`/admin/purchase/purchase_id/${purchase.purchase_id}`)} className='cursor-pointer text-2xl inline-block' />
                                </td>
                            </tr>
                        ))}
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
    </div>
  )
}

export default AdminPurchasePage