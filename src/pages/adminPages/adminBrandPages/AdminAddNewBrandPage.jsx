import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiUploadCloud, FiX } from "react-icons/fi";

const AdminAddNewBrandPage = () => {

    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)

    const [brand_name , setBrandname] = useState('')
    const [brand_description , setBrandDescription] = useState('')
    const [brand_logo, setBrandLogo] = useState(null)

    const inputRef = useRef(null);

    const [preview, setPreview] = useState("");
    const [dragActive, setDragActive] = useState(false);
    
    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }
        setBrandLogo(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        handleImage(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleImage(file);
    };

    const removeImage = () => {
        setBrandLogo(null);
        setPreview("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const reset = ()=>{
        setBrandname('')
        setBrandDescription('')
        setBrandLogo(null)
        removeImage()
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true) 
            if(!brand_name || ! brand_description || !brand_logo){ toast.warn("Fill all the details"); return; }

            const formData = new FormData();

            formData.append("brand_name", brand_name);
            formData.append("brand_description", brand_description);
            formData.append("brand_logo", brand_logo);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/brand/create-brand` , formData)
            console.log("addNewBrand response",res.data)
            toast.success(res.data?.message)
            reset()
            navigate('/admin/brands')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addNewBrand :" , error)
        } finally { setLoading(false) }
    }

    // Enter Key handle
    const input1Ref = useRef(null)
    const input2Ref = useRef(null)

    const handleKeyDown = (e, nextInputRef) => {
        if (e.key === "Enter") {
            e.preventDefault()
            nextInputRef.current.focus()
        }
    }


  if (loading) { return <LoadingSpinner/>}

  return (
    <div className="flex">
    <AdminSideBar />
    <div className="p-6 relative font-inter place-items-center w-full ">

        <IoMdClose onClick={()=>navigate('/admin/groups-categories')} className='absolute right-10 text-4xl cursor-pointer bg-gray-200 rounded-full p-1 hover:text-white hover:bg-gray-300' />
        <div className="text-gray-600 text-xl font-semibold w-full">CREATE BRAND</div>
        
        <div className="rounded-xl container max-w-screen-md border shadow-lg p-8 gap-x-4 gap-y-2">
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full text-gray-800 ">
                <div className="text-xl font-medium">Brand Details</div>

                <div className="my-5">
                    <label className="text-lg font-medium text-gray-600" htmlFor="brand_name">Brand Name<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" name="brand_name" id="brand_name" required autoComplete="off" value={brand_name} onChange={(e)=>setBrandname((e.target.value))} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="mb-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="brand_description">Brand Description<span className="text-red-500 pl-0.5">*</span></label>
                    <textarea type="text" name="brand_description" id="brand_description" autoComplete="off" required value={brand_description} onChange={(e)=>setBrandDescription(e.target.value)} ref={input2Ref} className="border border-gray-300 p-3 w-full rounded-xl resize-none h-28 text-gray-800 font-medium" />
                </div>

                <div className="w-full mt-4 space-y-1">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_photos">Brand Logo<span className="text-red-500 pl-0.5">*</span></label>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange}/>
                    {!preview ? (
                        <div onClick={() => inputRef.current.click()}
                            onDragOver={(e) => { 
                                e.preventDefault(); 
                                setDragActive(true) 
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300 ${ dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"}`}
                        >
                            <FiUploadCloud size={55} className={dragActive ? "text-blue-500" : "text-gray-400"}/>
                            <h2 className="text-lg font-semibold text-gray-700">Drag & Drop Image</h2>
                            <p className="text-gray-500">or click to browse</p>
                            <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <img src={preview} alt="Preview" className="h-64 w-full rounded-xl border object-cove" />
                            <button type="button" onClick={removeImage} className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600">
                                <FiX size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className=" mt-10 grid grid-cols-4 gap-5">
                    <button onClick={()=>reset()} className=" bg-red-500 text-white rounded-xl p-4 col-span-2" >Reset</button>
                    <button type='submit' className="bg-blue-500 text-white rounded-xl p-4 col-span-2" >Submit</button> 
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default AdminAddNewBrandPage