import React from 'react'

const CartProductCard = (product , index) => {
  return (
    <tr key={product.product_id._id} className='text-center'>
        <th>{index+1}</th>
        <td>{product.product_id._id}</td>
        <td>{product.product_id.product_name}</td>
        <td>{product.product_id.product_mrp}</td>
        <td>{product.product_id.product_selling_price}</td>
        <td >
            <div className='border flex max-w-28 '>
                <button onClick={()=>minusToCart(product)}
                    className="hero bg-slate-900 max-w-8 px-2 p-1 text-white hover:bg-gray-700">
                -
                </button>
                <input 
                    type="text" 
                    placeholder={product.quantity} 
                    className='p-1  w-full text-center placeholder:text-center placeholder:text-slate-950' />             
                <button onClick={()=>addCart(product)}
                    className="hero bg-slate-900 max-w-8 px-2 p-1 text-white hover:bg-gray-700">
                +
                </button>
            </div>
        </td>
        <td>
            <button 
                className="w-full hero rounded-md bg-red-500 text-sm font-medium text-white hover:bg-gray-700">
                    Delete
            </button>              
        </td>
    </tr>          
    )
}

export default CartProductCard