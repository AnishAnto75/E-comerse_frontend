import React, { useState } from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch, FaUsers, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaIndianRupeeSign, FaMoneyBillTrendUp } from "react-icons/fa6";
import { FiUserMinus, FiUserX } from "react-icons/fi";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminStaffPreviewComponent from "../components/admin/AdminStaffComponent/AdminStaffPreviewComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";

const AdminStaffManagementPage = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    
    const [pagination , setPagination] = useState(null)
        
    const [summary, setSummary] = useState(null)
    const [staffs, setStaffs] = useState(null)
    
    const [selected_staff , setSelectedStaff] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        const controller = new AbortController();
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/staff/staff_page`, { params: { page, limit }, withCredentials: true });
                console.log("fetchStaffPage payload : " , res.data)
                setSummary(res.data?.data?.summary)
                setStaffs(res.data?.data?.staffs)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                console.error("Error in fetchStaffPage:", error);
                toast.error( error?.response?.data?.message)
            } finally {
                if (!controller.signal.aborted) { setLoading(false) }
            }
        }
        fetch()
    } , [page, limit])

    // if(loading){return <LoadingSpinner/>}
    if(error || !staffs || !summary || !pagination){return <ErrorComponent/>}
    
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="w-full p-5 font-inter font-medium text-lg text-gray-900">

        <div className="flex justify-between items-center mb-5 mt-3">
            <div>
                <h1 className="text-3xl font-semibold">Staff Management</h1>
                <p className="text-gray-600 mt-2">Manage employees, roles, and access permissions.</p>
            </div>
            <button onClick={()=>navigate('/admin/staff/create-staff')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Staff</button>
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
            <div className='bg-white rounded-2xl  border-t-4 border-indigo-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-indigo-500 font-semibold">TOTAL EMPLOYEE</p>
                        <h2 className='text-3xl mt-2 font-bold text-indigo-600'>{summary.total_employee}</h2>
                    </div>
                    <div className={`bg-indigo-50 p-2 rounded-2xl`}>
                        <FaUsers size={35} className="text-indigo-600"/>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-2xl border-t-4 border-sky-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sky-500 font-semibold">ACTIVE EMPLOYEE</p>
                        <h2 className='text-3xl mt-2 font-bold text-sky-500'>{summary.active_employee}</h2>
                    </div>
                    <div className={`bg-sky-50 text-sky-500 p-2 rounded-2xl`}>
                        <FaUserCheck size={35} />
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-2xl border-t-4 border-gray-600 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 font-semibold">INACTIVE EMPLOYEE</p>
                        <h2 className='text-3xl mt-2 font-bold text-gray-700'>{summary.inactive_employee}</h2>
                    </div>
                    <div className={`bg-gray-50 p-2 text-gray-600 rounded-2xl`}>
                        <FiUserMinus size={35} />
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-2xl border-t-4 border-red-500 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6'>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-red-500 font-semibold">BLOCKED EMPLOYEE</p>
                        <h2 className='text-3xl mt-2 font-bold text-red-500'>{summary.blocked_employee}</h2>
                    </div>
                    <div className={`bg-red-50 text-red-500 p-2 rounded-2xl`}>
                        <FiUserX size={35} />
                    </div>
                </div>
            </div>
        </div>

        <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-[18px] text-gray-400" />
                    <input type="text" placeholder="Search products, barcode" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 outline-none"/>
                </div>
                <div className="flex flex-wrap gap-3">

                    <select className="border rounded-xl px-4 py-3">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Blocked</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3">
                        <option>Roles</option>
                        <option>Staff</option>
                        <option>Delevery</option>
                        <option>Managers</option>
                    </select>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-5">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-400">
                            <th className="py-4 font-medium bg-white"></th>
                            <th className="py-4 font-semibold bg-white text-start">Employee Name </th>
                            <th className="py-4 font-semibold bg-white text-start">Email / Ph. No</th>
                            <th className="py-4 font-semibold bg-white">Department</th>
                            <th className="py-4 font-semibold bg-white">Salary</th>
                            <th className="py-4 font-semibold bg-white">Gender</th>
                            <th className="py-4 font-semibold bg-white">Joined</th>
                            <th className="py-4 font-semibold bg-white">Status</th>
                            <th className="py-4 font-semibold bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {staffs?.map((staff, index) =>{
                        return(
                            <tr key={index} onClick={()=>setSelectedStaff(staff.staff_id)} className={`text-center hover:bg-gray-50 ${ staff.staff_id == selected_staff ? "bg-gray-100" : ''}`}>
                                <td className='text-gray-600 font-semibold px-2'>{index+1})</td>
                                <td className="text-start ">
                                    <div className="flex items-center gap-2 py-2">
                                        <div className="h-20 w-20 p-1">
                                            <img src={`${import.meta.env.VITE_IMAGE_URL}${staff?.photo?.url}`} alt={staff?.name} className="w-full h-full rounded-xl object-contain"/>
                                        </div>
                                        <div className="flex flex-col ">
                                            <span className='mb-0.5 font-semibold capitalize'>{staff.name}</span>
                                            <span className='text-gray-500 text-[17px]'>{staff.staff_id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-4'>
                                    <div className="flex text-start capitalize flex-col">
                                        <span className='font-semibold'>{staff.email}</span>
                                        <span className='text-gray-500'>{staff.phone_number}</span>
                                    </div>
                                </td>
                                <td className='py-4'>
                                    <div className="flex capitalize flex-col">
                                        <span className='font-semibold'>{staff.department}</span>
                                        <span className='text-gray-500'>{staff.role}</span>
                                    </div>
                                </td>
                                <td className='py-4 '>
                                    { staff.salary ? <div className="flex items-center justify-center"><FaIndianRupeeSign />{ staff.salary?.toLocaleString() }</div> : "---" }
                                </td>
                                <td className='py-4 capitalize'>{staff.gender}</td>
                                <td className='py-4 '>{format(staff.joining_date, 'dd MMM yyy')}</td>
                                <td className='py-4'>
                                    <span className={`p-2 rounded-xl px-3 capitalize text-white ${ staff.status == "blocked" ? "bg-red-500" : staff?.status == "active" ? "bg-sky-500" : "bg-gray-600" }`}>{staff?.status == "inactive" ? "In Active" : staff.status}</span>
                                </td>
                                <td className='space-x-2 text-2xl '>
                                    <FaEye onClick={() => navigate(`/admin/staff/staff_id/${staff.staff_id}`)} className='cursor-pointer text-cyan-600 inline-block' />
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <div className="pt-5 flex justify-between items-center px-3 border-t ">
                <div className="text-gray-500">
                    Showing page <span className="text-gray-600">{pagination.current_page}</span> of <span className="text-gray-700">{pagination.total_pages}</span>
                    <span className="mx-3">•</span>
                    {pagination.total_staff} results found
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
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className="text-gray-600">per page</span>
                </div>
            </div>
        </div>
    </div>

    {/* Product Preview */}
    {selected_staff &&
    <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
        <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
            <IoCloseSharp onClick={()=>setSelectedStaff(null)} className='absolute top-4 right-4 text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
            <AdminStaffPreviewComponent staff_id={selected_staff} />
        </div>
    </div> 
    } 
    </div>
  );
};

export default AdminStaffManagementPage