import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";

const AdminAllSuppliersPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [suppliers , setSuppliers ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true) 

    useEffect(()=>{
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    const fetch = async()=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/supplier/all-supplier`)
            console.log("adminFetchAllSuppliers payload : " , res.data)        
            setSuppliers(res.data.data)
        } catch (error) {
            setError(true)
            toast.error("Internal Server Error")
            console.log("error in adminFetchAllSuppliers :" , error)
        } finally { setLoading(false) }
    }

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}

  return (
    <div className='w-full m-5'>
        <div className="flex overflow-hidden rounded-md md:w-80  bg-gray-200 ">
            <input type="text" placeholder="Search Supplier" className="w-full rounded-bl-md rounded-tl-md bg-gray-100 px-4 py-2.5 text-gray-700 focus:outline-blue-500" />
            <button className="bg-blue-500 px-3.5 text-white duration-150 hover:bg-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </button>
        </div>
        <div className="font-sans overflow-x-auto w-full mt-2">
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-4">S.No</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Id</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">email</th> 
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone No</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">contact Person</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">View</th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 ">
                    {suppliers?.map((supplier , index) =>
                        <tr key={index}>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r max-w-4">{index+1}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{supplier.supplier_id ? supplier.supplier_id : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{supplier.supplier_name ? supplier.supplier_name : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{supplier.supplier_email ? supplier.supplier_email : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">{supplier.supplier_phone ? supplier.supplier_phone : "---"}</td>
                            <td className="py-5 px-2 text-sm text-gray-800 text-center border-r">
                                {supplier.supplier_contact_person && supplier.supplier_contact_person_phone ? 
                                    <><span className='block'>name: {supplier.supplier_contact_person}</span>                                
                                    <span className='block'>Ph no: {supplier.supplier_contact_person_phone}</span>                                
                                    </>
                                : "---"}
                            </td>
                            <td> <Link to={`/admin/supplier/${supplier.supplier_id}`} className='hero ' ><FaEye /></Link> </td>
                        </tr>
                    )}
                </tbody>
            </table>
                <div className='divider' />
        </div>
    </div>
  )
}

export default AdminAllSuppliersPage