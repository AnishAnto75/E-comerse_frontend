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

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {name, phoneNumber}    
        return
    }

    console.log(orders)

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
                            { orders.map(order => 
                                <div className='border p-5 rounded' key={order._id}>
                                    <div>{order._id}</div>
                                </div>
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