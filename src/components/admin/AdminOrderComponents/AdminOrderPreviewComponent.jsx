import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import ErrorComponent from '../../ErrorComponent'
import PageNotFoundPage from '../../../pages/PageNotFoundPage'
import axios from 'axios'
import LoadingComponent from '../../LoadingComponent'
import { format } from 'date-fns'
import { Avatar } from '@material-tailwind/react'
import { FaIndianRupeeSign } from 'react-icons/fa6'

const AdminOrderPreviewComponent = ({order_id}) => {

    const handleRef = useRef(true)
    const [id, setId] = useState(null)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

     useEffect(() => {
        if (!order_id) return;
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError(false);

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/order/order_id/${order_id}`);
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

    // const order = {
    //     createdAt: "2026-06-27T13:06:28.898Z",
    //     delivery_address: {
    //         addressType : "home",
    //         alternatePhoneNo : null,
    //         city : "Karungal",
    //         district : "KK Dist",
    //         houseNo : "184226",
    //         landMark: "near road",
    //         name: "Anish",
    //         phoneNo: 9458623145,
    //         pincode : 629157,
    //         state: "Tamil Nadu"
    //     },
    //     delivery_charges: 50,
    //     order_id: "ORD062710921516",
    //     order_status: {
    //         canceled:{
    //             status: true, date: '2026-06-27T13:06:28.886Z'
    //         },
    //         confirmed:{
    //             status: true, date: '2026-06-27T13:06:28.886Z'
    //         },
    //         delivered:{
    //             status: true, date: '2026-06-27T13:06:28.886Z'
    //         },
    //         out:{
    //             status: true, date: '2026-06-27T13:06:28.886Z'
    //         },
    //         placed:{
    //             status: true, date: '2026-12-27T13:06:28.886Z'
    //         }
    //     },
    //     payment_method:"Cash On Delivery",
    //     product_details:[
    //         {
    //             no_of_product:2,
    //             product_barcode:"CO",
    //             product_batch_no:"50",
    //             product_expire_date:null,
    //             product_id:{_id: '69e520d837f468fb983d24ff', product_photos: null},
    //             product_manufacture_date:null,
    //             product_mrp:55,
    //             product_name:"NKS CO Rice",
    //             product_price:52,
    //             _id:"6a3fcad424b39de2b694eda2",
    //         },
    //         {
    //             no_of_product:2,
    //             product_barcode:"KVR",
    //             product_batch_no:"356",
    //             product_expire_date:"5555-05-05T00:00:00.000Z",
    //             product_id:{_id: '69e25cf1853de9e6eedf3e4f', product_photos: null},
    //             product_manufacture_date:"5555-05-05T00:00:00.000Z",
    //             product_mrp:55,
    //             product_name:"NKS Kavuni Rice",
    //             product_price:52,
    //             _id:"6a3fcad424b39de2b694eda3",
    //         }
    //     ],
    //     total_amount:258,
    //     total_mrp:220,
    //     total_no_of_product:4,
    //     total_price:208,
    //     updatedAt:"2026-06-27T13:06:28.898Z",
    //     user_id:{
    //         email:"customer1@gmail.com",
    //         name:"customer1",
    //         phoneNumber:null,
    //         user_id:"USR062773192981",
    //         _id:"6a3fb979c4d86e8842906ea7",
    //     },
    //     _id:"6a3fcad424b39de2b694eda1",
    // }

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return }
        const dat = format(new Date(date) , "dd MMM yy")
        return dat
    }

    if(loading){return <LoadingComponent/>}
    if(error){ return <div>Error</div>}
    if(!order){return <LoadingComponent/>}

    const order_status = order.order_status

  return (
    <div className="p-1 font-inter">
        <div className='text-xl font-semibold text-blue-gray-500 pl-3 pt-2'>Order Preview</div>
        <div className='text-xl font-semibold text-blue-gray-700 mt-3 pl-3 pt-0.5'>#{order.order_id}</div>
        {/* Product Details */}
        <div className='mt-5'>
        {order.product_details?.map((product, index)=>(
            <div key={index} className='border-b flex gap-2 items-center py-4'>
                <img src="/3-08.webp" alt="User Avatar" className="w-16 h-16 rounded-full object-cover"/>
                <div className='w-full'>
                    <div className='text-gray-800 line-clamp-1'>{product.product_name}</div>
                    <div className='text-gray-600 font-medium line-clamp-1'>{product.product_barcode}</div>
                    <div className='flex items-center justify-between mt-1 pr-5'>
                        <div className='flex items-center gap-8'>
                            <div className='text-lg text-gray-800 font-medium flex items-center'><FaIndianRupeeSign />{product.product_price}</div>
                            <div className='text-gray-700 font-medium'>x{product.no_of_product}</div>
                        </div>
                        <div className='text-lg text-gray-900 font-semibold flex items-center'><FaIndianRupeeSign />{product.product_price*product.no_of_product}</div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        {/* Order Status */}
        <div className='rounded-xl space-y-2 border-2 bg-white mt-5 p-4 font-medium text-lg text-blue-gray-800'>
            <div className='flex justify-between'>
                <div>Placed</div>
                <div>{date(order_status.placed?.date)}</div>
            </div>            
            {order_status.confirmed.status &&
                <div className='flex justify-between'>
                    <div>Confirmed</div><div>{date(order_status.confirmed.date)}</div>
                </div>  
            }          
            {order_status.out.status &&
                <div className='flex justify-between'>
                    <div>Out</div><div>{date(order_status.out.date)}</div>
                </div>  
            }          
            {order_status.delivered.status &&
                <div className='flex justify-between'>
                    <div>Delivered</div><div>{date(order_status.delivered.date)}</div>
                </div>  
            }          
            {order_status.canceled.status &&
                <div className='flex justify-between'>
                    <div>Canceled</div><div>{date(order_status.canceled.date)}</div>
                </div>  
            }          
        </div>
        {/* Amount */}
        <div className='border-2 rounded-xl bg-white mt-5 p-4 space-y-2'>
            <div className='flex items-center font-medium justify-between text-lg'>
                <div className='text-blue-gray-700'>MRP({order.total_no_of_product})</div>
                <div className='flex items-center text-blue-gray-900 font-semibold'><FaIndianRupeeSign />{order.total_mrp}</div>
            </div>
            <div className='flex items-center font-medium justify-between text-lg'>
                <div className='text-blue-gray-700'>Discount</div>
                <div className='flex items-center text-blue-gray-900 font-semibold'>-<FaIndianRupeeSign />{order.total_mrp - order.total_price}</div>
            </div>
            <div className='flex items-center font-medium justify-between text-lg'>
                <div className='text-blue-gray-700'>Price</div>
                <div className='flex items-center text-blue-gray-900 font-semibold'><FaIndianRupeeSign />{order.total_price}</div>
            </div>
            <div className='flex items-center font-medium justify-between text-lg'>
                <div className='text-blue-gray-700'>Delivery Charges</div>
                <div className='flex items-center text-blue-gray-900 font-semibold'><FaIndianRupeeSign />{order.delivery_charges}</div>
            </div>
            <div className='flex items-center font-medium justify-between border-t-[3px] border-dashed pt-3 '>
                <div className='text-blue-gray-800 text-xl'>Total</div>
                <div className='flex items-center text-blue-gray-900 text-xl font-semibold'><FaIndianRupeeSign />{order.total_amount}</div>
            </div>
        </div>
        {/* Delevery Address */}
        <div className=' border-2 mt-5 rounded-xl bg-white text-gray-900 w-full p-3'>
            <div className='text-lg text-blue-gray-700 font-semibold mb-3 '>Delivery Address </div> 
            <div className='px-2 tracking-wide'>
                <div className='pb-2'><span className='bg-gray-100 text-gray-800 p-2 text-sm font-roboto font-bold uppercase rounded '>{order.delivery_address.addressType}</span></div>
                <div className='gap-1 flex'>
                    <span>{order.delivery_address?.name ? order.delivery_address?.name : "NaN"},</span>
                    <span>{order.delivery_address?.phoneNo ? order.delivery_address?.phoneNo : "NaN"}</span>
                </div>
                <div>
                    {order.delivery_address?.houseNo && `${order.delivery_address.houseNo}, `}
                    {order.delivery_address?.landMark && `${order.delivery_address.landMark}, `}
                    {order.delivery_address?.city && `${order.delivery_address.city},`}
                </div>
                <div>
                    {order.delivery_address?.district && `${order.delivery_address.district}, `}
                    {order.delivery_address?.state && `${order.delivery_address.state}`}
                     -{order.delivery_address?.pincode}
                </div>
                {order.delivery_address?.alternatePhoneNo && <div><span className='font-sans text-gray-600 font-medium '>Alternate Phone: </span>{order.delivery_address.alternatePhoneNo}</div>}
            </div>
        </div>
        <div className='justify-center flex'>
            <div className='border-2 hover:shadow-md rounded-full bg-white w-40 p-2 text-center mt-6 mb-2 text-lg font-medium text-blue-gray-900 cursor-pointer'>View Details</div>
        </div>
    </div>
  )
}

export default AdminOrderPreviewComponent