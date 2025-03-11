import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, getCart } from '../../../slices/clientSlice/CartSlice.js'

const ProductCard = ({product}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(getCart)

    let inCart = false
    cart?.map(cartProduct => {
        if(cartProduct.product_id._id == product._id){
            inCart = true
        }
    })

    const addCart = ()=>{
        const data = {product_barcode : product.product_barcode, quantity : 1}
        dispatch(addToCart(data))
    }

    const discountPercentage = Math.floor((product.product_stock[0]?.mrp / product.product_stock[0]?.price)*100 - 100)
  return (
    <div className="col-span-1 rounded-lg border border-gray-100 bg-white shadow-md">
        <Link to={`/product/${product._id}`} className="relative mx-0.5 mt-1 flex max-h-60 overflow-hidden justify-center rounded-lg">
            <img className="object-cover" 
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                alt="product image" />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {discountPercentage > 2 && `${discountPercentage}%`}
            </span>
        </Link>
        <div className="mt-4 px-5 pb-5">
            <h5 className="text-md tracking-tight text-slate-900 line-clamp-2">{product.product_name}</h5>
            <div className="mt-2 mb-5 flex items-center gap-4">
                <span className="text-xl font-bold font-[arial] text-slate-900">{product.product_stock[0]?.price} </span> 
                <span className="text-sm text-slate-900 line-through">{product.product_stock[0]?.mrp}</span>
            </div>
            {!inCart ?
                <button onClick={()=>addCart()} className="w-full hero rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                    Add to cart
                </button>
            :
                <button onClick={()=>navigate('/cart')} className="w-full hero rounded-md bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900">
                    Go to cart
                </button>
            }
        </div>
    </div>
  )
}

export default ProductCard