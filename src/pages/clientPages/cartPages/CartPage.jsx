import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getAddToCartStatus, getCart, getCartDiscount, getCartNoOfProductsInCart, getCartTotalMrp, getCartTotalSellingPrice, removeFromCart} from '../../../slices/clientSlice/CartSlice'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'

const CartPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(getCart)
    const mrp = useSelector(getCartTotalMrp)
    const price = useSelector(getCartTotalSellingPrice)
    const discount = useSelector(getCartDiscount)
    const no = useSelector(getCartNoOfProductsInCart)

    const cartStatus = useSelector(getAddToCartStatus)

    const addCart = (product)=>{
        if(!product){return}
        const data = {product_barcode : product.product_id.product_barcode , quantity : product.quantity+1 }
        dispatch(addToCart(data))
    } 

    const minusToCart = (product)=>{
        if(!product){return}
        if(product.quantity == 1){ return }
        const data = {product_barcode : product.product_id.product_barcode , quantity : product.quantity-1 }
        dispatch(addToCart(data))
    }

    const removeProductFromCart = (product_barcode)=>{
        dispatch(removeFromCart({product_barcode}))
    }

    if(cartStatus == 'loading' ){return <LoadingSpinner />}
    if(!cart || !cart[0]){
        return(
            <div className='min-h-screen flex'> 
                <button className='btn btn-neutral m-3' onClick={()=>navigate('/')}>back</button>
                <div className='flex flex-col hero justify-center gap-5'>
                    <span className='block text-2xl font-[arial]'>No Product In Cart</span>
                    <button className='block btn btn-info text-white' onClick={()=>navigate('/product')}>Add Products</button>
                </div>
            </div>
        )
    }

  return (
    <div className='overflow-x-auto m-3'>
        <div className='text-3xl font-medium text-center mx-2 mb-5'>Cart</div>
        <table className='table table-zebra'>
            <thead>
                <tr className='text-center'>
                    <th>INDEX</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>MRP</th>
                    <th>PRICE</th>
                    <th>OPTIONS</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
            {cart?.map((product , index) => 
                <tr key={index} className='text-center'>
                    <th>{index+1}</th>
                    <td>{product?.product_id?.product_barcode}</td>
                    <td>{product?.product_id?.product_name}</td>
                    <td>{product?.product_id?.product_stock.mrp}</td>
                    <td>{product?.product_id?.product_stock.price}</td>
                    <td className='hero' >
                        <div className='border flex max-w-28 '>
                            <button onClick={()=>minusToCart(product)} className="hero bg-slate-900 max-w-8 px-2 p-1 text-white hover:bg-gray-700">-</button>
                            <input type="text" placeholder={product.quantity} className='p-1  w-full text-center placeholder:text-center placeholder:text-slate-950' />             
                            <button onClick={()=>addCart(product)} className="hero bg-slate-900 max-w-8 px-2 p-1 text-white hover:bg-gray-700">+</button>
                        </div>
                    </td>
                    <td>
                        <button onClick={()=> removeProductFromCart(product?.product_id?.product_barcode)} className="w-full hero rounded-md bg-red-500 text-sm font-medium text-white hover:bg-gray-700">
                            Delete
                        </button>              
                    </td>
                </tr>            
            )}  
            </tbody>
        </table>
        <div className='text-xl flex justify-between mx-10 my-5'>
            <p>Total Price : {mrp}</p>
            <p>Discount : {discount}</p>
            <p>Price : {price}</p>
            <p>No of Products : {no}</p>
        </div>
        <div className='hero'>
            <button onClick={()=>navigate('/checkout')} className='text-2xl text-white bg-slate-900 hero rounded-full p-2'>Checkout</button>
        </div>
    </div>
  )
}

export default CartPage