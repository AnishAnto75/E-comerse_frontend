import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner.jsx'
import {toast} from 'react-toastify'

const OrderPage = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [orders , setOrders ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}order/get-orders`)
                console.log("fetchAllOrders payload : " , res.data)        
                setOrders(res.data?.data)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in fetchAllOrders :" , error)
            } finally { setLoading(false) }
        }
        
        if(handleRef.current) {
            fetch()
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
    if(error){return <div>Error Occured Kindly refresh the page</div>}

  return (
    <div className='w-full'>
        <div className='bg-gray-100 min-h-screen w-full'>
            <div className='p-5 items-center justify-center  '>
                <div className="overflow-auto h-full w-full bg-white rounded-2xl border-2">
                    <table className="table table-zebra text-center ">
                        <thead>
                            <tr className='text-sm bg-gray-600 text-white'>
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
                            <tr key={index}>
                                <th className='border-r'>{index+1}</th>
                                <td>{order.order_id}</td>
                                <td>{order.delivery_address.name}</td>
                                <td className={`${getStatusColor(order?.order_status)}`}>{findOrderStatus(order?.order_status)}</td>
                                <td>{order.no_of_product ? order.no_of_product : "Nil"}</td>
                                <td className='rounded-xl flex p-0 '>
                                    <button onClick={()=>navigate(`/order/${order.order_id}`)} className='bg-slate-500 text-white font-[arial]  rounded-xl hero m-1  p-2'>view</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
  )}

export default OrderPage