import { Avatar } from '@material-tailwind/react'
import { format } from 'date-fns'
import { BiRupee } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const AdminOrderProductCard = ({order}) => {

    const navigate = useNavigate()

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return "---" }
        const dat = format(new Date(date) , "dd-MM-yyyy")
        return dat
    }

    const products = order?.items

  return (
    <div className='w-full mt-5 bg-white p-5 rounded-xl'>
        <table className="table-auto mt-5 w-full">
            <thead>
                <tr className='text-gray-700 tracking-wide '>
                    <th className="p-4 rounded-l-xl bg-slate-50"></th>
                    <th className="p-4 text-start bg-slate-50">ITEM</th>
                    <th className="p-4 bg-slate-50">BATCH NO</th>
                    <th className="p-4 bg-slate-50">SIZE</th>
                    <th className="p-4 bg-slate-50">MFD</th>
                    <th className="p-4 bg-slate-50">EXP</th>
                    <th className="p-4 bg-slate-50">MRP</th>
                    <th className="p-4 bg-slate-50">PRICE</th>
                    <th className="p-4 bg-slate-50">QUANTITY</th>
                    <th className="p-4 rounded-r-xl bg-slate-50">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {products?.map(( product, index) => (
                    <tr key={index} className={`hover:bg-gray-100 text-center border-b ${products.length == (index+1) && "border-b-0"}`} onClick={()=>navigate(`/admin/products/${product.product_barcode}`)}>
                        <td className='w-24 h-24 p-2 bg-white'>
                            <img key={index} src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo}`} alt={product.product_name} className=' object-contain h-full w-full'/>
                        </td>
                        <td className='p-4 text-start'>{product.product_name}</td>
                        <td className='p-4'>{product.batch_no || "---"}</td>
                        <td className='p-4'>{product.size}{product.product_UOM}</td>
                        <td className='p-4'>{date(product.manufacture_date)}</td>
                        <td className='p-4'>{date(product.expiry_date)}</td>
                        <td className='p-4'>&#8377;{product.mrp}</td>
                        <td className='p-4'>&#8377;{product.unit_price}</td>
                        <td className="p-4">{product.quantity}</td>
                        <td className="p-4">&#8377;{product.subtotal}</td>
                    </tr>
                ))}
            </tbody>
        </table>       
    </div>
  )
}

export default AdminOrderProductCard