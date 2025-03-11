import axios from 'axios'
import { format } from 'date-fns'
import { useState } from 'react'

const AdminOrderStatusComponent = ({order}) => {

    const [order_status , setOrderStatus] = useState(order)
    const [loading , setLoading] = useState(false)

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        return `${format(new Date(date) , "dd-MM-yyyy h:mm aa")}`
    }

    const ADMIN_ORDER_URL = `${import.meta.env.VITE_BACKEND_URL}admin/order`

    const updateOrderStatus = async()=>{
        const id = order._id
        try {
            setLoading(true)
            const res = await axios.patch(`${ADMIN_ORDER_URL}/update/${id}`)
            console.log("updateOrderStatus :",res.data.data?.order_status)
            if(res.data?.data?.order_status){ setOrderStatus(res.data?.data?.order_status) }
        } catch (error) {
            console.error(error.response)
        }  finally {
            setLoading(false)
        }
    }

    const cancelOrderStatus = async()=>{
        const id = order._id
        try {
            setLoading(true)
            const res = await axios.patch(`${ADMIN_ORDER_URL}/cancel/${id}`)
            console.log("cancelOrderStatus :",res.data.data?.order_status)
            if(res.data?.data?.order_status){ setOrderStatus(res.data?.data?.order_status) }
        } catch (error) {
            console.error(error.response)
        }  finally {
            setLoading(false)
        }
    }

    const placed = order_status.placed
    const confirmed = order_status.confirmed
    const out = order_status.out
    const delivered = order_status.delivered 
    const canceled = order_status.canceled 
    const returns = order_status.return 
    const returned = order_status.returned 


    return (
        <>
            <div className='text-xl md:text-center px-2 md:pt-5 md:pb-8 text-gray-700 font-medium md:underline underline-offset-2'>
                Delivery status
            </div>   

            <ul className="steps steps-vertical md:steps-horizontal w-full text-[17px] md:mb-5">

                <li data-content="✓" className={`step ${placed.status && 'step-info'}`}>
                    <span>Placed
                        <span className='text-gray-600 block'>{date(placed.date)}</span>
                    </span>
                </li>
                <li data-content="✓" className={`step ${confirmed.status && 'step-info'}`}>
                    <span>Order Confirmed 
                        <span className='text-gray-600 block'>{date(confirmed?.date)}</span>
                    </span>
                </li>
                <li data-content="✓" className={`step ${out.status && 'step-info'}`}>
                    <span>Out For Delivery 
                        <span className='text-gray-600 block'>{date(out.date)}</span>
                    </span>
                </li>
                {canceled.status ?
                    <li data-content="✕" className='step step-error'>
                        <span className='text-red-500'>Canceled 
                            <span className='text-gray-600 block'>{date(canceled?.date)}</span>
                        </span>
                    </li>
                :
                    <li data-content="✓" className={`step ${delivered.status && 'step-info'}`}>
                        <span>Delivered 
                            <span className='text-gray-600 block'>{date(delivered?.date)}</span>
                        </span>
                    </li>
                }
            </ul>

            <div className='divider'/>

            <div className='grid grid-cols-2 hero gap-2'>
                <button onClick={()=>updateOrderStatus()} disabled={loading || delivered.status || canceled.status} className=' col-span-1 btn btn-neutral hero'>Update</button>
                <button onClick={()=>cancelOrderStatus()} disabled={loading || delivered.status || canceled.status} className='col-span-1 btn btn-error hero text-white'>Cancel</button>
            </div>
        </>
    )
}

export default AdminOrderStatusComponent