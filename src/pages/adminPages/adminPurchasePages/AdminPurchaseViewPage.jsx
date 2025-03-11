import axios from "axios";
import React ,{ useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PageNotFoundPage from "../../PageNotFoundPage";

const AdminPurchaseViewPage = () => {
    const {id} = useParams()

    const [loading , setLoading] = useState(false)
    const [purchase , setPurchase ] = useState(null)
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/purchase/${id}`)
                console.log("adminFetchPurchase payload : " , res.data)
                setPurchase(res.data.data)
            } catch (error){
                setError(true)
                toast.error("Internal Server Error")
                console.error("error in adminFetchPurchase :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}
    if(!purchase){return <div className="w-full"> <PageNotFoundPage/> </div>}

  return (
    <div className="w-full px-5 min-h-screen">
        <div className="text-2xl my-5">PURCHASE DETAILS</div>
        <div>ID: {purchase._id}</div>
        <div>Supplier Name: {purchase.supplier_id}</div>
        <div>Invoice No : {purchase.invoice_no}</div>
        <div>paid: {purchase.payment_done ? "Done" : "Pending"}</div>
        <div>Entried at: {purchase.createdAt}</div>
        <div>Total Amount: {purchase.total_purchase_amount}</div>
        <div className="text-xl my-2 underline">Products</div>
        <div className="pl-5 flex gap-5">
           {purchase.products?.map((product, index)=>(
            <div key={index} className="border-2 p-5">
                <div>Batch No : {product.batch_no}</div>
                <div>Best Before : {product.best_before}</div>
                <div>Expire Date : {product.expire_date}</div>
                <div>Manufacture Date : {product.manufacture_date}</div>
                <div>GST : RS {product.gst}</div>
                <div>MRP : RS {product.mrp}</div>
                <div>Other Expence : RS {product.other_expences}</div>
                <div>Price : RS {product.price}</div>
                <div>Purchase Cost : RS {product.purchase_cost}</div>
                <div>Quantity: {product.quantity}</div>
                <div>Quantity Recieved: {product.quantity_recieved}</div>
                <div>Barcode : {product.product_barcode}</div>
                <div>Name : {product.product_name}</div>
            </div>
           ))}
        </div>
    </div>
  )
}

export default AdminPurchaseViewPage