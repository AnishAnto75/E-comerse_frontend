import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Avatar, Button, Card, CardBody, CardHeader, Chip } from '@material-tailwind/react';
import { debounce } from 'lodash';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent';
import { format } from 'date-fns';

const AdminAllOrderPage = () => {

    const handleRef = useRef(true)
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(false)
    const [response, setResponse] = useState(null) 
    const [orders , setOrders] = useState(null)
    
    const [search_order_id, setSearchOrderId] = useState('')

    useEffect(()=>{
        const fetchAllOrder = async()=>{
            try {
                setLoading(true)
                axios.defaults.withCredentials = true
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order-page`)
                console.log("fetchAllOrder Payload : " , res.data)
                setResponse(res.data.data)
                setOrders(res.data.data.orders)
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

    const requestOrderById = async () => {
        if(search_order_id.length > 10){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order-page/search/${search_order_id}`)
                console.log("requestOrderById: ",res.data)
                setOrders(res.data.data) 
            } catch (error) {
                console.error("error in requestOrderById :" , error)
            }
        }
    }

    const handleSearchOrderId = (e)=>{
        const term = e.target.value
        setSearchOrderId(term)
        if(term.length == 0){ setOrders(response.orders)}
    }

    const findOrderStatus = (order_status)=> {
        const placed = order_status.placed
        const confirmed = order_status.confirmed 
        const out = order_status.out
        const delivered = order_status.delivered 
        const canceled = order_status.canceled  
        return canceled.status ? {value: "Canceled", color:"red", date: `${format(new Date(canceled?.date) , "dd-MM-yyyy")}`} : 
            delivered.status ? {value: "Delivered", color:"green", date: `${format(new Date(delivered?.date) , "dd-MM-yyyy")}`} : 
            out.status ? {value: "Out", color:"blue", date: `${format(new Date(out?.date) , "dd-MM-yyyy")}`} : 
            confirmed.status ? {value: "Confirmed", color:"blue", date: `${format(new Date(confirmed?.date) , "dd-MM-yyyy")}`} : 
            placed.status ? {value: "Placed", color:"blue", date: `${format(new Date(placed?.date) , "dd-MM-yyyy")}`} : 
            {value: "NaN", color:"yellow", date: "NaN"}
    }

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

  return (
    <div className="w-full p-2">
        <div className="p-1">
            <div className="items-center md:w-72 relative">
                <input type='text' value={search_order_id} onChange={(e)=>handleSearchOrderId(e)} onKeyDown={e => e.key == 'Enter' && requestOrderById()} placeholder='Search' className='border-2 border-blue-200 py-2 px-2 pr-9 w-full rounded-lg text-sm placeholder:text-blue-300/75 font-poppins focus:outline-none'/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="size-6 absolute top-2 right-2 text-blue-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
        </div>
        <div className="pt-2 px-0">
        <table className="w-full min-w-max table-auto text-left ">
            <thead>
                <tr className='p-5 text-center border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-gray-600 tracking-wider'>
                    <th className="font-normal p-4"></th>
                    <th className="text-start font-normal p-4">Order ID</th>
                    <th className='p-4 font-normal'>User</th>
                    <th className='p-4 font-normal'>Products</th>
                    <th className='p-4 font-normal'>Status</th>
                    <th className='p-4 font-normal'>Amount</th>
                </tr>
            </thead>
                <tbody className=''>
                    {orders?.map(({ order_id, user_id, total_no_of_product, order_status, total_amount }, index) => {
                        const status = findOrderStatus(order_status)
                        const classes = index === orders?.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                        <tr key={index} className='hover:bg-blue-gray-50/50 text-center text-sm text-blue-gray-800' onClick={()=>navigate(`/admin/orders/order_id/${order_id}`)}>
                            <td className={`${classes} text-start w-5 border-r border-blue-gray-50 border-b-0 `}>{index+1}</td>
                            <td className={`${classes} text-start`}><div>{order_id}</div><div className="text-blue-gray-500">{status?.date}</div></td>
                            <td className={classes}>{user_id?.name}</td>
                            <td className={classes}>{total_no_of_product}</td>
                            <td className={`${classes} place-items-center `}><Chip size='sm' className='w-24' color={status?.color ? status.color : "yellow"} variant='ghost'  value={status?.value ? status.value : "NaN"}/></td>
                            <td className={classes}>{total_amount}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminAllOrderPage