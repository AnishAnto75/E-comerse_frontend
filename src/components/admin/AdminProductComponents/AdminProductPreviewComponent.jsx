import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import ErrorComponent from '../../ErrorComponent'
import PageNotFoundPage from '../../../pages/PageNotFoundPage'
import axios from 'axios'
import LoadingComponent from '../../LoadingComponent'
import { format } from 'date-fns'
import { Avatar } from '@material-tailwind/react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { IoIosStar } from 'react-icons/io'

const AdminProductPreviewComponent = ({product_id}) => {

    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [product , setProduct ]  = useState(null) 
    
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
            const unitCost = batch.purchase_cost + (batch.other_expences || 0);
            return total + (batch.stock * unitCost);
        }, 0);
        return inventoryValue
    } 

    if(loading){return <LoadingComponent/>}
    if(error){ return <div>Error</div>}
    if(!product){return <div>Error</div>}

  return (
    <div className="p-2 font-inter">
        <div className='text-xl font-semibold text-gray-800'>Product Preview</div>
        <div className="flex relative justify-center mt-5 rounded-3xl py-5 flex-col items-center bg-gray-100/70">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${product.status == "active" ? "bg-light-blue-500" : "bg-red-500"}`} title='Status' />
            <img src={product?.product_photos} alt={product?.product_name} className="w-36 h-36 text-center bg-white rounded-full p-2 object-cover"/>
            <div className='flex gap-1.5 mt-1' title='Ratings'>
                {Array.from({ length: product?.product_review_id?.product_average_ratings }).map((_, index) => (
                    <IoIosStar key={index} className="h-6 w-6 text-amber-600"/>
                ))}
            </div>
            <div className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{product?.product_name}</div>
            <div className='text-lg font-semibold text-gray-800 mt-2'>#{product?.product_barcode}</div>
        </div>
        <div className='flex mt-4 gap-2 w-full justify-center'>
            <span className="px-3 py-1 rounded-xl border bg-indigo-50 text-indigo-700 border-indigo-200 cursor-default" title='Group'>{product.product_group.group_name}</span>
            <span className="px-3 py-1 rounded-xl border bg-cyan-50 text-cyan-700 border-cyan-200 cursor-default" title='Category'>{product.product_category.category_name}</span>
            <span className="px-3 py-1 rounded-xl border bg-green-50 text-green-700 border-green-200 cursor-default" title='Brand'>{product.product_brand.Brand_name}</span>
        </div>
        <div className='flex justify-between mt-8 text-lg font-medium'>
            <div className='uppercase text-cyan-800'>Inventory</div>
            <div className='items-center flex gap-1'>
                <div className={`w-5 h-5 rounded-full ${ product?.product_inventory_id?.product_total_stock == 0 ? "bg-red-500" : product?.product_inventory_id?.product_total_stock <= product?.product_inventory_id?.product_low_in_stock ? "bg-amber-600" : "bg-green-500" } `} />
                <div className={`${ product?.product_inventory_id?.product_total_stock == 0 ? "text-red-500" : product?.product_inventory_id?.product_total_stock <= product?.product_inventory_id?.product_low_in_stock ? "text-amber-800" : "text-green-500" } `}>
                    {product?.product_inventory_id?.product_total_stock == 0 ? "Out of stock" : product?.product_inventory_id?.product_total_stock <= product?.product_inventory_id?.product_low_in_stock ? "Low in stock" : "In stock"}
                </div>
            </div>
        </div>
        <table className="w-full mt-4">
            <thead className="bg-white shadow-sm rounded-lg ">
                <tr className="text-cyan-700 w-full font-normal">
                    <th className="py-3 font-medium">Batch</th>
                    <th className="py-3 font-medium">Stock</th>
                    <th className="py-3 font-medium">MRP</th>
                    <th className="py-3 font-medium">Price</th>
                    <th className="py-3 font-medium">Pur.</th>
                </tr>
            </thead>
            <tbody>
            {product?.product_inventory_id?.product_stock?.map((product_stock, index) =>{
                return(
                    <tr key={index} className='text-center text-blue-gray-600 '>
                        <td className='pt-4 '>{product_stock?.batch_no ? product_stock?.batch_no : "-" }</td>
                        <td className='pt-4 '>{product_stock?.stock}</td>
                        <td className='pt-4 '>{product_stock?.mrp}</td>
                        <td className='pt-4 '>{product_stock?.price}</td>
                        <td className='pt-4 '>{product_stock?.purchase_cost + product_stock?.other_expences}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <div className='mt-4 flex justify-between text-xl border-y-2 py-3 font-semibold text-gray-700 px-4'>
            <div>Inventory value ({product.product_inventory_id?.product_total_stock})</div>
            <div>{findInventoryValue(product?.product_inventory_id?.product_stock)}</div>
        </div>

    </div>
  )
}

export default AdminProductPreviewComponent