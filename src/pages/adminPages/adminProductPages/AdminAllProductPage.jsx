import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Avatar, Button } from '@material-tailwind/react';
import { debounce } from 'lodash';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent';
import AdminSideBar from '../../../components/admin/AdminSideBar';

const AdminAllProductPage = () => {

    const navigate = useNavigate()
    const handleRef = useRef(true) 

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const [response , setResponse ] = useState([])
    const [products , setProducts ] = useState([])

    const [search_products_name, setSearchProductsName] = useState('')

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/all-product`)
                console.log("adminFetchAllProduct payload : " , res.data)        
                setProducts(res.data.data)
                setResponse(res.data.data)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in adminFetchAllProduct :" , error)
            } finally { setLoading(false) }
        }
        
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    const requestProductsByName = debounce(async (term) => {
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/search?name=${term}`)
                setProducts(res.data.data) 
            } catch (error) {
                console.error("error in requestProductsByName :" , error)
            }
        }
    },500)

    const handleSearchProducts = (e) => {
        const term = e.target.value;
        setSearchProductsName(term)
        if(term?.length > 1){requestProductsByName(term)}
        else{setProducts(response)}
    }

    const [tab , setTab] = useState("allProduct")

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className="w-full pt-5 px-5">
        <div className='flex justify-between pr-2 '>
            <div className='font-inter tracking-normal font-medium text-gray-900 py-3 text-3xl'>Products</div>
            <div className=' content-center'><Button onClick={()=>navigate(`/admin/products/new-product`)} size="sm" color='blue' variant='gradient'>Add Product</Button></div>
        </div>
        <div className=' pt-2'>
            <div className='text-sm flex relative space-x-7 text-black text-center font-inter tracking-normal'>
                <div onClick={()=>setTab('allProduct')} className={`pb-1.5 px-1 cursor-pointer ${ tab == 'allProduct' ? "border-b-[3px] border-blue-500 font-medium " : 'border-b-2 border-gray-200'} `}>All Products</div>
                <div onClick={()=>setTab('category')} className={`pb-1.5 px-1 cursor-pointer ${ tab == 'category' ? "border-b-[3px] border-blue-500 font-medium " : 'border-b-2 border-gray-200'} `}>Category</div>
                <div onClick={()=>setTab('group')} className={`pb-1.5 px-1 cursor-pointer ${ tab == 'group' ? "border-b-[3px] border-blue-500 font-medium " : 'border-b-2 border-gray-200'} `}>Group</div>
                <div className='absolute bg-gray-200 h-0.5 -z-10 right-0 bottom-0 w-full'></div>
            </div>
        </div>
        <div className='flex justify-between py-5 '>
            <Button variant='outlined' size='sm' className='flex gap-1 px-2 h-[26px] items-center rounded-lg text-gray-800 font-medium font-inter tracking-normal '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" /></svg>
                FILTER 
            </Button>

            <div className="items-center md:w-60 relative">
                <input type='text' value={search_products_name} onChange={(e)=>handleSearchProducts(e)} placeholder='Search' className='border border-gray-400 p-1 px-2 pl-9 w-full rounded text-sm text-gray-700 placeholder:text-gray-400 font-poppins focus:outline-none'/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className=" h-[22px] w-[22px]  absolute top-1 left-1 text-gray-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
        </div>

        <table className="w-full">
            <thead>
                <tr className='text-xs text-gray-600  tracking-normal font-inter bg-blue-gray-50/50'>
                    <th className="py-2 px-7 font-normal text-start rounded-l-sm">PRODUCTS</th>
                    <th className="py-2 px-4 font-normal text-start ">BRAND</th>
                    <th className="py-2 px-4 font-normal text-start ">STOCK</th>
                    <th className="py-2 px-4 font-normal text-start rounded-r-sm">CATEGORY</th>
                </tr>
            </thead>
            <tbody>
                {products?.map(({ product_photos, product_name, product_barcode, product_brand, product_total_stock, product_total_unit_sold, product_category}, index) => {
                    const classes = index === products?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                    <tr key={index} className='hover:bg-gray-50 text-sm text-gray-800' onClick={()=>navigate(`/admin/products/product_id/${product_barcode}`)}>
                        <td className={classes}>
                            <div className="flex items-center gap-3">
                                <Avatar src={product_photos ? product_photos : '/3-08.webp'} alt={product_brand} size="sm" />
                                <div className="flex flex-col text-start">
                                    <div>{product_name}</div>
                                    <div className="text-blue-gray-700/70">{product_barcode}</div>
                                </div>
                            </div>
                        </td>
                        <td className={classes}>{product_brand}</td>
                        <td className={`${classes}`}>
                            <div className="flex flex-col text-start">
                                <div>{product_total_stock} item left</div>
                                <div className="text-blue-gray-700/70">{product_total_unit_sold} Sold</div>
                            </div>
                        </td>
                        <td className={classes}>{product_category?.category_name}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default AdminAllProductPage