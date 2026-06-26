import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { debounce } from 'lodash';
import { useNavigate } from "react-router-dom";

const AdminPurchaseEntryPage = () => {

    const navigate = useNavigate()
    const handleRef = useRef(true)

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [supplier_id , setSupplierId ] = useState('')
    const [invoice_no , setInvoiceNo ] = useState('')
    const [products , setProducts ] = useState([])
    const [total_purchase_amount , setTotalPurchaseAmount ] = useState(0)

    const [product_barcode , setProductBarcode ] = useState('')
    const [product_name, setProductName] = useState('')
    const [batch_no , setBatchNo ] = useState('')
    const [quantity_recieved , setQuantityRecieved ] = useState('')
    const [size , setSize ] = useState('')
    const [manufacture_date , setManufactureDate ] = useState('')
    const [expire_date , setExpireDate ] = useState('')
    const [best_before , setBestBefore ] = useState('')
    const [mrp , setMrp ] = useState('')
    const [purchase_cost , setPurchaseCost ] = useState('')
    const [gst , setGst ] = useState('')
    const [other_expences , setOtherExpences ] = useState(0)
    const [price , setPrice ] = useState('')


    const [suppliers , setSuppliers ] = useState([])

    const [searchedProducts , setSearchedProducts] = useState(null)

    useEffect(()=>{
        const fetchSuppliers = async()=>{
            try {
                setLoading(true) 
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/all-suppliers`)
                setSuppliers(res.data.data)
                console.log("fetchSuppliers payload :",res.data)
            } catch (error) {
                setError(true)
                console.error("error in fetchSuppliers :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current){
            fetchSuppliers()
            handleRef.current = false
        }
    },[])

    const reset = ()=> { 
        setProductBarcode('')
        setProductName('')
        setBatchNo('')
        setQuantityRecieved('')
        setSize('')
        setManufactureDate('')
        setExpireDate('')
        setBestBefore('')
        setMrp('')
        setPurchaseCost('')
        setGst('')
        setOtherExpences(0)
        setPrice('')
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
    const inputaRef = useRef(null)
    const inputbRef = useRef(null)
    const handleKeyDown = (e, nextinputRef) => {
        if (e.key === "Enter"){
            e.preventDefault();
            if(nextinputRef.current.name !== "Name"){setSearchedProducts(null)}
            nextinputRef.current.focus()
        }
    }

    const searchBarcode = async(e)=>{
        if (e.key === "Enter" && product_barcode){
            e.preventDefault()

            let existingProductBarcode = []
            products?.map(product=> existingProductBarcode = [...existingProductBarcode, product.product_barcode])
            if( existingProductBarcode.includes(product_barcode)) { toast.warn("Product Already Added"); return }

            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/product/barcode/${product_barcode}`)
                console.log("search barcode payload", res.data)
                if(res.data?.data){
                    setProductBarcode(res.data.data.product_barcode)
                    setProductName(res.data.data.product_name)
                } 
            } catch (error) {
                toast.error(error.response?.data?.message)
                console.error("error in searchBarcode :" , error)
            }  finally {
                setLoading(false)
            }
        }
    }

    const searchProductByName = debounce(async (term) => {
        if(term.length){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/product/name/${term}`)
                setSearchedProducts(res?.data?.data) 
                console.log({searchedProducts : res?.data?.data})
            } catch (error) {
                console.error("error in searchName :" , error)
            }
        }
    },500)

    const handleProductName = (e) => {
        const term = e.target.value;
        setProductName(term)
        if(term.length > 2){searchProductByName(term)}
        else{setSearchedProducts(null)}
    }

    const clickSearchedProductByName = (product)=>{
        setProductBarcode(product?.product_barcode)
        setProductName(product?.product_name)
        setSearchedProducts(null)
    }

    const handleAddRow = async(e)=>{
        e.preventDefault()

        if(Number(mrp) < Number(price)){ toast.warn("PRICE Should Be Less Than MRP"); return }

        let existingProductBarcode = []
        products?.map(product=> existingProductBarcode = [...existingProductBarcode, product.product_barcode])
        if(existingProductBarcode.includes(product_barcode)){ toast.warn("Product Already Added"); return }
        
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/product/barcode/${product_barcode}`)
            console.log("Validating Product Payload", res.data)
        } catch (error) {
            toast.error("Product Not Found")
            return
        } finally { setLoading(false)}

        setTotalPurchaseAmount(( purchase_cost * quantity_recieved ) + total_purchase_amount)
        const data = {product_barcode, product_name, batch_no, quantity_recieved, size, manufacture_date, expire_date, best_before, mrp, purchase_cost, gst, other_expences, price}
        setProducts([...products , data])
        reset()
    }

    const handleDeleteProduct = (e , index) => {
        e.preventDefault()
        const rmPro = products.filter((_, i) => i == index)[0]
        const newArray = products.filter((_, i) => i !== index);
        setTotalAmount(total_purchase_amount - (rmPro.quantity_recieved * rmPro.purchase_cost))
        setProducts(newArray);
    }

    const handleCreatePurchase = async()=>{
        const data = {supplier_id, invoice_no, products, total_purchase_amount}
        console.log(data)
        if(!supplier_id){inputaRef.current.focus(); return}
        if(!invoice_no){inputbRef.current.focus(); return}
        if(!products.length){input1Ref.current.focus(); return}
        if(supplier_id && invoice_no && products.length ){
            try {
                setLoading(true)
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/create-purchase`, {data})
                console.log("CreatePurchase payload", res.data)
                toast.success(res.data?.message)
                reset()
                setSupplierId('')
                setInvoiceNo('')
                setProducts([]) 
                navigate('/admin/entry')
            } catch (error) {
                toast.error(error.response.data?.message)
                console.error("error in CreatePurchase :" , error)
            } finally { setLoading(false) }
        }
    }

    if (loading) {return <div>Loading..</div>}
    if (error) {return <div>Error</div>}
  return (
    <div className="min-h-screen w-full">
        <div className="tracking-wide font-[arial] bg-gray-200 p-5 flex justify-between">
            <div className="flex gap-5 ">
                <div>
                    <label htmlFor="supplier_id">Supplier</label>
                    <select name="supplier_id" required autoFocus value={supplier_id} onChange={(e)=> setSupplierId(e.target.value)} 
                        ref={inputaRef}
                        className="w-full mt-1 p-[11px] border   border-gray-400 rounded-md cursor-pointer "> 
                        
                        <option disabled value=''  />
                        {suppliers?.map((supplier, index) =>( 
                            <option key ={index} value={supplier._id}>{supplier.supplier_name}</option> ))
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="Invoice No">Invoice No</label>
                    <input type="text" name="Invoice No" id="Invoice No" autoComplete="off" required
                        value={invoice_no} onChange={(e)=>setInvoiceNo(e.target.value)}
                        ref={inputbRef} onKeyDown={(e) => handleKeyDown(e, input1Ref)}
                        className="w-full mt-1 p-2 border border-gray-400 rounded-md " />
                </div>
            </div>
            <div className="pt-4">Total Amount : {total_purchase_amount}</div>
        </div>

        <form onSubmit={(e)=>handleAddRow(e)} className="grid md:grid-cols-12 p-5 gap-2 gap-x-4">

            <div className="col-span-2">
                <label htmlFor="product_barcode">Barcode</label>
                <input type="text" name="product_barcode" id="product_barcode" autoComplete="off" required
                    value={product_barcode} onChange={(e)=>setProductBarcode(e.target.value)}
                    ref={input1Ref} onKeyDown={(e) => searchBarcode(e)}
                    className="w-full mt-1 p-2 border border-gray-400 rounded-md" />
            </div>

            <div className="col-span-4 relative">
                <label htmlFor="Name">Name</label>
                <input type="text" name="Name" id="Name" autoComplete="off" required
                    value={product_name} onChange={(e)=>handleProductName(e)}
                    ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)}
                    className="w-full mt-1 p-2 border border-gray-400 rounded-md " />

                {searchedProducts?.length && product_name ? 
                <div className='absolute bg-blue-gray-50 w-full border flex flex-col'>
                    {searchedProducts?.map((product, index)=>(
                        <div key={index} onClick={()=>clickSearchedProductByName(product)} className="hover:bg-gray-100 cursor-pointer p-2">{product.product_name}</div>
                    ))}
                </div>
                : <div />
                }
            </div>

            <div className="col-span-2">
                <label htmlFor="batch_no">Batch No</label>
                <input type="text" name="batch_no" id="batch_no" autoComplete="off" required
                    value={batch_no} onChange={(e)=>setBatchNo(e.target.value)}
                    ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref)}
                    className="w-full mt-1 p-2 border border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="QR">Qty Received</label>
                <input type="number" name="QR" id="QR" autoComplete="off" required
                    value={quantity_recieved} onChange={(e)=>setQuantityRecieved(e.target.value)}
                    ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref)}
                    className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="size">Size</label>
                <input type="text" name="size" id="size" autoComplete="off" required
                    value={size} onChange={(e)=>setSize(e.target.value)}
                    ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref)}
                    className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="manufacture_date">MFD</label>
                <input type="date" name="manufacture_date" id="manufacture_date" autoComplete="off"
                    value={manufacture_date} onChange={(e)=>setManufactureDate(e.target.value)}
                    ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input7Ref)}
                    className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="expire_date">EXD</label>
                <input type="date" name="expire_date" id="expire_date" autoComplete="off"
                    value={expire_date} onChange={(e)=>setExpireDate(e.target.value)}
                    ref={input7Ref} onKeyDown={(e) => handleKeyDown(e, input8Ref)}
                    className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="Best Before">Best Before</label>
                <input type="number" name="Best Before" id="Best Before" autoComplete="off"
                    value={best_before} onChange={(e)=>setBestBefore(e.target.value)}
                    ref={input8Ref} onKeyDown={(e) => handleKeyDown(e, input9Ref)}
                        className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="mrp">MRP</label>
                <input type="number" name="mrp" id="mrp" autoComplete="off" required
                value={mrp} onChange={(e)=>setMrp(e.target.value)}
                ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                        className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="purchase_cost">Purchase Cost</label>
                <input type="number" name="purchase_cost" id="purchase_cost" autoComplete="off" required
                   value={purchase_cost} onChange={(e)=>setPurchaseCost(e.target.value)}
                   ref={input10Ref} onKeyDown={(e) => handleKeyDown(e, input11Ref)}
                        className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="gst">GST</label>
                <input type="number" name="gst" id="gst" autoComplete="off" required
                     value={gst} onChange={(e)=>setGst(e.target.value)}
                     ref={input11Ref} onKeyDown={(e) => handleKeyDown(e, input12Ref)}
                        className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="other_expences">Other Exp</label>
                <input type="number" name="other_expences" id="other_expences" autoComplete="off" required
                    value={other_expences} onChange={(e)=>setOtherExpences(e.target.value)}
                    ref={input12Ref} onKeyDown={(e) => handleKeyDown(e, input13Ref)}
                        className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>

            <div className="col-span-2">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" autoComplete="off" required
                    value={price} onChange={(e)=>setPrice(e.target.value)}
                    ref={input13Ref} 
                    className="w-full mt-1 p-2 border   border-gray-400 rounded-md " />
            </div>
           
            <div className="col-span-2 ">
                <button type="submit" className="bg-blue-900 text-white py-2 px-5 rounded-xl mt-7">add</button>
            </div>
        </form>
        <div className="border-b-2 mb-5 px-5"/>
        <table className="text-center border-b w-full ">
            <thead className='sticky top-0'>
                <tr className='text-sm bg-light-blue-600 w-full text-white font-[arial] tracking-wide'>
                    <th className="p-3"></th>
                    <th className="p-3">BARCODE</th>
                    <th className="p-3">NAME</th>
                    <th className="p-3">BATCH</th>
                    <th className="p-3">QTY REC</th>
                    <th className="p-3">QTY</th>
                    <th className="p-3">MFD</th>
                    <th className="p-3">EXD</th>
                    <th className="p-3">BB</th>
                    <th className="p-3">MRP</th>
                    <th className="p-3">PUR COST</th>
                    <th className="p-3">GST</th>
                    <th className="p-3">OTHER EXP</th>
                    <th className="p-3">PRICE</th>
                    <th className="p-3"></th>
                </tr>
            </thead>

            <tbody>
               {products?.map((product, index)=>(
                <tr key={index} className="border-b border-light-blue-100">
                    <td className="p-3">{index+1}</td>
                    <td className="p-3">{product.product_barcode}</td>
                    <td className="p-3 text-start">{product.product_name}</td>
                    <td className="p-3">{product.batch_no}</td>
                    <td className="p-3">{product.quantity_recieved}</td>
                    <td className="p-3">{product.size}</td>
                    <td className="p-3">{product.manufacture_date}</td>
                    <td className="p-3">{product.expire_date}</td>
                    <td className="p-3">{product.best_before}</td>
                    <td className="p-3">{product.mrp}</td>
                    <td className="p-3">{product.purchase_cost}</td>
                    <td className="p-3">{product.gst}</td>
                    <td className="p-3">{product.other_expences}</td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3"> <button onClick={(e) => handleDeleteProduct(e , index)} className="text-red-500 hover:text-red-700">Remove</button></td>
                </tr>
               ))}
            </tbody>
        </table>
        <div className="flex justify-start p-5 gap-10">
            <div onClick={()=>handleCreatePurchase()} className="bg-blue-500 text-white py-2 px-8 rounded-xl cursor-pointer">Submit</div>
            <div onClick={()=>toast.warn("Feature Not Yet Added")} className="bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer">Save</div>
        </div>
    </div>
  )
}

export default AdminPurchaseEntryPage