import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import {Button} from '@material-tailwind/react'
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { IoMdClose } from "react-icons/io";
import { FiUploadCloud, FiX } from "react-icons/fi";

const AdminAddNewProductPage = () => {

    const navigate = useNavigate()
    
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [Groups , setGroups] = useState([]) 
    const [Brands , setBrands] = useState([])
    const [Categories , setCategories] = useState([])
    const [highlightInput, setHighlightInput] = useState("");

    const handleRef = useRef(true)

    // Fetch Groups
    useEffect(()=>{
        const fetchAllGroupsAndBrands = async()=>{
            try {
                setLoading(true) 
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/fetch-for-create-product`)
                setGroups(res.data.data.groups)
                setBrands(res.data.data.brands)
            } catch (error) {
                setError(true)
                console.log("error in fetchAllGroupsAndBrands :" , error)
            } finally { setLoading(false) }
        }

        if(handleRef.current){
            fetchAllGroupsAndBrands()
            handleRef.current = false
        }
    },[])

    const fetchCategoriesByGroup = async(id)=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/fetch-categories-for-create-product/${id}`)
            console.log("fetchCategoriesByGroup payload : " , res.data)        
            setCategories(res.data?.data)
        } catch (error) {
            setError(true)
            toast.error(error.response?.data?.message)
            console.log("error in fetchCategoriesByGroup :" , error)
        } finally { setLoading(false) }
    }

    const [product_group , setGroup ] = useState('')
    const [product_category , setCategory ] = useState('')
    const [product_brand , setBrand ] = useState('')
    const [product_barcode , setBarcode ] = useState('')
    const [product_name , setName ] = useState('')
    const [product_UOM , setUOM ] = useState('')
    const [product_net_unit , setNetUnit ] = useState(1)
    const [product_min_order_quantity , setMinOrderQuantity ] = useState(1)
    const [product_max_order_quantity , setMaxOrderQuantity ] = useState(999)
    const [product_hsn_code , setHsnCode ] = useState('')
    const [product_photo , setPhoto] = useState(null)
    const [product_additional_photos , setAdditionalPhotos] = useState(null)
    const [product_description , setDescription ] = useState('')
    const [product_highlights , setProductHighlights] = useState([])


    const handleGroup = (e)=>{
        setGroup(e.target.value)
        setCategory('')
        fetchCategoriesByGroup(e.target.value)
    }
    
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

    const additionalPhotoInputRef = useRef(null);
    const [additionalPhotoPreview, setAdditionalPhotoPreview] = useState([]);
    const [additionalPhotoDragActive, setAdditionalPhotoDragActive] = useState(false);

    const handleAdditionalPhotos = (files) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
        const validFiles = [...files].filter(file => {

            if (!file.type.startsWith("image/")) {
                toast.error(`${file.name} is not an image.`);
                return false;
            }

            if (file.size > MAX_FILE_SIZE) {
                toast.error(`${file.name} is larger than 5 MB.`);
                return false;
            }

            return true;
        });


        const newFiles = [  ...(product_additional_photos || []), ...validFiles];
        if (newFiles.length > 5) { 
            toast.error("Maximum 5 additional photos allowed");
            return;
        }
        setAdditionalPhotos(newFiles);
        setAdditionalPhotoPreview( newFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        })));

        if (additionalPhotoInputRef.current) { additionalPhotoInputRef.current.value = "";}
    };
    const handleDropAdditionalPhotos = (e) => {
        e.preventDefault();
        setAdditionalPhotoDragActive(false);
        handleAdditionalPhotos(e.dataTransfer.files);
    };
    const removeAdditionalPhoto = (index) => {
        const newPreview = additionalPhotoPreview.filter((_, i) => i !== index);

        setAdditionalPhotoPreview(newPreview);
        setAdditionalPhotos(newPreview.map(item => item.file));

        if (newPreview.length === 0) {additionalPhotoInputRef.current.value = "";}
    };

    const reset = ()=>{
        setGroup('')
        setCategory('')
        setCategories([])
        setBrand('')
        setBarcode('')
        setName('')
        setUOM('')
        setNetUnit(1)
        setMinOrderQuantity(1)
        setMaxOrderQuantity(999)
        setAdditionalPhotos(null)
        setHsnCode('')
        setDescription('')
        setProductHighlights([])
        setHighlightInput('')
        removePhoto()
        setAdditionalPhotos([]);
        setAdditionalPhotoPreview([]);
        if (additionalPhotoInputRef.current) {
            additionalPhotoInputRef.current.value = "";
        }
    }
    
    const addHighlight = () => {
        const value = highlightInput.trim();
        if (!value) return;
        setProductHighlights((prev) => [...prev, value]);
        setHighlightInput("");
    };

    const removeHighlight = (index) => {
        setProductHighlights((prev) => prev.filter((_, i) => i !== index));
    };

    const handleHighlightsKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addHighlight();
        }
    };

    // Form Submission
    const handleSubmit = async(e)=>{
        try {
            if(product_min_order_quantity > product_max_order_quantity){toast.error("Min value should be less than max value"); return ; }

            if(!product_group || !product_category || !product_brand || !product_barcode || !product_name || !product_UOM || !product_photo){
                toast.warn("Enter all the required fields")
                return;
            }
            
            setLoading(true) 

            const formData = new FormData();

            formData.append("product_group", product_group);
            formData.append("product_category", product_category);
            formData.append("product_brand", product_brand);
            formData.append("product_barcode", product_barcode);
            formData.append("product_name", product_name);
            formData.append("product_UOM", product_UOM);
            formData.append("product_net_unit", product_net_unit);
            formData.append("product_min_order_quantity", product_min_order_quantity);
            formData.append("product_max_order_quantity", product_max_order_quantity);
            formData.append("product_hsn_code", product_hsn_code);
            formData.append("product_description", product_description);
            formData.append("product_highlights", JSON.stringify(product_highlights));
            formData.append("product_photo", product_photo);
            product_additional_photos?.forEach(file => {
                formData.append("product_additional_photos", file);
            })

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/product/add-product` , formData)
            console.log("addNewProduct response",res.data)
            toast.success(res.data?.message)
            reset()
            navigate('/admin/products')
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

        <div className="text-gray-600 text-2xl font-semibold w-full">Create Product</div>

        <div className="rounded-xl container max-w-screen-xl mt-5 border shadow-lg p-8 gap-x-4 gap-y-2">
            <div className="w-full text-gray-700 gap-3 gap-y-2 grid grid-cols-10 ">
                <div className="text-xl col-span-10 font-medium text-sky-600 mt-1 mb-2">Product Details</div>
                {/* Groups */}
                <div className="col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_group" >Group<span className="text-red-500 pl-0.5">*</span></label>
                    <select name="product_group" required autoFocus value={product_group} onChange={(e)=> handleGroup(e)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        {Groups?.map(group =>( <option key= {group._id} value={group._id} className="text-sm"> {group.group_name} </option> ))}
                    </select>
                </div>
                {/* category */}
                <div className="col-span-4 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_category" >Category<span className="text-red-500 pl-0.5">*</span></label>
                    <select name="product_category" required disabled= {!Categories.length} value={product_category} onChange={(e)=> setCategory(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        {Categories?.map(category =>( <option key= {category._id} value={category._id} className="text-sm"> {category.category_name} </option> ))}
                    </select>
                </div>
                {/* brand */}
                <div className="col-span-3 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_brand" >Brand<span className="text-red-500 pl-0.5">*</span></label>
                    <select name="product_brand" required autoFocus value={product_brand} onChange={(e)=> setBrand(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        {Brands?.map(brand =>( <option key= {brand._id} value={brand._id} className="text-sm"> {brand.brand_name} </option> ))}
                    </select>
                </div>
                {/* Barcode */}
                <div className="md:col-span-3 space-y-2 ">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_barcode">Barcode<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" name="product_barcode" id="product_barcode" autoComplete="off" required value={product_barcode} onChange={(e)=>setBarcode((e.target.value).toUpperCase().trim())} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                {/* product name */}
                <div className="md:col-span-7 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="name">Name<span className="text-red-500 pl-0.5">*</span></label>
                    <input type="text" name="name" id="name" autoComplete="off" required value={product_name} onChange={(e)=>setName(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="text-xl col-span-10 text-sky-600 font-medium mt-5 mb-2">Quantity and Stock Details</div>
                <div className="col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_UOM">Unit Of Measure<span className="text-red-500 pl-0.5">*</span></label>
                    <select name="product_UOM" required value={product_UOM} onChange={(e)=> setUOM(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium">
                        <option disabled value='' />
                        <option value='gm'>Gram</option>
                        <option value='kg'>Kilo Gram</option>
                        <option value='ml'>Milli Liter</option>
                        <option value='lit'>Liter</option>
                        <option value='pcs'>piece</option>
                        <option value='cap'>capacity</option>
                    </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_net_unit">Net Unit</label>
                    <input type="number" name="product_net_unit" id="product_net_unit" value={product_net_unit} onChange={(e)=>setNetUnit(Number(e.target.value))} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_min_order_quantity">Min OQ</label>
                    <input type="number" name="product_min_order_quantity" id="product_min_order_quantity" value={product_min_order_quantity} onChange={(e)=>setMinOrderQuantity(Number(e.target.value))} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_max_order_quantity">Max OQ</label>
                    <input type="number" name="product_max_order_quantity" id="product_max_order_quantity" value={product_max_order_quantity} onChange={(e)=>setMaxOrderQuantity(Number(e.target.value))} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="product_hsn_code">HSN code</label>
                    <input type="number" name="product_hsn_code" id="product_hsn_code" value={product_hsn_code} onChange={(e)=>setHsnCode(e.target.value)} className="border border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="text-xl col-span-10 text-sky-600 font-medium mt-5 mb-2">Additional Information</div>
                {/* photo */}
                <div className=" space-y-2 col-span-5 ">
                    <div className="text-lg font-medium text-gray-600">Photo<span className="text-red-500 pl-0.5">*</span></div>
                    <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=> handlePhoto(e.target.files[0])}/>
                    {!previewPhoto ? (
                        <div onClick={() => photoInputRef.current.click()}
                            onDragOver={(e) => { 
                                e.preventDefault(); 
                                setPhotoDragActive(true) 
                            }}
                            onDragLeave={() => setPhotoDragActive(false)}
                            onDrop={handleDropPhoto}
                            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300 ${ photoDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"}`}
                        >
                            <FiUploadCloud size={55} className={photoDragActive ? "text-blue-500" : "text-gray-400"}/>
                            <h2 className="text-lg font-semibold text-gray-700">Drag & Drop Image</h2>
                            <p className="text-gray-500">or click to browse</p>
                            <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <img src={previewPhoto} alt="Preview" className="h-[245px] w-full rounded-xl border object-cove" />
                            <button type="button" onClick={removePhoto} className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600">
                                <FiX size={18} />
                            </button>
                        </div>
                    )}
                </div>
                {/* additional photo */}
                <div className="col-span-5 space-y-2">
                    <div className="text-lg font-medium text-gray-600">Additional Photos</div>
                    <input ref={additionalPhotoInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e)=> handleAdditionalPhotos(e.target.files)}/>
                    {!additionalPhotoPreview.length ? (
                        <div onClick={() => additionalPhotoInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setAdditionalPhotoDragActive(true);}}
                            onDragLeave={() => setAdditionalPhotoDragActive(false)}
                            onDrop={handleDropAdditionalPhotos}
                            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300 ${ additionalPhotoDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"}`}
                            >
                            <FiUploadCloud size={55} className={ additionalPhotoDragActive ? "text-blue-500" : "text-gray-400"}/>
                            <h2 className="text-lg font-semibold">Drag & Drop Images</h2>
                            <p className="text-gray-500">or click to browse</p>
                            <p className="text-sm text-gray-400">Maximum 5 Images</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-4 overflow-x-auto rounded-xl border p-6 scrollbar-thin">
                            {additionalPhotoPreview.map((photo, index) => (
                                <div key={index} className="relative h-[192px] w-[192px] flex-shrink-0">
                                    <img src={photo.preview} alt="" className="h-full w-full rounded-xl object-cover border"/>
                                    <div className="absolute left-2 top-2 rounded-full bg-black/60 text-white text-xs px-2 py-1">{index + 1}</div>
                                    <button type="button" onClick={() => removeAdditionalPhoto(index)} className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                                        <IoMdClose size={18}/>
                                    </button>
                                </div>
                            ))}
                            {additionalPhotoPreview.length < 5 && (
                                <Button type="button" variant="outlined" onClick={() => additionalPhotoInputRef.current?.click()} className="h-[192px] min-w-[192px] flex flex-col justify-center items-center gap-2 rounded-xl border-2 border-dashed border-blue-500 text-blue-500 hover:bg-blue-50">
                                    <FiUploadCloud size={30} />
                                    <span>Add Photo</span>
                                </Button>
                            )}
                        </div>
                        </>
                    )}
                </div>

                <div className="md:col-span-10 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="description">Description</label>
                    <textarea placeholder="Add a Description" name="description" id="description" value={product_description} onChange={(e)=>setDescription(e.target.value)} className="border resize-none h-28 border-gray-300 p-3 px-4 w-full rounded-xl text-gray-800 font-medium"/>
                </div>

                <div className="md:col-span-10 space-y-2">
                    <label className="text-lg font-medium text-gray-600" htmlFor="highlights">Highlights</label>
                    <div className="flex gap-2">
                        <input type="text"
                            value={highlightInput}
                            onChange={(e) => setHighlightInput(e.target.value)}
                            onKeyDown={handleHighlightsKeyDown}
                            placeholder="Enter a highlight"
                            className="flex-1 rounded-xl text-gray-800 font-medium border  border-gray-300 px-4 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <button type="button" onClick={addHighlight} className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">Add</button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                    {product_highlights.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 font-medium text-sky-600">
                            <span>{item}</span>
                            <button type="button" onClick={() => removeHighlight(index)} className="text-red-500 font-semibold hover:text-red-700">✕</button>
                        </div>
                    ))}
                    </div>
                </div>

                <div className=" col-span-10 mt-10 grid grid-cols-4 gap-5">
                    <button type="button" onClick={()=>reset()} className=" bg-red-500 text-white rounded-xl p-4 col-span-2" >Reset</button>
                    <button onClick={()=>handleSubmit()} className="bg-blue-500 text-white rounded-xl p-4 col-span-2" >Submit</button> 
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminAddNewProductPage