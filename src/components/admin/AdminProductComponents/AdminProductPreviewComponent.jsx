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
        return inventoryValue?.toLocaleString()
    } 

    // if(loading){return <LoadingComponent/>}
    if(error || !product ){ return <ErrorComponent />}

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
        <div className='flex justify-between mt-8 text-lg font-medium'>
            <div className='uppercase text-cyan-800'>Inventory</div>
            <div className='items-center flex gap-1'>
                <div className={`w-5 h-5 rounded-full ${ product?.inventory?.product_total_stock == 0 ? "bg-red-500" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "bg-amber-400" : "bg-green-500" } `} />
                <div className={`${ product?.inventory?.product_total_stock == 0 ? "text-red-500" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "text-amber-500" : "text-green-500" } `}>
                    {product?.inventory?.product_total_stock == 0 ? "Out of stock" : product?.inventory?.product_total_stock <= product?.inventory?.product_low_in_stock ? "Low in stock" : "In stock"}
                </div>
            </div>
        </div>
        <table className="w-full mt-4">
            <thead className="bg-white shadow-sm rounded-lg ">
                <tr className="text-sky-600 w-full font-normal">
                    <th className="py-3 font-medium">Batch</th>
                    <th className="py-3 font-medium">Stock</th>
                    <th className="py-3 font-medium">MRP</th>
                    <th className="py-3 font-medium">Price</th>
                    <th className="py-3 font-medium">Pur.</th>
                </tr>
            </thead>
            <tbody>
            {product.inventory?.product_stock?.map((product_stock, index) =>{
                return(
                    <tr key={index} className={`text-center text-gray-600 text-base ${index % 2  && "bg-gray-50" }`}>
                        <td className='py-2 '>{product_stock?.batch_no ? product_stock?.batch_no : "-" }</td>
                        <td className='py-2 '>{product_stock?.stock}</td>
                        <td className='py-2 '>
                            <div className='flex items-center justify-center'><FaIndianRupeeSign />{product_stock?.mrp}</div>
                        </td>
                        <td className='py-2'>
                            <div className='flex items-center justify-center'><FaIndianRupeeSign />{product_stock?.selling_price}</div>
                        </td>
                        <td className='py-2 '>
                            <div className='flex items-center justify-center'><FaIndianRupeeSign />{product_stock?.unit_purchase_cost}</div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <div className='mt-2 border-y-2 py-3 text-gray-500 px-4'>
            <div>Total Stock : {product.inventory?.product_total_stock}</div>
            <div className='flex items-center'>Inventory Value : <FaIndianRupeeSign />{findInventoryValue(product?.inventory?.product_stock)}</div>
        </div>

    </div>
  )
}

export default AdminProductPreviewComponent