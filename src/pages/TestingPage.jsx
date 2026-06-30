import React from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch } from "react-icons/fa";

import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import AdminSideBar from "../components/admin/AdminSideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminProductSummaryCards from "../components/admin/AdminProductComponents/AdminProductSummaryCards";
import AdminProductPageInventoryInsightsComponent from "../components/admin/AdminProductComponents/AdminProductPageInventoryInsightsComponent";
import AdminProductPageInventoryTrendsComponent from "../components/admin/AdminProductComponents/AdminProductPageInventoryTrendsComponent";

const TestingPage = () => {

    const navigate = useNavigate()

    const data = {
        summary:{
            total_products: 6512,
            total_inventory: 124802,
            inventory_value: 1824500,
            low_in_stock: 100,
            out_of_stock: 200,
            hidden_stock: 500,
            active_products: 501,
            total_brands: 42,
        },
        inventoryChartData : [
            { month: "Jan", inventory_value : 8900 },
            { month: "Feb", inventory_value : 9600 },
            { month: "Mar", inventory_value : 9100 },
            { month: "Apr", inventory_value : 10400 },
            { month: "May", inventory_value : 1050 },
            { month: "Jun", inventory_value : 12482 },
        ]
    }

    const products = [
        {
            id: 1,
            image: "https://placehold.co/60x60",
            name: "Amul Milk",
            barcode: "890123456001",
            category: "Dairy",
            brand: "Amul",
            stock: 120,
            purchase: 48,
            selling: 58,
            sold: 245,
            status: "Active",
        },
        {
            id: 2,
            image: "https://placehold.co/60x60",
            name: "Coca Cola",
            barcode: "890123456002",
            category: "Beverages",
            brand: "Coca Cola",
            stock: 15,
            purchase: 28,
            selling: 38,
            sold: 520,
            status: "Low Stock",
        },
        {
            id: 3,
            image: "https://placehold.co/60x60",
            name: "Maggi Noodles",
            barcode: "890123456003",
            category: "Snacks",
            brand: "Nestle",
            stock: 0,
            purchase: 11,
            selling: 14,
            sold: 1120,
            status: "Out of Stock",
        },
        {
            id: 4,
            image: "https://placehold.co/60x60",
            name: "Parle-G",
            barcode: "890123456004",
            category: "Biscuits",
            brand: "Parle",
            stock: 250,
            purchase: 8,
            selling: 10,
            sold: 1800,
            status: "Active",
        },
        {
            id: 5,
            image: "https://placehold.co/60x60",
            name: "Surf Excel",
            barcode: "890123456005",
            category: "Cleaning",
            brand: "HUL",
            stock: 40,
            purchase: 180,
            selling: 220,
            sold: 130,
            status: "Active",
        },
    ];

    const summary = {
        totalProducts: 524,
        totalInventory: 12482,
        inventoryValue: 1824500,
        lowStock: 17,
        outOfStock: 8,
        activeProducts: 501,
        categories: 18,
        brands: 42,
    };

    const colors = {
        blue: {
            bg: "bg-blue-50",
            icon: "text-blue-600",
            border: "border-blue-500",
            text: "text-blue-600",
        },
        emerald: {
            bg: "bg-emerald-50",
            icon: "text-emerald-600",
            border: "border-emerald-500",
            text: "text-emerald-600",
        },
        violet: {
            bg: "bg-violet-50",
            icon: "text-violet-600",
            border: "border-violet-500",
            text: "text-violet-600",
        },
        amber: {
            bg: "bg-amber-50",
            icon: "text-amber-600",
            border: "border-amber-500",
            text: "text-amber-600",
        },
        red: {
            bg: "bg-red-50",
            icon: "text-red-600",
            border: "border-red-500",
            text: "text-red-600",
        },
        cyan: {
            bg: "bg-cyan-50",
            icon: "text-cyan-600",
            border: "border-cyan-500",
        text: "text-cyan-600",
        },
        pink: {
            bg: "bg-pink-50",
            icon: "text-pink-600",
            border: "border-pink-500",
            text: "text-pink-600",
        },
        indigo: {
            bg: "bg-indigo-50",
            icon: "text-indigo-600",
            border: "border-indigo-500",
            text: "text-indigo-600",
        },
    };

    const lowStockProducts = [
        { id: 1, name: "Coca Cola", stock: 15, limit: 20 },
        { id: 2, name: "Pepsi", stock: 8, limit: 20 },
        { id: 3, name: "Maggi Noodles", stock: 5, limit: 25 },
        { id: 4, name: "Lay's Chips", stock: 12, limit: 20 },
    ];

    const topSellingProducts = [
        { name: "Parle-G", sold: 1800 },
        { name: "Maggi", sold: 1120 },
        { name: "Amul Milk", sold: 845 },
        { name: "Coca Cola", sold: 520 },
        { name: "Surf Excel", sold: 130 },
    ];

    const recentActivities = [
        {
            title: "Added 100 units of Amul Milk",
            time: "10 mins ago",
        },
        {
            title: "Updated Coca Cola price",
            time: "35 mins ago",
        },
        {
            title: "Deleted Expired Product",
            time: "1 hour ago",
        },
        {
            title: "Created Britannia Bread",
            time: "Today",
        },
        {
            title: "Imported 42 Products",
            time: "Yesterday",
        },
    ];

    console.log(`w-[${((data.summary?.total_products - data.summary?.low_in_stock - data.summary?.out_of_stock) / data.summary?.total_products)*100}]%`)

  return (
    <div className="flex">
    <AdminSideBar/>

    <div className="w-full min-h-screen p-8 font-inter">

      {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Products</h1>
                <p className="text-gray-600 mt-2">Manage your products, inventory, pricing and categories.</p>
            </div>
            <button onClick={()=>navigate('/admin/products/new-product')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Product</button>
        </div>

        <AdminProductSummaryCards data={data.summary}/>

        <div className="grid grid-cols-3 gap-6 mt-8">

            <AdminProductPageInventoryTrendsComponent data={data.inventoryChartData}/>
            
            <AdminProductPageInventoryInsightsComponent data={data.summary}/>
        </div>


        {/* done */}


      {/* Search & Filters */}

        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                    <input type="text" placeholder="Search products, barcode or SKU..." className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="flex flex-wrap gap-3">
                    <select className="border rounded-xl px-4 py-3">
                        <option>All Categories</option>
                        <option>Beverages</option>
                        <option>Dairy</option>
                        <option>Snacks</option>
                        <option>Personal Care</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3">
                        <option>All Brands</option>
                        <option>Amul</option>
                        <option>Nestle</option>
                        <option>Britannia</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3">
                        <option>Stock</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out Of Stock</option>
                    </select>

                    <button className="px-4 rounded-xl border hover:bg-gray-100 flex items-center gap-2"><FaSortAmountDown />Sort</button>

                    <button className="px-4 rounded-xl border hover:bg-gray-100 flex items-center gap-2"><FaSyncAlt />Refresh</button>
                </div>
            </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                    <p className="text-gray-500 mt-1">Showing {products.length} demo products</p>
                </div>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-gray-700">
                            <th className="px-6 py-4">Product</th>
                            <th className="px-4 py-4">Barcode</th>
                            <th className="px-4 py-4">Category</th>
                            <th className="px-4 py-4">Brand</th>
                            <th className="px-4 py-4 text-center">Stock</th>
                            <th className="px-4 py-4">Purchase</th>
                            <th className="px-4 py-4">Selling</th>
                            <th className="px-4 py-4 text-center">Sold</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover border"/>
                                    <div>
                                        <div className="font-semibold text-gray-800">{product.name}</div>
                                        <div className="text-sm text-gray-500">Product #{product.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-gray-600">{product.barcode}</td>
                            <td className="px-4 py-4">{product.category}</td>
                            <td className="px-4 py-4">{product.brand}</td>
                            <td className="px-4 py-4 text-center font-semibold">{product.stock}</td>
                            <td className="px-4 py-4">₹{product.purchase}</td>
                            <td className="px-4 py-4">₹{product.selling}</td>
                            <td className="px-4 py-4 text-center">{product.sold}</td>
                            <td className="px-4 py-4">
                                {product.status === "Active" && (<span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Active</span>)}
                                {product.status === "Low Stock" && (<span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">Low Stock</span>)}
                                {product.status === "Out of Stock" && (<span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">Out of Stock</span>)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3">
                                    <button className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center"><FaEye /></button>
                                    <button className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center"><FaEdit /></button>
                                    <button className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"><FaTrash /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>



     
{/* ================= Footer ================= */}

        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Left */}
                <div>
                    <h2 className="font-bold text-xl text-gray-800">Showing 1 - 10 of 524 Products</h2>
                    <p className="text-gray-500 mt-1">Manage products efficiently with bulk actions.</p>
                </div>
                {/* Bulk Actions */}
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"><FaEdit />Bulk Edit</button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"><FaTrashAlt />Delete Selected</button>
                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"><FaFileExport />Export Selected</button>
                </div>
            </div>

            {/* Pagination */}

            <div className="flex justify-center mt-8">
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
        <div className="h-10"></div>

    </div>
    </div>
  );
};

export default TestingPage