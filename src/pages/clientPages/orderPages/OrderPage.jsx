import React, { useEffect, useRef, useState } from 'react'
import AccountAddressComponent from '../../../components/clientComponents/accountComponents/AccountAddressComponent'
import { IoMdPerson } from 'react-icons/io'
import useUserStore from '../../../store/authStore'
import { useNavigate , Link, useLocation } from 'react-router-dom'
import PageNotFoundPage from '../../PageNotFoundPage'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { CgProfile } from 'react-icons/cg'
import ClientSidebar from '../../../components/clientComponents/ClientSidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import {format} from 'date-fns'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { MdPayments } from 'react-icons/md'

const ProfilePage = () => {
    
    const navigate = useNavigate()

    const handleRef = useRef(true)
    
    const location = useLocation();
    const url = location.pathname.split("/")[1]
    
    const isAuthenticated = useUserStore( (state) => state.isAuthenticated );
    const userLoading = useUserStore( (state) => state.loading );
    const user = useUserStore( (state) => state.user );

    const [orders , setOrders ] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    useEffect(() => {
        const initialize = async() => {
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/order` ,{withCredentials:true})
                console.log("fetchAllOrders payload : " , res.data)        
                setOrders(res.data?.data)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in fetchAllOrders :" , error)
            } finally { setLoading(false) }

        };
        if(handleRef.current && isAuthenticated){
            initialize();
        }
    }, [isAuthenticated]);

    const formatedDate = (date)=>{
        return format(date, 'EEEE , dd MMM yyyy  p')
    }

    if(userLoading) { return <LoadingSpinner />}
    if(!isAuthenticated){return <PageNotFoundPage />}

  return (
    <div className="flex justify-center">
        <div className=" max-w-[1920px] px-5 w-full m-14">
            <div className="grid gap-4 gap-y-2 grid-cols-8">

                <ClientSidebar />

                <div className="col-span-6 border min-h-[calc(100vh-181px)] shadow rounded-lg p-8 text-gray-800">
                    <div className='text-2xl font-medium tracking-wide pb-6 text-sky-800'>Orders</div>
                    {orders.length ? 
                        <div className='space-y-2'>
                            { orders.map((order, index) => 
                                <Link to={`/orders/${order.order_id}`} className='border flex rounded-lg p-2 cursor-pointer' key={index}>
                                    <div className="grid grid-cols-2 gap-1 min-w-[170px] max-w-[170px] p-1 ">
                                        { order.items.length === 1 ?
                                            <div className='h-40 w-40 col-span-2 bg-white rounded-md p-1 border'>
                                                <img src={`${import.meta.env.VITE_IMAGE_URL}${order.items[0].product_photo}`} alt={order.items[0].product_name} className={`h-full w-full rounded-md object-contain `} />
                                            </div>
                                        :
                                        order.items.slice(0, 3).map((item, index) => (
                                            <div key={index} className='h-20 w-20 bg-white rounded-md col-span-1 p-1 border'>
                                                <img src={`${import.meta.env.VITE_IMAGE_URL}${item.product_photo}`} alt={item.product_name} className={`h-full w-full rounded-md object-contain `} />
                                            </div>
                                        ))}
                                        {order.items.length > 3 && <div className="w-20 h-20 col-span-1 rounded-md bg-gray-100 flex items-center justify-center text-xl font-semibold border text-gray-700"> +{order.items.length - 3}</div>}
                                    </div>
                                    <div className='py-5 space-y-3 px-5 text-xl font-medium text-gray-700 tracking-widew-full'>
                                        <div className='text-gray-500 font-bold'>#{order.order_id}</div>
                                        <div className='font-semibold'>Order <span className='capitalize'>{order.current_status}</span> on { order?.order_status[order.current_status]?.date && (format(order?.order_status[order.current_status]?.date , 'EEEE , dd MMM yyyy ')) } at { order?.order_status[order.current_status]?.date && (format(order?.order_status[order.current_status]?.date , 'p')) }</div>
                                        <div className=' flex items-center gap-7'>
                                            <div className='text-green-500 flex items-center'><FaIndianRupeeSign size={19} />{order.total_amount}</div>
                                            <div>({order.items.length} Items , {order.total_quantity} Quantity)</div>
                                            <div className={`border-[3px] px-2 p-1 rounded-xl flex items-center gap-2  ${order.payment.status === "Pending" ? "text-amber-400 border-amber-300" : order.payment.status === "Paid" ? "text-green-400 border-green-300" : order.payment.status === "Failed" ? "text-red-500 border-red-300" : order.payment.status === "Refunded" ? "text-sky-500 border-sky-300" : ""}`}><MdPayments size={23} />{order.payment.status}</div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                        :
                        <div className='flex h-96 justify-center items-center'>
                            <div className='text-2xl text-gray-500 font-semibold'>No orders yet</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProfilePage