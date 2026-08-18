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

    const payment = order.payment

  return (
    <div className='flex'>
    <AdminSideBar/>
    <div className='w-full font-inter font-medium text-gray-800 md:max-w-[calc(100%-245px)] p-5 bg-slate-50'>
        <div className='text-xl font-semibold text-gray-600 mt-1 mb-5 tracking-wide'>#{order.order_id}</div>

        <AdminOrderDeliveryAddressComponent delivery_address={order?.delivery_address} />

        <AdminOrderStatusComponent order={order} />

        <AdminOrderProductCard order={order} />
        
        <div className='my-5 gap-3 grid grid-cols-3 '>
            <AdminOrderAmountComponent order={order} />

            <div className=' w-full p-5 bg-white rounded-xl'>
                <div className='mb-3 text-xl text-sky-800 '>Payment Details</div> 
                <table className='border-separate border-spacing-3 text-lg '>
                    <tbody>
                        <tr>
                            <td>Gateway</td>
                            <td className=' capitalize'>: &nbsp; {payment?.gateway || "---"}</td>
                        </tr>
                        <tr>
                            <td>Method &nbsp;&nbsp;</td>
                            <td>: &nbsp; {payment?.method || "---"}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>: &nbsp; {payment?.status || "---"}</td>
                        </tr>
                        <tr>
                            <td>Transaction ID</td>
                            <td>: &nbsp; {payment?.transaction_id || "---"}</td>
                        </tr>
                    </tbody>
                </table>  
            </div>

            <AdminOrderUserComponent user={order.user_id}/>


        </div>
    </div>
    </div>
  )
}

export default AdminOrderViewPage