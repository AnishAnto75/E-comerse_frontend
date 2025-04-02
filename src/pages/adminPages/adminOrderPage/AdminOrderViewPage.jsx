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
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_id/${id}`)
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
    <div className='w-full md:max-w-[calc(100%-208px)] min-h-screen flex'>
        <div className='w-full p-2'>
            <div className='text-sm tracking-wider font-roboto border border-gray-400 w-40 p-1 text-center rounded text-gray-700 '>{order?.order_id}</div>

            <div className='h-36 p-2 mt-3 flex gap-1 overflow-scroll overflow-x-auto border '>
                {order?.product_details?.map((product , index)=>(
                    <img key={index} src={"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"} alt={product.product_name} className=' object-contain  h-full w-32'/>
                ))}
            </div>

            <div className='mt-5 p-2 bg-gray-50 '>
                <AdminOrderStatusComponent order={order} />
            </div>

            <div className='mt-3 '>
                <AdminOrderProductCard order={order} />
            </div>
            <div className='mt-5 mb-10 flex gap-3 '>
                <AdminOrderAmountComponent order={order} />
                <AdminOrderDeliveryAddressComponent delivery_address={order?.delivery_address} />
                <AdminOrderUserComponent user={order.user_id}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminOrderViewPage