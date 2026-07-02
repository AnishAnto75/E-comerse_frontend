import React, { useState } from "react";

import { FaSearch, FaEdit, FaEye, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminCustomerSummaryHeaderComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerSummaryHeaderComponent";
import AdminCustomerGrowthComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerGrowthComponent";
import AdminCustomerRevenueComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerRevenueComponent";
import AdminCustomerInsightComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerInsightComponent";
import AdminCustomerRegistration from "../../../components/admin/AdminCustomerComponent/AdminCustomerRegistration";
import AdminCustomerPreviewComponent from "../../../components/admin/AdminCustomerComponent/AdminCustomerPreviewComponent";

const AdminCustomerPage = () => {

    const navigate = useNavigate()

    const [selectedCustomer , setSelectedCustomer] = useState(null)

    const data = {
        total_customers : 4000,
        new_customers : 150,
        active_customers : 3000,
        inactive_customers : 900,
        blocked_customers : 100,
        deleted_customers : 100,
        customerGrowthData : [
            { month: "Jan", customers: 120 },
            { month: "Feb", customers: 180 },
            { month: "Mar", customers: 240 },
            { month: "Apr", customers: 320 },
            { month: "May", customers: 410 },
            { month: "Jun", customers: 520 },
            { month: "Jul", customers: 640 },
        ],
        customerRevenueData : [
            { month: "Jan", revenue: 125000 },
            { month: "Feb", revenue: 142000 },
            { month: "Mar", revenue: 168000 },
            { month: "Apr", revenue: 194000 },
            { month: "May", revenue: 225000 },
            { month: "Jun", revenue: 258000 },
            { month: "Jul", revenue: 292000 },
            { month: "Aug", revenue: 328000 },
            { month: "Sep", revenue: 356000 },
            { month: "Oct", revenue: 389000 },
            { month: "Nov", revenue: 421000 },
            { month: "Dec", revenue: 465000 },
        ],
        customerRegistrationData : [
            { month: "Jan", registrations: 42 },
            { month: "Feb", registrations: 56 },
            { month: "Mar", registrations: 63 },
            { month: "Apr", registrations: 78 },
            { month: "May", registrations: 91 },
            { month: "Jun", registrations: 106 },
            { month: "Jul", registrations: 118 },
            { month: "Aug", registrations: 128 },
            { month: "Sep", registrations: 138 },
            { month: "Oct", registrations: 148 },
            { month: "Nov", registrations: 158 },
            { month: "Dec", registrations: 168 },
        ],
        customers: [
            {
                status: "active",
                ratings: 1,
                _id: "6a3fb979c4d86e8842906ea7",
                user_id: "USR062773192981",
                email: "customer1@gmail.com",
                name: "customer1",
                gender: "male",
                DOB: null,
                phoneNumber: null,
                order_id: [
                    "6a3fc90843e0da443534134c",
                    "6a3fca7bd5ab9759ce6403c5",
                    "6a3fcad424b39de2b694eda1",
                    "6a3fcdaa676be675c9e3e9b3"
                ],
                deleted: false,
                createdAt: "2026-06-27T11:52:25.765Z",
            },
            {
                _id: "6a4656dc5ea7c49121cec6b3",
                user_id: "USR070219530851",
                email: "customer2@gmail.com",
                name: "customer 2",
                gender: "female",
                DOB: null,
                phoneNumber: null,
                order_id: [],
                status: "inactive",
                ratings: 4,
                deleted: false,
                createdAt: "2026-07-02T12:17:32.215Z",
            },
            {
                _id: "6a4656f35ea7c49121cec6b4",
                user_id: "USR070232301004",
                email: "customer3@gmail.com",
                name: "customer 3",
                gender: "other",
                DOB: null,
                phoneNumber: null,
                order_id: [],
                status: "blocked",
                ratings: 1,
                deleted: false,
                createdAt: "2026-07-02T12:17:55.639Z",
            },
            {
                _id: "6a4656f35ea7c49121cec6b5",
                user_id: "USR070232301504",
                email: "customer4@gmail.com",
                name: "customer 4",
                gender: "male",
                DOB: "2026-07-02T12:17:55.639Z",
                phoneNumber: 8148222505,
                order_id: [],
                status: "blocked",
                ratings: 2,
                deleted: true,
                createdAt: "2026-07-02T12:17:55.639Z",
            }
        ]
    }

  return (
    <div className="flex">
        <AdminSideBar />

        <div className="min-h-screen w-full p-6 font-inter">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">Customers</h1>
                <p className="text-gray-500 mt-1">Manage customers and their activities.</p>
            </div>

            <AdminCustomerSummaryHeaderComponent data={data} />

            <div className="grid grid-cols-10 gap-6">
                <AdminCustomerGrowthComponent data={data} />
                <AdminCustomerRevenueComponent data={data} />
                <AdminCustomerInsightComponent data={data} />
                <AdminCustomerRegistration data={data} />
            </div>

            <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
                <div className="flex flex-col xl:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input type="text" placeholder="Search customer / phone no. / email" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
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
                            <tr className="text-blue-gray-500">
                                <th></th>
                                <th className="px-6 py-4 text-start">Customer</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">DOB</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Ratings</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.customers?.map((customer, index) =>{
                            return(
                                <tr onClick={()=>setSelectedCustomer(customer.user_id)} key={index} className={`text-center border-b-[3px] text-lg font-medium text-gray-700 border-gray-50 `}>
                                    <td className='text-gray-600 font-semibold pl-2'>{index+1}</td>
                                    <td className="px-6 py-5 text-start">
                                        <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center uppercase text-blue-700 font-bold">{customer.name?.charAt(0)}</div>
                                        <div>
                                            <h3 className="font-semibold line-clamp-1 text-gray-900 capitalize">{customer?.name}</h3>
                                            <p className="text-gray-500 line-clamp-1">{customer?.email}</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td className='py-4'>{customer?.phoneNumber ? customer.phoneNumber : "--"}</td>
                                    <td className='py-4'>{customer?.gender}</td>
                                    <td className='py-4'>{customer?.DOB ? format(customer?.DOB , 'dd/MM/yyy') : "--"}</td>
                                    <td className='py-4'>{customer?.order_id?.length }</td>
                                    <td className='py-4'>{format(customer?.createdAt , 'dd MMM yyy')}</td>
                                    <td className='py-4 capitalize' >
                                        <span className={`p-1 border-2 rounded-xl px-3 capitalize ${ customer.deleted?"bg-gray-100 text-gray-600 border-gray-400" : customer.status == "active" ? "bg-blue-50 text-blue-500 border-blue-200" : customer.status == "inactive" ? "bg-amber-50 text-amber-700 border-amber-300" : customer.status == "blocked" ? "bg-red-50 text-red-500 border-red-200" : "" }`}>
                                            {customer.deleted ? "Deleted" : customer.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='flex gap-0.5 py-4 items-center justify-center'>
                                            <IoIosStar className='h-5 w-5 text-amber-400'/>
                                            <span className='text-[18px] text-gray-600 font-medium'>{customer.ratings}</span>
                                        </span>
                                    </td>
                                    <td className='space-x-2 text-2xl '>
                                        <FaEdit onClick={() => navigate(`/admin/customer/edit/customer_id/${customer.user_id}`)} className='cursor-pointer inline-block text-orange-500' />
                                        <FaEye onClick={() => navigate(`/admin/customer/customer_id/${customer.user_id}`)} className='cursor-pointer text-cyan-600 inline-block' />
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
        {selectedCustomer &&
        <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
            <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
                <IoCloseSharp onClick={()=>setSelectedCustomer(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
                <AdminCustomerPreviewComponent user_id = {selectedCustomer}/>
            </div>
        </div> 
    }
    </div>
  );
};

export default AdminCustomerPage