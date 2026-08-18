import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '../../../components/LoadingSpinner.jsx'
import ErrorComponent from '../../../components/ErrorComponent.jsx'
import AdminOrderStatusComponent from '../../../components/admin/AdminOrderComponents/AdminOrderStatusComponent.jsx'
import AdminOrderProductCard from '../../../components/admin/AdminOrderComponents/AdminOrderProductCard.jsx'
import AdminOrderAmountComponent from '../../../components/admin/AdminOrderComponents/AdminOrderAmountComponent.jsx'
import AdminOrderUserComponent from '../../../components/admin/AdminOrderComponents/AdminOrderUserComponent.jsx'
import ClientSidebar from '../../../components/clientComponents/ClientSidebar.jsx'
import OrderStatusComponent from '../../../components/clientComponents/orderComponents/orderStatusComponent.jsx'
import { FaArrowLeftLong } from 'react-icons/fa6'
import PageNotFoundPage from '../../PageNotFoundPage.jsx'

const OrderViewPage = () => {

    const {id} = useParams()
    
    const navigate = useNavigate()
    
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [order , setOrder ]  = useState(null) 

    const handleRef = useRef(true)
    useEffect(()=>{
        const fetchOrder = async()=>{
            try {
                setLoading(true)
                console.log(`${import.meta.env.VITE_BACKEND_URL}order/order_id/${id}`)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/order/order_id/${id}` , {withCredentials: true})
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
    }, [])

    if(loading){return <LoadingSpinner/>}
    if(error){ return <ErrorComponent />}
    if( !order){ return <PageNotFoundPage />}

    const address = order?.delivery_address
    const products = order?.items
    const payment = order.payment

    const discount = order?.total_mrp - order?.total_price

    const date = (date)=>{
        if(isNaN(Date.parse(date))){ return "---" }
        const dat = format(new Date(date) , "dd-MM-yyyy")
        return dat
    }

  return (
    <div className="flex justify-center">
        <div className=" max-w-[1920px] px-5 w-full m-14">
            <div className="grid gap-4 gap-y-2 grid-cols-8">

                <ClientSidebar />

                <div className="col-span-6 border shadow font-inter text-lg font-medium rounded-lg p-8 text-gray-800">

                    <div className='flex justify-between items-center'>
                        <div className='text-2xl flex items-center gap-3'>
                            <Link to={'/orders'} className=' cursor-pointer'><FaArrowLeftLong /></Link>
                            <div className='text-[22px] font-semibold tracking-wide'>ORDER<span className='ml-2 text-gray-600'> #{order.order_id}</span></div>

                        </div>
                        { order.current_status == "out" && <div className='text-xl'>OTP - <span className='bg-amber-500 ml-2 p-1 px-2 rounded-lg text-white tracking-wide'>{order.delivery_otp}</span></div>}
                    </div>

                    <OrderStatusComponent order={order} />

                    <div className='w-full mt-5 bg-white p-2 border text-base rounded-xl'>
                        <table className="table-auto mt-5 w-full">
                            <thead>
                                <tr className='text-gray-700 tracking-wide '>
                                    <th className="p-4 rounded-l-xl bg-slate-50"></th>
                                    <th className="p-4 text-start bg-slate-50">ITEM</th>
                                    <th className="p-4 bg-slate-50">SIZE</th>
                                    <th className="p-4 bg-slate-50">MRP</th>
                                    <th className="p-4 bg-slate-50">PRICE</th>
                                    <th className="p-4 bg-slate-50">QUANTITY</th>
                                    <th className="p-4 rounded-r-xl bg-slate-50">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map(( product, index) => (
                                    <tr key={index} className={`text-center border-b ${products.length == (index+1) && "border-b-0"}`} >
                                        <td className='w-24 h-24 p-2 bg-white cursor-pointer' onClick={()=>navigate(`/products/${product.product_barcode}`)}>
                                            <img key={index} src={`${import.meta.env.VITE_IMAGE_URL}${product.product_photo}`} alt={product.product_name} className=' object-contain h-full w-full'/>
                                        </td>
                                        <td className='p-4 text-start'>{product.product_name}</td>
                                        <td className='p-4'>{product.size}{product.product_UOM}</td>
                                        <td className='p-4'>&#8377;{product.mrp}</td>
                                        <td className='p-4'>&#8377;{product.unit_price}</td>
                                        <td className="p-4">{product.quantity}</td>
                                        <td className="p-4">&#8377;{product.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>       
                    </div>

                    <div className='my-5 gap-3 grid grid-cols-3 '>

                        <div className=' bg-white rounded-xl w-full p-5 border'>
                            <div className='mb-3 text-xl text-sky-800 '>Price Details </div> 
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span>Mrp</span>
                                    <span >{order?.total_mrp}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Price</span>
                                    <span>{order?.total_price}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Delivery Charge</span>
                                    <span>{order?.delivery_charges}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Discount</span>
                                    <span>{discount ? `- ${discount}` : 0}</span>
                                </div>
                                <div className='flex justify-between border-t-[3px] pt-2 text-xl text-gray-700 font-semibold'>
                                    <span>Total Amount</span>
                                    <span>{order?.total_amount}</span>
                                </div>
                            </div>
                        </div>

                        <div className=' bg-white rounded-xl w-full border p-5 '>
                            <div className='mb-3 text-xl text-sky-800 '>Delivery Address <span className='bg-sky-100 p-1 px-2 ml-2 text-sky-500 capitalize rounded-lg text-lg tracking-wide'>{address.address_type}</span></div> 
                            <div>
                                <div className='space-x-1 text-[19px] mt-3 font-semibold  '>
                                    <span>{address.name}</span> <span>( {address.phone_number} )</span>
                                </div>
                                <div className='mt-2 mb-1 tracking-wide'>{address.house_no && `${address.house_no}, `} {address.landmark && `${address.landmark}, `} {address.area && `${address.area}, `} {address.city && `${address.city}, `} {address.district && `${address.district}, `} {address.state && `${address.state}`} {address.pincode && `- ${address.pincode}`}</div> 
                                <div>{address.alternate_phone_number && `Alternate Phone : ${address.alternate_phone_number}`}</div>
                            </div>
                        </div>

                        <div className=' w-full p-5 bg-white border rounded-xl'>
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

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderViewPage