import React, { useState } from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch, FaUsers, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Label} from "recharts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaIndianRupeeSign, FaMoneyBillTrendUp } from "react-icons/fa6";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminProductPreviewComponent from "../../../components/admin/AdminProductComponents/AdminProductPreviewComponent";
import AdminStaffPreviewComponent from "../../../components/admin/AdminStaffComponent/AdminStaffPreviewComponent";
import AdminStaffHeaderCardsComponent from "../../../components/admin/AdminStaffComponent/AdminStaffHeaderCardsComponent";
import AdminStaffChartComponent from "../../../components/admin/AdminStaffComponent/AdminStaffChartComponent";

const AdminStaffManagementPage = () => {

    const navigate = useNavigate()
    const [selected_employee , setSelectedEmployee] = useState(null)

    const data = {
        total_employee : 105 ,
        active_employee : 90,
        inactive_employee : 15,
        employe_expenditure :{ 
            value : 1502045,
            chartData:[
                { month: "Jan", expense : 89000 },
                { month: "Feb", expense : 96000 },
                { month: "Mar", expense : 91000 },
                { month: "Apr", expense : 104000 },
                { month: "May", expense : 105054 },
                { month: "Jun", expense : 124822 },
                { month: "Jul", expense : 134820 },
                { month: "Aug", expense : 124820 },
                { month: "Sep", expense : 144820 },
                { month: "Oct", expense : 154820 },
                { month: "Nov", expense : 124820 },
                { month: "Dec", expense : 164820 },
            ]
        },
        employeeRoleData : {
            total_employee : [
                { name: 'Total', value: 105 },
            ],
            data : [
                { name: 'Staff', value: 55 },
                { name: 'managers', value: 5 },
                { name: 'Delevery', value: 45 },
            ]
        },
        employeeData: [
            {
                gender: "male",
                salary: 15000,
                photo: '/3-08.webp',
                status: "active",
                last_login: "2026-07-04T16:22:25.625Z",
                _id: "6a3f9a5550650a2226dcaaaf",
                staff_id: "STF0627732539",
                name: "staff1",
                email: "staff1",
                role: "delivery",
                phone_number: 8451255645,
                staff_DOB: null,
                joining_date: "2026-07-04T16:22:25.625Z"
            },
            {
                gender: "female",
                salary: 30000,
                photo: '/3-08.webp',
                status: "inactive",
                last_login: "2020-07-04T16:22:25.625Z",
                _id: "6a3f9a5550650a2226dcaaaf",
                staff_id: "STF0627732585",
                name: "Anish Anto",
                email: "antoanish75@gmail.com",
                role: "General Manager",
                phone_number: 8451255645,
                staff_DOB: "2005-12-05T16:22:25.625Z",
                joining_date: "2026-07-04T16:22:25.625Z"
            },
        ]
    }
    
  return (
    <div className="flex">
    <AdminSideBar />

    <div className="w-full min-h-screen p-5  font-inter">
        {/* This page is running by sample data */}
        <div className='text-3xl text-red-500 py-5'>This page is running by sample data</div>

      {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Employee Management</h1>
                <p className="text-gray-600 mt-2">Manage employees, roles, and access permissions.</p>
            </div>
            <button onClick={()=>navigate('/admin/staff/create-staff')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Staff</button>
        </div>

        <AdminStaffHeaderCardsComponent data={data} />

        <AdminStaffChartComponent employe_expenditure={data.employe_expenditure} employeeRoleData={data.employeeRoleData} />

        <div className="h-[calc(100vh-40px)] border flex flex-col mt-10 rounded-2xl shadow-md p-5">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                    <input type="text" placeholder="Search products, barcode" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="flex flex-wrap gap-3 text-gray-800 font-medium">

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
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
                        <tr className="text-gray-500">
                            <th className="py-4 bg-white"></th>
                            <th className="py-4 text-start bg-white">Employee Name </th>
                            <th className="py-4 bg-white">Role</th>
                            <th className="py-4 bg-white">Phone</th>
                            <th className="py-4 bg-white">Email</th>
                            <th className="py-4 bg-white">Salary</th>
                            <th className="py-4 bg-white">Gender</th>
                            <th className="py-4 bg-white">Joined</th>
                            <th className="py-4 bg-white">Last login</th>
                            <th className="py-4 bg-white">Status</th>
                            <th className="py-4 bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.employeeData?.map((employee, index) =>{
                        return(
                            <tr key={index} onClick={()=>setSelectedEmployee(employee.staff_id)} className={`text-center border-b-[3px] text-lg font-medium text-gray-700 border-gray-50 ${ employee.staff_id == selected_employee ? "bg-gray-100" : ''}`}>
                                <td className='text-gray-600 font-semibold px-2'>{index+1})</td>
                                <td className="text-start ">
                                    <div className="flex items-center gap-2 py-2">
                                        <img src={employee.photo} alt={employee?.name} className="w-[67px] h-[67px] text-center rounded-xl object-cover"/>
                                        <div className="flex flex-col ">
                                            <span className='mb-0.5 font-semibold capitalize'>{employee.name}</span>
                                            <span className='text-gray-500 text-[17px]'>{employee.staff_id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-4 capitalize'>{employee.role}</td>
                                <td className='py-4 '>{employee.phone_number}</td>
                                <td className='py-4 '>{employee.email}</td>
                                <td className='py-4 '>
                                    <div className="flex items-center justify-center"><FaIndianRupeeSign />{employee?.salary?.toLocaleString()}</div>
                                </td>
                                <td className='py-4 capitalize'>{employee.gender}</td>
                                <td className='py-4 '>{format(employee.joining_date, 'dd MMM yyy')}</td>
                                <td className='py-4 '>{format(employee.last_login, 'dd MMM yyy')}</td>
                                <td className='py-4'>
                                    <span className={`p-1 border-2 rounded-xl px-3 capitalize ${ employee?.status == "active" ? "bg-cyan-50 text-cyan-500" : "bg-red-50 text-red-500" }`}>{employee?.status}</span>
                                </td>
                                <td className='space-x-2 text-2xl '>
                                    <FaEdit onClick={() => navigate(`/admin/produscts/edit/${product.product_barcode}`)} className='cursor-pointer inline-block text-orange-500' />
                                    <FaEye onClick={() => navigate(`/admin/products/product_id/${product.product_barcode}`)} className='cursor-pointer text-cyan-600 inline-block' />
                                </td>
                            </tr>
                        )
                    })}
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

    {/* Product Preview */}
    {selected_employee &&
    <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
        <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
            <IoCloseSharp onClick={()=>setSelectedEmployee(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
            <AdminStaffPreviewComponent staff_id={selected_employee} />
        </div>
    </div> 
    } 
    </div>
  );
};

export default AdminStaffManagementPage