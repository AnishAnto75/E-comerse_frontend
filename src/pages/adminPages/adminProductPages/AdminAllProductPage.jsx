import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Avatar, Button, Card, CardBody, CardHeader, Chip } from '@material-tailwind/react';
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

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className="w-full p-2">
        <div className="rounded-none p-4  ">
            <div className="flex justify-between gap-4 ">
                <div className="items-center md:w-72 relative">
                    <input type='text' value={search_products_name} onChange={(e)=>handleSearchProducts(e)} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <Button onClick={()=>navigate(`/admin/products/new-product`)} size="sm" color='blue' variant='gradient'>Add Product</Button>
                </div>
            </div>
        </div>
        <div className="pt-2 px-0">
            <table className="w-full min-w-max table-auto text-left ">
                <thead>
                    <tr className='border-y border-blue-gray-100 text-center'>
                        <th className="bg-blue-gray-50/50 p-4">
                            <div className="font-normal text-sm text-gray-600 tracking-wider leading-none pl-5 text-start">Particulars</div>
                        </th>
                        <th className="bg-blue-gray-50/50 p-4">
                            <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Brand</div>
                        </th>
                        <th className="bg-blue-gray-50/50 p-4">
                            <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Stock</div>
                        </th>
                        <th className="bg-blue-gray-50/50 p-4">
                            <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Low Stock</div>
                        </th>
                        <th className="bg-blue-gray-50/50 p-4">
                            <div className="font-normal text-sm text-gray-600 tracking-wider leading-none">Hidden</div>
                        </th>
                        <th className="bg-blue-gray-50/50 p-4"></th>
                    </tr>
                </thead>
                <tbody className=''>
                    {products?.map(({ product_photos, product_name, product_barcode, product_brand, product_total_stock, product_total_unit_sold, product_low_in_stock , hidden}, index) => {
                        const isLast = index === products?.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        const low_in_stock = product_low_in_stock > product_total_stock;
                        return (
                        <tr key={index} className='hover:bg-gray-50 text-center' onClick={()=>navigate(`/admin/products/${product_barcode}`)}>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    <Avatar src={product_photos ? product_photos : '/3-08.webp'} alt={product_brand} size="sm" />
                                    <div className="flex flex-col text-sm text-start">
                                        <div className="font-normal text-blue-gray-700 ">{product_name}</div>
                                        <div className="font-normal text-blue-gray-700 opacity-70">{product_barcode}</div>
                                    </div>
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="text-sm text-blue-gray-800 line-clamp-1">{product_brand}</div>
                            </td>
                            <td className={`${classes}`}>
                                <div className="text-sm text-blue-gray-800 ">{product_total_stock}</div>
                            </td>
                            <td className={`${classes} place-items-center `}>
                                <div className={`hero h-5 w-5 rounded-full bg-opacity-80 ${low_in_stock ? "bg-red-500":'bg-green-500 '} `}>&nbsp;</div>
                            </td>
                            <td className={classes}>
                                <Chip size="sm" variant="ghost" value={hidden ? "HIDDEN" : "NOT"}color={hidden ? "red" : "green"}/>
                            </td>
                            <td className={classes} onClick={(e) => e.stopPropagation()}>
                                <Link to={`/admin/products/edit/${product_barcode}`} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-blue-500 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg></Link>
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

export default AdminAllProductPage