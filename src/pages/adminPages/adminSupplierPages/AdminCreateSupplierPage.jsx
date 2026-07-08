import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button} from '@material-tailwind/react'
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiUploadCloud, FiX } from "react-icons/fi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import AdminSideBar from "../../../components/admin/AdminSideBar";

const AdminCreateSupplierPage = () => {

    const navigate = useNavigate()
    
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [supplier_name, setSupplierName] = useState('')
    const [supplier_phone, setSupplierPhone] = useState('')
    const [supplier_email, setSupplierEmail] = useState('')
    const [supplier_gst_no, setSupplierGstNo] = useState('')
    const [supplier_type, setSupplierType ] = useState('Distributor')
    const [supplier_contact_person, setSupplierContactPerson] = useState('')
    const [supplier_contact_person_phone, setSupplierContactPersonPhone] = useState('')
    const [landmark, setLandmark] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [bank_name, setBankName] = useState('')
    const [account_number, setAccountNumber] = useState('')
    const [branch_name, setBranchName ] = useState('')
    const [ifsc, setIfsc ] = useState('')
    const [account_holder, setAccountHolder ] = useState('')
    const [payment_terms, setPaymentTerms ] = useState('')
    const [notes, setNotes ] = useState('')



    const reset = ()=>{
        setSupplierName('')
        setSupplierContactPerson('')
        setSupplierContactPersonPhone('')
        setSupplierEmail('')
        setSupplierPhone('')
        setSupplierGstNo('')
        setLandmark('')
        setStreet('')
        setCity('')
        setDistrict('')
        setState('')
        setPincode('')
        setBankName('')
        setAccountNumber('')
        setBranchName('')
        setIfsc('')
        setAccountHolder('')
        setPaymentTerms('')
        setSupplierType('Distributor')
        setNotes('')
    }


    // Form Submission
    const handleSubmit = async(e)=>{
        try {
            setLoading(true) 
            const data = {
                supplier_name,
                supplier_phone,
                supplier_email,
                supplier_gst_no,
                supplier_type,
                supplier_contact_person,
                supplier_contact_person_phone,
                supplier_address : { landmark, street, city, district, state, pincode }, 
                supplier_bank_details:{ bank_name, account_number, branch_name, ifsc, account_holder },
                payment_terms,
                notes
            }

            console.log({data})

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/supplier/create-supplier` , data)
            console.log("addNewSupplier response",res.data)
            toast.success(res.data?.message)
            reset()
            navigate('/admin/supplier')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addNewProduct :" , error)
        } finally { setLoading(false) }
    }


  if (loading ) { return <LoadingSpinner/>}
  if (error) { return <ErrorComponent/>}
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="p-6 font-inter place-items-center w-full ">

        <div className="text-gray-600 text-2xl font-semibold w-full">Create Supplier</div>

        <div className="rounded-xl container max-w-screen-xl mt-5 border shadow-lg p-8 ">
            <div className="w-full text-gray-700 gap-3 grid grid-cols-10 ">

                <div className="text-xl col-span-10 font-medium text-sky-600 mt-1">Supplier Details</div>
                <div className="md:col-span-4 space-y-2 ">
                    <label className="text-lg font-medium text-gray-600" >Name<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" autoComplete="off" value={supplier_name} onChange={(e)=>setSupplierName(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600" >Phone No.<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" autoComplete="off" value={supplier_phone} onChange={(e)=>setSupplierPhone(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600" >Email</label>
                    <input type="text" autoComplete="off" value={supplier_email} onChange={(e)=>setSupplierEmail(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600" >GST No.</label>
                    <input type="text" autoComplete="off" value={supplier_gst_no} onChange={(e)=>setSupplierGstNo(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600">Type</label>
                    <select value={supplier_type} onChange={(e)=> setSupplierType(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        <option value='Distributor'>Distributor</option>
                        <option value='Manufacturer'>Manufacturer</option>
                        <option value='Wholesaler'>Wholesaler</option>
                    </select>
                </div>

                <div className="text-xl col-span-10 text-sky-600 font-medium mt-5">Contact Person Details</div>
                <div className="md:col-span-4 space-y-2">
                    <label className="text-lg font-medium text-gray-600">Contact Person Name</label>
                    <input type="text" value={supplier_contact_person} onChange={(e)=>setSupplierContactPerson(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600">Contact Person phone No.</label>
                    <input type="text" value={supplier_contact_person_phone} onChange={(e)=>setSupplierContactPersonPhone(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="col-span-10 grid grid-cols-2 gap-y-3 gap-x-10">
                    <div className="grid grid-cols-10 gap-3">
                        <div className="text-xl col-span-10 text-sky-600 font-medium mt-5">Address Details</div>
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Landmark</label>
                            <input type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Street</label>
                            <input type="text" value={street} onChange={(e)=>setStreet(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-5 space-y-2">
                            <label className="text-lg font-medium text-gray-600">City</label>
                            <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-5 space-y-2">
                            <label className="text-lg font-medium text-gray-600">District</label>
                            <input type="text" value={district} onChange={(e)=>setDistrict(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-lg font-medium text-gray-600">State</label>
                            <input type="text" value={state} onChange={(e)=>setState(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Pincode</label>
                            <input type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 gap-3">
                        <div className="text-xl col-span-10 text-sky-600 font-medium mt-5">Bank Details</div>
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Bank Name</label>
                            <input type="text" value={bank_name} onChange={(e)=>setBankName(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Account no.</label>
                            <input type="text" value={account_number} onChange={(e)=>setAccountNumber(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-5 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Branch Name</label>
                            <input type="text" value={branch_name} onChange={(e)=>setBranchName(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-5 space-y-2">
                            <label className="text-lg font-medium text-gray-600">IFSC</label>
                            <input type="text" value={ifsc} onChange={(e)=>setIfsc(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                        <div className="md:col-span-10 space-y-2">
                            <label className="text-lg font-medium text-gray-600">Account Holder Name</label>
                            <input type="text" value={account_holder} onChange={(e)=>setAccountHolder(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                        </div>
                    </div>
                </div>


                <div className="text-xl col-span-10 text-sky-600 font-medium mt-5">Additional Information</div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600">Payment Terms</label>
                    <input type="Number" value={payment_terms} placeholder="In Days" onChange={(e)=>setPaymentTerms(Number(e.target.value))} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-8 space-y-2">
                    <label className="text-lg font-medium text-gray-600">Notes</label>
                    <input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className=" col-span-10 mt-10 grid grid-cols-4 gap-5">
                    <button  type="button" onClick={()=>reset()} className=" bg-red-500 text-white rounded-xl p-4 col-span-2" >Reset</button>
                    <button onClick={()=>handleSubmit()} className="bg-blue-500 text-white rounded-xl p-4 col-span-2" >Submit</button> 
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminCreateSupplierPage