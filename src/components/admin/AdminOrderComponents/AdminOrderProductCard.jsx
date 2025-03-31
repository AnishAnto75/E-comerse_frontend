import { Avatar } from '@material-tailwind/react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const AdminOrderProductCard = ({products}) => {

    const navigate = useNavigate()

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        const dat = format(new Date(date) , "dd-MM-yyyy")
        return dat
    }

  return (
    <table className="w-full table-auto mb-10">
        <thead>
            <tr className='border-y text-gray-600 text-sm border-blue-gray-100 bg-blue-gray-50/35 text-center tracking-wider  '>
                <th className="p-4 font-normal pl-9 text-start"></th>
                <th className="p-4 font-normal">Batch No</th>
                <th className="p-4 font-normal">Mfd/Exp</th>
                <th className="p-4 font-normal">Mrp/Price</th>
                <th className="p-4 font-normal">NOP</th>
            </tr>
        </thead>
        <tbody className=''>
            {products?.map(({ no_of_product, product_barcode, product_batch_no, product_expire_date, product_id, product_manufacture_date, product_mrp, product_name, product_price  }, index) => {
                const classes = index === products?.length - 1 ? "border-b border-blue-gray-100" : "border-b border-blue-gray-50";
                return (
                <tr key={index} className={`hover:bg-gray-50 text-center text-sm text-blue-gray-600 ${classes}`} onClick={()=>navigate(`/admin/products/${product_barcode}`)}>
                    <td className='p-4'>
                        <div className="flex items-center gap-3">
                            <Avatar src={product_id?.product_photos ? product_id?.product_photos : '/3-08.webp'} alt={product_name} size="sm" />
                            <div className="flex flex-col text-sm text-start text-blue-gray-700 ">
                                <div>{product_name}</div>
                                <div className="text-blue-gray-500">{product_barcode}</div>
                            </div>
                        </div>
                    </td>
                    <td className='p-4'>{product_batch_no}</td>
                    <td className='tracking-wider p-4'>
                        <div>{date(product_manufacture_date) }</div>
                        <div>{date(product_expire_date)}</div>
                    </td>
                    <td className='p-4'>{product_mrp} / {product_price}</td>
                    <td className="p-4 ">{no_of_product}</td>
                </tr>
                );
            })}
        </tbody>
    </table>       
  )
}

export default AdminOrderProductCard