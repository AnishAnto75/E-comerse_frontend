import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { debounce } from 'lodash';

const AdminPurchaseEntryPage = () => {

    const handleRef = useRef(true)

    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)

    const [supplier_id , setSupplierId ] = useState('')
    const [invoice_no , setInvoiceNo ] = useState('')
    const [payment_done , setPaymentDone ] = useState(false)
    const [products , setProducts ] = useState([])
    const [total_purchase_amount , setTotalAmount ] = useState(0)

    const [product_barcode , setProductBarcode ] = useState('')
    const [product_name , setProductName ] = useState('')
    const [batch_no , setBatchNo ] = useState('')
    const [quantity_recieved , setQuantityRecieved ] = useState('')
    const [quantity , setQuantity ] = useState('')
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
        setQuantity('')
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
            let valid = true
            products.map(product => { if(product.product_barcode == product_barcode){valid = false}})
            if(!valid){return}
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/product/barcode/${product_barcode}`)
                console.log("search barcode payload", res.data)
                if(res.data?.data){
                    setProductName(res.data.data.product_name)
                    const stock = res.data.data?.product_stock[res.data.data?.product_stock?.length-1]
                    setQuantity(stock?.quantity ? stock.quantity : '')
                    setManufactureDate('')
                    setExpireDate('')
                    setBatchNo('')
                    setQuantityRecieved('')
                    setBestBefore(stock?.best_before ? stock.best_before : '')
                    setMrp(stock?.mrp ? stock.mrp : '')
                    setPurchaseCost(stock?.purchase_cost ? stock.purchase_cost : '')
                    setGst(stock?.gst ? stock.gst : '')
                    setOtherExpences(stock?.other_expences ? stock.other_expences : 0)
                    setPrice(stock?.price ? stock.price : '')
                    input3Ref.current.focus()
                } else{
                    setProductName(''); setBatchNo(''); setQuantityRecieved(''); setQuantity(''); setManufactureDate(''); setExpireDate(''); setBestBefore(''); setMrp(''); setPurchaseCost(''); setGst(''); setOtherExpences(0); setPrice('')
                }
            } catch (error) {
                toast.error(error.response.data?.message)
                console.error("error in searchBarcode :" , error)
            } 
        }
    }

    const searchName = debounce(async (term) => {
        if(term.length){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/product/name/${term}`)
                setSearchedProducts(res.data.data) 
                console.log({searchedProductss : res.data.data})
            } catch (error) {
                console.error("error in searchName :" , error)
            }
        }
    },500)

    const handleProductName = (e) => {
        const term = e.target.value;
        setProductName(term)
        if(term.length){searchName(term)}
        else{setSearchedProducts(null)}
    }

    const clickName = (product)=>{
        console.log(product)
        setProductBarcode(product.product_barcode)
        setProductName(product.product_name)
        const stock = product?.product_stock[product?.product_stock?.length-1]
        setQuantity(stock?.quantity ? stock.quantity : '')
        setManufactureDate('')
        setExpireDate('')
        setBatchNo('')
        setQuantityRecieved('')
        setBestBefore(stock?.best_before ? stock.best_before : '')
        setMrp(stock?.mrp ? stock.mrp : '')
        setPurchaseCost(stock?.purchase_cost ? stock.purchase_cost : '')
        setGst(stock?.gst ? stock.gst : '')
        setOtherExpences(stock?.other_expences ? stock.other_expences : 0)
        setPrice(stock?.price ? stock.price : '')
        input3Ref.current.focus()
        setSearchedProducts(null)
    }

    const handleDeleteProduct = (e , index) => {
        e.preventDefault()
        const rmPro = products.filter((_, i) => i == index)[0]
        const newArray = products.filter((_, i) => i !== index);
        setTotalAmount(total_purchase_amount - (rmPro.quantity_recieved * rmPro.purchase_cost))
        setProducts(newArray);
    }

    const handleAddRow = (e)=>{
        e.preventDefault()
        setTotalAmount((purchase_cost*quantity_recieved)+total_purchase_amount)
        const data = {product_barcode, product_name, batch_no, quantity_recieved, quantity, manufacture_date, expire_date, best_before, mrp, purchase_cost, gst, other_expences, price}
        setProducts([...products , data])
        reset()
        input1Ref.current.focus()
    }

    const handleCreatePurchase = async()=>{
        const data = {supplier_id, invoice_no, payment_done, products, total_purchase_amount}
        if(!supplier_id){inputaRef.current.focus(); return}
        if(!invoice_no){inputbRef.current.focus(); return}
        if(!products.length){input1Ref.current.focus(); return}
        if(supplier_id && invoice_no && products.length ){
            try {
                setLoading(true)
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/create-purchase`, {data})
                console.log("CreatePurchase payload", res.data)
                toast.success(res.data.message)
                reset()
                setSupplierId('')
                setInvoiceNo('')
                setProducts([]) 
            } catch (error) {
                toast.error(error.response.data?.message)
                console.error("error in CreatePurchase :" , error)
            } finally { setLoading(false) }
            console.log({data})
        }
    }

    if (loading) {return <div>Loading..</div>}
    if (error) {return <div>Error</div>}
  return (
    <div className="bg-slate-50 min-h-screen w-full">
        <div className="tracking-wide font-[arial] bg-gray-200 p-5 flex justify-between">
            <div className="flex gap-5 ">
                <div>
                    <label htmlFor="supplier_id">Supplier</label>
                    <select name="supplier_id" required autoFocus value={supplier_id} onChange={(e)=> setSupplierId(e.target.value)} 
                        ref={inputaRef}
                        className="select select-bordered w-full mt-1 ">
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
                        className="input input-bordered w-full mt-1 p-2" />
                </div>
            </div>
            <div className="pt-4">Total Amount : {total_purchase_amount}</div>
        </div>

        <form onSubmit={(e)=>handleAddRow(e)} className="grid md:grid-cols-12 p-5 gap-2 gap">

            <div className="col-span-2">
                <label htmlFor="product_barcode">Barcode</label>
                <input type="text" name="product_barcode" id="product_barcode" autoComplete="off" required
                    value={product_barcode} onChange={(e)=>setProductBarcode(e.target.value)}
                    ref={input1Ref} onKeyDown={(e) => searchBarcode(e)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-4 relative">
                <label htmlFor="Name">Name</label>
                <input type="text" name="Name" id="Name" autoComplete="off" required
                    value={product_name} onChange={(e)=>handleProductName(e)}
                    ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref)}
                    className="input input-bordered w-full mt-1 p-2" />

                {searchedProducts?.length ? 
                <div className='absolute bg-white w-full border p-2 flex flex-col'>
                    {searchedProducts.map((product, index)=>(
                        <div key={index} onClick={()=>clickName(product)} className="hover:bg-gray-100 cursor-pointer p-1">{product.product_name}</div>
                    ))}
                </div>
                :<div/>}
            </div>

            <div className="col-span-2">
                <label htmlFor="batch_no">Batch No</label>
                <input type="text" name="batch_no" id="batch_no" autoComplete="off" required
                    value={batch_no} onChange={(e)=>setBatchNo(e.target.value)}
                    ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="QR">Qty Received</label>
                <input type="number" name="QR" id="QR" autoComplete="off" required
                     value={quantity_recieved} onChange={(e)=>setQuantityRecieved(e.target.value)}
                     ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="Quantity">Quantity</label>
                <input type="text" name="Quantity" id="Quantity" autoComplete="off" required
                    value={quantity} onChange={(e)=>setQuantity(e.target.value)}
                    ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="manufacture_date">MFD</label>
                <input type="date" name="manufacture_date" id="manufacture_date" autoComplete="off" required
                     value={manufacture_date} onChange={(e)=>setManufactureDate(e.target.value)}
                     ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input7Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="expire_date">EXD</label>
                <input type="date" name="expire_date" id="expire_date" autoComplete="off" required
                    value={expire_date} onChange={(e)=>setExpireDate(e.target.value)}
                    ref={input7Ref} onKeyDown={(e) => handleKeyDown(e, input8Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="Best Before">Best Before</label>
                <input type="number" name="Best Before" id="Best Before" autoComplete="off" required
                    value={best_before} onChange={(e)=>setBestBefore(e.target.value)}
                    ref={input8Ref} onKeyDown={(e) => handleKeyDown(e, input9Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="mrp">MRP</label>
                <input type="number" name="mrp" id="mrp" autoComplete="off" required
                value={mrp} onChange={(e)=>setMrp(e.target.value)}
                ref={input9Ref} onKeyDown={(e) => handleKeyDown(e, input10Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="purchase_cost">Purchase Cost</label>
                <input type="number" name="purchase_cost" id="purchase_cost" autoComplete="off" required
                   value={purchase_cost} onChange={(e)=>setPurchaseCost(e.target.value)}
                   ref={input10Ref} onKeyDown={(e) => handleKeyDown(e, input11Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="gst">GST</label>
                <input type="number" name="gst" id="gst" autoComplete="off" required
                     value={gst} onChange={(e)=>setGst(e.target.value)}
                     ref={input11Ref} onKeyDown={(e) => handleKeyDown(e, input12Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="other_expences">Other Exp</label>
                <input type="number" name="other_expences" id="other_expences" autoComplete="off" required
                    value={other_expences} onChange={(e)=>setOtherExpences(e.target.value)}
                    ref={input12Ref} onKeyDown={(e) => handleKeyDown(e, input13Ref)}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>

            <div className="col-span-2">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" autoComplete="off" required
                    value={price} onChange={(e)=>setPrice(e.target.value)}
                    ref={input13Ref}
                    className="input input-bordered w-full mt-1 p-2" />
            </div>
           
            <div className="col-span-2 ">
                <button type="submit" className="btn btn-neutral mt-7">add</button>
            </div>
        </form>
        <div className="divider m-0 px-5"/>
        <table className="table table-zebra text-center border-b ">
            <thead className='sticky top-0'>
                <tr className='text-sm bg-gray-600 text-white font-[arial] tracking-wide'>
                    <th></th>
                    <th>BARCODE</th>
                    <th>NAME</th>
                    <th>BATCH</th>
                    <th>QTY REC</th>
                    <th>QTY</th>
                    <th>MFD</th>
                    <th>EXD</th>
                    <th>BB</th>
                    <th>MRP</th>
                    <th>PUR COST</th>
                    <th>GST</th>
                    <th>OTHER EXP</th>
                    <th>PRICE</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
               {products?.map((product, index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{product.product_barcode}</td>
                    <td>{product.product_name}</td>
                    <td>{product.batch_no}</td>
                    <td>{product.quantity_recieved}</td>
                    <td>{product.quantity}</td>
                    <td>{product.manufacture_date}</td>
                    <td>{product.expire_date}</td>
                    <td>{product.best_before}</td>
                    <td>{product.mrp}</td>
                    <td>{product.purchase_cost}</td>
                    <td>{product.gst}</td>
                    <td>{product.other_expences}</td>
                    <td>{product.price}</td>
                    <td> <button onClick={(e) => handleDeleteProduct(e , index)} className="text-red-500 hover:text-red-700">Delete</button></td>
                </tr>

              
               ))}


            </tbody>
        </table>
        <div className="flex px-5 pt-5 gap-2">
            <input type="checkbox" name="payment_done" checked={payment_done} onChange={()=>{payment_done ? setPaymentDone(false) : setPaymentDone(true)}} className="checkbox checkbox-info"/>
            <label htmlFor="payment_done">Payment Done</label>
        </div>
        <div className="flex justify-start p-5 gap-10">
            <div onClick={()=>handleCreatePurchase()} className="btn btn-neutral">Submit</div>
            <div className="btn btn-neutral ">Save</div>
        </div>
    </div>
  )
}

export default AdminPurchaseEntryPage