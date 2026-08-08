import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import ErrorComponent from '../../ErrorComponent'
import PageNotFoundPage from '../../../pages/PageNotFoundPage'
import axios from 'axios'
import LoadingComponent from '../../LoadingComponent'
import { format } from 'date-fns'
import { Avatar } from '@material-tailwind/react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { BiX } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const AdminOrderPreviewComponent = ({order_id}) => {

    const navigate = useNavigate()

    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

    useEffect(() => {
        if (!order_id) return;
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_id/${order_id}`, {withCredentials:true});
                setOrder(res.data.data);
                console.log("fetchOrder response:", res.data);
            } catch (error) {
                console.error("fetchOrder:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [order_id]);

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        const dat = format(new Date(date) , "dd MMM yy")
        return dat
    }

    if(loading){return <LoadingComponent/>}
    if(error){ return <ErrorComponent/>}
    if(!order){return <ErrorComponent/>}

    const order_status = order.order_status

  return (
    <div className='font-inter text-gray-800 text-lg font-medium'>
        <div className='text-xl font-medium pl-3 pt-2'>Order Preview</div>
        <div className='text-xl font-bold text-gray-500 mt-3 pl-3 '>#{order.order_id}</div>
        {/* Product Details */}
        <div className='mt-4 px-1'>
        {order.items?.map((product, index)=>(
            <div key={index} className='border-b flex gap-2 items-center py-3'>
                <img src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo}`} alt={product.product_name} className="w-16 h-16 rounded-lg object-contain"/>
                <div className='w-full'>
                    <div className='line-clamp-1'>{product.product_name}</div>
                    <div className='text-gray-600 line-clamp-1'>{product.product_barcode}</div>
                    <div className='flex items-center justify-between mt-1 pr-5'>
                        <div className='flex items-center gap-8'>
                            <div className='flex items-center'><FaIndianRupeeSign />{product.unit_price}</div>
                            <div className='flex items-center'><BiX/>{product.quantity}</div>
                        </div>
                        <div className='font-semibold flex items-center'><FaIndianRupeeSign />{product.subtotal}</div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        {/* Order Status */}
        <div className='rounded-xl space-y-2 border-2 bg-white mt-5 p-4 '>
            <div className='flex justify-between'>
                <div className='text-gray-500'>Placed</div>
                <div>{date(order_status.placed?.date)}</div>
            </div>            
            {order_status.confirmed.status &&
                <div className='flex justify-between'>
                    <div className='text-gray-500'>Confirmed</div>
                    <div>{date(order_status.confirmed.date)}</div>
                </div>  
            }
            {order_status.out.status &&
                <div className='flex justify-between'>
                    <div className='text-gray-500'>Out</div>
                    <div>{date(order_status.out.date)}</div>
                </div>  
            }          
            {order_status.delivered.status &&
                <div className='flex justify-between'>
                    <div className='text-gray-500'>Delivered</div>
                    <div>{date(order_status.delivered.date)}</div>
                </div>  
            }          
            {order_status.cancelled.status &&
                <div className='flex justify-between'>
                    <div className='text-gray-500'>Cancelled</div>
                    <div>{date(order_status.cancelled.date)}</div>
                </div>  
            }          
        </div>
        {/* Amount */}
        <div className='border-2 rounded-xl bg-white mt-5 p-4 space-y-2'>
            <div className='flex justify-between'>
                <div>MRP({order.total_quantity})</div>
                <div className='flex items-center font-semibold'><FaIndianRupeeSign />{order.total_mrp}</div>
            </div>
            <div className='flex justify-between'>
                <div>Discount</div>
                <div className='flex items-center font-semibold'>-<FaIndianRupeeSign />{order.total_mrp - order.total_price}</div>
            </div>
            <div className='flex justify-between'>
                <div>Price</div>
                <div className='flex items-center font-semibold'><FaIndianRupeeSign />{order.total_price}</div>
            </div>
            <div className='flex justify-between'>
                <div>Delivery Charges</div>
                <div className='flex items-center font-semibold'><FaIndianRupeeSign />{order.delivery_charges}</div>
            </div>
            <div className='flex text-xl items-center justify-between border-t-[3px] border-dashed pt-3 '>
                <div>Total</div>
                <div className='flex items-center font-semibold'><FaIndianRupeeSign />{order.total_amount}</div>
            </div>
        </div>
        {/* Delevery Address */}
        <div className=' bg-white rounded-xl w-full p-3 mt-5 border '>
            <div className='mb-3 text-xl font-semibold text-sky-700 '>Delivery Address <span className='bg-sky-100 p-1 px-2 ml-2 text-sky-500 capitalize rounded-lg'>{order.delivery_address.address_type}</span></div> 
            <div>     
                <div className='space-x-1 mt-3 font-semibold '>
                    <span>{order.delivery_address.name}</span> <span>( {order.delivery_address.phone_number} )</span>
                </div>
                <div className='mt-1'>{order.delivery_address.house_no && `${order.delivery_address.house_no}, `} {order.delivery_address.landmark && `${order.delivery_address.landmark}, `} {order.delivery_address.area && `${order.delivery_address.area}, `} {order.delivery_address.city && `${order.delivery_address.city}, `} {order.delivery_address.district && `${order.delivery_address.district}, `} {order.delivery_address.state && `${order.delivery_address.state}`} {order.delivery_address.pincode && `- ${order.delivery_address.pincode}`}</div> 
                <div>{order.delivery_address.alternate_phone_number && `Alternate Phone : ${order.delivery_address.alternate_phone_number}`}</div>
            </div>
        </div>
        <div className='justify-center flex'>
            <div onClick={() => navigate(`/admin/orders/${order.order_id}`)} className='border-2 hover:bg-sky-600 rounded-full bg-sky-500 text-white w-40 p-2 text-center mt-5 mb-3 cursor-pointer'>View Details</div>
        </div>
    </div>
  )
}

export default AdminOrderPreviewComponent