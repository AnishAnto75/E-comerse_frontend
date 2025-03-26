import React, { useEffect, useRef, useState } from 'react'
import {Button, Card, CardBody, CardHeader, Input} from '@material-tailwind/react'
import { debounce } from 'lodash'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../LoadingSpinner'
import { adminCreateBanner, adminEditBanner, getAdminCreateBannerError, getAdminCreateBannerStatus, getAdminEditBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'
import { toast } from 'react-toastify'

const AdminEditCarouselBannerComponent = ({banner}) => {

    const dispatch = useDispatch()

    const [addProductModal, setAddProductModal] = useState(false)

    const editStatus = useSelector(getAdminEditBannerStatus)

    const [heading , setHeading] = useState(banner.carousel?.heading)
    const [products, setProducts] = useState(banner.carousel?.products ? banner.carousel?.products : [])

    const [product, setProduct] = useState(null)                                // for storing the data before adding the product
    const [image, setImage] = useState('')

    const [product_search_barcode, setProductSearchBarcode] = useState('')
    const [product_search_name, setProductSearchName] = useState('')

    const [searchedProducts , setSearchedProducts] = useState(null)

    const reset = ()=>{
        setHeading(banner.carousel?.heading)
        setProducts(banner.carousel?.products ? banner.carousel?.products : [])
        setProduct(null)
        setImage('')
        setProductSearchBarcode('')
        setProductSearchName('')
        setSearchedProducts(null)
    }

    const addProduct = ()=>{
        if(!image){toast.warn("Image is required"); return}
        if(!product){toast.warn("select the product");return}

        const data = {image , product_id: product}
        setProducts([...products, data])

        setProduct(null)
        setImage('')
        setSearchedProducts(null)
        setProductSearchBarcode('')
        setProductSearchName('')
        setAddProductModal(false)
    }

    const searchByBarcode = async(e)=>{
        if (e.key === "Enter" && product_search_barcode){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/product-barcode/${product_search_barcode}`)
                if(res.data?.data){
                    setProduct(res.data.data)
                    setProductSearchBarcode(res.data.data?.product_barcode? res.data.data?.product_barcode : '' )
                    setProductSearchName(res.data.data?.product_name ? res.data.data?.product_name : '')
                }
            } catch (error) {
                console.error("error in searchByBarcode :" , error)
            } 
        }
    }

    const searchProductByName = debounce(async (term) => {
        if(term.length > 2){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/product-name/${term}`)
                setSearchedProducts(res.data.data) 
            } catch (error) {
                console.error("error in searchProductByName :" , error)
            }
        }
    },500)

    const handleSearchProductName = (e) => {
        const term = e.target.value;
        setProductSearchName(term)
        if(term.length > 2){searchProductByName(term)}
        else{setSearchedProducts(null)}
    }

    const clickName = (product)=>{
        setProduct(product)
        setProductSearchBarcode(product?.product_barcode? product?.product_barcode : '' )
        setProductSearchName(product?.product_name ? product?.product_name : '')
        setSearchedProducts(null)
    }

    const removeProduct = (index) => {
        const newArray = products.filter((_, i) => i !== index)
        setProducts(newArray)
    }

    const createCardBanner = async()=>{
        if(!heading){return toast.warn("Heading required")}
        const prdts = products?.map((product)=> {
            return {product_id : product.product_id._id, image: product.image}
        })
        const data = {banner_id: banner.banner_id , banner_type: "carousel", carousel:{ products: prdts, heading }}
        console.log(data)
        dispatch(adminEditBanner(data))
    }

  return (
    <div>
        <div className='grid grid-cols-5 gap-5'>
            <div className='col-span-2'>
                <Input variant="standard" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} />
            </div>
            <div className='col-span-1 relative'>
                <Button onClick={()=>reset()} variant='gradient' size='sm' className='top-3 absolute tracking-wider'>Reset</Button>
            </div>
        </div>
        <div className='mt-5'>
            <div className='grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 mt-7'>
                {products?.map((product, index)=>(
                    <div key={index} className=' col-span-2 h-52 relative rounded-lg'>
                        <div onClick={()=>removeProduct(index)} className='absolute hover:cursor-pointer hover:bg-opacity-70 top-1 right-1 bg-white text-red-500 z-10 rounded-full hover:bg-red-100 p-1  '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                        </div>
                        <div className="h-full"><img src={ !product?.image ? product.image : "/W1711CHOI_laundry Detergents_ps.webp"} alt={product.product_id.product_name} className="h-full w-full object-cover rounded-lg "/></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                        <div className='absolute text-green-50 font-poppins bottom-5 left-5'>{product.product_id.product_name}</div>
                    </div>
                ))}
                <div onClick={()=>setAddProductModal(true)} className='col-span-2 h-52 relative rounded-lg border-4 border-dashed border-blue-200 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="h-full w-full text-blue-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                </div>
            </div>
        </div>
        { addProductModal &&
            <div className="fixed inset-0 overflow-y-auto z-50 ">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"/>
                <div className="flex min-h-screen items-center justify-center p-4 text-center">
                    <div className="inline-block w-4/5 transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"onClick={(e) => e.stopPropagation()} >
                        <button onClick={()=>setAddProductModal(false)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-red-50 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                        <div>Add Product</div>
                        <div className='lg:flex space-y-5 lg:space-y-0 md:mt-5 pt-5 gap-5'>
                            <Input variant="standard" size="md" label="Image" color='blue' value={image} onChange={(e)=>setImage(e.target.value)} className='w-full ' />
                            <Input variant="standard" color='blue' value={product_search_barcode} onChange={(e)=>setProductSearchBarcode(e.target.value)} onKeyDown={(e) => searchByBarcode(e)} size="md" label="Product Barcode"/>
                            <div className='w-full relative '>
                                <Input variant="standard" color='blue' value={product_search_name} onChange={(e)=>handleSearchProductName(e)} size="md" label="Product Name" className=''/>
                                {searchedProducts?.length ? 
                                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                                        {searchedProducts.map((product, index)=>(
                                            <div key={index} onClick={()=>clickName(product)} className="hover:bg-gray-100 text-xs font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{product.product_name}</div>
                                        ))}
                                    </div>
                                    :''
                                }
                            </div>
                            <Button disabled= {!heading || !product } loading={editStatus == 'loading'} onClick={()=>addProduct()} color='blue' size='sm' variant='gradient' className='text-center min-w-20'>ADD</Button>
                        </div>
                    </div>
                </div>
            </div>
        }
        <Button disabled={!heading || !products.length} onClick={()=>createCardBanner()} color='blue' variant='gradient' className='min-w-32 text-center mt-5 '>Submit</Button>
    </div>
  )
}

export default AdminEditCarouselBannerComponent