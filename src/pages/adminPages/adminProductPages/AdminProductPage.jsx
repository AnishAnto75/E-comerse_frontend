import React, { useState } from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminProductSummaryCards from "../../../components/admin/AdminProductComponents/AdminProductSummaryCards";
import AdminProductPageInventoryTrendsComponent from "../../../components/admin/AdminProductComponents/AdminProductPageInventoryTrendsComponent";
import AdminProductPageInventoryInsightsComponent from "../../../components/admin/AdminProductComponents/AdminProductPageInventoryInsightsComponent";
import AdminProductPreviewComponent from "../../../components/admin/AdminProductComponents/AdminProductPreviewComponent";

const AdminProductPage = () => {

    const navigate = useNavigate()
    const [selected_product , setSelectedProduct] = useState(null)

    const data = {
        summary:{
            total_products: 6512,
            total_inventory: 124802,
            inventory_value: 1824500,
            low_in_stock: 100,
            out_of_stock: 200,
            inactive_products: 500,
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
        ],
        categories: [
            {
                _id: "1524",
                name: "Groceries"
            },
            {
                _id: "1525",
                name: "Electronics"
            },
            {
                _id: "1526",
                name: "Dairy Products"
            },
            {
                _id: "1527",
                name: "Ice Cream"
            },
        ],
        brands: [
            {
                _id: "1524",
                name: "Surf Excel"
            },
            {
                _id: "1525",
                name: "NKS"
            },
            {
                _id: "1526",
                name: "Family Plasts"
            },
            {
                _id: "1527",
                name: "Amul"
            },
        ],
        products: [
            {
                category_name: "Dairy Products",
                brand_name: "Adhavan",
                product_name: "Adhavan Milk 500ml",
                product_barcode: "CO",
                product_photos: "/3-08.webp",
                status: "active",
                product_ratings : 4,
                product_total_stock: 78,
                product_low_in_stock: 10,
                size: "500ml",
                mrp: 39,
                price: 38           
            },
            {
                category_name: "Dairy Products",
                brand_name: "Adhavan",
                product_name: "Adhavan Milk 200ml",
                product_barcode: "KVR",
                product_photos: "/3-08.webp",
                status: "inactive",
                product_ratings : 3,
                product_total_stock: 5,
                product_low_in_stock: 10,
                size: "200ml",
                mrp: 20,
                price: 19.5           
            },
            {
                category_name: "Soft Drinks",
                brand_name: "7UP",
                product_name: "7UP 750ml soft drink",
                product_barcode: "HK",
                product_photos: "/3-08.webp",
                status: "active",
                product_ratings : 5,
                product_total_stock: 0,
                product_low_in_stock: 10,
                size: "750ml",
                mrp: 40,
                price: 39           
            }
        ]
    }

  return (
    <div className="flex">
    <AdminSideBar/>

    <div className="w-full min-h-screen p-5  font-inter">
        {/* This page is running by sample data */}
        <div className='text-3xl text-red-500 py-5'>This page is running by sample data</div>

      {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Products</h1>
                <p className="text-gray-600 mt-2">Manage your products, inventory, pricing and categories.</p>
            </div>
            <button onClick={()=>navigate('/admin/products/new-product')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Product</button>
        </div>

        <AdminProductSummaryCards data={data.summary}/>

        <div className="grid grid-cols-3 gap-6 mt-10">

            <AdminProductPageInventoryTrendsComponent data={data.inventoryChartData}/>

            <AdminProductPageInventoryInsightsComponent data={data.summary}/>
        </div>

        <div className="h-[calc(100vh-40px)] border flex flex-col mt-10 rounded-2xl shadow-md p-5">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                    <input type="text" placeholder="Search products, barcode" className="w-full font-medium text-gray-800 border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="flex flex-wrap gap-3 text-gray-800 font-medium">
                    <select className="border rounded-xl px-4 py-3">
                        <option>All Categories</option>
                        {data.categories?.map((category, index)=>(
                            <option key={index}>{category.name}</option>
                        ))}
                    </select>

                        <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option >All Brands</option>
                        {data.brands?.map((brand, index)=>(
                            <option key={index}>{brand.name}</option>
                        ))}
                    </select>

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <select className="border rounded-xl px-4 py-3 text-gray-800 font-medium">
                        <option>All Stock</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out Of Stock</option>
                    </select>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-5">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-500">
                            <th className="py-4 bg-white"></th>
                            <th className="py-4 bg-white max-w-16"></th>
                            <th className="py-4 text-start bg-white">Product Name / Barcode</th>
                            <th className="py-4 bg-white">Category</th>
                            <th className="py-4 bg-white">Brand</th>
                            <th className="py-4 bg-white">Size</th>
                            <th className="py-4 bg-white">MRP</th>
                            <th className="py-4 bg-white">Price</th>
                            <th className="py-4 bg-white">Stock</th>
                            <th className="py-4 bg-white">Status</th>
                            <th className="py-4 bg-white">Ratings</th>
                            <th className="py-4 bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.products?.map((product, index) =>{
                        return(
                            <tr onClick={()=>setSelectedProduct(product.product_barcode)} key={index} className={`text-center border-b-[3px] text-lg font-medium text-gray-700 border-gray-50 ${ selected_product == product.product_barcode ? "bg-gray-100" : ''}`}>
                                <td className='text-gray-600 font-semibold pl-2'>{index+1}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <img src={product?.product_photos} alt={product?.product_name} className="w-16 h-16 text-center rounded-xl object-cover"/>
                                    </div>
                                </td>
                                <td className='text-start py-4 flex flex-col'>
                                    <span className='mb-0.5 font-semibold'>{product?.product_name}</span>
                                    <span className='text-gray-500 text-[17px]'>{product?.product_barcode}</span>
                                </td>
                                <td className='py-4 '>{product?.category_name}</td>
                                <td className='py-4 '>{product?.brand_name}</td>
                                <td className='py-4 '>{product?.size}</td>
                                <td className='py-4 '>{product?.mrp}</td>
                                <td className='py-4 '>{product?.price}</td>
                                <td className="py-4">
                                    <span className={` p-1 border-[3px] rounded-xl px-5 ${ product?.product_total_stock == 0 ? "bg-red-50 text-red-400 border-red-200" : product.product_total_stock <= product.product_low_in_stock ? "bg-amber-50 text-amber-500 border-amber-200" : "bg-green-50 text-green-500 border-green-100"  } `}>
                                        {product?.product_total_stock}
                                    </span>
                                </td>
                                <td className='py-4'>
                                    <span className={`p-1 border-2 rounded-xl px-3 capitalize ${ product?.status == "active" ? "bg-cyan-50 text-cyan-500" : "bg-red-50 text-red-500" }`}>
                                        {product?.status}
                                    </span>
                                </td>
                                <td>
                                    <span className='flex gap-0.5 py-4 items-center justify-center'>
                                        <IoIosStar className='h-5 w-5 text-amber-500'/>
                                        <span className='text-[18px] text-gray-600 font-medium'>{product?.product_ratings}</span>
                                    </span>
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
    {selected_product &&
    <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
        <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
            <IoCloseSharp onClick={()=>setSelectedProduct(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
            <AdminProductPreviewComponent product_id = {selected_product}/>
        </div>
    </div> 
    }
    </div>
  );
};

export default AdminProductPage