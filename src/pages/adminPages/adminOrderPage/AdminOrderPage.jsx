import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent'

const AdminOrderPage = () => {

    const handleRef = useRef(true)
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [orders , setOrders] = useState(null)

    useEffect(()=>{
        const fetchAllOrder = async()=>{
            try {
                setLoading(true)
                axios.defaults.withCredentials = true
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/all-order`)
                console.log("fetchAllOrder Payload : " , res.data)
                setOrders(res.data.data)
            } catch (error) {
                console.error("error in fetchAllOrder function",error)
                setError(true)   
            } finally {
                setLoading(false)
            }
        }
        if(handleRef.current) {
            fetchAllOrder()
            handleRef.current = false
        }
    } , [])

    const findOrderStatus = (order_status)=> {
        const placed = order_status.placed
        const confirmed = order_status.confirmed 
        const out = order_status.out
        const delivered = order_status.delivered 
        const canceled = order_status.canceled  
        return canceled.status ? "Canceled" : delivered.status ? "Delivered" : out.status ? "Out" : confirmed.status ? "Confirmed" : placed.status ? "Placed" : "NaN"    
    }  

    const getStatusColor = (order_status)=>{
        const placed = order_status.placed
        const confirmed = order_status.confirmed 
        const out = order_status.out
        const delivered = order_status.delivered 
        const canceled = order_status.canceled 
        return canceled.status ? "text-red-500" : delivered.status ? "text-green-500" : out.status ? "text-gray-600" : confirmed.status ? "text-gray-600" : placed.status ? "text-yellow-500" : ''    
    }

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}
    if(!orders){return <div className='text-center content-center min-h-screen w-full'>No Orders Found</div>}

  return (
    <div className='p-2 bg-white w-full'>
        <div className=' col-span-8 grid grid-cols-3 gap-5 w-full px-3 pt-3 text-gray-800'>
            <div className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col '>
                <span>Total Orders</span>
                <span className='text-5xl w-full px-5 h-full items-center flex'>{orders.length ? orders.length : "NaN"}</span>
            </div>
            <div className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col '>
                <span className=''>Pending Orders</span>
                {/* <span className='text-5xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.low_in_stock ? response.low_in_stock : "NaN"}</span> */}
            </div>     
            <div className='col-span-1 bg-blue-gray-50/50 min-h-44 rounded-2xl p-10 flex flex-col '>
                <span>Total Stock</span>
                {/* <span className='text-4xl w-full px-5 h-full items-center flex line-clamp-1'>{response?.total_stock ? response.total_stock : "NaN"}</span> */}
            </div>         
        </div>
    </div>
  )
}

export default AdminOrderPage