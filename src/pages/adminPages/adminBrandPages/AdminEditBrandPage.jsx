import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button, Textarea} from '@material-tailwind/react'
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditBrandPage = () => {

    const navigate = useNavigate()

    const { id } = useParams(); 

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [Brand_name , setBrandname] = useState('')
    const [Brand_description , setBrandDescription] = useState('')
    const [Brand_logo, setBrandLogo] = useState(null)


    const handleRef = useRef(true)


    useEffect(()=>{
        const fetchBrand = async()=>{
            try {
                setLoading(true) 
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/brand/brand-id/${id}`)
                const brand = res.data.data
                setBrandname(brand?.Brand_name)
                setBrandLogo(brand.Brand_logo)
                setBrandDescription(brand.Brand_description)
            } catch (error) {
                setError(true)
                console.log("error in fetchBrand :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current){
            fetchBrand()
            handleRef.current = false
        }
    },[])

    const reset = ()=>{
        setBrandname('')
        setBrandDescription('')
        setBrandLogo(null)
    }

    const data =  {
        Brand_name,
        Brand_description,
        Brand_logo
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true) 
            console.log(data)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/brand/edit/${id}` , {data})
            console.log("Edit Brand response",res.data)
            toast.success(res.data?.message)
            reset()
            navigate('/admin/brands')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in EditBrand :" , error)
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
    <form onSubmit={(e)=>handleSubmit(e)} className="w-full">
        <div className="p-6 place-items-center w-full ">
            <div>
            <div className="text-light-blue-500 w-full">CREATE NEW BRAND</div>
            <div className="bg-gray-50 rounded-xl container max-w-screen-xl shadow-lg p-4 px-4 md:p-8 my-3 gap-4 gap-y-2 text-base">
                <div className="text-md text-gray-700 ">
                    <div className="text-lg text-light-blue-400 tracking-wider">Brand Details</div>

                    <div className="my-5">
                        <label htmlFor="product_barcode">Brand Name<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="Brand_name" id="Brand_name" autoComplete="off" required value={Brand_name} onChange={(e)=>setBrandname((e.target.value))} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 text-sm p-1.5 w-full rounded-md"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="brand">Brand Description</label>
                        <textarea type="text" name="Brand_description" id="Brand_description" autoComplete="off" value={Brand_description} onChange={(e)=>setBrandDescription(e.target.value)} ref={input2Ref} className="border border-gray-300 text-sm p-1.5 w-full rounded-md resize-none h-28" />
                    </div>

                    <div className="md:col-span-5 grid grid-cols-5">
                        <label htmlFor="product_photos" className=" col-span-5">Brand Logo</label>
                        <label onClick={()=>toast.warn("Under Proccess")} htmlFor="product_photos" className=" col-span-2 py-2 hero cursor-pointer bg-white content-center px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Choose image
                            {/* <input id="product_photos" name="product_photos" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={(e)=>setPhotos(e.target.files[0])}/> */}
                        </label>
                        {Brand_logo ?
                            <div className="ml-4 mt-1 flex items-center col-span-3 content-center">
                                <span className="text-sm text-gray-500 mr-2 line-clamp-1">{Brand_logo.name}</span>
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
  )
}

export default AdminEditBrandPage