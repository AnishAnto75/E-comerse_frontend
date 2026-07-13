import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../../../components/clientComponents/productComponents/ProductCard'
import { toast } from 'react-toastify'
import axios from 'axios'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent'
import useCartStore from '../../../store/cartStore'

const ProductPage = () => {

    const [loading , setLoading] = useState(false)
    const [products , setProducts ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/product`)
                console.log("fetchAllProduct payload : " , res.data)        
                setProducts(res.data.data.products)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in fetchAllProduct :" , error)
            } finally { setLoading(false) }
        }
        if(handleRef.current) {
            fetch()
            handleRef.current = false
        }
    } , [])

    if(loading){return <LoadingSpinner />}
    if(error){return <ErrorComponent />}
    if(!products.length){return <div>No product found</div>}

  return (
    <div className='min-h-screen'>
        <div className='grid gap-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 p-3 overflow-auto min-w-80'>
            {products?.map((product, index) => 
                <ProductCard key={index} product= {product}/>
            )}
        </div>
    </div>
  )
}

export default ProductPage