import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button} from '@material-tailwind/react'
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useNavigate, Link } from "react-router-dom";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { IoMdClose } from "react-icons/io";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";

const AdminAddNewStaffPage = () => {

    const navigate = useNavigate()
    
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const [salary, setSalary] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [alternate_phone_number, setAlternatePhoneNumber] = useState('')
    const [qualification, setQualification] = useState('')
    const [pancard_number, setPancardNumber] = useState('')
    const [aadhar_number, setAadharNumber] = useState('')
    const [DOB, setDOB] = useState('')
    const [emergency_name, setEmergencyName] = useState('')
    const [emergency_number, setEmergencyNumber] = useState('')
    const [emergency_relation, setEmergencyRelation] = useState('')
    const [photo , setPhoto] = useState(null)
    const [account_number, setAccountNumber] = useState('')
    const [branch_name, setBranchName ] = useState('')
    const [ifsc, setIfsc ] = useState('')
    const [account_holder, setAccountHolder ] = useState('')
    const [bank_name, setBankName] = useState('')
    const [house_no, setHouseNo] = useState('')
    const [area, setArea] = useState('')
    const [landmark, setLandmark] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [joining_date, setJoiningDate] = useState('')
    
    const photoInputRef = useRef(null);
    const [previewPhoto, setPreviewPhoto] = useState("");
    const [photoDragActive, setPhotoDragActive] = useState(false);
    const handlePhoto = (file) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error("Image size must be less than 5 MB.");
            return;
        }
        setPhoto(file);
        setPreviewPhoto(URL.createObjectURL(file));
    };
    const handleDropPhoto = (e) => {
        e.preventDefault();
        setPhotoDragActive(false);

        const file = e.dataTransfer.files[0];
        handlePhoto(file);
    };
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        handlePhoto(e.target.files[0]);
    };
    const removePhoto = () => {
        setPhoto(null);
        setPreviewPhoto("");

        if (photoInputRef.current) {photoInputRef.current.value = "";}
    };

    const reset = ()=>{
        setEmail('')
        setGender('male')
        setDepartment('')
        setRole('')
        setSalary('')
        setPhoneNumber('')
        setAlternatePhoneNumber('')
        setQualification('')
        setPancardNumber('')
        setAadharNumber('')
        setDOB('')
        setEmergencyName('')
        setEmergencyNumber('')
        setEmergencyRelation('')
        setPhoto(null)
        setAccountNumber('')
        setBranchName('')
        setIfsc('')
        setAccountHolder('')
        setBankName('')
        setHouseNo('')
        setArea('')
        setLandmark('')
        setCity('')
        setDistrict('')
        setState('')
        setPincode('')
        removePhoto()
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        try {
            if(!name || !gender || !department || !role || !phone_number || !house_no || !landmark || !photo || !area || !city || !district || !state || !pincode || !joining_date ){
                toast.warn("Fill all the require fields")
                return
            }
            const emergency_contact = {
                name: emergency_name,
                phone_number: emergency_number,
                relation: emergency_relation
            }
            const bank_details = { bank_name, account_number, branch_name, ifsc, account_holder }
            const address = { house_no, landmark, area, city, district, state, pincode}
            setLoading(true)

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("gender", gender);
            formData.append("department", department);
            formData.append("role", role);
            formData.append("salary", salary);
            formData.append("phone_number", phone_number);
            formData.append("alternate_phone_number", alternate_phone_number);
            formData.append("qualification", qualification);
            formData.append("pancard_number", pancard_number);
            formData.append("aadhar_number", aadhar_number);
            formData.append("DOB", DOB);
            formData.append("emergency_contact", JSON.stringify(emergency_contact) );
            formData.append("photo", photo);
            formData.append("bank_details", JSON.stringify(bank_details));
            formData.append("address", JSON.stringify(address));
            formData.append("joining_date", joining_date);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/staff/create` , formData, {withCredentials: true})
            console.log("addStaff response",res.data)
            toast.success(res.data?.message)
            reset()
            navigate('/admin/staff')

        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addStaff :" , error)
        } finally { setLoading(false) }
    }

  if (loading ) { return <LoadingSpinner/>}
  if (error) { return <ErrorComponent/>}
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="p-10 text-lg font-medium text-gray-800 bg-slate-50">

        <div className='text-2xl flex items-center gap-3 mb-5'>
            <Link to={'/admin/staff'} className=' cursor-pointer'><FaArrowLeftLong /></Link>
            <div>Create Staff</div>
        </div>
        <div className="bg-white shadow-md p-10 rounded-xl">
            <div className="text-xl font-medium text-sky-600 mt-1 mb-5">Staff Details</div>
            <div className="flex gap-2 items-center">
                {/* Photo */}
                <div className="mt-2">
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=> handlePhoto(e.target.files[0])}/>
                    {!previewPhoto ? (
                        <div onClick={() => photoInputRef.current.click()}
                            onDragOver={(e) => { 
                                e.preventDefault(); 
                                setPhotoDragActive(true) 
                            }}
                            onDragLeave={() => setPhotoDragActive(false)}
                            onDrop={handleDropPhoto}
                            className={`flex flex-col h-80 w-80 items-center justify-center gap-3 rounded-xl border p-10 cursor-pointer transition-all duration-300 border-gray-200 ${ photoDragActive ? " bg-gray-50" : " hover:bg-gray-50"}`}
                        >
                            <div className="text-2xl font-semibold text-gray-500 tracking-wider pb-5">Staff Photo<span className="text-red-400 pl-0.5">*</span></div>
                            <FiUploadCloud size={60} className={photoDragActive ? "text-blue-500" : "text-gray-400"}/>
                            <h2 className="text-lg font-semibold text-gray-700">Drag & Drop Image</h2>
                            <p className="text-gray-500">or click to browse</p>
                            <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
                        </div>
                    ) : (
                        <div className="relative min-h-80 max-h-80 min-w-80 max-w-80">
                            <img src={previewPhoto} alt="Preview" className=" h-full w-full rounded-xl border object-cover p-2" />
                            <button type="button" onClick={removePhoto} className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600">
                                <FiX size={18} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="gap-5 gap-y-[25px] grid grid-cols-6 px-5">
                    {/* name */}
                    <div className="md:col-span-2 space-y-2">
                        <label>Name<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" autoComplete="off" value={name} onChange={(e)=>setName(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-2 space-y-3">
                        <label>Phone Number<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" autoComplete="off" required value={phone_number} onChange={(e)=>setPhoneNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>

                    {/* Gender */}
                    <div className="col-span-2">
                        <div>Gender<span className="text-red-500 pl-0.5">*</span></div>
                        <div className='flex mt-3 gap-5 p-3'>
                            <div className='flex justify-center items-center gap-1'>
                                <input type="radio" id="male" name="gender" value="male" onChange={(e)=>setGender(e.target.value)} checked={gender === "male"} className='h-6 w-6'/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className='flex justify-center items-center gap-1'>
                                <input type="radio" id="female" name="gender"  value="female" onChange={(e)=>setGender(e.target.value)} checked={gender === "female"} className='h-6 w-6'/>
                                <label htmlFor="female">Female</label>
                            </div>
                            <div className='flex justify-center items-center gap-1'>
                                <input type="radio" id="others" name="gender" value="others" onChange={(e)=>setGender(e.target.value)} checked={gender === "others"} className='h-6 w-6'/>
                                <label htmlFor="others">Others</label>
                            </div>
                        </div>
                    </div>   

                    {/* email */}
                    <div className="md:col-span-2 space-y-2">
                        <label>Email</label>
                        <input type="text" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} 
                        className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                
                    {/* Alternate Phone Number */}
                    <div className="md:col-span-2 space-y-2 ">
                        <label>Alternate Phone Number</label>
                        <input type="text" autoComplete="off" required value={alternate_phone_number} onChange={(e)=>setAlternatePhoneNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>

                    {/* DOB */}
                    <div className="md:col-span-2 space-y-2 ">
                        <label className="text-lg font-medium text-gray-600">DOB</label>
                        <input type="Date" autoComplete="off" required value={DOB} onChange={(e)=>setDOB(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>

                    {/* Pan Card No. */}
                    <div className="md:col-span-2 space-y-2 ">
                        <label>Pan Card No.</label>
                        <input type="text" autoComplete="off" required value={pancard_number} onChange={(e)=>setPancardNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                    
                    {/* Aadhar Card No. */}
                    <div className="md:col-span-2 space-y-2 ">
                        <label>Aadhar Card No.</label>
                        <input type="text" autoComplete="off" required value={aadhar_number} onChange={(e)=>setAadharNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                    
                    {/* Qualification */}
                    <div className="md:col-span-2 space-y-2 ">
                        <label>Qualification</label>
                        <input type="text" autoComplete="off" required value={qualification} onChange={(e)=>setQualification(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>

                </div>
            </div>
        </div>

        <div className="flex mt-5 gap-5">
            <div className=" w-full p-10 bg-white shadow-md rounded-xl">
                <div className="text-xl text-sky-600 ">Work Details</div>
                <div className="space-y-3 mt-6">
                    {/* Department */}
                    <div className="col-span-3 space-y-2">
                        <label >Department<span className="text-red-500 pl-0.5">*</span></label>
                        <select  autoFocus value={department} onChange={(e)=> setDepartment(e.target.value)} className="border p-3 px-4 w-full rounded-xl font-medium">
                            <option disabled value='' />
                            <option value={"sales"}>Sales</option>
                            <option value={"inventory"}>Inventory</option>
                            <option value={"delivery"}>Delivery</option>
                            <option value={"administration"}>Administration</option>
                        </select>
                    </div>
                    {/* Role */}
                    <div className="col-span-3 space-y-2">
                        <label>Role<span className="text-red-500 pl-0.5">*</span></label>
                        <select autoFocus value={role} onChange={(e)=> setRole(e.target.value)} className="border p-3 px-4 w-full rounded-xl">
                            <option disabled value='' />
                            <option value={"delivery"}>Delivery</option>
                            <option value={"staff"}>Staff</option>
                            <option value={"bpo"}>BPO</option>
                            <option value={"assistant_manager"}>Assistant Manager</option>
                            <option value={"manager"}>Manager</option>
                            <option value={"general_manager"}>General Manager</option>
                            <option value={"admin"}>Admin</option>
                        </select>
                    </div>
                    {/* Salary */}
                    <div className="md:col-span-2 space-y-2">
                        <label>Salary</label>
                        <input type="number" value={salary} onChange={(e)=>setSalary(Number(e.target.value))} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                    {/* Joining Date */}
                    <div className="md:col-span-2 space-y-2">
                        <label>Joining Date<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="Date" autoComplete="off" required value={joining_date} onChange={(e)=>setJoiningDate(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                </div>
            </div>

            <div className="p-10 bg-white shadow-md rounded-xl w-full">
                <div className="text-xl text-sky-700 ">Emergency Contact</div>
                <div className="space-y-[17px] mt-6">
                    {/* Emergency Name */}
                    <div className="md:col-span-3 space-y-2 ">
                        <label>Name</label>
                        <input type="text" autoComplete="off" required value={emergency_name} onChange={(e)=>setEmergencyName(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                    {/* Emergency Number */}
                    <div className="md:col-span-3 space-y-2 ">
                        <label className="text-lg font-medium text-gray-600">Phone No.</label>
                        <input type="text" autoComplete="off" required value={emergency_number} onChange={(e)=>setEmergencyNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                    </div>
                    {/* Emergency Relation */}
                    <div className="md:col-span-3 space-y-2 ">
                        <label className="text-lg font-medium text-gray-600">Relation</label>
                        <select  autoFocus value={emergency_relation} onChange={(e)=> setEmergencyRelation(e.target.value)} className="border p-3 px-4 w-full rounded-xl">
                            <option disabled value='' />
                            <option value={"spouse"}>Spouse</option>
                            <option value={"father"}>Father</option>
                            <option value={"mother"}>Mother</option>
                            <option value={"guardian"}>Guardian</option>
                            <option value={"sibling"}>Sibling</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-5 mt-5 gap-5">
            <div className=" col-span-2 grid grid-cols-10 gap-3 p-10 shadow-md bg-white rounded-xl ">
                <div className="text-xl col-span-10 text-sky-600 mb-4">Bank Details</div>
                <div className="md:col-span-6 space-y-2">
                    <label>Bank Name</label>
                    <input type="text" value={bank_name} onChange={(e)=>setBankName(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-4 space-y-2">
                    <label>Account no.</label>
                    <input type="text" value={account_number} onChange={(e)=>setAccountNumber(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-5 space-y-2">
                    <label>Branch Name</label>
                    <input type="text" value={branch_name} onChange={(e)=>setBranchName(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-5 space-y-2">
                    <label>IFSC</label>
                    <input type="text" value={ifsc} onChange={(e)=>setIfsc(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-10 space-y-2">
                    <label>Account Holder Name</label>
                    <input type="text" value={account_holder} onChange={(e)=>setAccountHolder(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
            </div>

            <div className=" col-span-3 grid grid-cols-6 gap-3 bg-white shadow-md rounded-xl p-10 ">
                <div className="text-xl col-span-6 text-sky-600 mb-4 ">Address Details</div>
                <div className="md:col-span-3 space-y-2">
                    <label>House No<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={house_no} onChange={(e)=>setHouseNo(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label>Landmark</label>
                    <input type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label>Area<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={area} onChange={(e)=>setArea(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-3 space-y-2">
                    <label>City<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label>District<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={district} onChange={(e)=>setDistrict(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label>State<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={state} onChange={(e)=>setState(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label>Pincode<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)} className="border p-3 px-4 w-full rounded-xl"/>
                </div>
            </div>
        </div>

        <div className=" col-span-10 mt-5 grid grid-cols-2 gap-5">
            <div className="flex items-center justify-center">
                <button type="button" onClick={()=>reset()} className=" text-red-500 hover:text-red-600 rounded-xl " >Reset</button>
            </div>
            <button onClick={()=>handleSubmit()} className="bg-blue-500 text-white rounded-xl p-4" >Submit</button> 
        </div>
    </div>
    </div>
  )
}

export default AdminAddNewStaffPage