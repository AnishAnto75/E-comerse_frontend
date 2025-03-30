import { format } from 'date-fns'

const AdminOrderProductCard = ({product}) => {

    const date = (date)=>{
        const dat = format(new Date(date) , "dd-MM-yyyy")
        return dat
    }

  return (
    <div className="rounded-lg shadow-sm w-60 border bg-white ">
        <div className="h-40 w-36 min-w-36 font-[arial]">
            <img className="rounded-t-lg h-full w-full object-contain text-xs" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt={product?.product_name} />
            <div className='h-7 rounded p-[1px] text-center'>
                <span className="rounded-md px-1.5 bg-gray-600 text-white mr-2">{product?.no_of_product}</span>product
            </div>
        </div>
        <div className="px-1 py-2 w-full flex-col mt-2 md:space-y-0.5">
            <p className="px-1 text-sm text-gray-800 line-clamp-2 w-full mb-2">{product?.product_name}</p>
            <p className="h-5 px-1 text-xs mb-3 ">ID : {product?.product_barcode}</p>
            <p className='p-1 text-sm'>
                <span className='text-gray-700'>Mrp:  
                    <span className='text-sky-600 px-1'>{product?.product_mrp} </span>
                </span>
                <span className='text-gray-700'>Price: 
                    <span className='text-sky-600 px-1'>{product?.product_price}</span>
                </span>
            </p>
            <p className='p-1 flex flex-wrap gap-x-5 text-sm'>
                <span className='text-gray-700'>Mfd: 
                    <span className='text-sky-600'> {product && date(product.product_manufacture_date)}</span>
                </span>
                <span className='text-gray-700'>Exd: 
                    <span className='text-sky-600'> {product && date(product.product_expire_date)}</span> 
                </span>
            </p>
        </div>
    </div>
  )
}

export default AdminOrderProductCard