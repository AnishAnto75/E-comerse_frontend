import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AdminOrderStatusComponent from '../../../components/admin/AdminOrderComponents/AdminOrderStatusComponent'
import AdminOrderAmountComponent from '../../../components/admin/AdminOrderComponents/AdminOrderAmountComponent'
import AdminOrderDeliveryAddressComponent from '../../../components/admin/AdminOrderComponents/AdminOrderDeliveryAddressComponent'
import AdminOrderProductCard from '../../../components/admin/AdminOrderComponents/AdminOrderProductCard'
import LoadingSpinner from '../../../components/LoadingSpinner'

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
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/${id}`)
                setOrder(res.data.data)
                console.log("fetchOrder response : ",res.data)
            } catch (error) {
                if(error.response.status == 404){ navigate('/404')}
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
    <div className='p-2 w-full bg-gray-100 min-h-screen'>

        <div className='text-gray-800 mb-3 font-[arial]'>Order Id : <span className='tracking-wider text-gray-600'>{order?.order_id}</span></div>

        <div className='p-1 bg-white'>
            <div className='h-36 flex gap-2 overflow-auto '>
                {/* {order.product_details?.map(product => <OrderViewPagePhotos key={product._id} id={product.product_id} />)} */}
            </div>
            <span className='divider m-0'/>
            <div className='w-full px-1 pl-5 pt-1 pb-2 '>
                <span className='my-1 text-2xl'>&#8377;{order?.total_amount}</span>
            </div>
        </div>

        <div className='mt-5 p-2 bg-white'>
            <AdminOrderStatusComponent order={order} />
        </div>

        <div className='mt-3 p-2 bg-white '>  
            Payment method : <span className='text-sky-600 italic font-medium'>{order?.payment_method}</span>    
        </div>

        <div className='mt-3 p-2 space-y-2 bg-white'>      
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