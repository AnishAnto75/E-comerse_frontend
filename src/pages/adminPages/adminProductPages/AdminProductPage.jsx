import React, { useState } from "react";
import {FaBoxOpen, FaWarehouse, FaRupeeSign, FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaChartLine, FaTags, FaPlus, FaDownload, FaUpload, FaFilter, FaSortAmountDown, FaSyncAlt, FaEye, FaTrash, FaFire, FaClock, FaArrowUp, FaChevronLeft, FaChevronRight, FaTrashAlt, FaFileExport, FaEdit, FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminProductPreviewComponent from "../../../components/admin/AdminProductComponents/AdminProductPreviewComponent";
import { FaIndianRupeeSign } from "react-icons/fa6";
import AdminProductPageSummaryCards from "../../../components/admin/AdminProductComponents/AdminProductPageSummaryCards";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useRef } from "react";
import { useEffect } from "react";

const AdminProductPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selected_product , setSelectedProduct] = useState(null)

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const [summary, setSummary] = useState(null)
    const [products, setProducts] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/product/product_page`, { params: { page, limit}, withCredentials: true });
                console.log("fetchProductPage payload : " , res.data)
                setSummary(res.data?.data?.summary)
                setProducts(res.data?.data?.products)
            } catch (error) {
                console.error("Error in fetchProductPage:", error);
                toast.error( error?.response?.data?.message || "Unable to fetch products")
            } finally { setLoading(false);}
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <LoadingSpinner/>}
    if(error || !summary || !products ){return <ErrorComponent/>}

  return (
    <div className="flex">
    <AdminSideBar/>

    <div className="w-full p-5 font-inter font-medium text-lg text-gray-900">

      {/* Header */}
        <div className="flex justify-between items-center mb-5 mt-3">
            <div>
                <h1 className="text-3xl font-semibold">Products</h1>
                <p className="text-gray-600 mt-2">Manage your products, inventory, pricing and categories.</p>
            </div>
            <button onClick={()=>navigate('/admin/products/new-product')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Product</button>
        </div>

        <AdminProductPageSummaryCards data={summary}/>

        <div className="h-[calc(100vh-40px)] border flex flex-col rounded-2xl shadow-md p-5 mt-5">
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
                        <option>All Stock</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out Of Stock</option>
                    </select>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-3">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-500">
                            <th className="py-4 bg-white"></th>
                            <th className="py-4 bg-white max-w-16"></th>
                            <th className="py-4 text-start bg-white">Product Name / Barcode</th>
                            <th className="py-4 text-start bg-white">Group / Category</th>
                            <th className="py-4 bg-white">Brand</th>
                            <th className="py-4 bg-white">Stock</th>
                            <th className="py-4 bg-white">Ratings</th>
                            <th className="py-4 bg-white">Status</th>
                            <th className="py-4 bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products?.map((product, index) =>{
                        return(
                            <tr onClick={()=>setSelectedProduct(product.product_barcode)} key={index} className={`text-center hover:bg-gray-50 ${ selected_product == product.product_barcode ? "bg-gray-100" : ''}`}>
                                <td className='text-gray-600 font-semibold pl-2 w-10'>{index+1} )</td>
                                <td className="w-20">
                                    <div className="flex justify-center">
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${product?.product_photo}`} alt={product?.product_name} className="w-16 h-16 rounded-xl object-contain"/>
                                    </div>
                                </td>
                                <td className='text-start py-4 '>
                                    <span className='font-semibold block'>{product?.product_name}</span>
                                    <span className='text-gray-500 font-semibold'>{product?.product_barcode}</span>
                                </td>
                                <td className='py-4 text-start'>
                                    <span className='font-semibold block'>{product?.group_name}</span>
                                    <span className='text-gray-500 font-semibold '>{product?.category_name}</span>
                                </td>
                                <td className='py-4'>{product?.product_brand}</td>
                                <td className="py-4">{product?.current_stock}</td>
                                <td className="py-4">
                                    <span className='flex gap-0.5 py-4 items-center justify-center'>
                                        <IoIosStar className='h-5 w-5 text-amber-500'/>
                                        <span className='text-[18px] text-gray-600 font-medium'>{product?.product_average_ratings}</span>
                                    </span>
                                </td>
                                <td className='py-4'>
                                    <span className={`p-2 rounded-xl px-3 capitalize text-white ${ product.out_of_stock ? "bg-red-500 " : product.product_low_in_stock >= product.current_stock ? "bg-amber-400" : product?.status == "active" ? "bg-sky-500" : product?.status == "inactive" && "bg-gray-700" }`}>
                                        { product.out_of_stock ? "Out of stock" : product.product_low_in_stock >= product.current_stock ? "Low In Stock" : product?.status === "inactive" ? "In Active" : product.status  }
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