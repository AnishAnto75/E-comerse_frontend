import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AdminOrderStatusComponent from '../../../components/admin/AdminOrderComponents/AdminOrderStatusComponent'
import AdminOrderAmountComponent from '../../../components/admin/AdminOrderComponents/AdminOrderAmountComponent'
import AdminOrderDeliveryAddressComponent from '../../../components/admin/AdminOrderComponents/AdminOrderDeliveryAddressComponent'
import AdminOrderProductCard from '../../../components/admin/AdminOrderComponents/AdminOrderProductCard'
import LoadingSpinner from '../../../components/LoadingSpinner'
import PageNotFoundPage from '../../PageNotFoundPage'
import ErrorComponent from '../../../components/ErrorComponent'
import AdminSideBar from '../../../components/admin/AdminSideBar'
import AdminOrderUserComponent from '../../../components/admin/AdminOrderComponents/AdminOrderUserComponent'

const AdminOrderViewPage = () => {

    const {id} = useParams()
    const handleRef = useRef(true)

    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

    useEffect(()=>{
        const fetchOrder = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_id/${id}` , {withCredentials: true})
                setOrder(res.data.data)
                console.log("fetchOrder response : ",res.data)
            } catch (error) {
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
    if(error){ return <ErrorComponent/>}
    if(!order){return <PageNotFoundPage/>}

  return (
    <div className='flex'>
    <AdminSideBar/>
    <div className='w-full font-inter md:max-w-[calc(100%-245px)] p-5 bg-slate-50'>
        <div className='text-xl font-semibold text-gray-600 mt-1 tracking-wide'>#{order.order_id}</div>

        <div className='bg-white p-8 mt-5 rounded-xl w-full'>
            <div className='flex overflow-scroll overflow-x-auto border bg-white rounded '>
                {order.items?.map((item , index)=>(
                    <img key={index} src={`${import.meta.env.VITE_IMAGE_URL}${item.product_photo}`} alt={item.product_name} className=' object-contain h-36 max-h-36 w-36 min-w-36 p-2 border-r'/>
                ))}
            </div>
        </div>

        <div className='mt-5 bg-white '>
            <AdminOrderStatusComponent order={order} />
        </div>

        <div className='mt-3 bg-white'>
            <AdminOrderProductCard order={order} />
        </div>
        <div className='mt-5 mb-10 flex gap-3 '>
            <AdminOrderAmountComponent order={order} />
            <AdminOrderDeliveryAddressComponent delivery_address={order?.delivery_address} />
            <AdminOrderUserComponent user={order.user_id}/>
        </div>
    </div>
    </div>
  )
}

export default AdminOrderViewPage