import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../LoadingComponent'
import axios from 'axios'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'

const AdminCustomerPreviewComponent = ({user_id}) => {
    const handleRef = useRef(true)
    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    // const [customer , setCustomer ]  = useState(null) 
    
    // useEffect(() => {
    //     if (!user_id) return;
    //     const fetchCustomer = async () => {
    //         try {
    //             setLoading(true);
    //             setError(false);
    //             const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/customer_id/${user_id}`)
    //             setCustomer(res.data.data);
    //             console.log("fetchCustomer response:", res.data);
    //         } catch (error) {
    //             console.error("fetchCustomer:", error);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchCustomer();
    // }, [user_id]);

    const customer = {
        user_id: "USR070232301004",
        email: "customer3@gmail.com",
        name: "Anish Anto",
        gender: "others",
        DOB: "2005-12-05T12:17:55.639Z",
        phoneNumber: 8148222505,
        order_id: [],
        status: "blocked",
        blocked_reason: null,
        ratings: 3,
        deleted: false,
        deletedAt: null,
        address: [],
        cart: [],
        createdAt: "2026-07-02T12:17:55.639Z",
        updatedAt: "2026-07-02T12:17:55.639Z",
        total_spending : 4587,
        last_ordered: "2026-07-02T12:17:55.639Z",
        last_login: "2026-07-02T12:17:55.639Z",
    }


    if(loading){return <LoadingComponent/>}
    if(error){ return <div>Error</div>}
    if(!customer){return <div>Error</div>}

return (
    <div className="p-2 font-inter">
        <div className='text-xl font-semibold text-gray-800'>Customer Preview</div>
        <div className='text-xl font-semibold text-gray-600 mt-3 pl-3 pt-0.5'>#{customer.user_id}</div>
        <div className="flex relative justify-center mt-4 rounded-3xl py-5 flex-col items-center bg-gray-100/70">
            <div className={`absolute w-6 h-6 rounded-full top-5 right-5 ${ customer.deleted?"bg-gray-800" : customer.status == "active" ? "bg-blue-500" : customer.status == "inactive" ? "bg-amber-500" : customer.status == "blocked" ? "bg-red-500" : "" }`} title={customer.deleted ? "Deleted" : customer.status}/>
            <div className="w-36 h-36 rounded-full bg-blue-100 text-8xl font-inter flex items-center justify-center  uppercase text-blue-700 font-bold">{customer.name?.charAt(0)}</div>
            <div className='flex gap-1.5 mt-1' title='Ratings'>
                {Array.from({ length: customer?.ratings }).map((_, index) => (
                    <IoIosStar key={index} className="h-6 w-6 text-amber-400"/>
                ))}
            </div>
            <div className='text-xl font-semibold text-gray-900 mt-1 pt-0.5 line-clamp-1'>{customer.name}</div>
            <div className='text-lg font-semibold text-gray-800 mt-2'>{customer.email}</div>
        </div>
        <div className='flex mt-4 gap-2 w-full justify-center'>
            <span className={`px-3 py-1 rounded-xl border cursor-default capitalize ${customer.gender == "male" ? "bg-blue-50 text-blue-600" : customer.gender == "female" ? "bg-pink-50 text-pink-600" : " bg-purple-50 text-purple-700"}`} title='gender'>{customer.gender}</span>
            <span className="px-3 py-1 rounded-xl border bg-blue-50 text-blue-700 cursor-default" title='DOB'>{customer?.DOB ? format(customer?.DOB , 'dd/MM/yyy') : "--"}</span>
        </div>

        <div className="mt-4">
            <h3 className="font-medium tracking-wide text-[17px] text-gray-900">Customer Overview</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-600">TOTAL SPENDING</p>
                    <h2 className="text-2xl font-bold text-green-700 mt-2">₹{customer.total_spending?.toLocaleString()}</h2>
                </div>
                <div className="rounded-2xl bg-indigo-50 p-4">
                    <p className="text-sm font-medium uppercase text-indigo-600">Avg Order Value</p>
                    <h2 className="text-2xl font-bold text-indigo-700 mt-2">₹{(customer.total_spending / (customer?.order_id?.length ? customer?.order_id?.length : 1 )).toLocaleString()}</h2>
                </div>
                <div className="rounded-2xl bg-violet-50 p-4">
                    <p className="text-sm font-medium uppercase text-violet-600">Cart Products</p>
                    <h2 className="text-2xl font-bold text-violet-600 mt-2">{customer?.cart?.length}</h2>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-sm font-medium uppercase text-amber-600">Total Orders</p>
                    <h2 className="text-2xl font-bold text-amber-600 mt-2">{customer.order_id?.length}</h2>
                </div>
            </div>
        </div>

        <div className="mt-5">
            <h3 className="font-medium tracking-wide text-[17px] text-gray-900">Customer Details</h3>
            <div className="space-y-3 mt-3">
                <div className="flex justify-between items-center rounded-xl bg-sky-50 px-4 py-3">
                    <span className="font-medium text-sky-600">Phone Number</span>
                    <span className="font-semibold text-sky-700">{customer.phoneNumber ? customer.phoneNumber : "--"}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-cyan-50 px-4 py-3">
                    <span className="font-medium text-cyan-600 ">Customer Since</span>
                    <span className="font-semibold text-cyan-700">{format(customer?.createdAt , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-teal-50 px-4 py-3">
                    <span className="font-medium text-teal-600">Last Order</span>
                    <span className="font-semibold text-teal-700">{format(customer?.last_ordered , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-indigo-50 px-4 py-3">
                    <span className="font-medium text-indigo-800">Last Login</span>
                    <span className="font-semibold text-indigo-800">{format(customer?.last_login , 'dd MMM yyy')}</span>
                </div>

                <div className="flex justify-between items-center rounded-xl bg-purple-50 px-4 py-3">
                    <span className="font-medium text-purple-600">Saved Addresses</span>
                    <span className="font-semibold text-purple-700">{customer.address.length}</span>
                </div>
            </div>
        </div>
    </div>
)
}

export default AdminCustomerPreviewComponent