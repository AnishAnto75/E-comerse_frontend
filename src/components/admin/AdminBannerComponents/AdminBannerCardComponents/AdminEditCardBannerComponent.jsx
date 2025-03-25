import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import axios from 'axios'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminEditBanner, getAdminEditBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'
import { toast } from 'react-toastify'

const AdminEditCardBannerComponent = ({banner}) => {

    const dispatch = useDispatch()

    const editStatus = useSelector(getAdminEditBannerStatus)

    const [heading, setHeading] = useState(banner.card?.heading)
    const [products, setProducts] = useState(banner.card?.product_id ? banner.card.product_id : [])     

    const [addProductModal, setAddProductModal ] = useState(false)

    const [product_search_name, setProductSearchName] = useState('')
    const [searchedProducts , setSearchedProducts] = useState(null)

    const clickName = (product)=>{
        setProducts([...products, product])
        setSearchedProducts(null)
        setProductSearchName('')
        setAddProductModal(false)
    }

    const requestProductByName = debounce(async (term) => {
        if(term.length > 1){
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
        if(term.length>1){requestProductByName(term)}
        else{setSearchedProducts(null)}
    }

    const reset = ()=>{
        setHeading(banner.card?.heading)
        setProducts(banner.card?.product_id ? banner.card.product_id : [])
    }

    const removeProduct = (index)=>{
        const newArray = products.filter((_, i) => i !== index)
        setProducts(newArray)
    }

    const handleEditBanner = ()=>{
        const product_id = products.map(card => { return card._id })
        if(!heading){return toast.warn("Heading required")}
        if(!product_id.length){return toast.warn("select card")}
        const data = {banner_id: banner.banner_id , banner_type: "card", card:{ product_id, heading }}
        console.log(data)
        dispatch(adminEditBanner(data))
    }

  return (
    <div className='mt-5'>
        <div className='grid grid-cols-5 gap-5'>
            <div className='col-span-2'>
                <Input variant="standard" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} />
            </div>
            <div className='col-span-1 relative'>
                <Button onClick={()=>reset()} variant='gradient' size='sm' className='top-3 absolute tracking-wider'>Reset</Button>
            </div>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-7'>
            {products?.map((product, index)=>(
                <div key={index} className='col-span-1 h-52 relative rounded-lg'>
                    <div onClick={()=>removeProduct(index)} className='absolute hover:cursor-pointer bg-opacity-70 top-1 right-1 bg-white text-red-500 z-10 rounded-full hover:bg-red-100 p-1  '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </div>
                    <div className="h-full"><img src={ product?.product_photos ? product.product_photos : "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"} alt={product?.product_name} className="h-full w-full object-cover rounded-lg"/></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                    <div className='absolute text-green-50 font-poppins text-xs bottom-5 left-4 right-3 line-clamp-2'>{product.product_name}</div>
                </div>
            ))}
            <div onClick={()=>setAddProductModal(true)} className='col-span-1 h-52 relative rounded-lg border-4 border-dotted border-blue-200 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="h-full w-full text-blue-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </div>
            { addProductModal &&
                <div className="fixed inset-0 overflow-y-auto z-50 ">
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"/>
                    <div className="flex min-h-screen items-center justify-center p-4 text-center">
                        <div className="inline-block w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all" onClick={(e) => e.stopPropagation()} >
                            <button onClick={()=>setAddProductModal(false)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-red-50 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                            <div>Add Product</div>
                            <div className='relative mt-3'>
                                <Input variant="standard" label="Product Name" color='blue' value={product_search_name} onChange={(e)=>handleSearchProductName(e)} />
                                {searchedProducts?.length ? 
                                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                                        {searchedProducts.map((product, index)=>(
                                            <div key={index} onClick={()=>clickName(product)} className="hover:bg-gray-100 text-sm font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{product.product_name}</div>
                                        ))}
                                    </div> 
                                    :''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        <div className='mt-5 flex gap-5'>
            <Button loading={editStatus == 'loading'} color='blue' onClick={()=>handleEditBanner()} variant='gradient' className='w-1/5'>Submit</Button>
        </div>
    </div>
  )
}

export default AdminEditCardBannerComponent