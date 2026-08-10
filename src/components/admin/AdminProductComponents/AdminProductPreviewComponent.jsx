import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import ErrorComponent from '../../ErrorComponent'
import PageNotFoundPage from '../../../pages/PageNotFoundPage'
import axios from 'axios'
import LoadingComponent from '../../LoadingComponent'
import { format } from 'date-fns'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { IoIosStar } from 'react-icons/io'
import { FiPackage } from 'react-icons/fi'
import { Link} from 'react-router-dom'

const AdminProductPreviewComponent = ({product_id}) => {

    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [product , setProduct ]  = useState(null)

    const [selectedBatch , setSelectedBatch] = useState(null)
    
    useEffect(() => {
        if (!product_id) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/product_id/${product_id}`)
                setProduct(res.data.data);
                console.log("fetchProduct response:", res.data);
            } catch (error) {
                console.error("fetchProduct:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [product_id]);

    const findInventoryValue = (stock)=>{
        const inventoryValue = stock.reduce((total, batch) => {
            return total + (batch.stock * batch.unit_purchase_cost); 
        }, 0);
        return Math.floor(inventoryValue)?.toLocaleString()
    } 

    const validDate = (date)=>{
        return format(new Date(date) , "dd-MM-yy ")
    }

    if(loading){return <LoadingComponent />}
    if(error || !product ){ return <ErrorComponent />}

    const inventory = product?.inventory

  return (
    <div className="p-2 font-inter text-lg font-medium ">
        <div className='text-xl font-semibold'>Product Preview</div>
        <div className="flex relative justify-center mt-5 rounded-3xl py-5 flex-col items-center bg-gray-50">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ product.out_of_stock ? "bg-red-500 " : product?.status == "active" ? "bg-sky-500" : product?.status == "inactive" && "bg-gray-700"}`} title='Status' />
            <img src={`${import.meta.env.VITE_IMAGE_URL}${product?.product_photo}`} alt={product?.product_name} className="w-36 h-36 text-center bg-white rounded-full p-2 object-cover"/>
            <div className='flex gap-1.5 mt-1' title='Ratings'>
                {Array.from({ length: product?.review?.product_average_ratings || 3  }).map((_, index) => (
                    <IoIosStar key={index} className="h-6 w-6 text-amber-500"/>
                ))}
            </div>
            <div className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{product?.product_name}</div>
            <div className='text-lg font-semibold text-gray-800 mt-2'>#{product?.product_barcode}</div>
        </div>
        <div className='flex mt-4 gap-2 w-full justify-center text-white text-center'>
            <span className="p-2 rounded-xl bg-indigo-500 cursor-default line-clamp-1" title='Group'>{product.group?.group_name}</span>
            <span className="p-2 rounded-xl bg-sky-500  cursor-default line-clamp-1" title='Category'>{product.category?.category_name}</span>
            <span className="p-2 rounded-xl bg-green-500 cursor-default line-clamp-1" title='Brand'>{product.brand?.brand_name}</span>
        </div>
        <div className="mt-4">
            <h3 className="text-cyan-800 uppercase">Stock Overview</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-base text-green-600">Total Stock</p>
                    <h2 className="text-2xl font-bold text-green-700 mt-2">{product.inventory?.product_total_stock} pcs</h2>
                </div>
                <div className="rounded-xl bg-indigo-50 p-4">
                    <p className="text-base  text-indigo-600">Inventory value</p>
                    <h2 className="text-2xl font-bold text-indigo-700 mt-2">₹{findInventoryValue(product?.inventory?.product_stock)}</h2>
                </div>
            </div>
        </div>
        <div className='flex justify-between mt-8'>
            <div className='uppercase text-cyan-800'>Inventory</div>
            <div className='items-center flex gap-1'>
                <div className={`w-5 h-5 rounded-full ${ product?.inventory?.product_total_stock == 0 ? "bg-red-500" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "bg-amber-400" : "bg-green-500" } `} />
                <div className={`${ product?.inventory?.product_total_stock == 0 ? "text-red-500" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "text-amber-500" : "text-green-500" } `}>
                    {product?.inventory?.product_total_stock == 0 ? "Out of stock" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "Low in stock" : "In stock"}
                </div>
            </div>
        </div>
        <div className='grid grid-cols-3 text-center'>
            <div className='col-span-3 grid py-2 my-2 text-gray-500 shadow-sm rounded-xl grid-cols-3'>
                <div>Batch No</div>
                <div>Stock</div>
                <div>Price</div>
            </div>
            {inventory?.product_stock?.map((product_stock, index) => (
                <div key={index} onClick={()=>setSelectedBatch(selectedBatch == product_stock._id ? null : product_stock._id)} className={`col-span-3 my-1 py-2 grid grid-cols-3 rounded-xl cursor-pointer ${selectedBatch === product_stock._id && "shadow bg-gray-50"} ${index %2 == 0 && "bg-gray-50"}`}>
                    {selectedBatch != product_stock._id && <div className='col-span-1 cursor-pointer line-clamp-1'>{product_stock.batch_no || "-" }</div> }
                    {selectedBatch != product_stock._id && <div className='col-span-1 cursor-pointer line-clamp-1'>{product_stock.stock || "-" }</div> }
                    {selectedBatch != product_stock._id && <div className='col-span-1 cursor-pointer line-clamp-1 flex items-center justify-center'><FaIndianRupeeSign size={17} />{product_stock.selling_price || "-" }</div> }
                    {selectedBatch === product_stock._id &&
                        <div className='col-span-3 gap-y-5 p-5 grid grid-cols-3'>
                            <div className='col-span-1'>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.batch_no}</div>
                                <div className=''>Batch No</div>
                            </div>
                            <div className='col-span-1 '>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.stock}</div>
                                <div className=' mt-0.5'>Stock</div>
                            </div>
                            <div className='col-span-1'>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.size}{product.product_UOM}</div>
                                <div className=' mt-0.5'>Size</div>
                            </div>
                            <div className='col-span-1' title="Best Before">
                                <div className='line-clamp-1 text-gray-700'>{product_stock.best_before} days</div>
                                <div className=' mt-0.5'>BB</div>
                            </div>
                            <div className='col-span-1' title='Expiry Date'>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.expiry_date ? validDate(product_stock.expiry_date) : "---"}</div>
                                <div className=' mt-0.5'>EXD</div>
                            </div>
                            <div className='col-span-1' title='Manufacture Date'>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.manufacture_date ? validDate(product_stock.manufacture_date) : "---"}</div>
                                <div className=' mt-0.5'>MFD</div>
                            </div>
                            <div className='col-span-1'>
                                <div className='line-clamp-1 text-gray-700'>{product_stock.gst_percentage}%</div>
                                <div className=' mt-0.5'>GST</div>
                            </div>
                            <div className='col-span-1'>
                                <div className='line-clamp-1 text-gray-700 flex items-center justify-center'><FaIndianRupeeSign size={17}/>{product_stock.mrp}</div>
                                <div className=' mt-0.5'>MRP</div>
                            </div>
                            <div className='col-span-1' title='Selling Price'>
                                <div className='line-clamp-1 text-gray-700 flex items-center justify-center'><FaIndianRupeeSign size={17}/>{product_stock.selling_price}</div>
                                <div className=' mt-0.5'>SP</div>
                            </div>
                            <div className='col-span-1' title='Purchase Cost'>
                                <div className='line-clamp-1 text-gray-700 flex items-center justify-center'><FaIndianRupeeSign size={17}/>{product_stock.purchase_cost}</div>
                                <div className=' mt-0.5'>PC</div>
                            </div>
                            <div className='col-span-1' title='Other Expences'>
                                <div className='line-clamp-1 text-gray-700 flex items-center justify-center'><FaIndianRupeeSign size={17}/>{product_stock.other_expenses || 0}</div>
                                <div className=' mt-0.5'>OE</div>
                            </div>
                            <div className='col-span-1' title='Unit Purchase Cost'>
                                <div className='line-clamp-1 text-gray-700 flex items-center justify-center'><FaIndianRupeeSign size={17}/>{product_stock.unit_purchase_cost}</div>
                                <div className=' mt-0.5'>TPC</div>
                            </div>
                            <Link to={`/admin/purchase/purchase_id/${product_stock.purchase_id}`} className='col-span-3 font-semibold mt-0.5  underline text-sky-500 cursor-pointer'>Purchase Details</Link>
                        </div>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdminProductPreviewComponent