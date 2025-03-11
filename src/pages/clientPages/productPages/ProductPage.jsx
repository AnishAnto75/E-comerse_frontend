import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    
    const {id} = useParams()

    const [product , setProduct] = useState('')
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)
    const handleRef = useRef(true)
    
    useEffect(()=>{
        if(handleRef.current){
            fetch()
            handleRef.current = false
        }
    },[])

    const fetch = async()=>{
        const PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}product/${id}`
        try {
            setLoading(true)
            const res = await axios.get(PRODUCT_URL)
            console.log(res)
            if (res){
                console.log(res.data)
                setProduct(res.data.data)
            }
        } catch (err) {
            console.log("error",err.response.data)
            setError(err.response.data)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className='p-5'>loading... </div>
        )
    }
    if(error){
        return (
            <div className='p-5'>{error.message}</div>
        )
    }
  return (
    <div>{JSON.stringify(product)}</div>
  )
}

export default ProductPage