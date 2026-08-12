import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import ErrorComponent from '../../ErrorComponent'

const AdminCustomerPreviewComponent = ({user_id}) => {

    const navigate = useNavigate()
    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [customer , setCustomer ]  = useState(null) 

    useEffect(() => {
        if ( !user_id ) return;
        const fetch = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/customer_preview_page/${user_id}`, {withCredentials: true})
                setCustomer(res.data.data);
                console.log("fetchPreviewCustomer response:", res.data);
            } catch (error) {
                console.error("fetchPreviewCustomer:", error);
                setError(true);
            } finally { setLoading(false) }
        };
        fetch();
    }, [user_id]);

    if(loading){return <LoadingComponent/>}
    if(error || !customer){return <ErrorComponent/>}

    const avgOrdValue = Math.floor(customer?.total_spending/( customer?.total_orders ))

    return (
    <div className="p-2 font-inter font-medium text-lg text-gray-900">
        <div className='text-xl font-semibold'>Customer Preview</div>
        <div className='text-xl font-semibold text-gray-500 mt-3'>#{customer.user_id}</div>
        <div onClick={()=>navigate(`/admin/customer/customer_id/${customer.user_id}`)} className="flex relative justify-center mt-3 rounded-xl py-5 flex-col items-center bg-gray-50">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ customer.status == "active" ? "bg-sky-500" : customer.status == "inactive" ? "bg-gray-500" : customer.status == "blocked" && "bg-red-500" }`} title={customer.status}/>
            <div className="w-36 h-36 rounded-full bg-blue-100 text-8xl flex items-center justify-center uppercase text-blue-600 font-semibold">{customer.name?.charAt(0)}</div>
            <div className='flex gap-1.5 mt-1' title='Score'>
                {Array.from({ length: customer?.score }).map((_, index) => (
                    <IoIosStar key={index} className="h-6 w-6 text-amber-400"/>
                ))}
            </div>
            <div className='text-xl font-semibold mt-2 line-clamp-1'>{customer.name}</div>
            <div className='font-semibold text-gray-600 mt-1'>{customer.email}</div>
            <div className='font-semibold text-gray-600 mt-1.5'>{customer.phoneNumber}</div>
        </div>

        <div className='flex mt-3 gap-2 w-full justify-center'>
            <span className={`px-3 py-1 rounded-xl cursor-default capitalize ${customer.gender == "male" ? "bg-sky-50 text-sky-600" : customer.gender == "female" ? "bg-pink-50 text-pink-600" : " bg-purple-50 text-purple-700"}`} title='gender'>{customer.gender}</span>
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 cursor-default" title='DOB'>{customer?.DOB ? format(customer?.DOB , 'dd/MM/yyy') : "--"}</span>
        </div>

        <div className="mt-5">
            <h3>Customer Overview</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-base text-green-600">TOTAL SPENDING</p>
                    <h2 className="text-2xl font-bold text-green-700 mt-2">₹{customer.total_spending?.toLocaleString()}</h2>
                </div>
                <div className="rounded-xl bg-orange-50 p-4">
                    <p className="text-base uppercase text-orange-500">Total Orders</p>
                    <h2 className="text-2xl font-bold text-orange-500 mt-2">{customer.total_orders}</h2>
                </div>
                <div className="rounded-xl col-span-2 text-center bg-violet-50 p-4">
                    <p className="text-base uppercase text-violet-600">Avg Order Value</p>
                    <h2 className="text-2xl font-bold text-violet-700 mt-2">₹{ avgOrdValue ? avgOrdValue.toLocaleString() : 0}</h2>
                </div>
            </div>
        </div>

        <div className="mt-5">
            <h3>Customer Details</h3>
            <div className="space-y-3 mt-3">
                
                <div className="flex justify-between items-center rounded-xl bg-blue-50 px-4 py-3">
                    <span className="text-blue-600 ">Customer Since</span>
                    <span className="font-semibold text-blue-600">{format(customer?.createdAt , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-green-50 px-4 py-3">
                    <span className="text-green-600">Last Order</span>
                    <span className="font-semibold text-green-700">{format(customer?.last_ordered , 'dd MMM yyy')}</span>
                </div>

            </div>
        </div>
    </div>
)
}

export default AdminCustomerPreviewComponent