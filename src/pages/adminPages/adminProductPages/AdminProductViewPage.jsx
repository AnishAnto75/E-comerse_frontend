import axios from "axios";
import React ,{ useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PageNotFoundPage from "../../PageNotFoundPage";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent";

const AdminProductViewPage = () => {
    const {id} = useParams()

    const [loading , setLoading] = useState(false)
    const [product , setProduct ] = useState()
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/product_id/${id}`)
                console.log("adminFetchProduct payload : " , res.data)
                setProduct(res.data.data)
            } catch (error){
                setError(true)
                toast.error(error.response?.data?.message)
                console.error("error in adminFetchProduct :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}
    if(!product){return <div className="w-full"> <PageNotFoundPage/> </div>}

  return (
    <div className="bg-slate-100 w-full p-2 min-h-screen">
        <div className="bg-white h-44"></div>
        <div>
            <div className="py-3 text-2xl">PRODUCT DETAILS</div>

            <div>Brand: {product.product_brand}</div>
            <div>Bracode: {product.product_barcode}</div>
            <div>Name: {product.product_name}</div>
            <div>Group: {product.product_group}</div>
            <div>Category: {product.product_category}</div>
            <div>Unit Of Messure: {product.product_UOM}</div>
            <div>HSN Code : {product.product_hsn_code}</div>
            <div>Min OQ : {product.product_min_order_quantity}</div>
            <div>Max OQ : {product.product_max_order_quantity}</div>
            <div>Out Of Stock : {product.product_out_of_stock}</div>
            <div>Low In Stock : {product.product_low_in_stock}</div>
            <div>Description : {product.product_description}</div>
            <div>Net Unit : {product.product_net_unit}</div>
            <div>Offer : {product.product_offer.unit ? product.product_offer.unit : "NAN"} - {product.product_offer.discounted_price ? product.product_offer.discounted_price : 'NAN'}</div>
            <div>Total Stock: {product.product_total_stock}</div>
            <div>Total Units Sold : {product.product_total_unit_sold}</div>
            <div>HighLights {product.product_highlights.map((highlight, index)=> <li key={index}>{highlight}</li>)}</div>
            <div>Added By: {product.product_added_by}</div>

            <div className="py-3 text-2xl">STOCK</div>
            <div className="px-5 flex gap-5">
                {product.product_stock?.map((stock, index)=>(
                    <div key={index} className="border p-5 bg-white">
                        <div>Added by : {stock.added_by}</div>
                        <div>Batch No :  {stock.batch_no}</div>
                        <div>Best Before : {stock.best_before}</div>
                        <div>Expire Date : {stock.expire_date}</div>
                        <div>Manufacture Date : {stock.manufacture_date}</div>
                        <div>GST : {stock.gst}</div>
                        <div>MRP : {stock.mrp}</div>
                        <div>Other Expences : {stock.other_expences}</div>
                        <div>Price : {stock.price}</div>
                        <div>Purchase Cost : {stock.purchase_cost}</div>
                        <div>Quantity : {stock.quantity}</div>
                        <div>Stock : {stock.stock}</div>
                        <div>Hidden : {String(stock.hidden)}</div>
                    </div>
                ))}
            </div>

            <div className="py-3 text-2xl">RATINGS</div>
            <div className="py-3 text-2xl">REVIEW</div>
            <div className="py-3 text-2xl">VARIENT</div>
        </div>


    </div>
  )
}

export default AdminProductViewPage