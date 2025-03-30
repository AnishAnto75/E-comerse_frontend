import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AdminOrderStatusComponent from '../../../components/admin/AdminOrderComponents/AdminOrderStatusComponent'
import AdminOrderAmountComponent from '../../../components/admin/AdminOrderComponents/AdminOrderAmountComponent'
import AdminOrderDeliveryAddressComponent from '../../../components/admin/AdminOrderComponents/AdminOrderDeliveryAddressComponent'
import AdminOrderProductCard from '../../../components/admin/AdminOrderComponents/AdminOrderProductCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Chip } from '@material-tailwind/react'

const AdminOrderViewPage = () => {

    const {id} = useParams()
    const handleRef = useRef(true)
    const navigate = useNavigate()

    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

    useEffect(()=>{
        const fetchOrder = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_id/${id}`)
                setOrder(res.data.data)
                console.log("fetchOrder response : ",res.data)
            } catch (error) {
                // if(error.response.status == 404){ navigate('/404')}
                setError(true)
                console.error("error in fetchOrder function :",error)
            } finally { setLoading(false) }
        }

        if(handleRef.current){
            fetchOrder()
            handleRef.current = false
        }
    })

    if(loading){return <LoadingSpinner/>}
    if(error){ return <div>Error occured please refresh the page</div>}
    if(!order){return <div>No Order Details Found</div>}

  return (
    <div className='p-2 w-full min-h-screen'>
        <div className='text-sm tracking-wider font-roboto border border-gray-400 w-40 p-1 text-center rounded-full text-gray-700 '>{order?.order_id}</div>

        <div className='p-1 border-b mt-2'>
            <div className='h-36 flex gap-1 overflow-x-auto '>
                {order?.product_details?.map((product , index)=>(
                    <img key={index} src={"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"} alt={product.product_name} className=' object-contain py-1 h-full w-32'/>
                ))}
            </div>
            <div className='py-2 px-5 border-t'>&#x20B9;{order?.total_amount}</div>
        </div>

        <div className='mt-5 p-2 bg-gray-50 rounded-lg'>
            <AdminOrderStatusComponent order={order} />
        </div>

        <div className='mt-3 p-2 bg-gray-50 rounded-lg'>   
            <div className='px-2 py-3 text-gray-800'>Product Details</div>
            {order?.product_details?.map(product => <AdminOrderProductCard key={product._id} product={product}/>)}
        </div>

        <div className='my-3 grid grid-cols-1 md:grid-cols-2 gap-2'>
            <AdminOrderAmountComponent order={order} />
            <AdminOrderDeliveryAddressComponent delivery_address={order?.delivery_address} />
        </div>
    </div>
  )
}

export default AdminOrderViewPage