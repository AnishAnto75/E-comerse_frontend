import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { FiUploadCloud, FiX } from "react-icons/fi";

const adminAddCategoryPage = () => {

    const navigate = useNavigate()

    const handleRef = useRef(true)

    const [loading , setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [Groups , setGroups] = useState([]) 
    
    const [group_id, setGroupId] = useState('')
    const [category_name , setCategoryName] = useState('')
    const [category_description , setCategoryDescription] = useState('')
    const [category_image, setCategoryImage] = useState(null)

    useEffect(()=>{
        const fetchGroups = async()=>{
            try {
                setLoading(true) 
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product-group/all-groups`)
                setGroups(res.data.data)
            } catch (error) {
                setError(true)
                console.log("error in fetchGroups :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current){
            fetchGroups()
            handleRef.current = false
        }
    },[])

    const inputRef = useRef(null);

    const [preview, setPreview] = useState("");
    const [dragActive, setDragActive] = useState(false);
    
    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }
        setCategoryImage(file);
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
        setCategoryImage(null);
        setPreview("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const reset = ()=>{
        setGroupId('')
        setCategoryName('')
        setCategoryDescription('')
        removeImage()
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if(!group_id || !category_name || !category_description || !category_image){toast.warn("Fill all the details"); return }

            setLoading(true) 
            const formData = new FormData();

            formData.append("group_id", group_id);
            formData.append("category_name", category_name);
            formData.append("category_description", category_description);
            formData.append("category_image", category_image);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/product-category/create-category` , formData)
            console.log("addNewCategory response",res.data)
            toast.success(res.data?.message)
            navigate('/admin/groups-categories')
            reset()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addNewCategory :" , error)
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
  if (error) { return <ErrorComponent/>}

  return (
    <div className="flex">
    <AdminSideBar />
    <div className="p-6 relative font-inter place-items-center w-full ">
        <IoMdClose onClick={()=>navigate('/admin/groups-categories')} className='absolute right-10 text-4xl cursor-pointer bg-gray-200 rounded-full p-1 hover:text-white hover:bg-gray-300' />
        <div className="text-gray-600 text-xl font-semibold w-full">CREATE CATEGORY</div>

        <div className="rounded-xl container max-w-screen-md border shadow-lg p-8 gap-x-4 gap-y-2">
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full text-gray-700 ">
                <div className="text-xl font-medium">Category Details</div>

                <div className="my-5 space-y-1">
                    <label className="text-lg font-medium text-gray-600" htmlFor="group_id" >Group<span className="text-red-500 pl-0.5">*</span></label>
                    <select name="group_id" autoFocus value={group_id} onChange={(e)=> setGroupId(e.target.value)} className=" cursor-pointer border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        {Groups?.map(group =>( <option key= {group._id} value={group._id} className="border border-gray-300 p-2 px-4 w-full rounded-xl text-gray-800 font-medium"> {group.group_name} </option> ))}
                    </select>
                </div>

                <div className="my-5 space-y-1">
                    <label className="text-lg font-medium text-gray-600" htmlFor="category_name">Category Name<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" name="category_name" id="category_name" autoComplete="off" value={category_name} onChange={(e)=>setCategoryName(e.target.value)} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="mb-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="category_description">Category Description</label>
                    <textarea type="text" name="category_description" id="category_description" autoComplete="off" value={category_description} onChange={(e)=>setCategoryDescription(e.target.value)} ref={input2Ref} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium resize-none h-28" />
                </div>

                <div className="w-full mt-4 space-y-1">
                    <div className="col-span-5 text-lg font-medium text-gray-600">Category Image<span className="text-red-500 pl-0.5">*</span></div>
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

export default adminAddCategoryPage