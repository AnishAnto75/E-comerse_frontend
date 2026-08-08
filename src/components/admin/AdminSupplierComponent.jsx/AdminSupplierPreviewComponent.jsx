import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import ErrorComponent from '../../ErrorComponent'

const AdminSupplierPreviewComponent = ({supplier_id}) => {
    
        
    // const supplier = {
        //     supplier_address: {
            //         street : "Neduvilai",
    //         city : "Karungal",
    //         district : "Kanyakumari",
    //         state : "Tamil Nadu",
    //         pincode : 629157,
    //         address: "18-17A/1, near sbi"
    //     },
    //     supplier_bank_details: {
    //         bank_name: "State Bank Of India",
    //         account_number : "452145879563",
    //         branch_name : "Karungal",
    //         IFSC : "IFSC7854154785"
    //     },
    //     status : "active",
    //     _id : "69dba2edcbac78d80ab23822",
    //     supplier_id : "SUP0412375358",
    //     supplier_name : "Hindustan Agencies",
    //     supplier_contact_person : "Hind",
    //     supplier_contact_person_phone : 8546215346,
    //     supplier_email : "hindustan@gmail.com",
    //     supplier_phone : 8451726351,
    //     supplier_gst_no : "JHbjsjknx662akm",
    //     createdAt : "2026-04-12T13:49:33.126Z"
    // }

    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)

    const [supplier, setSupplier] = useState(null)

    const handleRef = useRef(true)
    useEffect(()=>{
        if(!supplier_id) return
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/supplier/supplier_id/${supplier_id}`, {withCredentials: true})
                console.log("fetchSupplierPreview payload : " , res.data)
                setSupplier(res.data.data)
            } catch (error){
                setError(true)
                console.error("error in fetchSupplierPreview :" , error)
            } finally { setLoading(false) }
        }
        fetch()
    } , [supplier_id])

    if(loading){return <LoadingComponent/>}
    if(error || !supplier){return <ErrorComponent/>}

return (
    <div className="p-2 font-inter text-lg font-medium text-gray-900">
        <div className='text-xl'>Supplier Preview</div>
        <div className='text-xl font-semibold text-gray-600 mt-3'>#{supplier.supplier_id}</div>
        
        <div onClick={()=>navigate(`/admin/supplier/supplier_id/${supplier.supplier_id}`)} className="flex relative cursor-pointer justify-center mt-4 rounded-3xl py-5 flex-col items-center bg-gray-100/70">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ supplier.status == "active" ? "bg-sky-500" : "bg-amber-500" }`} title={supplier.status}/>
            <div className="w-36 h-36 rounded-full bg-blue-100 text-8xl flex items-center justify-center uppercase text-blue-700 font-semibold">{supplier.supplier_name?.charAt(0)}</div>
            <div className='text-xl font-semibold mt-1 pt-0.5 line-clamp-1'>{supplier.supplier_name}</div>
            <div className='font-semibold text-gray-600 mt-2'>{supplier.supplier_email || "---"}</div>
            <div className='font-semibold text-gray-600 mt-2'>Ph. No. {supplier.supplier_phone}</div>
        </div>

        <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-gray-50 p-4">
                <p>Contact Person</p>
                <div className="flex justify-between mt-2 text-gray-600">
                    <span>{supplier.supplier_contact_person || "---"}</span>
                    <span>{supplier.supplier_contact_person_phone || "---"}</span>
                </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
                <p>GST Number</p>
                <p className="mt-2 text-gray-600">{supplier.supplier_gst_no || "---"}</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
                <p>Address</p>
                <div className='mt-1 text-gray-600'>{supplier.supplier_address?.landmark && `${supplier.supplier_address?.landmark}, `} {supplier.supplier_address?.street && `${supplier.supplier_address?.street}, `} {supplier.supplier_address?.city && `${supplier.supplier_address?.city}, `} {supplier.supplier_address?.district && `${supplier.supplier_address?.district}, `} {supplier.supplier_address?.state && `${supplier.supplier_address?.state}`} {supplier.supplier_address?.pincode && `- ${supplier.supplier_address?.pincode}`}</div> 
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
                <p>Bank Details</p>

                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Bank</span>
                        <span>{supplier.supplier_bank_details?.bank_name || "---"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">A/C Number</span>
                        <span>{supplier.supplier_bank_details?.account_number || "---"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">A/C Holder</span>
                        <span>{supplier.supplier_bank_details?.account_holder || "---"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">IFSC</span>
                        <span>{supplier.supplier_bank_details?.IFSC || "---"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Branch</span>
                        <span>{supplier.supplier_bank_details?.branch_name || "---"}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
)
}

export default AdminSupplierPreviewComponent