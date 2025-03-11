import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../../../components/clientComponents/productComponents/ProductCard'
import { toast } from 'react-toastify'
import axios from 'axios'

const AllProductPages = () => {

    const [loading , setLoading] = useState(false)
    const [products , setProducts ] = useState([])
    const [error , setError] = useState(false)
    const handleRef = useRef(true)

    useEffect(()=>{
        const fetch = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}product/all-products`)
                console.log("fetchAllProduct payload : " , res.data)        
                setProducts(res.data.data)
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

    if(loading){return <div>loading...</div>}
    if(error){return <div>Error Occured Kindly refresh the page</div>}
    if(!products.length){return <div>No Products</div>}

  return (
    <div className='grid gap-1 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 m-3 overflow-auto min-w-80'>
        {products?.map((product, index) => 
            <ProductCard key={index} product= {product}/>
        )}
    </div>
  )
}

export default AllProductPages