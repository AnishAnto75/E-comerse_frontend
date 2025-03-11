import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOrderPage = () => {

    const handleRef = useRef(true)
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [orders , setOrders] = useState(null)

    useEffect(()=>{
        if(handleRef.current) {
            fetchAllOrder()
            handleRef.current = false
        }
    } , [])

    const fetchAllOrder = async()=>{
        setLoading(true)
        try {
            axios.defaults.withCredentials = true
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/all-order`)
            console.log("fetchAllOrder Payload : " , res.data)
            setOrders(res.data.data)
        } catch (error) {
            console.error("error in fetchAllOrder function",error)
            setError(true)   
        } finally {
            setLoading(false)
        }
    }

    const findOrderStatus = (order_status)=> {
        const placed = order_status.placed.status
        const confirmed = order_status.confirmed.status 
        const out = order_status.out.status 
        const delivered = order_status.delivered.status 
        const canceled = order_status.canceled.status 
        const returns = order_status.return.status 
        const returned = order_status.returned.status 
        return canceled ? "Canceled" : returned ? "Returned" : returns ? "Return requested" : delivered ? "Delivered" : out ? "Out" : confirmed ? "Confirmed" : placed ? "Placed" : "NaN"    
    }  

    if(loading){
        return <div className='hero'>Loading...</div>
    }
    if(error){
        return <div className='hero bg-gray-100 min-h-screen'>Error Occured Please refresh the page</div>
    }

  return (
    <>
    <div className='w-full'>
        <div className='bg-gray-100 h-screen flex w-full'>
            <div className='container p-5 items-center justify-center mb-10 '>
                <div className='font-[arial] mb-5'>Assigned Orders</div>
                <div className="overflow-auto h-full w-full bg-white rounded-2xl border-2 ">
                    <table className="table table-zebra text-center ">
                        <thead>
                            <tr className='text-sm bg-gray-600 text-white font-[arial] tracking-wide'>
                                <th>S.No</th>
                                <th className='p-5'>Order ID</th>
                                <th>Customer Name</th>
                                <th>Order Status</th>
                                <th>NOP</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders?.map((order , index) =>
                            <tr key={order._id}>
                                <th className='border-r'>{index+1}</th>
                                <td>{order._id}</td>
                                <td>{order.delivery_address.name}</td>
                                <td>{findOrderStatus(order.order_status)}</td>
                                <td>{order.no_of_product ? order.no_of_product : "Nil"}</td>
                                <td className='rounded-xl flex p-0 '>
                                    <button onClick={()=>navigate(`/admin/orders/${order.order_id}`)} className='bg-slate-500 text-white font-[arial]  rounded-xl hero m-1  p-2'>view</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default AdminOrderPage