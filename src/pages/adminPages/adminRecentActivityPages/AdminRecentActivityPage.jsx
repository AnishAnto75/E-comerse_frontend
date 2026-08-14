import React, { useState } from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch, FaUsers, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaIndianRupeeSign, FaMoneyBillTrendUp } from "react-icons/fa6";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminStaffPreviewComponent from "../../../components/admin/AdminStaffComponent/AdminStaffPreviewComponent";
import { FiUserMinus, FiUserX } from "react-icons/fi";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import LoadingComponent from "../../../components/LoadingComponent";

const AdminRecentActivityPage = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [selected_staff , setSelectedStaff] = useState(null)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    const [pagination , setPagination] = useState(null)    
    const [staffs, setStaffs] = useState(null)
    
    useEffect(()=>{
        const controller = new AbortController()
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/staff/staff_page`, { params: { page, limit }, withCredentials: true, signal: controller.signal })
                console.log("fetchStaffPage payload : " , res.data)
                setStaffs(res.data?.data?.staffs)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                if (error.name === "CanceledError") { return }
                if (axios.isCancel(error)) { return }
                setError(true)
                console.error("Error in fetchStaffPage:", error)
            } finally {
                if (!controller.signal.aborted) { setLoading(false) }
            }
        }
        fetch()
        return () => { controller.abort() }
    } , [page, limit ])

    if( error || !staffs ){return <ErrorComponent/>}
    
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="w-full border-l p-5 font-inter font-medium text-lg text-gray-900">

        <div className="mb-5 mt-3">
            <h1 className="text-3xl font-semibold">Recent Activity</h1>
            <p className="text-gray-600 mt-2">Track the latest actions and updates.</p>
        </div>

        <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
            <div className="flex-1 overflow-y-auto">
            { loading ? 
                <LoadingComponent />
                :
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-400">
                            <th className="py-4 font-medium bg-white"></th>
                            <th className="py-4 font-semibold bg-white text-start"></th>
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
                                        <span className='font-semibold'>{staff.email || "---"}</span>
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
            }
            </div>
            { !loading && pagination &&
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

export default AdminRecentActivityPage