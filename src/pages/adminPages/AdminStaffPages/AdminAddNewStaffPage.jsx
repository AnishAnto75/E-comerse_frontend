import { useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AdminAddNewProductPage = () => {

    const [loading , setLoading] = useState(false)

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

    const [staff_username , setStaffUserName ] = useState('')
    const [staff_email , setStaffEmail ] = useState('')
    const [staff_password , setStaffPassword ] = useState('')
    const [staff_type , setStaffType ] = useState('')
    const [staff_photo , setStaffPhoto ] = useState('')
    const [staff_phone_number , setStaffPhoneNmber ] = useState('')
    const [staff_alternate_phone_number , setStaffAlternatePhoneNumber ] = useState('')
    const [staff_qualification , setStaffQualification ] = useState('')
    const [staff_pancard_number , setStaffPancardNumber ] = useState('')
    const [staff_aadhar_number , setStaffAadharNumber ] = useState('')
    const [staff_DOB , setStaffDOB ] = useState('')
    const [staff_account_number , setStaffAccountNumber ] = useState('')
    const [houseNo , setHouseNo] = useState('')
    const [city , setCity] = useState('')
    const [pincode , setPincode ] = useState('')
    const [district , setDistrict ] = useState('')
    const [address , setAddress ] = useState('')
   
    const types = [ "staff", "manager", "general_manager", "admin" ]

    const data =  {
        staff_username , 
        staff_email , 
        staff_password , 
        staff_type , 
        staff_photo , 
        staff_phone_number , 
        staff_alternate_phone_number , 
        staff_qualification , 
        staff_pancard_number , 
        staff_aadhar_number , 
        staff_DOB ,
        staff_account_number ,
        staff_addresses : {
            houseNo,
            city , 
            pincode , 
            district , 
            address 
        }
    }
    
    const reset = ()=>{
        setStaffUserName('')
        setStaffEmail('')
        setStaffPassword('')
        setStaffType('')
        setStaffPhoto('')
        setStaffPhoneNmber('')
        setStaffAlternatePhoneNumber('')
        setStaffQualification('')
        setStaffPancardNumber('')
        setStaffAadharNumber('')
        setStaffDOB('')
        setStaffAccountNumber('')
        setHouseNo('')
        setCity('')
        setPincode('')
        setDistrict('')
        setAddress('')
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true) 
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/staff/add-staff` , {data})
            console.log(" addNewStaff response :",res.data)
            toast.success(res.data?.message)
            reset()
        } catch (error) {
            toast.error(error.response.data?.message)
            console.error( "addNewStaff error : ",error)
        } finally { setLoading(false) }
    }

  if (loading){return <div>Loading..</div>}

  return (
    <div className="w-full">
        <div className="bg-slate-200 flex flex-col px-5 min-h-screen w-full p-5 ">
            <div className='font-[arial] pb-5 hero text-3xl text-gray-600'>Add Staff</div>
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full hero ">
                <div className="bg-gray-50 rounded-xl shadow-lg p-4 md:p-8 container max-w-screen-lg ">
                    <div className="grid gap-4 gap-y-2 text-base grid-cols-1 lg:grid-cols-1">
                        <div className="lg:col-span-10">
                            <div className="grid gap-3 gap-y-2 md:gap-5 md:gap-y-5 text-md grid-cols-1 md:grid-cols-10 text-gray-500 tracking-wide font-[arial]">

                            <div className="col-span-10 text-2xl underline underline-offset-4">Staff Details</div>
                            <div className="md:col-span-3">
                                <label htmlFor="Username">Username</label>
                                <input type="text" name="Username" id="Username" autoComplete="off" required
                                    value={staff_username} onChange={(e)=>setStaffUserName(e.target.value)}
                                    ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-4">
                                <label htmlFor="staff_email">Email</label>
                                <input type="text" name="staff_email" id="staff_email" autoComplete="off" required
                                    value={staff_email} onChange={(e)=>setStaffEmail(e.target.value)}
                                    ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-3 ">
                                <label htmlFor="staff_password">Password</label>
                                <input type="text" name="staff_password" id="staff_password" autoComplete="off" required
                                    value={staff_password} onChange={(e)=>setStaffPassword(e.target.value)}
                                    ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-3 ">
                                <label htmlFor="staff_type">Staff Type</label>
                                <select name="staff_type" id="staff_type" required 
                                    value={staff_type} onChange={(e)=> setStaffType(e.target.value)} 
                                    ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref)}
                                    className="select select-bordered w-full mt-1 ">
                                    <option disabled value='' />
                                    {types.map((name, index) =>( <option key ={index} value={name}>{name}</option> ))}
                                </select>
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="staff_phone_number">Phone Number</label>
                                <input type="number" name="staff_phone_number" id="staff_phone_number" autoComplete="off" required
                                    value={staff_phone_number} onChange={(e)=>setStaffPhoneNmber(e.target.value)}
                                    ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref)}
                                    className="input input-bordered w-full mt-1 " />
                            </div>

                            <div className="md:col-span-4 ">
                                <label htmlFor="staff_alternate_phone_number">Alternate Phn no</label>
                                <input type="number" name="staff_alternate_phone_number" id="staff_alternate_phone_number" autoComplete="off"
                                    value={staff_alternate_phone_number} onChange={(e)=>setStaffAlternatePhoneNumber((e.target.value))}
                                    ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input7Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-2 ">
                                <label htmlFor="staff_DOB">Date of Birth</label>
                                <input type="date" name="staff_DOB" id="staff_DOB"
                                    value={staff_DOB} onChange={(e)=>setStaffDOB(e.target.value)}
                                    ref={input7Ref} onKeyDown={(e) => handleKeyDown(e, input8Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-5 ">
                                <label htmlFor="photos">Photo</label>
                                <input type="file" name="photos" id="photos"
                                    accept="image/png, image/jpeg" onChange={(e)=>setStaffPhoto(e.target.files[0])}
                                    className="file-input file-input-bordered w-full mt-1 " />
                            </div>

                            <div className="md:col-span-3 ">
                                <label htmlFor="staff_qualification">Qualification</label>
                                <input type="text" name="staff_qualification" id="staff_qualification" autoComplete="off"
                                    value={staff_qualification} onChange={(e)=>setStaffQualification(e.target.value)}
                                    ref={input8Ref} onKeyDown={(e) => handleKeyDown(e, input9Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="divider m-0 col-span-10"/>
                            <div className="col-span-10 text-2xl underline underline-offset-4">Accounts and Cards</div>

                            <div className="md:col-span-3">
                                <label htmlFor="staff_pancard_number">Pancard Number</label>
                                <input type="text" name="staff_pancard_number" id="staff_pancard_number" autoComplete="off"
                                    value={staff_pancard_number} onChange={(e)=>setStaffPancardNumber(e.target.value)}
                                    ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>
                            
                            <div className="md:col-span-3">
                                <label htmlFor="staff_aadhar_number">Aadhar Number</label>
                                <input type="text" name="staff_aadhar_number" id="staff_aadhar_number" autoComplete="off"
                                    value={staff_aadhar_number} onChange={(e)=>setStaffAadharNumber(e.target.value)}
                                    ref={input10Ref} onKeyDown={(e) => handleKeyDown(e, input11Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-4">
                                <label htmlFor="staff_account_number">Account Number</label>
                                <input type="text" name="staff_account_number" id="staff_account_number" autoComplete="off"
                                    value={staff_account_number} onChange={(e)=>setStaffAccountNumber(e.target.value)}
                                    ref={input11Ref} onKeyDown={(e) => handleKeyDown(e, input12Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="divider m-0 col-span-10"/>
                            <div className="col-span-10 text-2xl underline underline-offset-4">Address</div>

                            <div className="md:col-span-3">
                                <label htmlFor="houseNo">House No</label>
                                <input type="text" name="houseNo" id="houseNo" autoComplete="off"
                                    value={houseNo} onChange={(e)=>setHouseNo(e.target.value)}
                                    ref={input12Ref} onKeyDown={(e) => handleKeyDown(e, input13Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-4">
                                <label htmlFor="staff_city">City</label>
                                <input type="text" name="staff_city" id="staff_city" autoComplete="off"
                                    value={city} onChange={(e)=>setCity(e.target.value)}
                                    ref={input13Ref} onKeyDown={(e) => handleKeyDown(e, input14Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-3 ">
                                <label htmlFor="staff_pincode">Pincode</label>
                                <input type="numer" name="staff_pincode" id="staff_pincode" autoComplete="off"
                                    value={pincode} onChange={(e)=>setPincode(e.target.value)}
                                    ref={input14Ref} onKeyDown={(e) => handleKeyDown(e, input15Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-4">
                                <label htmlFor="staff_district">District</label>
                                <input type="text" name="staff_district" id="staff_district" autoComplete="off"
                                    value={district} onChange={(e)=>setDistrict(e.target.value)}
                                    ref={input15Ref} onKeyDown={(e) => handleKeyDown(e, input16Ref)}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-6 ">
                                <label htmlFor="staff_address">Address</label>
                                <input type="text" name="staff_address" id="staff_address" autoComplete="off"
                                    value={address} onChange={(e)=>setAddress(e.target.value)}
                                    ref={input16Ref}
                                    className="input input-bordered w-full mt-1" />
                            </div>

                            <div className="md:col-span-10 mt-10 flex gap-1">
                                <div onClick={()=>reset()} className="bg-red-500 hero hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                                    Reset</div> 
                                <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                                    Submit</button> 
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AdminAddNewProductPage