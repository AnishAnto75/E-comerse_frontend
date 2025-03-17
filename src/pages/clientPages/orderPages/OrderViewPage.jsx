import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import OrderStatusComponent from '../../../components/clientComponents/orderComponents/orderStatusComponent'
import OrderProductCard from '../../../components/clientComponents/orderComponents/orderProductCard'
import OrderAmountComponent from '../../../components/clientComponents/orderComponents/orderAmountComponent.jsx'
import OrderDeliveryAddressComponent from '../../../components/clientComponents/orderComponents/orderDeliveryAddressComponent.jsx'
import LoadingSpinner from '../../../components/LoadingSpinner.jsx'

const OrderViewPage = () => {

    const {id} = useParams()
    const handleRef = useRef(true)

    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

    useEffect(()=>{
        if(handleRef.current){
            fetchOrder()
            handleRef.current = false
        }
    })

    const fetchOrder = async()=>{
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}order/get-order/${id}`)
            setOrder(res.data.data)
            console.log("fetchOrder payload: ",res.data)
        } catch (error) {
            setError(true)
            console.error("error in fetchOrder function :",error)
        } finally {
            setLoading(false)
        }
    }

    if(loading){return <LoadingSpinner/>}
    if(error){ return <div>Error occured please refresh the page</div>}
    if(!order) { return <div>No product Found</div>}

  return (
    <div className='p-2 w-full bg-gray-100 min-h-screen'>

        <div className='text-gray-800 mb-3 font-[arial]'>Order Id : <span className='italic font-sans font-medium text-gray-600'>{order?._id}</span></div>

        <div className='p-1 bg-white'>
            <div className='h-36 flex gap-2 overflow-auto '>
            </div>
            <span className='divider m-0'/>
            <div className='w-full px-1 pl-5 pt-1 pb-2 '>
                <span className='my-1 text-2xl'>&#8377;{order?.total_amount}</span>
            </div>
        </div>

        <div className='mt-5 p-2 bg-white'>
            <OrderStatusComponent order={order} />
        </div>

        <div className='mt-3 p-2 bg-white '>  
            Payment method : <span className='text-sky-600 italic font-medium'>{order?.payment_method}</span>    
        </div>

        <div className='mt-3 p-2 space-y-2 bg-white'>      
            {order?.product_details?.map(product => <OrderProductCard key={product._id} product={product}/>)}        </div>

        <div className='my-3 grid grid-cols-1 md:grid-cols-2 gap-2'>
            <OrderAmountComponent order ={order} />
            
            <OrderDeliveryAddressComponent delivery_address={order?.delivery_address}/>
        </div>
    </div>
  )
}

export default OrderViewPage