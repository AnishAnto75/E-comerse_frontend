import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";

const AdminAllProductPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [products , setProducts ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/all-product`)
                console.log("adminFetchAllProduct payload : " , res.data)        
                setProducts(res.data.data)
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


    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

  return (
    <div className='w-full m-5'>
        <div className="flex overflow-hidden rounded-md md:w-80  bg-gray-200 ">
            <input type="text" placeholder="Search Product" className="w-full rounded-bl-md rounded-tl-md bg-gray-100 px-4 py-2.5 text-gray-700 focus:outline-blue-500" />
            <button className="bg-blue-500 px-3.5 text-white duration-150 hover:bg-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </button>
        </div>
        <div className="font-sans overflow-x-auto w-full mt-2">
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider max-w-4">S.No</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">Photo</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">Barcode</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">Brand</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">Name</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">Stock</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 tracking-wider">View</th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 ">
                    {products?.map((product , index) =>
                        <tr key={index}>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r max-w-4">{index+1}</td>
                            <td className="p-1 border-r place-items-center w-28"> <img className="object-cover min-h-24 min-w-28 max-h-24 max-w-28 object-center" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image"/> </td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{product.product_barcode ? product.product_barcode : '---'}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{product.product_brand ? product.product_brand : '---'}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{product.product_name ? product.product_name : '---'}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{product.product_total_stock}</td>
                            <td> <Link to={`/admin/products/${product.product_barcode}`} className='hero ' ><FaEye /></Link> </td>
                        </tr>
                    )}
                </tbody>
            </table>
                <div className='divider' />
        </div>
    </div>
  )
}

export default AdminAllProductPage
