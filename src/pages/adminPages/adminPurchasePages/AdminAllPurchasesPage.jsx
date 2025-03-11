import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";

const AdminAllPurchasesPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [purchases , setPurchases ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/all-purchases`)
                console.log("adminFetchAllPuurchases payload : " , res.data)        
                setPurchases(res.data.data)
            } catch (error) {
                setError(true)
                toast.error("Internal Server Error")
                console.log("error in adminFetchAllPurchases :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    const totalProducts = (purchase)=>{
        let totalPro = 0
        purchase.products?.map(product => totalPro += product.quantity_recieved)
        return totalPro 
    }

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

  return (
    <div className='w-full m-5'>
        <div className="flex overflow-hidden rounded-md md:w-80  bg-gray-200 ">
            <input type="text" placeholder="Search Purchase Book" className="w-full rounded-bl-md rounded-tl-md bg-gray-100 px-4 py-2.5 text-gray-700 focus:outline-blue-500" />
            <button className="bg-blue-500 px-3.5 text-white duration-150 hover:bg-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </button>
        </div>
        <div className="font-sans overflow-x-auto w-full mt-2">
            <table className="min-w-full divide-y divide-gray-200 border table-fixed table-zebra">
                <thead className="bg-gray-100">
                    <tr> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-4">S.No</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice No</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier Name</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Products</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">View</th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 ">
                    {purchases?.map((purchase , index) =>
                        <tr key={index}>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r max-w-4">{index+1}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{purchase.invoice_no ? purchase.invoice_no : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{purchase.supplier_id ? purchase.supplier_id.supplier_name : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{purchase.products ? purchase.products.length : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{totalProducts(purchase)}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{purchase.total_purchase_amount ? purchase.total_purchase_amount : "---"}</td>
                            <td><Link to={`/admin/entry/purchase/${purchase._id}`} className='hero'><FaEye /></Link> </td>
                        </tr>
                    )}
                </tbody>
            </table>
                <div className='divider' />
        </div>
    </div>
  )
}

export default AdminAllPurchasesPage