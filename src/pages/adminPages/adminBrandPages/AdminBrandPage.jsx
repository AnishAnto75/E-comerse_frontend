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
import AdminBrandPreviewComponent from "../../../components/admin/AdminBrandComponents/AdminBrandPreviewComponent";

const AdminBrandPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [selected_brand , setSelectedBrand] = useState(null)
    const [brands , setBrands] = useState(null)
    const [pagination , setPagination] = useState(null)

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true);
                const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}admin/brand/brand_page`, { params: { page, limit}, withCredentials: true });
                console.log("fetchBrandPage payload : " , res.data)
                setBrands(res.data?.data?.brands)
                setPagination(res.data?.data?.pagination)
            } catch (error) {
                console.error("Error in fetchBrandPage:", error);
                toast.error( error?.response?.data?.message || "Unable to fetch brand")
            } finally { setLoading(false);}
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <LoadingSpinner/>}
    if(error || !brands || !pagination){return <ErrorComponent/>}

  return (
    <div className="flex">
    <AdminSideBar/>

    <div className="w-full p-5 font-inter font-medium text-lg text-gray-900">

      {/* Header */}
        <div className="flex justify-between items-center mb-5 mt-3">
            <div>
                <h1 className="text-3xl font-semibold">Brands</h1>
                <p className="text-gray-600 mt-2">Manage your Brands</p>
            </div>
            <button onClick={()=>navigate('/admin/brands/new-brand')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Brand</button>
        </div>

        <div className="h-[calc(100vh-40px)] border flex flex-col rounded-2xl shadow-md p-5 mt-5">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-5 text-gray-400" />
                    <input type="text" placeholder="Search Brand" className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none"/>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-3">
                <table className="w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-white shadow-sm">
                        <tr className="text-gray-500">
                            <th className="py-4 bg-white"></th>
                            <th className="py-4 bg-white min-w-16 max-w-16"></th>
                            <th className="py-4 text-start bg-white pl-5">Brand Name</th>
                            <th className="py-4 bg-white">Ratings</th>
                            <th className="py-4 bg-white">Reviews</th>
                            <th className="py-4 bg-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {brands?.map((brand, index) =>{
                        return(
                            <tr onClick={()=>setSelectedBrand(brand._id)} key={index} className={`text-center hover:bg-gray-50 ${ selected_brand == brand._id ? "bg-gray-100" : ''}`}>
                                <td className='text-gray-600 font-semibold pl-2 w-10'>{index+1} )</td>
                                <td className="w-20">
                                    <div className="flex justify-center">
                                        <img src={`${import.meta.env.VITE_IMAGE_URL}${brand?.brand_logo?.url}`} alt={brand?.brand_name} className="w-20 h-20 rounded-xl object-contain"/>
                                    </div>
                                </td>
                                <td className='text-start py-4 font-semibold pl-5'>{brand?.brand_name}</td>
                                <td className="py-4">
                                    <span className='flex gap-0.5 py-4 items-center justify-center'>
                                        <IoIosStar className='h-5 w-5 text-amber-500'/>
                                        <span className='text-[18px] text-gray-600 '>{brand?.brand_average_ratings || 1}</span>
                                    </span>
                                </td>
                                <td className='py-4'>{brand?.brand_total_reviews || 0}</td>
                                <td className='space-x-2 text-2xl '>
                                    <FaEdit onClick={() => navigate(`/admin/brands/edit/${brand._id}`)} className='cursor-pointer inline-block text-orange-500' />
                                    <FaEye onClick={() => navigate(`/admin/brands/${brand._id}`)} className='cursor-pointer text-cyan-600 inline-block' />
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
    {selected_brand &&
    <div className='relative min-w-[26rem] max-w-[26rem] shrink-1 py-5 pr-5'>
        <div className='sticky top-5 h-[calc(100vh-40px)] rounded-xl shadow-lg overflow-y-auto p-3'>
            <IoCloseSharp onClick={()=>setSelectedBrand(null)} className='absolute top-4 right-4 font-sans text-4xl cursor-pointer z-10 rounded-full hover:bg-red-50 text-red-500 p-1' />
            <AdminBrandPreviewComponent brand_id = {selected_brand}/>
        </div>
    </div> 
    }
    </div>
  );
};

export default AdminBrandPage








// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { Avatar, Button } from '@material-tailwind/react';
// import { debounce } from 'lodash';
// import LoadingSpinner from '../../../components/LoadingSpinner';
// import ErrorComponent from '../../../components/ErrorComponent';
// import AdminSideBar from '../../../components/admin/AdminSideBar';
// import { FaEye } from "react-icons/fa"
// import { MdEdit } from "react-icons/md";
// import { FaPlus } from 'react-icons/fa6';

// const AdminBrandPage = () => {

//     const navigate = useNavigate()
//     const handleRef = useRef(true) 

//     const [loading , setLoading] = useState(false)
//     const [error , setError] = useState(false)

//     const [brandBackup , setBrandBackup ] = useState([])
//     const [brands , setBrands ] = useState([])

//     const [search_brand_name, setSearchBrandName] = useState('')

//     useEffect(()=>{
//         const adminFetchAllBrand = async()=>{
//             return
//         }
        
//         if(handleRef.current) {
//             adminFetchAllBrand()
//             handleRef.current = false
//         }
//     } , [])

//     const handleSearchBrands = async(e) => {
//         const term = e.target.value;
//         setSearchBrandName(term)
//         if(term.length > 1){
//             try {
//                 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/brand/search?name=${term}`)
//                 setBrands(res.data.data)
//             } catch (error) {
//                 console.error("error in handleSearchBrands :" , error)
//             } 
//         }
//         else{setBrands(brandBackup)}
//     }

