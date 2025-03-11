import { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";

const AdminCreateSupplier = () => {

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [supplier_name , setName ] = useState('')
    const [supplier_contact_person , setContactPerson ] = useState('')
    const [supplier_contact_person_phone , setContactPersonPhone ] = useState('')
    const [supplier_email , setEmail ] = useState('')
    const [supplier_phone , setPhone ] = useState('')
    const [supplier_gst_no , setGSTNo ] = useState('')
    const [street , setStreet ] = useState('')
    const [city , setCity ] = useState('')
    const [district , setDistrict ] = useState('')
    const [state , setState ] = useState('')
    const [pincode , setPincode ] = useState('')
    const [address , setAddress ] = useState('')
    const [bank_name , setBankName ] = useState('')
    const [account_number , setAccountNumber ] = useState('')
    const [branch_name , setBranchName ] = useState('')
    const [IFSC , setIFSC ] = useState('')

    const reset = ()=>{
        setName('')
        setContactPerson('')
        setContactPersonPhone('')
        setEmail('')
        setPhone('')
        setGSTNo('')
        setStreet('')
        setCity('')
        setDistrict('')
        setState('')
        setPincode('')
        setAddress('')
        setBankName('')
        setAccountNumber('')
        setBranchName('')
        setIFSC('')
    }

    const data =  {
        supplier_name,
        supplier_contact_person,
        supplier_contact_person_phone,
        supplier_email,
        supplier_phone,
        supplier_gst_no,
        supplier_address : {
            street ,
            city,
            district,
            state,
            pincode,
            address 
        },
        supplier_bank_details : {
            bank_name,
            account_number,
            branch_name,
            IFSC
        },
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true) 
            console.log(data)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/supplier/create-supplier` , {data})
            console.log("Create Supplier payload",res.data)
            toast.success(res?.data?.message)
            reset()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in createSupplier :" , error)
        } finally { setLoading(false) }
    }

    // Enter Key handle
    const input1Ref = useRef(null)
    const input2Ref = useRef(null)
    const input3Ref = useRef(null)
    const input4Ref = useRef(null)
    const input5Ref = useRef(null)
    const input6Ref = useRef(null)
    const input7Ref = useRef(null)
    const input8Ref = useRef(null)
    const input9Ref = useRef(null)
    const input10Ref = useRef(null)
    const input11Ref = useRef(null)
    const input12Ref = useRef(null)
    const input13Ref = useRef(null)
    const input14Ref = useRef(null)
    const input15Ref = useRef(null)
    const input16Ref = useRef(null)
    const handleKeyDown = (e, nextInputRef) => {
        if (e.key === "Enter") {
            e.preventDefault()
            nextInputRef.current.focus()
        }
    }

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="hero">
        <div className="p-6 flex items-center justify-center hero bg-slate-200">
            <div className="bg-gray-50 rounded-xl container  shadow-lg p-4 px-4 md:p-8 my-3 grid gap-4 gap-y-2 text-base">
                <div className="lg:col-span-10 grid gap-3 gap-y-2 md:gap-5 md:gap-y-5 text-md grid-cols-1 md:grid-cols-9 text-gray-500 tracking-wide font-[arial]">

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" autoComplete="off" required
                            value={supplier_name} onChange={(e)=>setName(e.target.value)}
                            ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)}
                            className="input input-bordered w-full mt-1 p-2" />
                    </div>

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="supplier_email">Email</label>
                        <input type="text" name="supplier_email" id="supplier_email" autoComplete="off"
                            value={supplier_email} onChange={(e)=>setEmail(e.target.value)}
                            ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)}
                            className="input input-bordered w-full mt-1" />
                    </div>

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="supplier_phone">Phone</label>
                        <input type="number" name="supplier_phone" id="supplier_phone" autoComplete="off"
                            value={supplier_phone} onChange={(e)=>setPhone(e.target.value)}
                            ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref)}
                            className="input input-bordered w-full mt-1" />
                    </div>

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="supplier_contact_person">Contact Person Name</label>
                        <input type="text" name="supplier_contact_person" id="supplier_contact_person" autoComplete="off"
                            value={supplier_contact_person} onChange={(e)=>setContactPerson(e.target.value)}
                            ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref)}
                            className="input input-bordered w-full mt-1" />
                    </div>

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="supplier_contact_person_phone">Contact Person Phone</label>
                        <input type="number" name="supplier_contact_person_phone" id="supplier_contact_person_phone" autoComplete="off" 
                            value={supplier_contact_person_phone} onChange={(e)=>setContactPersonPhone((e.target.value).toUpperCase().trim())}
                            ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref)}
                            className="input input-bordered w-full mt-1" />
                    </div>

                    <div className="col-span-10 md:col-span-3">
                        <label htmlFor="supplier_gst_no">GST No</label>
                        <input type="text" name="supplier_gst_no" id="supplier_gst_no" autoComplete="off"
                            value={supplier_gst_no} onChange={(e)=>setGSTNo(e.target.value)}
                            ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input7Ref)}
                            className="input input-bordered w-full mt-1" />
                    </div>
                    <div className="divider m-0 col-span-10"/>

                    <div className="col-span-10 text-4xl text-gray-600">Address</div>
                    <div className="col-span-10 grid grid-cols-1 md:grid-cols-7 gap-3 md:gap-5">
                        <div className="md:col-span-3 mb-7">
                            <label htmlFor="address">Address</label>
                            <textarea name="address" id="address" autoComplete="off"
                                value={address} onChange={(e)=>setAddress(e.target.value)}
                                ref={input7Ref} onKeyDown={(e) => handleKeyDown(e, input8Ref)}
                                className="textarea textarea-bordered mt-1 h-full w-full resize-none"/>
                        </div>

                        <div className="md:col-span-4 grid grid-cols-6 gap-3 gap-y-2 md:gap-5 md:gap-y-5">
                            <div className="col-span-10 md:col-span-3">
                                <label htmlFor="street">Street</label>
                                <input type="text" name="street" id="street" autoComplete="off"
                                    value={street} onChange={(e)=>setStreet(e.target.value)}
                                    ref={input8Ref} onKeyDown={(e) => handleKeyDown(e, input9Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="col-span-10 md:col-span-3">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" id="city" autoComplete="off"
                                    value={city} onChange={(e)=>setCity(e.target.value)}
                                    ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>
                            
                            <div className="col-span-10 md:col-span-2">
                                <label htmlFor="district">District</label>
                                <input type="text" name="district" id="district" autoComplete="off"
                                    value={district} onChange={(e)=>setDistrict(e.target.value)}
                                    ref={input10Ref} onKeyDown={(e) => handleKeyDown(e, input11Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="col-span-10 md:col-span-2">
                                <label htmlFor="state">State</label>
                                <input type="text" name="state" id="state" autoComplete="off"
                                    value={state} onChange={(e)=>setState(e.target.value)}
                                    ref={input11Ref} onKeyDown={(e) => handleKeyDown(e, input12Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="col-span-10 md:col-span-2">
                                <label htmlFor="pincode">Pincode</label>
                                <input type="number" name="pincode" id="pincode" autoComplete="off"
                                    value={pincode} onChange={(e)=>setPincode(e.target.value)}
                                    ref={input12Ref} onKeyDown={(e) => handleKeyDown(e, input13Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>
                        </div>
                    </div>
                    <div className="divider m-0 col-span-10"/>

                    <div className="col-span-10 grid grid-col-1 md:grid-cols-10 gap-3 gap-y-2 md:gap-5 md:gap-y-5">

                        <div className="col-span-10 text-4xl text-gray-600 ">Bank Details</div>

                        <div className="col-span-10 md:col-span-5 ">
                            <label htmlFor="bank_name">Bank Name</label>
                            <input type="text" name="bank_name" id="bank_name" autoComplete="off"
                                value={bank_name} onChange={(e)=>setBankName(e.target.value)}
                                ref={input13Ref} onKeyDown={(e) => handleKeyDown(e, input14Ref)}
                                className="input input-bordered w-full mt-1" />
                        </div>

                        <div className="col-span-10 md:col-span-5 ">
                            <label htmlFor="branch_name">Branch Name</label>
                            <input type="text" name="branch_name" id="branch_name" autoComplete="off"
                                value={branch_name} onChange={(e)=>setBranchName(e.target.value)}
                                ref={input14Ref} onKeyDown={(e) => handleKeyDown(e, input15Ref)}
                                className="input input-bordered w-full mt-1" />
                        </div>

                        <div className="col-span-10 md:col-span-5 ">
                            <label htmlFor="account_number">Account No</label>
                            <input type="text" name="account_number" id="account_number" autoComplete="off"
                                value={account_number} onChange={(e)=>setAccountNumber(e.target.value)}
                                ref={input15Ref} onKeyDown={(e) => handleKeyDown(e, input16Ref)}
                                className="input input-bordered w-full mt-1" />
                        </div>

                        <div className="col-span-10 md:col-span-5 ">
                            <label htmlFor="IFSC">IFSC</label>
                            <input type="text" name="IFSC" id="IFSC" autoComplete="off"
                                value={IFSC} onChange={(e)=>setIFSC(e.target.value)}
                                ref={input16Ref} 
                                className="input input-bordered w-full mt-1" />
                        </div>
                    </div>

                    <div className="col-span-10 mt-10 flex gap-5">
                        <div type='reset' onClick={()=>reset()} className="bg-red-500 hero hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                            Reset</div>
                        <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                            Submit</button> 
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AdminCreateSupplier