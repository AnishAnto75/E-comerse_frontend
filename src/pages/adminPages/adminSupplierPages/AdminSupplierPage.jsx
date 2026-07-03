import React, { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid} from "recharts";

import { FiUsers, FiPackage, FiTrendingUp, FiStar, FiPlus, FiSearch } from "react-icons/fi";
import { FaBoxOpen, FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaFire, FaPlus, FaSearch, FaUserCheck, FaUsers, FaUserSlash } from "react-icons/fa";
import { FaArrowTrendUp, FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp, IoFilter } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminSupplierSummaryCardsComponent from "../../../components/admin/AdminSupplierComponent.jsx/AdminSupplierSummaryCardsComponent";
import AdminSupplierTopRequestedComponent from "../../../components/admin/AdminSupplierComponent.jsx/AdminSupplierTopRequestedComponent";
import AdminSupplierPreviewComponent from "../../../components/admin/AdminSupplierComponent.jsx/AdminSupplierPreviewComponent";


const AdminSupplierPage = () => {

    const navigate = useNavigate()
    const [selectedSupplier, setSelectedSupplier] = useState(null)

    const data = {
        total_suppliers: 100,
        active_suppliers: 95,
        inactive_suppliers: 95,
        total_purchase_value : 10547856,
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
        suppliers:[
            {
                supplier_address: {
                    city: "Karungal",
                },
                status: "inactive",
                _id: "69dba2edcbac78d80ab23822",
                supplier_id: "SUP0412375358",
                supplier_name: "Hindustan Agencies",
                supplier_contact_person: "Hind",
                supplier_contact_person_phone: 8546215346,
                supplier_email: "hindustan@gmail.com",
                supplier_phone: 8451726351,
                supplier_gst_no: "JHbjsjknx662akm",
            },
            {
                supplier_address: {
                    city: "Marthandam",
                },
                status: "active",
                _id: "69da818e3233da093c184147",
                supplier_id: "SUP0411345754",
                supplier_name: "nila agencies",
                supplier_contact_person: "",
                supplier_contact_person_phone: null,
                supplier_email: "",
                supplier_phone: null,
                supplier_gst_no: "",
            }
        ],
    }

  return (
    <div className="flex">
    <AdminSideBar />

    <div className="flex-1 min-w-0 min-h-screen p-5 font-inter">
        {/* This page is running by sample data */}
        <div className='text-3xl text-red-500 py-5'>This page is running by sample data</div>
    
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Suppliers</h1>
                <p className="text-gray-600 mt-2"> Manage all registered suppliers</p>
            </div>
            <button onClick={()=>navigate('/admin/supplier/create-supplier')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Suppliers</button>
        </div>

        <AdminSupplierSummaryCardsComponent data={data} />

        <AdminSupplierTopRequestedComponent requested_products={data.requested_products} />

        <div className="h-[calc(100vh-40px)] border flex flex-col mt-5 rounded-2xl shadow-md p-5">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                    <input type="text" placeholder="Search suppliers" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="flex flex-wrap gap-3 text-gray-800 font-medium">

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <div onClick={()=>toast.warn("function Not added")} className='border-[3px] border-gray-100 p-[5.5px] rounded-xl px-5 text-lg font-inter font-medium text-gray-600 mr-3 tracking-wide flex items-center gap-1 cursor-pointer'><IoFilter className='text-2xl'/>Filter</div>
                   

                </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-5">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-500">
                            <th className="py-4 bg-white"></th>
                            <th className="py-4 bg-white text-start">Name</th>
                            <th className="py-4 bg-white text-start">Contact person</th>
                            <th className="py-4 bg-white">Email</th>
                            <th className="py-4 bg-white">GST</th>
                            <th className="py-4 bg-white">City</th>
                            <th className="py-4 bg-white">Status</th>
                            <th className="py-4 bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.suppliers?.map((supplier, index) => (
                        <tr onClick={()=>setSelectedSupplier(supplier.supplier_id)} key={index} className={`text-center border-b-[3px] text-lg font-medium text-gray-700 border-gray-50 ${ selectedSupplier == supplier.supplier_id ? "bg-gray-100" : ''}`}>
                            <td className='text-gray-600 font-semibold px-2'>{index+1}</td>
                            <td className='text-start py-4 '>
                                <div className="flex flex-col">
                                    <span className='mb-0.5 font-semibold'>{supplier.supplier_name}</span>
                                    <span className='text-gray-500 text-[17px]'>{supplier.supplier_phone}</span>
                                </div>
                            </td>
                            <td className='text-start py-4'>
                                <div className="flex flex-col">
                                    <span className='mb-0.5 font-semibold'>{supplier.supplier_contact_person}</span>
                                    <span className='text-gray-500 text-[17px]'>{supplier.supplier_contact_person_phone}</span>
                                </div>
                            </td>
                            <td className='py-4 '>{supplier.supplier_email}</td>
                            <td className='py-4 '>{supplier.supplier_gst_no}</td>
                            <td className='py-4 '>{supplier.supplier_address.city}</td>
                            <td className='py-4'>
                                <span className={`p-1 border-2 rounded-xl px-3 capitalize ${ supplier?.status == "active" ? "bg-cyan-50 text-cyan-500" : "bg-red-50 text-red-500" }`}>
                                    {supplier?.status}
                                </span>
                            </td>
                            <td className='space-x-2 text-2xl '>
                                <FaEdit onClick={() => navigate(`/admin/supplier/edit/supplier_id/${supplier.supplier_id}`)} className='cursor-pointer inline-block text-orange-500' />
                                <FaEye onClick={() => navigate(`/admin/supplier/supplier_id/${supplier.supplier_id}`)} className='cursor-pointer text-cyan-600 inline-block' />
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
    {selectedSupplier &&
    <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
        <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
            <IoCloseSharp onClick={()=>setSelectedSupplier(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
            <AdminSupplierPreviewComponent supplier_id = {selectedSupplier}/>
        </div>
    </div> 
    }
    </div>
  );
};

export default AdminSupplierPage