//     if (loading) { return <LoadingSpinner/>}
//     if (error) { return <ErrorComponent/>}

//   return (
//     <div className='flex'>
//     <AdminSideBar />
//     <div className="w-full pt-5 px-5">
//         <div className='font-inter tracking-normal font-medium text-gray-900 pt-3 text-3xl'>Brands</div>
//         <div className='flex py-8 justify-between'>
//             <div className='flex gap-5'>
//                 <div className="items-center md:w-60 relative">
//                     <input type='text' value={search_brand_name} onChange={(e)=>handleSearchBrands(e)} placeholder='Search' className='border border-gray-400 p-1 px-2 pl-9 w-full rounded text-sm text-gray-700 placeholder:text-gray-400 font-poppins focus:outline-none'/>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className=" h-[22px] w-[22px]  absolute top-1 left-1 text-gray-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
//                 </div>
//                 <Button onClick={()=>toast.warn('Under Maintainance')} variant='outlined' size='sm' className='flex gap-1 px-2 h-[30px] items-center rounded-lg text-gray-800 font-medium font-inter tracking-normal '>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" /></svg>
//                     FILTER 
//                 </Button>
//             </div>
//             <button onClick={()=>navigate('/admin/brands/new-brand')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"><FaPlus />Add Brand</button>            
//         </div>

//         <table className="w-full">
//             <thead>
//                 <tr className='text-xs text-gray-600 tracking-normal font-inter bg-blue-gray-50/50'>
//                     <th className="py-2 px-7 font-normal text-start rounded-l-sm">Logo</th>
//                     <th className="py-2 px-4 font-normal text-start ">Brand Name</th>
//                     <th className="py-2 px-4 font-normal text-start ">Description</th>
//                     <th className="py-2 px-4 font-normal text-center ">Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {brands?.map((brand, index) => {
//                     const classes = index === brands?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
//                     return (
//                     <tr key={index} className='hover:bg-gray-50 text-sm text-gray-800'>
//                         <td className={classes}>
//                             <Avatar src={brand.Brand_logo ? brand.Brand_logo : '/3-08.webp'} alt={brand.Brand_name} size="lg" />
//                         </td>
//                         <td className={classes}>{brand.Brand_name}</td>
//                         <td className={`${classes}`}>{brand.Brand_description}</td>
//                         <td className={`${classes}`}>
//                             <div className='flex justify-center gap-2 h-full w-ful'>
//                                 <FaEye onClick={()=>navigate(`/admin/brands/${brand.Brand_name}`)} className='text-2xl cursor-pointer h-10 w-7'/>
//                                 <MdEdit onClick={()=>navigate(`/admin/brands/edit/${brand._id}`)} className='text-2xl cursor-pointer h-10 w-7' />
//                             </div>
//                         </td>
//                     </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//         {!brands.length && 
//             <div className='text-2xl font-inter h-full justify-center items-center flex'>No Product Found</div>
//         }
//     </div>
//     </div>
//   )
// }

// export default AdminBrandPage