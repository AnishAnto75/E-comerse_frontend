import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiPlus, FiTrash2, FiX, FiEdit } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios"
import { toast } from 'react-toastify'
import {format} from'date-fns'
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminPurchaseEntrySupplierDetailsComponent from "../../../components/admin/AdminPurchaseComponents/AdminPurchaseEntrySupplierDetailsComponent";
import AdminPurchaseEntryProductTable from "../../../components/admin/AdminPurchaseComponents/AdminPurchaseEntryProductTable";

const PurchaseEntryPage = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [supplier_id, setSupplierId] = useState('')
    const [supplier_invoice_no, setSupplierInvoiceNo] = useState('')
    const [invoice_date, setInvoiceDate ] = useState('')
    const [delivery_date, setDeliveryDate ] = useState('')
    const [payment_method, setPaymentMethod ] = useState('')
    const [paid_amount, setPaidAmount ] = useState(0)
    const [payment_date, setPaymentDate ] = useState('')
    const [discount_received, setDiscountReceived] = useState(0)
    const [products, setProducts] = useState([]);
    
    const totals = useMemo(() => {
        return products.reduce(
            (acc, product) => {
                const qty = Number(product.quantity_received);
                const mrp = Number(product.mrp);
                const purchaseCost = Number(product.purchase_cost);
                const gst = Number(product.gst_percentage);
                const otherExpenses = Number(product.other_expenses);

                const totalMrp = mrp * qty;
                const purchaseDiscount = (mrp - purchaseCost) * qty;
                const subTotal = purchaseCost * qty;
                const gstAmount = (subTotal * gst) / 100;
                const otherExpenseAmount = otherExpenses * qty;
                const grandTotal = subTotal + gstAmount + otherExpenseAmount;

                acc.totalMrp += totalMrp;
                acc.totalPurchaseDiscount += purchaseDiscount;
                acc.subTotal += subTotal;
                acc.totalGstAmount += gstAmount;
                acc.totalOtherExpenses += otherExpenseAmount;
                acc.grandTotal += grandTotal;

                return acc;
            },
            {
                totalMrp: 0,
                totalPurchaseDiscount: 0,
                subTotal: 0,
                totalGstAmount: 0,
                totalOtherExpenses: 0,
                grandTotal: 0,
            }
        );
    }, [products]);

    const [supplier, setSupplier] = useState([])
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
        purchase_cost: 0,                       // purchase cost of the product w/o gst and other exp
        gst_percentage: 0,
        other_expenses: 0,
        selling_price: 0,
    })

    // Supplier Search
    const [searchSupplier, setSearchSupplier] = useState("");
    const [searchSupplierResults, setSearchSupplierResults] = useState([]);
    const [showSupplierResults, setShowSupplierResults] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchSuppliers(searchSupplier);
        }, 400); // Wait 400ms after user stops typing
        return () => clearTimeout(timer);
    }, [searchSupplier]);

    const searchSuppliers = async (query) => {
        if (!query.trim()) {
            setSupplierId('')
            setSupplier([])
            setSearchSupplierResults([]);
            setShowSupplierResults(false);
            return;
        }
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/create-purchase/fetch-supplier/`, { params: {query}});
            console.log(data)
            setSearchSupplierResults(data.data);
            setShowSupplierResults(true);
        } catch (err) { console.log(err);}
    };

    const selectSupplier = (supplier) => {
        setSearchSupplier("")
        setSearchSupplierResults([])
        setShowSupplierResults(false)

        setSupplier(supplier)
        setSearchSupplier(supplier.supplier_name)
        setSupplierId(supplier._id)
    };

    // product search
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

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
            manufacture_date: batch.manufacture_date ? format(batch.manufacture_date, "yyyy-MM-dd") :"",
            expiry_date: batch.expiry_date ? format(batch.expiry_date , "yyyy-MM-dd") : "",
            best_before: batch.best_before ?? 0,
            mrp: batch.mrp ?? 0,
            purchase_cost: batch.purchase_cost ?? 0,
            gst_percentage: batch.gst_percentage ?? 0,
            other_expenses: batch.other_expenses ?? 0,
            selling_price: batch.selling_price ?? 0,
        })
    };

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

        resetDraft()
    }

    const removeRow = (product) => {

        const {product_id, product_name, product_barcode, batch_no, free_received, quantity_received, size, manufacture_date, expiry_date, best_before, mrp, purchase_cost, gst_percentage, other_expenses, selling_price} = product

        setProducts(products.filter((item) => item.product_id !== product_id));
    };

    const lineTotal = (product)=>{
        const lineAmount = Number(product.quantity_received) * Number(product.purchase_cost)
        const gstValue = Number(lineAmount) * Number(product.gst_percentage) / 100
        const lineTotalAmount = (Number(lineAmount) + Number(gstValue) + (Number(product.other_expenses) * product.quantity_received))

        return Number(lineTotalAmount)
    }
   
    const unitPerCost = (product)=>{
        const gstValue = Number(product.purchase_cost) * Number(product.gst_percentage) / 100
        const perProductCost = (Number(product.purchase_cost) + Number(gstValue) + Number(product.other_expenses))
        return Number(perProductCost).toFixed(2)
    }

    const handleDraftChange = (e) => {
        const { name, value } = e.target;
        setDraftProduct((prev) => ( { ...prev, [name]: value, }))
    };

    const editProduct = (product)=>{

        const {product_id, product_name, product_barcode, batch_no, free_received, quantity_received, size, manufacture_date, expiry_date, best_before, mrp, purchase_cost, gst_percentage, other_expenses, selling_price} = product

        setDraftProduct(product)
        setProducts(products.filter((item) => item.product_id !== product.product_id));

    }

    const handleSubmit = async(e)=>{
        const data = { supplier_id, supplier_invoice_no, invoice_date, delivery_date, products, payment_method, discount_received, paid_amount, payment_date }
        console.log({data})
        if(!supplier_id || !supplier_invoice_no || !invoice_date || !delivery_date || !products.length){
            toast.warn("Fill the required details ")
            return;
        }
        try {
            setLoading(true) 
           const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/create-purchase` , data)
            console.log("addPurchaseEntry response",res.data)
            toast.success(res.data?.message)
            navigate('/admin/purchase')
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("error in addPurchaseEntry :" , error)
        } finally { setLoading(false) }
    }

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}

    return (
        <div className="flex min-h-screen">
            <AdminSideBar />

            <div className="flex-1 p-6 font-inter">

                <h1 className="text-3xl font-bold text-gray-700">Purchase Entry</h1>
                <p className="text-gray-500 font-medium mt-1">Create a new purchase invoice</p>

                <div className="grid grid-cols-11 gap-6 mt-5">

                    <AdminPurchaseEntrySupplierDetailsComponent supplier={supplier} searchSupplier={searchSupplier} setSearchSupplier={setSearchSupplier} searchSupplierResults={searchSupplierResults} showSupplierResults={showSupplierResults} selectSupplier={selectSupplier} />

                    {/* Invoice & Payment Details */}
                    <div className="bg-white col-span-6 space-y-4 gap-x-4 grid grid-cols-10 rounded-xl shadow-md border p-6">

                        <h2 className="font-semibold text-lg col-span-10 text-sky-600 ">Invoice & Payment Details</h2>

                        <div className="col-span-4">
                            <label className="font-medium text-gray-600">Invoice No.</label>
                            <input className="w-full mt-2 border text-gray-800 font-medium rounded-lg p-3" value={supplier_invoice_no} onChange={(e)=>setSupplierInvoiceNo(e.target.value)} />
                        </div>

                        <div className="col-span-3">
                            <label className="font-medium text-gray-600">Invoice Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={invoice_date} onChange={(e)=>setInvoiceDate(e.target.value)} />
                        </div>
                        
                        <div className="col-span-3">
                            <label className="font-medium text-gray-600">Delivery Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={delivery_date} onChange={(e)=>setDeliveryDate(e.target.value)} />
                        </div>

                        <div className="col-span-3">
                            <label className="font-medium text-gray-700">Payment Method</label>
                            <select className="w-full mt-2 border font-medium rounded-lg p-[16px]" value={payment_method} onChange={(e)=>setPaymentMethod(e.target.value)}>
                                <option value="" disabled />
                                <option value={'Cash'}>Cash</option>
                                <option value={"UPI"}>UPI</option>
                                <option value={"Card"}>Card</option>
                                <option value={"Bank Transfer"}>Bank Transfer</option>
                            </select>
                        </div>
                       
                        <div className="col-span-3">
                            <label className="font-medium text-gray-600">Payment Date</label>
                            <input type="date" className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={payment_date} onChange={(e)=>setPaymentDate(e.target.value)} />
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Paid Amount</label>
                            <input type="number" min={0} className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={paid_amount} onChange={(e)=> e.target.value >= 0 ? setPaidAmount(e.target.value) : 0}/>
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium text-gray-600">Disc. Rec.</label>
                            <input type="number" min={0} className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={discount_received} onChange={(e)=> e.target.value >= 0 ? setDiscountReceived(e.target.value) : 0} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mt-7">
                    {/* Add Products */}
                    <div className="bg-white col-span-9 rounded-xl shadow-md border p-6">
                        
                        <h2 className="font-semibold text-lg text-sky-600 mb-4">Add Products</h2>
                        <div className="relative">
                            <FiSearch className="absolute top-4 left-4 text-gray-400"/>
                            <input className=" w-full border rounded-xl pl-12 p-3"  placeholder="Search Product by Name / Barcode" value={search} onChange={(e) => setSearch(e.target.value)}/>
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
                        
                        <div className='grid grid-cols-10 gap-x-5 gap-y-3 mt-5 text-gray-800 font-medium '>
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
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="free_received" value={draftProduct.free_received} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0 }/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">Qty Received</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="quantity_received" value={draftProduct.quantity_received} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
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
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="best_before" value={draftProduct.best_before} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">MRP</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="mrp" value={draftProduct.mrp} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">Purchase Cost</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="purchase_cost" value={draftProduct.purchase_cost} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">GST %</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="gst_percentage" value={draftProduct.gst_percentage} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">Other Expenses</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="other_expenses" value={draftProduct.other_expenses} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                            <div className="col-span-2">
                                <label className="text-gray-600">Selling Price</label>
                                <input type="number" className="w-full mt-2 border rounded-lg p-3" name="selling_price" value={draftProduct.selling_price} onChange={(e)=> e.target.value >= 0 ? handleDraftChange(e) : 0}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-5 ">
                            <div className="text-gray-700 font-medium flex gap-4"><span>Total : ₹{lineTotal(draftProduct).toLocaleString()}</span><span>( ₹{unitPerCost(draftProduct)} )</span></div>
                            <div className=" flex gap-5">
                                <button onClick={()=>resetDraft()} className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600">Reset</button>
                                <button onClick={()=>addProduct()} className="flex items-center gap-2 bg-sky-500 text-white px-5 py-3 rounded-lg hover:bg-sky-600"><FiPlus size={20} /> Add Product</button>
                            </div>
                        </div>
                    </div>
                    {/* Product & Price Details */}
                    <div className="bg-white font-medium text-gray-500 text-[17px] col-span-3 rounded-xl shadow-md border p-6 pt-8">

                        <h2 className="font-semibold text-lg text-sky-600 mb-5">Product & Price Details</h2>

                        <div className="flex justify-between mb-3">
                            <span>MRP Amount</span>
                            <span className="text-slate-700 font-semibold">₹{totals.totalMrp.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Discount</span>
                            <span className="text-slate-700 font-semibold">- ₹{totals.totalPurchaseDiscount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Sub Total</span>
                            <span className="text-slate-700 font-semibold">₹{totals.subTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>GST</span>
                            <span className="text-slate-700 font-semibold">₹{totals.totalGstAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Other exp.</span>
                            <span className="text-slate-700 font-semibold">₹{totals.totalOtherExpenses.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Spl. Discount</span>
                            <span className="text-slate-700 font-semibold">- ₹{discount_received ? Number(discount_received).toLocaleString() : 0}</span>
                        </div>
                        <div className="flex justify-between text-xl border-t-[3px] border-dashed py-3 pb-4 ">
                            <span>Grand Total</span>
                            <span className="text-sky-600 font-bold">₹{(totals.grandTotal - discount_received).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Paid Amount</span>
                            <span className="text-emerald-600 font-semibold">₹{paid_amount ? Number(paid_amount).toLocaleString() : 0}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                            <span>Balance Amount</span>
                            <span className={`font-semibold text-orange-500 ${(totals.grandTotal - discount_received - paid_amount) === 0 && "text-slate-700"} `}>₹{(totals.grandTotal - discount_received - paid_amount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                {/* Product Table */}               
                <div className="h-[calc(100vh-40px)] border flex flex-col mt-6 rounded-xl shadow-md p-3">
                    <AdminPurchaseEntryProductTable products={products} editProduct={editProduct} removeRow={removeRow} lineTotal={lineTotal} unitPerCost={unitPerCost} />
                    
                    <div className="flex justify-end gap-5 p-5 border-t">
                        <button onClick={() => toast.warn("not creted yet")} className="bg-green-500 hover:bg-green-600 text-white p-3 px-5 rounded-xl">Save Draft</button>
                        <button onClick={()=>handleSubmit()} className="bg-sky-500 hover:bg-sky-600 text-white p-3 px-5 rounded-xl">Submit</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PurchaseEntryPage;