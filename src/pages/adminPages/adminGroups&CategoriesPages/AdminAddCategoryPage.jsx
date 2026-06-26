import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button, Textarea} from '@material-tailwind/react'
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

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

    const reset = ()=>{
        setGroupId('')
        setCategoryName('')
        setCategoryDescription('')
        setCategoryImage(null)
    }

    const data =  {
        group_id,
        category_name,
        category_description,
        category_image
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true) 
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/product-category/create-product-category` , {data})
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
    <div>
    <div className='relative w-full h-full mt-10'><IoMdClose onClick={()=>navigate('/admin/groups-categories')} className='absolute right-10 text-4xl cursor-pointer bg-gray-200 rounded-full p-1 hover:text-white hover:bg-gray-300' /></div>
    <form onSubmit={(e)=>handleSubmit(e)} className="w-full">
        <div className="p-6 place-items-center w-full ">
            <div>
            <div className="text-light-blue-500 w-full">CREATE NEW CATEGORY</div>
            <div className="bg-gray-50 rounded-xl container max-w-screen-xl shadow-lg p-4 px-4 md:p-8 my-3 gap-4 gap-y-2 text-base">
                <div className="text-md text-gray-700 ">
                    <div className="text-lg text-light-blue-400 tracking-wider">Category Details</div>

                    <div className="my-5">
                        <label htmlFor="group_id" >Group<span className="text-red-500 pl-0.5">*</span></label>
                        <select name="group_id" required autoFocus value={group_id} onChange={(e)=> setGroupId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer focus:border-2 focus:border-blue-500">
                            <option disabled value='' />
                            {Groups?.map(group =>( <option key= {group._id} value={group._id} className="text-sm"> {group.group_name} </option> ))}
                        </select>
                    </div>

                    <div className="my-5">
                        <label htmlFor="category_name">Category Name<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="category_name" id="category_name" autoComplete="off" required value={category_name} onChange={(e)=>setCategoryName(e.target.value)} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 text-sm p-1.5 w-full rounded-md"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="category_description">Category Description</label>
                        <textarea type="text" name="category_description" id="category_description" autoComplete="off" value={category_description} onChange={(e)=>setCategoryDescription(e.target.value)} ref={input2Ref} className="border border-gray-300 text-sm p-1.5 w-full rounded-md resize-none h-28" />
                    </div>

                    <div className="md:col-span-5 grid grid-cols-5">
                        <label htmlFor="category_image" className="col-span-5">Category Image</label>
                        <label onClick={()=>toast.warn("Under Proccess")} htmlFor="category_image" className=" col-span-2 py-2 hero cursor-pointer bg-white content-center px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Choose image
                            {/* <input id="product_photos" name="product_photos" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={(e)=>setPhotos(e.target.files[0])}/> */}
                        </label>
                        {category_image ?
                            <div className="ml-4 mt-1 flex items-center col-span-3 content-center">
                                <span className="text-sm text-gray-500 mr-2 line-clamp-1">{category_image.name}</span>
                                <button onClick={()=>setBrandLogo(null)} className="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            :
                            <span className="col-span-3 content-center ml-4 text-sm text-gray-500">No file selected</span>
                        }
                    </div>
                   

                    <div className="md:col-span-10 mt-5 grid grid-cols-5 gap-5">
                        <Button onClick={()=>reset()} variant="text" color="red" className=" col-span-2" >Reset</Button>
                        <Button type='submit' loading={loading} variant="gradient" color="blue" className=" col-span-3" >Submit</Button> 
                    </div>
                </div>
            </div>
            </div>
        </div>
    </form>
    </div>
  )
}

export default adminAddCategoryPage