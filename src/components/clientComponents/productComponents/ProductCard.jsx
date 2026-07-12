import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner.jsx'
import { TbPercentage } from 'react-icons/tb'
import { MdLocalOffer } from 'react-icons/md'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify'

const ProductCard = ({product}) => {

    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()
    
    let inCart = false

    const addCart = ()=>{
        return
        toast.warn("not ready yet")
    }

    const discountPercentage = Math.floor(((product?.mrp - product?.selling_price )/ product?.mrp) * 100 )

    if(loading){return <LoadingSpinner />}

  return (
    <div className="col-span-1 rounded-lg font-inter shadow hover:shadow-lg transition-transform duration-300 hover:scale-[1.01] bg-white">
        <Link to={`/product/${product.product_barcode}`} className="relative px-0.5 mt-0.5 flex max-h-60 overflow-hidden justify-center rounded-lg">
            <div className="w-full h-52 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo.url}`} alt={product.product_name} className="w-full h-full object-contain p-1 transition-transform duration-300 hover:scale-105" />
            </div>
            { discountPercentage > 3 && 
                <div className="absolute top-4 left-0 bg-red-500 text-white px-3 py-1 rounded-r-full flex items-center gap-1 text-sm font-bold shadow-lg">
                    <MdLocalOffer size={15}/> {discountPercentage}% OFF
                </div>
            }
        </Link>
        <div className="pt-2 px-5">
            <h5 className="text-lg tracking-normal font-medium text-gray-800 line-clamp-2">{product.product_name}</h5>
            <div className='flex pt-2'>
                <div className='w-full'>
                    <div className="mt-2 flex items-center gap-3">
                        <span className="text-xl font-semibold text-slate-700 flex items-center"><FaIndianRupeeSign size={19} />{product.selling_price} </span> 
                        <span className="text-lg text-gray-600 font-medium line-through flex items-center"><FaIndianRupeeSign size={17} />{product?.mrp}</span>
                    </div>
                    <h5 className="mb-4 mt-1 tracking-normal text-gray-500 text-base font-medium">Size : {product?.size}{product.product_UOM}</h5>
                </div>
                <div className='self-end mb-5'>
                    <button onClick={()=>addCart()} className=" p-2 w-full rounded-full bg-sky-500 text-base font-medium text-white hover:bg-sky-600"><BiPlus size={30}/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard