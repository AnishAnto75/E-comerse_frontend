import { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiTrash2, FiX, FiEdit } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios"
import AdminSideBar from "../components/admin/AdminSideBar";
import { toast } from 'react-toastify'
import {format} from'date-fns'

const PurchaseEntryPage = () => {

    const [supplier_id, setSupplierId] = useState('')
    const [supplier_invoice_no, setSupplierInvoiceNo] = useState('')
    const [invoice_date, setInvoiceDate ] = useState('')
    const [delivery_date, setDeliveryDate ] = useState('')
    const [payment_method, setPaymentMethod ] = useState('')
    const [discount_received, setDiscountReceived ] = useState(0)
    const [paid_amount, setPaidAmount ] = useState(0)
    const [payment_date, setPaymentDate ] = useState('')
    const [products, setProducts] = useState([]);
    
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const [supplier, setSupplier] = useState(null)
    const [draftProduct, setDraftProduct] = useState({
        product_id: "",
        product_photo: null,
        product_name: "",
        product_barcode: "",
        batch_no: "",
        free_received: 0,
        quantity_received: 0,
        size: "",
        manufacture_date: "",
        expiry_date: "",
        best_before: 0,
        mrp : 0,
        purchase_cost: 0,
        gst_percentage: 0,
        other_expenses: 0,
        selling_price: 0,
    })
   
    useEffect(() => {
        const timer = setTimeout(() => {
            searchProduct(search);
        }, 400); // Wait 400ms after user stops typing

        return () => clearTimeout(timer);
    }, [search]);
    const searchProduct = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/create-purchase/search-products/`, { params: {query}});
            console.log(data)
            setSearchResults(data.data);
            setShowResults(true);
        } catch (err) { console.log(err);}
    };
    const selectSearchProduct = (product) => {
        setSearch("")
        setSearchResults([])
        setShowResults(false)

        const batch = product.latest_batch_details || {};
        setDraftProduct({
            product_id: product._id,
            product_photo: product.product_photo,
            product_name: product.product_name,
            product_barcode: product.product_barcode,
            batch_no: batch.batch_no ?? "",
            free_received: 0,
            quantity_received: 0,
            size: batch.size ?? "",
            manufacture_date: batch.manufacture_date ?? "",
            expiry_date: batch.expiry_date ?? "",
            best_before: batch.best_before ?? 0,
            mrp: batch.mrp ?? 0,
            purchase_cost: batch.purchase_cost ?? 0,
            gst_percentage: batch.gst_percentage ?? 0,
            other_expenses: batch.other_expenses ?? 0,
            selling_price: batch.selling_price ?? 0,
        })
    };

    const draftLineAmount = Number(draftProduct.quantity_received) * Number(draftProduct.purchase_cost)
    const draftGstValue = Number(draftLineAmount) * Number(draftProduct.gst_percentage) / 100
    const draftLineTotal = (Number(draftLineAmount) + Number(draftGstValue) + (Number(draftProduct.other_expenses) * draftProduct.quantity_received)).toFixed(2)

    const addProduct = () => {

        const {product_id, product_name, product_barcode, batch_no, free_received, quantity_received, size, manufacture_date, expiry_date, best_before, mrp, purchase_cost, gst_percentage, other_expenses, selling_price} = draftProduct

        // validation
        const existingProduct = products.find( (item) => item.product_id === product_id);
        if (existingProduct) { toast.warn("This product has already been added."); return}
        if(!product_id || !product_barcode || !product_name || !quantity_received || !mrp || !purchase_cost || !selling_price ){ toast.warn("Kindly fill the required fields") ; return }
        if ( !Number.isFinite(Number(mrp)) || !Number.isFinite(Number(purchase_cost)) || !Number.isFinite(Number(selling_price)) || !Number.isFinite(Number(free_received)) || !Number.isFinite(Number(quantity_received)) || !Number.isFinite(Number(gst_percentage)) || !Number.isFinite(Number(other_expenses)) ) { toast.warn("Enter valid numeric values"); return }
        if( Number(mrp) < Number(purchase_cost) ) { toast.warn("Purchase cost should be less than mrp") ; return}
        if( Number(mrp) < Number(selling_price) ) { toast.warn("Selling price should be less than mrp") ; return}
        if( Number(quantity_received) <= 0 ) { toast.warn("Qty received should be more than 1") ; return}
        if( Number(selling_price) <= 0 ) { toast.warn("Selling price should be more than 1") ; return}

        // adding
        setProducts(prev => [...prev, { ...draftProduct }]);

        // reseting draft product
        setDraftProduct({
            product_id: "",
            product_name: "",
            product_barcode: "",
            batch_no: "",
            free_received: 0,
            quantity_received: 0,
            size: "",
            manufacture_date: "",
            expiry_date: "",
            best_before: 0,
            mrp : 0,
            purchase_cost: 0,
            gst_percentage: 0,
            other_expenses: 0,
            selling_price: 0,
        })
    }

    const resetDraft = ()=>{
        setSearch("")
        setSearchResults([])
        setShowResults(false)

        setDraftProduct({
            product_id: "",
            product_name: "",
            product_barcode: "",
            batch_no: "",
            free_received: 0,
            quantity_received: 0,
            size: "",
            manufacture_date: "",
            expiry_date: "",
            best_before: 0,
            mrp : 0,
            purchase_cost: 0,
            gst_percentage: 0,
            other_expenses: 0,
            selling_price: 0,
        })
    }

    const removeRow = (product_id) => {
        setProducts(products.filter((product) => product.product_id !== product_id));
    };

    const handleDraftChange = (e) => {
        const { name, value } = e.target;
        setDraftProduct((prev) => ( { ...prev, [name]: value, }))
    };

    return (
        <div className="flex min-h-screen">
            <AdminSideBar />

            <div className="flex-1 p-6 font-inter">

                <h1 className="text-3xl font-bold text-gray-700">Purchase Entry</h1>
                <p className="text-gray-500 font-medium mt-1">Create a new purchase invoice</p>

                <div className="grid grid-cols-10 gap-6 mt-5">

                    <div className="bg-white col-span-4 rounded-xl shadow-md border p-6 space-y-4 gap-x-4 grid grid-cols-4">
                        <h2 className="font-semibold col-span-4 text-lg text-sky-600 ">Supplier Details</h2>
                        <div className="col-span-4">
                            <label className="font-medium text-gray-700">Supplier</label>
                            <select className="w-full mt-2 border font-medium rounded-lg p-[16px]">
                                <option value="" disabled />
                                <option value="djbdj" >Aysha</option>
                                <option value="dkj" >Hindustan</option>
                                <option value="Jeetu" >Jeetu</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Supplier ID</label>
                            <input className="w-full mt-2 border text-gray-800 font-medium rounded-lg p-3" value={supplier?.supplier_id || ""} readOnly={true} />
                        </div>
                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Phone no.</label>
                            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_phone || ""} readOnly={true} />
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Email</label>
                            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_email || ""} readOnly={true} />
                        </div>
                        
                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">GST no.</label>
                            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_gst_no || ""} readOnly={true}/>
                        </div>
                    </div>

                    <div className="bg-white col-span-4 space-y-4 gap-x-4 grid grid-cols-4 rounded-xl shadow-md border p-6">

                        <h2 className="font-semibold text-lg col-span-4 text-sky-600 ">Invoice & Payment Details</h2>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Invoice No.</label>
                            <input className="w-full mt-2 border text-gray-800 font-medium rounded-lg p-3" value={supplier_invoice_no} onChange={(e)=>setSupplierInvoiceNo(e.target.value)} />
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Invoice Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={invoice_date} onChange={(e)=>setInvoiceDate(e.target.value)} />
                        </div>
                        
                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Delivery Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={delivery_date} onChange={(e)=>setDeliveryDate(e.target.value)} />
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-700">Payment Method</label>
                            <select className="w-full mt-2 border font-medium rounded-lg p-[16px]" value={payment_method} onChange={(e)=>setPaymentMethod(e.target.value)}>
                                <option value="" disabled />
                                <option value={'Cash'}>Cash</option>
                                <option value={"UPI"}>UPI</option>
                                <option value={"Card"}>Card</option>
                                <option value={"Bank Transfer"}>Bank Transfer</option>
                            </select>
                        </div>
                       
                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Payment Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={payment_date} onChange={(e)=>setPaymentDate(e.target.value)} />
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Paid Amount</label>
                            <input type="number" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={paid_amount} onChange={(e)=>setPaidAmount(e.target.value)} />
                        </div>
                    </div>

                    <div className="bg-white space-y-4 col-span-2 rounded-xl shadow-md border p-6">

                        <h2 className="font-semibold text-lg text-sky-600 ">Product & Price Details</h2>

                        <div>Amount</div>

                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border mt-7 p-6">

                    <h2 className="font-semibold text-lg text-sky-600 mb-5">Add Products</h2>

                    <div className="relative">
                        <FiSearch className="absolute top-4 left-4 text-gray-400"/>
                        <input className="w-full border rounded-xl pl-12 p-3"  placeholder="Search Product by Name / Barcode" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        {showResults && (
                            <div className="mt-2 border absolute w-full bg-white rounded-xl shadow-lg max-h-72 overflow-y-auto">
                                {searchResults?.length === 0 ? (
                                    <div className="p-4 text-gray-500">No Products Found</div>
                                ) : ( 
                                searchResults?.map((product, index) => (
                                    <div key={index} className="p-3 hover:bg-blue-50 cursor-pointer items-center gap-3 flex border-b" onClick={() => selectSearchProduct(product)}>
                                        <div>
                                            <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo?.url}`} alt={product?.product_name} className="w-16 h-16 text-center rounded-xl object-cover"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{product.product_name}</h3>
                                            <p className="text-sm mt-1 text-gray-500">{product.product_barcode}</p>
                                        </div>
                                    </div>
                                )))}
                            </div>
                        )}
                    </div>
                    <div className={`grid grid-cols-10 gap-5 mt-5 text-gray-800 font-medium ${!draftProduct.product_id && "hidden"} `}>
                        <div className="col-span-3">
                            <label className="text-gray-600">Product Name</label>
                            <input type="text" className="w-full mt-2 border rounded-lg p-3" value={draftProduct.product_name} disabled/>
                        </div>
                        <div className="col-span-3">
                            <label className="text-gray-600">Product Barcode</label>
                            <input type="text" className="w-full mt-2 border rounded-lg p-3" value={draftProduct.product_barcode} disabled/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Batch No.</label>
                            <input type="text" className="w-full mt-2 border rounded-lg p-3" name="batch_no" value={draftProduct.batch_no} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Size</label>
                            <input type="text" className="w-full mt-2 border rounded-lg p-3" name="size" value={draftProduct.size} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-neutral-500">Free Received</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="free_received" value={draftProduct.free_received} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Qty Received</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="quantity_received" value={draftProduct.quantity_received} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Mfg. Date</label>
                            <input type="date" className="w-full mt-2 border rounded-lg p-3" name="manufacture_date" value={draftProduct.manufacture_date} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Exp. Date</label>
                            <input type="date" className="w-full mt-2 border rounded-lg p-3" name="expiry_date" value={draftProduct.expiry_date} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Best Before</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="best_before" value={draftProduct.best_before} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">MRP</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="mrp" value={draftProduct.mrp} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Purchase Cost</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="purchase_cost" value={draftProduct.purchase_cost} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">GST %</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="gst_percentage" value={draftProduct.gst_percentage} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Other Expenses</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="other_expenses" value={draftProduct.other_expenses} onChange={handleDraftChange}/>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-600">Selling Price</label>
                            <input type="number" className="w-full mt-2 border rounded-lg p-3" name="selling_price" value={draftProduct.selling_price} onChange={handleDraftChange}/>
                        </div>
                        <div className="flex col-span-10 items-center px-5 justify-between">
                            <div className="text-gray-700 font-medium">Total : {draftLineTotal}</div>
                            <div className=" flex gap-5">
                                <button onClick={()=>resetDraft()} className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600">Reset</button>
                                <button onClick={()=>addProduct()} className="flex items-center gap-2 bg-sky-500 text-white px-5 py-3 rounded-lg hover:bg-sky-600"><FiPlus size={20} /> Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Purchase Table */}
                <div className={`mt-7 overflow-auto ${!products.length && "hidden"}`}>
                    <table className="min-w-full mb-44 ">
                        <thead className="bg-sky-500 text-white">
                            <tr className="">
                                <th className="p-4 rounded-l-md"></th>
                                <th className="p-4"></th>
                                <th className="p-4 font-medium text-start w-64">Product</th>
                                <th className="p-4 font-medium">Batch</th>
                                <th className="p-4 font-medium">Qty Rec.</th>
                                <th className="p-4 font-medium">Free</th>
                                <th className="p-4 font-medium">size</th>
                                <th className="p-4 font-medium">MFD / EXD</th>
                                <th className="p-4 font-medium">BB</th>
                                <th className="p-4 font-medium">MRP</th>
                                <th className="p-4 font-medium">Pur Cost</th>
                                <th className="p-4 font-medium">GST %</th>
                                <th className="p-4 font-medium">Other Exp.</th>
                                <th className="p-4 font-medium">SP</th>
                                <th className="p-4 font-medium">Total</th>
                                <th className="p-4 font-medium rounded-r-md"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item, index) => (
                                <tr key={index} className="border-b text-center text-gray-700 font-medium">
                                    <td className="py-3 pl-3">{index+1})</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <img src={`${import.meta.env.VITE_IMAGE_URL}${item.product_photo?.url}`} alt={item?.product_name} className="w-[70px] h-[70px] text-center rounded-xl object-cover"/>
                                        </div>
                                    </td>
                                    <td className='text-start py-4 flex flex-col max-w-64'>
                                        <span className='mb-0.5 font-semibold line-clamp-1'>{item?.product_name}</span>
                                        <span className='text-gray-500 text-[17px]'>{item?.product_barcode}</span>
                                    </td>
                                    <td>{item.batch_no || "--"}</td>
                                    <td>{item.quantity_received}</td>
                                    <td>{item.free_received || "--"}</td>
                                    <td>{item.size}</td>
                                    <td className="flex flex-col">
                                        <span>{item.manufacture_date ? format(item.manufacture_date, 'dd-MM-yyyy') : "--"}</span>
                                        <span>{item.expiry_date ? format(item.expiry_date, 'dd-MM-yyyy') : "--"}</span>
                                    </td>
                                    <td>{item.best_before ? `${item.best_before} days`  : "--"}</td>
                                    <td><div className="inline-flex items-center"><FaIndianRupeeSign />{item.mrp}</div></td>
                                    <td><div className="inline-flex items-center"><FaIndianRupeeSign />{item.purchase_cost}</div></td>
                                    <td>{item.gst_percentage ? `${item.gst_percentage}%` : "--"}</td>
                                    <td>{item.other_expenses ?<div className="inline-flex items-center"><FaIndianRupeeSign />{item.other_expenses}</div>: "--" }</td>
                                    <td><div className="inline-flex items-center"><FaIndianRupeeSign />{item.selling_price}</div></td>
                                    <td><div className="inline-flex items-center"><FaIndianRupeeSign />{((Number(item.quantity_received) * Number(item.purchase_cost)) + ((Number(item.quantity_received) * Number(item.purchase_cost)) * Number(item.gst_percentage) / 100) + (Number(item.other_expenses) * item.quantity_received)).toFixed(2)}</div></td>
                                    <td className="text-center space-x-1">
                                        <button onClick={() => removeRow(item.product_id)} className="text-orange-500 hover:text-orange-600"><FiEdit size={22}/></button>
                                        <button onClick={() => removeRow(item.product_id)} className="text-red-500 hover:text-red-700"><FiTrash2 size={22}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end gap-5 p-5">
                    <button className="bg-green-500 hover:bg-green-600 text-white p-3 px-5 rounded-xl">Save Draft</button>
                    <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 px-5 rounded-xl">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseEntryPage;