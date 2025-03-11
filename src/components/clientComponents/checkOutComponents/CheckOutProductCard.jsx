import React from 'react'

const CheckOutProductCard = ({product}) => {

    const mrp = product?.product_id?.product_stock?.mrp * product.quantity
    const price = product?.product_id?.product_stock?.price * product.quantity
    const percentage = Math.floor(((mrp - price)/mrp) * 100)
    console.log({product})

  return (
    <div className="rounded-lg shadow-md w-full flex">
        <div className="flex h-full">
            <div className="w-36 min-w-36">
                <img className="rounded-t-lg h-36 w-full object-contain "
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                    alt={product?.product_id?.product_name} />
                <div className="mt-1 mb-2">
                    <span className="justify-center flex">
                        <span className=" px-[6px] rounded-lg">{product?.quantity}</span><span>&nbsp;products</span>
                    </span> 
                </div>
            </div>
            <div className="px-2 pt-4 w-full h-full flex-col">
                <div className="h-5 font-medium font-[arial] text-gray-500 text-sm">{product?.product_id?.product_brand}</div>
                <div className="md:line-clamp-2 font-[arial] text-gray-700 ">{product?.product_id?.product_name}</div>
                <div className="text-[13px] font-medium text-gray-600  pt-1">{product?.product_id?.product_quantity}</div>
                <div className='p-1 space-x-2 mt-2 '>
                    <span className="line-through font-[arial] text-gray-600">&#x20B9;{mrp}</span>
                    <span className="text-lg font-[arial]">&#x20B9;{price}</span>
                    <span className="text-[15px] font-[arial] text-cyan-500 pl-1">{percentage}%off</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOutProductCard