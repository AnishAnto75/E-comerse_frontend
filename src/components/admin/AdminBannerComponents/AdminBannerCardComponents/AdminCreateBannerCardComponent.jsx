import React, { useRef, useState } from 'react'
import {Button, Card, CardBody, CardHeader, Input} from '@material-tailwind/react'
import { debounce } from 'lodash'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminCreateBannerCardComponent = ({banner_id}) => {
    const navigate = useNavigate()

    const [heading , setHeading] = useState('')
    const [product_id, setProductId] = useState([])

    const [products, setProducts] = useState([])
    const [product_search_barcode, setProductSearchBarcode] = useState('')
    const [product_search_name, setProductSearchName] = useState('')
 
    const [searchedProducts , setSearchedProducts] = useState(null)

    const searchByBarcode = async(e)=>{
        if (e.key === "Enter" && product_search_barcode){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/product-barcode/${product_search_barcode}`)
                if(res.data?.data){
                    setProductSearchBarcode('')
                    setProductSearchName('')
                    setProducts([...products , res.data.data])
                    setProductId([...product_id , res.data.data._id])
                }
            } catch (error) {
                console.error("error in searchByBarcode :" , error)
            } 
        }
    }

    const requestProductByName = debounce(async (term) => {
        if(term.length > 2){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/product-name/${term}`)
                setSearchedProducts(res.data.data) 
            } catch (error) {
                console.error("error in requestProductByName :" , error)
            }
        }
    },500)

    const handleSearchProductName = (e) => {
        const term = e.target.value;
        setProductSearchName(term)
        if(term.length){requestProductByName(term)}
        else{setSearchedProducts(null)}
    }

    const clickName = (product)=>{
        setProductSearchBarcode('')
        setProductSearchName('')
        setProducts([...products , product])
        setProductId([...product_id , product._id])
        setSearchedProducts(null)
    }

    const removeProduct = (index) => {
        const newArray = products.filter((_, i) => i !== index)
        const newIds = product_id.filter((_, i) => i !== index)
        setProducts(newArray)
        setProductId(newIds)
    }

    // change to slice
    const createCardBanner = async()=>{
        if(banner_id && product_id.length && heading){
            try {
                const data = {banner_id , banner_type: "card", card:{ product_id, heading }}
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create-banner`, {data})
                console.log("createCardBanner response: " , res.data)
                toast.success(res.data.message)
                navigate('/admin/banners')
            } catch (error) {
                toast.error(error.response.data?.message)
                console.error("error in requestProductByName :" , error)
            }
        }
    }

  return (
    <div>
        <Input variant="standard" size="lg" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} className='lg:w-5/12' />
        <div className='lg:w-8/12 lg:flex md:mt-5 gap-5'>
            <Input variant="standard" value={product_search_barcode} onChange={(e)=>setProductSearchBarcode(e.target.value)} onKeyDown={(e) => searchByBarcode(e)} size="md" label="Product Barcode"/>
            <div className='w-full relative '>
                <Input variant="standard" value={product_search_name} onChange={(e)=>handleSearchProductName(e)} size="md" label="Product Name" className=''/>
                {searchedProducts?.length ? 
                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                        {searchedProducts.map((product, index)=>(
                            <div key={index} onClick={()=>clickName(product)} className="hover:bg-gray-100 cursor-pointer p-1 rounded-lg">{product.product_name}</div>
                        ))}
                    </div>
                    :''
                }
            </div>
            <Button disabled={!banner_id || !product_id.length || !heading} onClick={()=>createCardBanner()} color='blue' variant='gradient' className='min-w-32 text-center mt-5 lg:mt-0'>Submit</Button>
        </div>
        {products?.length ?  
            <div className='mt-5'>
                <div className='flex py-1 overflow-x-auto gap-2 mx-auto '>
                {products?.map((product, index)=>(  
                    <Card key={index} className="h-72 min-w-60 max-w-60 relative">
                        <div onClick={()=>removeProduct(index)} className='absolute hover:cursor-pointer hover:bg-opacity-70 top-2 right-2 bg-white text-red-500 z-20 rounded-full hover:bg-red-100  '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                        </div>
                        <CardHeader floated={false} className="h-44">
                            <img src={ product?.product_photos ? product.product_photos : "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"} alt={product?.product_name} className="h-full w-full object-cover"/>
                        </CardHeader>
                        <CardBody>
                            <div className="text-sm line-clamp-2">{product?.product_name}</div>
                        </CardBody>
                  </Card>
                ))}
                </div>
            </div>
        :
        <div className='content-center text-center h-[calc(100vh-450px)] text-gray-500'>Select Product</div>
        }
    </div>
  )
}

export default AdminCreateBannerCardComponent