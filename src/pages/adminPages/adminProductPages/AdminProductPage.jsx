import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminProductPage = () => {
    
    const [loading , setLoading] = useState(false)
    const [products , setProducts ] = useState([])
    const [total_no_of_products , setTotalNoOfProducts] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetchHighSellingProducts = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/high-selling-products`)
                console.log("adminFetchHighSellingProducts payload : " , res.data)        
                setProducts(res.data.data?.products)
                setTotalNoOfProducts(res.data.data?.total_no_of_products)
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

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

  return (
    <div className='p-2 w-full bg-blue-gray-50'>
        <div className='grid grid-cols-10 w-full gap-2 text-gray-700'>
            <div className=' col-span-8 grid grid-cols-3 w-full gap-3 text-gray-700'>
                <div className='col-span-1 bg-white min-[]:h-44 rounded-2xl p-10 flex flex-col font-[arial]'>
                    <span className=''>Total Products</span>
                    <span className='text-5xl text-center w-full pl-7 h-full items-center flex'>{total_no_of_products}</span>
                </div>
                <div className='col-span-1 bg-white min-h-44 rounded-2xl p-10 flex flex-col font-[arial]'>
                    <span className=''>Total Orders</span>
                    <span className='text-5xl text-center w-full pl-7 h-full items-center flex'>205</span>
                </div>
                <div className='col-span-1 bg-white rounded-2xl p-10 flex flex-col font-[arial]'>
                    <span className=''>Total Orders</span>
                    <span className='text-5xl text-center w-full pl-7 h-full items-center flex'>205</span>
                </div>
                
            </div>
            <div className='bg-white col-span-2'>kjb</div>
        </div>
    </div>
  )
}

export default AdminProductPage