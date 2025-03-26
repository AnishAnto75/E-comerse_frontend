import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux'
import axios from "axios"
import { toast } from "react-toastify";

const AdminAddNewProductPage = () => {

    const [loading , setLoading] = useState(false)
    const [loading2 , setLoading2] = useState(false)
    const [error , setError ] = useState(false)
    const [Groups , setGroups] = useState([]) 
    const handleRef = useRef(true)
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
    const [product_photos , setPhotos] = useState('')
    const [product_additional_photos , setAdditionalPhotos] = useState('')
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
        setPhotos('')
        setAdditionalPhotos('')
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
    const input11Ref = useRef(null)
    const handleKeyDown = (e, nextInputRef) => {
        if (e.key === "Enter") {
            e.preventDefault()
            nextInputRef.current.focus()
        }
    }

    const categories = []
    if(product_group){ Groups.map(group=> group._id == product_group && categories.push(group.category_id)) }
    const categoryOption = categories[0]?.map(category =>( <option key={category._id} value={category._id}>{category.category_name} </option> ))

  if (loading || loading2) { return <div>Loading..</div>}
  if (error) { return <div>Error</div>}
  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="w-full">
        <div className="p-6 flex items-center justify-center hero bg-blue-gray-50 ">
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
                        <input type="text" name="product_barcode" id="product_barcode" autoComplete="off" required value={product_barcode} onChange={(e)=>setBarcode((e.target.value).toUpperCase().trim())} ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)} className="border text-sm border-gray-300 p-1.5 w-full rounded-md"/>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="brand">Brand<span className="text-red-500 pl-0.5">*</span></label>
                        <input type="text" name="brand" id="brand" autoComplete="off" required value={product_brand} onChange={(e)=>setBrand(e.target.value)} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref)} className="border border-gray-300 text-sm p-1.5 w-full rounded-md" />
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
                    <div className="md:col-span-5 ">
                        <label htmlFor="product_photos">Photo</label>
                        <input type="file" name="product_photos" id="product_photos"
                            accept="image/png, image/jpeg" onChange={(e)=>setPhotos(e.target.files[0])}
                            className="file-input file-input-bordered w-full mt-1 " />
                    </div>
                    
                    <div className="md:col-span-5 ">
                        <label htmlFor="product_additional_photos">Additional Photos</label>
                        <input type="file" name="product_additional_photos" id="product_additional_photos"
                            accept="image/png, image/jpeg" onChange={(e)=>setAdditionalPhotos(e.target.files[0])}
                            className="file-input file-input-bordered w-full mt-1 " />
                    </div>

                    <div className="md:col-span-10">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"
                            value={product_description} onChange={(e)=>setDescription(e.target.value)}
                            ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                            className="textarea textarea-bordered h-full w-full mt-1 resize-none"/>
                    </div>

                    <div className="md:col-span-10 mt-7">
                        <label htmlFor="highlights">Highlights</label>
                        <input type="text" name="highlights" id="highlights"
                            value={highlight} onChange={(e)=>setHightLight(e.target.value)}
                            onKeyPress={(e) => e.key == 'Enter' && handleHighlight(e)}
                            ref={input10Ref}
                            className="input input-bordered w-full mt-1" />

                        <div className="flex flex-col bg-white mt-3 ">
                            {product_highlights?.map((highlight , index)=>(
                                <div key={index} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                                    <li >{highlight}</li>
                                    <button onClick={(e) => handleDeleteValue(e , index)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-10 mt-10 flex gap-1">
                        <div type='reset' onClick={()=>reset()} className="bg-red-500 hero hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                            Reset</div>
                        <button type='submit' disabled={loading2} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md w-full" >
                            Submit</button> 
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AdminAddNewProductPage