import { format } from 'date-fns'

const AdminOrderProductCard = ({product}) => {

    const date = (date)=>{
        const dat = format(new Date(date) , "dd-MM-yyyy")
        return dat
    }

  return (
    <div className="rounded-lg shadow-sm h-48 border w-full bg-white ">
        <div className="flex">
            <div className="h-40 w-36 min-w-36">
                <img className="rounded-t-lg h-full w-full object-contain" alt={product?.product_name} />
                <div className='h-7 rounded p-[1px] font-[arial] text-center'>
                    <span className="rounded-md px-1.5 bg-gray-600 text-white font-mono">{product?.no_of_product}</span>product
                </div>
            </div>
            <div className="px-1 py-2 w-full flex-col mt-2 md:space-y-0.5">
                <p className="px-1 font-[arial] text-gray-800 line-clamp-2 md:line-clamp-1 md:text-[15px] w-full">{product?.product_name}</p>
                <p className="h-5 px-1 text-gray-600 text-[13px]">ID : {product?.product_id}</p>
                <p className='p-1 font-[arial]'>
                    <span className='font-mono text-gray-700'>MRP: 
                        <span className='font-[arial] text-sky-600'>&#x20B9;{product?.product_mrp} </span>
                    </span>
                    <span className='font-mono text-gray-700'>PRICE: 
                        <span className='font-[arial] text-sky-600'>&#x20B9;{product?.product_price}</span>
                    </span>
                </p>
                <p className='p-1 space-x- font-[arial] flex flex-col md:block'>
                    <span className='text-sm text-gray-700'>MFD: 
                        <span className='text-base font-[arial] text-sky-600'> {product && date(product.product_manufacture_date)}</span> ,
                    </span>
                    <span className='text-sm text-gray-700'>EXD: 
                        <span className='text-base font-[arial] text-sky-600'> {product && date(product.product_expire_date)}</span> 
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default AdminOrderProductCard