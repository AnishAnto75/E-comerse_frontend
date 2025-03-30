import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip,} from "@material-tailwind/react";
import { debounce } from 'lodash';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent';

const AdminProductPage = () => {
    
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [response, setResponse] = useState(null)
    const [products, setProducts] = useState(null)
    const handleRef = useRef(true) 

    const [search_products_name, setSearchProductsName] = useState('')

    useEffect(()=>{
        const fetchHighSellingProducts = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/product-page`)
                console.log("adminFetchHighSellingProducts payload : " , res.data)        
                setResponse(res.data?.data)
                setProducts(res.data?.data?.products)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in adminFetchHighSellingProducts :" , error)
            } finally { setLoading(false) }
        }
        
        if(handleRef.current) {
            fetchHighSellingProducts()
            handleRef.current = false
        }
    } , [])

    const requestProductsByName = debounce(async (term) => {
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/search?name=${term}`)
                // console.log("requestProductsByName: ",res.data)
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
        else{setProducts(response.products)}
    }

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}
    if(!response){return <ErrorComponent/>}

  return (
    <div className='p-2 w-full bg-white'>
        <div className=' col-span-8 grid grid-cols-3 gap-5 w-full px-3 pt-3 text-gray-800'>
            <div onClick={()=> navigate('/admin/products/all-products')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
                <span>Total Products</span>
                <span className='text-5xl w-full px-5 h-full items-center flex'>{response?.total_products ? response.total_products : "NaN"}</span>
            </div>            
            <div onClick={()=> navigate('/admin/products/low-in-stock')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
                <span className=''>Low Stock Products</span>
                <span className='text-5xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.low_in_stock ? response.low_in_stock : "NaN"}</span>
            </div>     
            <div onClick={()=>navigate('/admin/stock')} className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col cursor-pointer'>
                <span>Total Stock</span>
                <span className='text-4xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.total_stock ? response.total_stock : "NaN"}</span>
            </div>         
        </div>
        <div className="w-full p-2">
            <div className="rounded-none p-4">
                <div className="flex justify-between gap-4 ">
                    <div className="items-center md:w-72 relative">
                        <input type='text' value={search_products_name} onChange={(e)=>handleSearchProducts(e)} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button onClick={()=>navigate(`/admin/products/all-products`)} variant="outlined" color='blue' size="sm">view all</Button>
                        <Button onClick={()=>navigate(`/admin/products/new-product`)} size="sm" color='blue' variant='gradient'>Add Product</Button>
                    </div>
                </div>
            </div>
            <div className="pt-2 px-0">
                <table className="w-full min-w-max table-auto text-left ">
                    <thead>
                        <tr className='border-y border-blue-gray-100 text-center'>
                            <th className="bg-blue-gray-50/50 p-4 text-start">
                                <div className="font-normal text-sm  text-gray-600 tracking-wider leading-none pl-5">Particulars</div>
                            </th>
                            <th className="bg-blue-gray-50/50 p-4">
                                <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Brand</div>
                            </th>
                            <th className="bg-blue-gray-50/50 p-4">
                                <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Stock</div>
                            </th>
                            <th className="bg-blue-gray-50/50 p-4">
                                <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Units Sold</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {products?.map(({ product_photos, product_name, product_barcode, product_brand, product_total_stock, product_total_unit_sold }, index) => {
                            const isLast = index === products?.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                            <tr key={index} className='hover:bg-gray-50 text-center' onClick={()=>navigate(`/admin/products/${product_barcode}`)}>
                                <td className={`${classes}`}>
                                    <div className="flex items-center text-start gap-3">
                                        <Avatar src={product_photos ? product_photos : '/3-08.webp'} alt={product_brand} size="sm" />
                                        <div className="flex flex-col text-sm">
                                            <div className="font-normal text-blue-gray-700 line-clamp-1">{product_name}</div>
                                            <div className="font-normal text-blue-gray-700 opacity-70">{product_barcode}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <div className="text-sm text-blue-gray-800 line-clamp-1">{product_brand}</div>
                                </td>
                                <td className={classes}>
                                    <div className="text-sm text-blue-gray-800 line-clamp-1">{product_total_stock}</div>
                                </td>
                                <td className={classes}>
                                    <div className="text-sm text-blue-gray-800 line-clamp-1">{product_total_unit_sold}</div>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AdminProductPage