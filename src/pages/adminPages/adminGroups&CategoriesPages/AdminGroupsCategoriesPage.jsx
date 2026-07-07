import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Avatar} from "@material-tailwind/react";
import { debounce } from 'lodash';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { IoIosAddCircleOutline} from "react-icons/io";

const AdminProductPage = () => {
    
    const navigate = useNavigate()

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
        
    const [groups, setGroups] = useState(null)
    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    const [ selectedGroup , setSelectedGroup] = useState('')
    const [ selectedCategory, setSelectedCategory] = useState('')

    const handleRef = useRef(true) 

    useEffect(()=>{
        const fetchForGroupsCategoriesPage = async()=>{
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product-group/all-groups`)
                console.log("fetchForGroupCategoriesPage payload : " , res.data)        
                setGroups(res.data?.data)
            } catch (error) {
                setError(true)
                toast.error(error.response?.data?.message)
                console.log("error in fetchForGroupCategoriesPage :" , error)
            } finally { setLoading(false) }
        }  
        if(handleRef.current) {
            fetchForGroupsCategoriesPage()
            handleRef.current = false
        }
    } , [])

    const fetchCategoriesByGroup = async(id)=>{
        try {
            setLoading(true)
            setSelectedGroup(id)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product-category/group-id/${id}`)
            console.log("fetchCategoriesByGroup payload : " , res.data)        
            setCategories(res.data?.data)
        } catch (error) {
            setError(true)
            toast.error(error.response?.data?.message)
            console.log("error in fetchCategoriesByGroup :" , error)
        } finally { setLoading(false) }
    }
    
    const fetchProductByCategories = async(id)=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/product/category/${id}`)
            console.log("fetchProductByCategories payload : " , res.data)        
            setProducts(res.data?.data)
            setSelectedCategory(id)
        } catch (error) {
            setError(true)
            toast.error(error.response?.data?.message)
            console.log("error in fetchProductByCategories :" , error)
        } finally { setLoading(false) }
    }

    if(loading){return <LoadingSpinner/>}
    if(error){return <ErrorComponent/>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className='p-2 w-full bg-white'>
        <div className="w-full p-2">
            <div className="rounded-none p-4">
                <div className="flex justify-end gap-4 ">
                    <div className="flex shrink-0 items-center gap-2">
                        <Button onClick={()=>navigate(`new-group`)} size="sm" color='blue' variant='gradient'>Add Group</Button>
                    </div>
                </div>
            </div>
            <div className="flex p-3 bg-gray-50 min-h-screen rounded-lg">
                <div>
                    <div className='text-xl border-b-2 border-gray-400 p-2 text-gray-700'>Groups</div>
                    <div className='p-1 flex flex-col gap-2 pt-3 text-gray-800 border-r-2 border-gray-400 bg-white'>
                        {groups?.map((group)=>
                            <div key={group._id} onClick={()=>fetchCategoriesByGroup(group._id)} className={`flex items-center gap-2 py-2 px-5 border-b-2 border-gray-300 hover:bg-gray-100 hover:cursor-pointer ${selectedGroup == group._id && 'bg-gray-100 rounded-xl'}`}>
                                <Avatar src={group.group_image ? group.group_image : '/3-08.webp'} alt={group.group_name} size="md" />
                                <div>{group.group_name}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='px-5'>
                    <div className='text-xl border-b-2 border-gray-400 p-2 text-gray-700'>Categories</div>
                    <div className='p-1 flex flex-col gap-2 pt-3 text-gray-800 border-r-2 border-gray-400 bg-white'>
                        <div onClick={()=>navigate('new-category')} className='flex items-center gap-2 py-4 px-5 border-b-2 border-gray-300 hover:bg-gray-100 hover:cursor-pointer'>
                            <IoIosAddCircleOutline className='text-4xl text-gray-600'/> Create Category
                        </div>
                        {categories?.map((category)=>
                            <div key={category._id} onClick={()=>fetchProductByCategories(category._id)} className={`flex items-center gap-2 py-2 px-5 border-b-2 border-gray-300 hover:bg-gray-100 hover:cursor-pointer ${selectedCategory == category._id && 'bg-gray-100 rounded-xl'}`}>
                                <Avatar src={category.category_image ? category.category_image : '/3-08.webp'} alt={category.category_name} size="md" />
                                {category.category_name}
                            </div>
                        )}
                    </div>
                </div>
                <div className='px-5'>
                    <div className='text-xl border-b-2 border-gray-400 p-2 text-gray-700'>Products</div>
                    <div className='p-1 flex flex-col gap-2 pt-3 text-gray-800 bg-white min-w-96'>
                        <div onClick={()=>navigate('/admin/products/new-product')} className='flex items-center gap-2 py-4 px-5 border-b-2 border-gray-300 hover:bg-gray-100 hover:cursor-pointer'>
                            <IoIosAddCircleOutline className='text-4xl text-gray-600'/> Add Product
                        </div>
                        {products?.map((product)=>
                            <div key={product._id} onClick={()=>navigate(`/admin/products/product_id/${product.product_barcode}`)} className="flex items-center gap-2 py-2 px-5 border-b hover:bg-gray-100 hover:cursor-pointer">
                                <Avatar src={product?.product_photos ? product.product_photos : '/3-08.webp'} alt={product.product_brand} size="md" />
                                <div className="flex flex-col text-sm">
                                    <div className="text-blue-gray-700 line-clamp-1">{product.product_name}</div>
                                    <div className="text-blue-gray-700 opacity-70">{product.product_barcode}</div>
                                </div>
                            </div>
                        )}
                        <div className={products && 'hidden'}>Select Group & Categories</div>
                    </div>
                </div>                                 
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminProductPage