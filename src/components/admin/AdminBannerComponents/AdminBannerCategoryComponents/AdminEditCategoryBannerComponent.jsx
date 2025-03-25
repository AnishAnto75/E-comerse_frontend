import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import axios from 'axios'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminEditBanner, getAdminEditBannerStatus } from '../../../../slices/adminSlice/adminBannerSlice'
import { toast } from 'react-toastify'

const AdminEditCategoryBannerComponent = ({banner}) => {

    const dispatch = useDispatch()

    const editStatus = useSelector(getAdminEditBannerStatus)

    const [heading, setHeading] = useState(banner.category?.heading)
    const [categories, setCategories] = useState(banner.category?.category_id ? banner.category.category_id : [])     

    const [addCategoryModal, setAddCategoryModal ] = useState(false)

    const [category_search_name, setCategorySearchName] = useState('')
    const [searchedCategories , setSearchedCategories] = useState(null)
    
    const clickName = (category)=>{
        setCategories([...categories, category])
        setSearchedCategories(null)
        setCategorySearchName('')
        setAddCategoryModal(false)
    }

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

    const reset = ()=>{
        setHeading(banner.category?.heading)
        setCategories(banner.category?.category_id ? banner.category.category_id : [])
    }

    const removeCategory = (index)=>{
        const newArray = categories.filter((_, i) => i !== index)
        setCategories(newArray)
    }

    const handleEditBanner = ()=>{
        const category_id = categories.map(category => { return category._id })
        if(!heading){return toast.warn("Heading required")}
        if(!category_id.length){return toast.warn("select category")}
        const data = {banner_id: banner.banner_id , banner_type: "category", category:{ category_id, heading }}
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
            {categories?.map((category, index)=>(
                <div key={index} className='col-span-1 h-52 relative rounded-lg'>
                    <div onClick={()=>removeCategory(index)} className='absolute hover:cursor-pointer hover:bg-opacity-70 top-1 right-1 bg-white text-red-500 z-10 rounded-full hover:bg-red-100 p-1  '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </div>
                    <div className="h-full"><img src={ !category?.category_image ? category?.category_image : "/W1711CHOI_laundry Detergents_ps.webp"} alt={category.category_name} className="h-full w-full object-cover rounded-lg "/></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
                    <div className='absolute text-green-50 font-poppins bottom-5 left-5'>{category.category_name}</div>
                </div>
            ))}
            <div onClick={()=>setAddCategoryModal(true)} className='col-span-1 h-52 relative rounded-lg border-4 border-dashed border-blue-200 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="h-full w-full text-blue-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </div>
            { addCategoryModal &&
                <div className="fixed inset-0 overflow-y-auto z-50 ">
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"/>
                    <div className="flex min-h-screen items-center justify-center p-4 text-center">
                        <div className="inline-block w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"onClick={(e) => e.stopPropagation()} >
                            <button onClick={()=>setAddCategoryModal(false)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-red-50 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                            <div>Add Category</div>
                            <div className='relative mt-3'>
                                <Input variant="standard" label="Category Name" color='blue' value={category_search_name} onChange={(e)=>handleSearchCategoryName(e)} className='' />
                                {searchedCategories?.length ? 
                                    <div className='absolute bg-white w-full border mt-0.5 p-2 flex flex-col z-50 rounded-lg max-h-44 overflow-auto'>
                                        {searchedCategories.map((category, index)=>(
                                            <div key={index} onClick={()=>clickName(category)} className="hover:bg-gray-100 text-sm font-poppins text-gray-900 cursor-pointer p-1 rounded-lg">{category.category_name}</div>
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

export default AdminEditCategoryBannerComponent