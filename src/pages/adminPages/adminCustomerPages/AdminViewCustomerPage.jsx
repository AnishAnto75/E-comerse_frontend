import axios from "axios";
import React ,{ useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PageNotFoundPage from "../../PageNotFoundPage";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";

const AdminViewCustomerPage = () => {
    const {id} = useParams()

    const [loading , setLoading] = useState(false)
    const [user , setUser ] = useState()
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin//customer/customer_id/${id}`)
                console.log("adminFetchUser payload : " , res.data)
                setUser(res.data.data)
            } catch (error){
                setError(true)
                toast.error(error.response?.data?.message)
                console.error("error in adminFetchUser :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetchUser()
            handleRef.current = false
        }
    } , [])

    const blockUser = async()=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/block/customer_id/${id}`)
            console.log("blockUser payload : " , res.data)
            setUser(res.data.data)
        } catch (error){
            setError(true)
            toast.error(error.response?.data?.message)
            console.error("error in blockUser :" , error)
        } finally { setLoading(false) }
    }

    const unBlockUser = async()=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/customer/unBlock/customer_id/${id}`)
            console.log("unBlockUser payload : " , res.data)
            setUser(res.data.data)
        } catch (error){
            setError(true)
            toast.error(error.response?.data?.message)
            console.error("error in unBlockUser :" , error)
        } finally { setLoading(false) }
    }



    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}
    if(!user){return <div className="w-full"> <PageNotFoundPage/> </div>}

  return (
    <div className="bg-slate-100 text-lg w-full p-2 min-h-screen">
        <div>User id : {user.user_id}</div>
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <div>gender: {user.gender}</div>
        <div>Phone No. : {user.phoneNumber}</div>
        <div>Blocked : {String(user.blocked)}</div>
        <div>Deleted : {String(user.deleted)}</div>
        <div className="my-5 mx-3">
            {user.blocked ? 
                <button onClick={()=>unBlockUser()} className="bg-blue-500 text-white rounded-xl py-2 px-3">Unblock</button>
            :
                <button onClick={()=>blockUser()} className="bg-blue-500 text-white rounded-xl py-2 px-3">Block</button>
            }
        </div>
    </div>
  )
}

export default AdminViewCustomerPage