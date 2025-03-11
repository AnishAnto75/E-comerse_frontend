import axios from "axios";
import React ,{ useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PageNotFoundPage from "../../PageNotFoundPage";

const AdminStaffViewPage = () => {
    const {id} = useParams()

    const [loading , setLoading] = useState(false)
    const [staff , setStaff ] = useState(null)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/staff/${id}`)
                console.log("adminFetchStaff payload : " , res.data)
                setStaff(res.data.data)
            } catch (error){
                toast.error("Internal Server Error")
                console.error("error in adminFetchStaff :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch() 
            handleRef.current = false
        }
    } , [])

    if(loading){return <div>loading...</div>}
    if(!staff){return <div className="w-full"> <PageNotFoundPage/> </div>}

  return (
    <div className="w-full px-5 min-h-screen">
        <div className="text-2xl my-5">staff DETAILS</div>
        <div>ID: {staff.staff_id}</div>
        <div>Name: {staff.staff_username}</div>
        <div>DOB : {staff.staff_DOB ? staff.staff_DOB : 'NAN'}</div>
        <div>Aadhar No : {staff.staff_aadhar_number? staff.staff_aadhar_number : 'NAN'}</div>
        <div>Account No : {staff.staff_account_number? staff.staff_account_number : 'NAN'}</div>
        <div>Alternate PhoneNo : {staff.staff_alternate_phone_number? staff.staff_alternate_phone_number : 'NAN'}</div>
        <div>Email : {staff.staff_email ? staff.staff_email : 'NAN'}</div>
        <div>Pancard No : {staff.staff_pancard_number ? staff.staff_pancard_number : 'NAN'}</div>
        <div>Phone No : {staff.staff_phone_number ? staff.staff_phone_number : 'NAN'}</div>
        <div>Qualification : {staff.staff_qualification ? staff.staff_qualification : 'NAN'}</div>
        <div>Type : {staff.staff_type ? staff.staff_type : 'NAN'}</div>
    </div>
  )
}

export default AdminStaffViewPage