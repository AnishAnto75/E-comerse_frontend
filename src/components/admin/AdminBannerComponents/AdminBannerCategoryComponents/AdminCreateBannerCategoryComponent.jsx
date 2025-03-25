import React, { useEffect, useRef, useState } from 'react'
import {Button, Card, CardBody, CardHeader, Input, Tooltip} from '@material-tailwind/react'
import { debounce } from 'lodash'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../LoadingSpinner'
import { adminCreateBanner, getAdminCreateBannerError, getAdminCreateBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'

const AdminCreateBannerCategoryComponent = ({banner_id}) => {
    const dispatch = useDispatch()

    const status = useSelector(getAdminCreateBannerStatus)
    const error = useSelector(getAdminCreateBannerError)

    const [heading , setHeading] = useState('')
    const [category_id , setCategoryId] = useState([])

    const [categories, setCategories] = useState([])
    const [category_search_name, setCategorySearchName] = useState('')
    const [searchedCategories , setSearchedCategories] = useState(null)

    const requestCategoriesByName = debounce(async (term) => {
        if(term.length > 1){
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create/category-name/${term}`)
                console.log("requestCategoriesByName: ",res.data)
                setSearchedCategories(res.data.data) 
            } catch (error) {
                console.error("error in requestCategoriesByName :" , error)
            }
        }
    },500)

    const handleSearchCategoryName = (e) => {
        const term = e.target.value;
        setCategorySearchName(term)
        if(term.length>1){requestCategoriesByName(term)}
        else{setSearchedCategories(null)}
    }

    const clickName = (category)=>{
        setCategories([...categories, category])
        setCategoryId([...category_id, category._id])
        setSearchedCategories(null)
        setCategorySearchName('')
    }

    const createCardBanner = async()=>{
        if(category_id && category_id.length && heading){
            const data = {banner_id , banner_type: "category", category:{ category_id, heading }}
            dispatch(adminCreateBanner(data))
        }
    }

    if(status === 'loading'){return <LoadingSpinner/>}
    if(error){ return <div>Error occured please refresh the page</div>}

  return (
    <div>
        <div className='flex gap-2 w-10/12'>
            <Input variant="standard" label="Heading" color='blue' value={heading} onChange={(e)=>setHeading(e.target.value)} className='' />
            <div className='w-full relative '>
                <Input variant="standard" color='blue' value={category_search_name ? category_search_name : ''} onChange={(e)=>handleSearchCategoryName(e)} label="Category Name" className=''/>
                {searchedCategories?.length ? 
                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                        {searchedCategories.map((category, index)=>(
                            <div key={index} onClick={()=>clickName(category)} className="hover:bg-gray-100 text-xs font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{category.category_name}</div>
                        ))}
                    </div>
                    :''
                }
            </div>
        </div>
        <Button disabled={!banner_id || !heading || !category_id.length} onClick={()=>createCardBanner()} color='blue' variant='gradient' className='min-w-32 text-center mt-5'>Submit</Button>
        {categories.length ?  
        <div className='mt-5'>
           <div className='border grid grid-cols-12 rounded-md p-5 bg-gradient-to-br from-green-50 via-green-200 to-green-300 min-h-[470px] mt-5'>
            <div className='col-span-3 p-10'>
                <div className='text-3xl font-bold font-poppins text-green-400'>{heading}</div>
            </div>
            <div className='col-span-9 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                {categories.map((category, index)=>(
                    <div key={index} className='col-span-1 h-52 relative rounded-lg '>
                        <div className="h-full"><img src={ !category.category_image ? category?.category_image : "/W1711CHOI_laundry Detergents_ps.webp"} alt={category.category_name} className="h-full w-full object-cover rounded-lg "/></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                        <div className='absolute text-green-50 font-poppins bottom-5 left-5'>{category.category_name}</div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        :
        <div className='content-center text-center h-[calc(100vh-450px)] text-gray-500'>Select Category</div>
        }
    </div>
  )
}

export default AdminCreateBannerCategoryComponent