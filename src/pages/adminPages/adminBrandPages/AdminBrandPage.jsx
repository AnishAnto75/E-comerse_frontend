import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Avatar, Button } from '@material-tailwind/react';
import { debounce } from 'lodash';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { FaEye } from "react-icons/fa"
import { MdEdit } from "react-icons/md";

const AdminBrandPage = () => {

    const navigate = useNavigate()
    const handleRef = useRef(true) 

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [brandBackup , setBrandBackup ] = useState([])
    const [brands , setBrands ] = useState([])

    const [search_brand_name, setSearchBrandName] = useState('')

    useEffect(()=>{
        const adminFetchAllBrand = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/brand/all-brand`)
                console.log("adminFetchAllBrand payload : " , res.data)        
                setBrands(res.data.data)
                setBrandBackup(res.data.data)

            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in adminFetchAllBrand :" , error)
            } finally { setLoading(false) }
        }
        
        if(handleRef.current) {
            adminFetchAllBrand()
            handleRef.current = false
        }
    } , [])

    const handleSearchBrands = async(e) => {
        const term = e.target.value;
        setSearchBrandName(term)
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/brand/search?name=${term}`)
                setBrands(res.data.data)
            } catch (error) {
                console.error("error in handleSearchBrands :" , error)
            } 
        }
        else{setBrands(brandBackup)}
    }

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className="w-full pt-5 px-5">
        <div className='font-inter tracking-normal font-medium text-gray-900 pt-3 text-3xl'>Brands</div>
        <div className='flex py-8 justify-between'>
            <div className='flex gap-5'>
                <div className="items-center md:w-60 relative">
                    <input type='text' value={search_brand_name} onChange={(e)=>handleSearchBrands(e)} placeholder='Search' className='border border-gray-400 p-1 px-2 pl-9 w-full rounded text-sm text-gray-700 placeholder:text-gray-400 font-poppins focus:outline-none'/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className=" h-[22px] w-[22px]  absolute top-1 left-1 text-gray-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                </div>
                <Button onClick={()=>toast.warn('Under Maintainance')} variant='outlined' size='sm' className='flex gap-1 px-2 h-[30px] items-center rounded-lg text-gray-800 font-medium font-inter tracking-normal '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" /></svg>
                    FILTER 
                </Button>
            </div>
            <Button onClick={()=>navigate(`/admin/brands/new-brand`)} size="sm" color='blue' variant='gradient' className=' items-end content-end justify-end'>New Brand</Button>
        </div>

        <table className="w-full">
            <thead>
                <tr className='text-xs text-gray-600 tracking-normal font-inter bg-blue-gray-50/50'>
                    <th className="py-2 px-7 font-normal text-start rounded-l-sm">Logo</th>
                    <th className="py-2 px-4 font-normal text-start ">Brand Name</th>
                    <th className="py-2 px-4 font-normal text-start ">Description</th>
                    <th className="py-2 px-4 font-normal text-center ">Actions</th>
                </tr>
            </thead>
            <tbody>
                {brands?.map((brand, index) => {
                    const classes = index === brands?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                    <tr key={index} className='hover:bg-gray-50 text-sm text-gray-800'>
                        <td className={classes}>
                            <Avatar src={brand.Brand_logo ? brand.Brand_logo : '/3-08.webp'} alt={brand.Brand_name} size="lg" />
                        </td>
                        <td className={classes}>{brand.Brand_name}</td>
                        <td className={`${classes}`}>{brand.Brand_description}</td>
                        <td className={`${classes}`}>
                            <div className='flex justify-center gap-2 h-full w-ful'>
                                <FaEye onClick={()=>navigate(`/admin/brands/${brand.Brand_name}`)} className='text-2xl cursor-pointer h-10 w-7'/>
                                <MdEdit onClick={()=>navigate(`/admin/brands/edit/${brand._id}`)} className='text-2xl cursor-pointer h-10 w-7' />
                            </div>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
        {!brands.length && 
            <div className='text-2xl font-inter h-full justify-center items-center flex'>No Product Found</div>
        }
    </div>
    </div>
  )
}

export default AdminBrandPage