import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button} from '@material-tailwind/react'

const AdminAddNewProductPage = () => {

    const [loading , setLoading] = useState(false)
    const [loading2 , setLoading2] = useState(false)
    const [error , setError ] = useState(false)
    const [Groups , setGroups] = useState([]) 
    const handleRef = useRef(true)

    // Fetch Groups
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

    const [product_group , setGroup ] = useState('')
    const [product_category , setCategory ] = useState('')
    const [product_brand , setBrand ] = useState('')
    const [product_barcode , setBarcode ] = useState('')
    const [product_name , setName ] = useState('')
    const [product_UOM , setUOM ] = useState('')
    const [product_net_unit , setNetUnit ] = useState(1)
    const [product_min_order_quantity , setMinOrderQuantity ] = useState(1)
    const [product_max_order_quantity , setMaxOrderQuantity ] = useState(999)
    const [product_low_in_stock , setLowInStock] = useState(10)
    const [product_photos , setPhotos] = useState(null)
    const [product_additional_photos , setAdditionalPhotos] = useState(null)
    const [product_hsn_code , setHsnCode ] = useState('')
    const [product_description , setDescription ] = useState('')
    const [product_highlights , setProductHighlights] = useState([])

    const [highlight , setHightLight] = useState('')

    const reset = ()=>{
        setGroup('')
        setCategory('')
        setBrand('')
        setBarcode('')
        setName('')
        setUOM('')
        setNetUnit(1)
        setMinOrderQuantity(1)
        setMaxOrderQuantity(999)
        setLowInStock(10)
        setPhotos(null)
        setAdditionalPhotos(null)
        setHsnCode('')
        setDescription('')
        setProductHighlights([])
        setHightLight('')
    }

    const data =  {
        product_group , 
        product_category , 
        product_brand , 
        product_barcode , 
        product_name , 
        product_UOM,
        product_net_unit , 
        product_min_order_quantity,
        product_max_order_quantity,
        product_low_in_stock ,
        product_photos , 
        product_additional_photos,
        product_hsn_code,
        product_description , 
        product_highlights
    }

    // Form Submission
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading2(true) 
            console.log(data)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/product/add-product` , {data})
            console.log("addNewProduct response",res.data)
            toast.success(res.data?.message)
            reset()
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addNewProduct :" , error)
        } finally { setLoading2(false) }
    }

    // Adding The Highligh
    const handleHighlight = (e)=>{
        e.preventDefault()
        if (highlight.trim() !== '') {
            setProductHighlights([...product_highlights, highlight]);
            setHightLight('')
        }
    }
    // Deleting The Highligh
    const handleDeleteValue = (e , index) => {
        e.preventDefault()
        const newArray = product_highlights.filter((_, i) => i !== index);
        setProductHighlights(newArray);
    };

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
    const handleKeyDown = (e, nextInputRef) => {
        if (e.key === "Enter") {
            e.preventDefault()
            nextInputRef.current.focus()
        }
    }

    const categories = []
    if(product_group){ Groups.map(group=> group._id == product_group && categories.push(group.category_id)) }
    const categoryOption = categories[0]?.map(category =>( <option key={category._id} value={category._id}>{category.category_name} </option> ))

  if (loading) { return <div>Loading..</div>}
  if (error) { return <div>Error</div>}
  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="w-full">
        <div className="p-6 items-center justify-center hero bg-blue-gray-50 ">
            <div className="text-cyan-700">CREATE NEW PRODUCT</div>
            <div className="bg-gray-50 rounded-xl container max-w-screen-xl shadow-lg p-4 px-4 md:p-8 my-3 gap-4 gap-y-2 text-base">
                <div className=" gap-3 gap-y-2 md:gap-5 md:gap-y-5 text-md text-gray-700 md:grid md:grid-cols-10">
                    <div className="col-span-10 text-lg text-light-blue-400 tracking-wider">Product Details</div>

                    <div className="col-span-3">
                        <label htmlFor="product_group" >Group<span className="text-red-500 pl-0.5">*</span></label>
                        <select name="product_group" required autoFocus value={product_group} onChange={(e)=> setGroup(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer focus:border-2 focus:border-blue-500">
                            <option disabled value='' />
                            {Groups?.map(group =>( <option key= {group._id} value={group._id} className="text-sm"> {group.group_name} </option> ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="product_category">Category<span className="text-red-500 pl-0.5">*</span></label>
                        <select name="product_category" disabled = {!categories.length} required value={product_category} onChange={(e)=> setCategory(e.target.value)} className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:border-2 focus:border-blue-500 ${!categories.length ? "cursor-not-allowed" : "cursor-pointer"}`}>
                            <option disabled value='' /> 
                            {categoryOption} 
                        </select>
                    </div>

                    <div className="md:col-span-3 ">
                        <label htmlFor="product_barcode">Barcode<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="product_barcode" id="product_barcode" autoComplete="off" required value={product_barcode} onChange={(e)=>setBarcode((e.target.value).toUpperCase().trim())} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 text-sm p-1.5 w-full rounded-md"/>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="brand">Brand<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="brand" id="brand" autoComplete="off" required value={product_brand} onChange={(e)=>setBrand(e.target.value)} ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)} className="border border-gray-300 text-sm p-1.5 w-full rounded-md" />
                    </div>

                    <div className="md:col-span-9">
                        <label htmlFor="name">Name<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="name" id="name" autoComplete="off" required value={product_name} onChange={(e)=>setName(e.target.value)} ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>

                    <div className=" col-span-10 text-lg text-light-blue-400 tracking-wider mt-3">Quantity and Stock</div>
                    <div className="md:col-span-3">
                        <label htmlFor="product_UOM">Unit Of Measure</label>
                        <select name="product_UOM" required value={product_UOM} onChange={(e)=> setUOM(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer focus:border-2 focus:border-blue-500">
                            <option disabled value='' />
                            <option value='gm'>Gram</option>
                            <option value='kg'>Kilo Gram</option>
                            <option value='ml'>Milli Liter</option>
                            <option value='lit'>Liter</option>
                            <option value='pcs'>piece</option>
                            <option value='cap'>capacity</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="product_net_unit">Net Unit</label>
                        <input type="number" name="product_net_unit" id="product_net_unit" value={product_net_unit} onChange={(e)=>setNetUnit(e.target.value)} ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>
                    <div className="md:col-span-3 ">
                        <label htmlFor="product_min_order_quantity">Min OQ</label>
                        <input type="number" name="product_min_order_quantity" id="product_min_order_quantity" value={product_min_order_quantity} onChange={(e)=>setMinOrderQuantity(e.target.value)} ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>
                    <div className="md:col-span-2 ">
                        <label htmlFor="product_max_order_quantity">Max OQ</label>
                        <input type="number" name="product_max_order_quantity" id="product_max_order_quantity" value={product_max_order_quantity} onChange={(e)=>setMaxOrderQuantity(e.target.value)} ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input7Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="lowInStock">Low in stock</label>
                        <input type="number" name="lowInStock" id="lowInStock" value={product_low_in_stock} onChange={(e)=>setLowInStock(e.target.value)} ref={input7Ref} onKeyDown={(e) => handleKeyDown(e, input8Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="product_hsn_code">HSN code</label>
                        <input type="number" name="product_hsn_code" id="product_hsn_code" value={product_hsn_code} onChange={(e)=>setHsnCode(e.target.value)} ref={input8Ref} onKeyDown={(e) => handleKeyDown(e, input9Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>

                    <div className=" col-span-10 text-lg text-light-blue-400 tracking-wider mt-3">Additional Information</div>
                    <div className="md:col-span-5 grid grid-cols-5">
                        <label htmlFor="product_photos" className=" col-span-5">Photo</label>
                        <label htmlFor="product_photos" className=" col-span-2 py-2 hero cursor-pointer bg-white content-center px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Choose image
                            <input id="product_photos" name="product_photos" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={(e)=>setPhotos(e.target.files[0])}/>
                        </label>
                        {product_photos ?
                            <div className="ml-4 mt-1 flex items-center col-span-3 content-center">
                                <span className="text-sm text-gray-500 mr-2 line-clamp-1">{product_photos.name}</span>
                                <button onClick={()=>setPhotos(null)} className="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            :
                            <span className="col-span-3 content-center ml-4 text-sm text-gray-500">No file selected</span>
                        }
                    </div>

                    <div className="md:col-span-5 grid grid-cols-5">
                        <label htmlFor="additional_photos" className=" col-span-5">Additional Photos</label>
                        <label htmlFor="product_additional_photos" className="col-span-2 py-2 hero cursor-pointer bg-white content-center px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Choose images
                            <input id="product_additional_photos" name="product_additional_photos" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={(e)=>setAdditionalPhotos(e.target.files[0])}/>
                        </label>
                        {product_additional_photos ?
                            <div className="ml-4 flex items-center col-span-3 content-center">
                                <span className="text-sm text-gray-500 mr-2 line-clamp-1">{product_additional_photos.name}</span>
                                <button onClick={()=>setAdditionalPhotos(null)} className="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            :
                            <span className=" col-span-3 content-center ml-4 text-sm text-gray-500">No file selected</span>
                        }
                    </div>

                    <div className="md:col-span-10">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"
                            value={product_description} onChange={(e)=>setDescription(e.target.value)}
                            ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                            className="h-full mt-1 resize-none border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>

                    <div className="md:col-span-10 mt-7">
                        <label htmlFor="highlights">Highlights</label>
                        <input type="text" name="highlights" id="highlights"
                            value={highlight} onChange={(e)=>setHightLight(e.target.value)}
                            onKeyPress={(e) => e.key == 'Enter' && handleHighlight(e)}
                            ref={input10Ref} className="border text-sm border-gray-300 p-1.5 w-full rounded-md" />
                        {product_highlights.length ?
                            <div className="flex flex-col bg-white mt-3 gap-3 border-2 rounded-lg py-2 ">
                                {product_highlights?.map((highlight , index)=>(
                                    <div key={index} className="flex items-center justify-between px-5 hover:bg-slate-50">
                                        <li >{highlight}</li>
                                        <button onClick={(e) => handleDeleteValue(e , index)} className="text-red-500 hover:bg-gray-300 rounded-full p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            :''
                        }
                    </div>

                    <div className="md:col-span-10 mt-5 grid grid-cols-5 gap-5">
                        <Button onClick={()=>reset()} variant="text" color="red" className=" col-span-2" >Reset</Button>
                        <Button type='submit' loading={loading2} variant="gradient" color="blue" className=" col-span-3" >Submit</Button> 
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AdminAddNewProductPage