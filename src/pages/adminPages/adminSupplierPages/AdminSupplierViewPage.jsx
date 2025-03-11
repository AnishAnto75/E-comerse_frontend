import axios from "axios";
import React ,{ useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PageNotFoundPage from "../../PageNotFoundPage";

const AdminSupplierViewPage = () => {
    const {id} = useParams()

    const [loading , setLoading] = useState(false)
    const [supplier , setSupplier ] = useState()
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/supplier/${id}`)
                console.log("adminFetchSupplier payload : " , res.data)
                setSupplier(res.data.data)
            } catch (error){
                setError(true)
                toast.error("Internal Server Error")
                console.error("error in adminFetchSupplier :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}
    if(!supplier){return <div className="w-full"> <PageNotFoundPage/> </div>}

  return (
    <div className="w-full px-5 min-h-screen">
        <div className="text-2xl my-5">SUPPLIER DETAILS</div>
        <div>ID: {supplier.supplier_id}</div>
        <div>Name: {supplier.supplier_name}</div>
        <div>Contacy Person: {supplier.supplier_contact_person}</div>
        <div>Contacy Person Phone: {supplier.supplier_contact_person_phone}</div>
        <div>email: {supplier.supplier_email}</div>
        <div>Phone: {supplier.supplier_phone}</div>
        <div>Gst No: {supplier.supplier_gst_no}</div>
        <div className="text-xl my-2 underline">Address</div>
        <div className="pl-5">
            <div>Street : {supplier.supplier_address?.street}</div>
            <div>City : {supplier.supplier_address?.city}</div>
            <div>District : {supplier.supplier_address?.district}</div>
            <div>State : {supplier.supplier_address?.state}</div>
            <div>Address : {supplier.supplier_address?.address}</div>
            <div>Pincode : {supplier.supplier_address?.pincode}</div>
        </div>
        <div className="text-xl my-2 underline">Bank Details</div>
        <div className="pl-5">
            <div>Bank Name : {supplier.supplier_bank_details?.bank_name}</div>
            <div>Account No : {supplier.supplier_bank_details?.account_number}</div>
            <div>Branch Name : {supplier.supplier_bank_details?.branch_name}</div>
            <div>IFSC No : {supplier.supplier_bank_details?.IFSC}</div>
        </div>
    </div>
  )
}

export default AdminSupplierViewPage