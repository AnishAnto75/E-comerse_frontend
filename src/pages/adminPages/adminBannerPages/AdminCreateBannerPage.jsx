import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminFetchBanners, getAdminFetchBannersError, getAdminFetchBannersStatus, selectAllAdminBanners } from '../../../slices/adminSlice/adminBannerSlice'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Button, Option, Select } from '@material-tailwind/react'
import AdminCreateBannerCardComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCardComponents/AdminCreateBannerCardComponent'
import AdminCreateBannerCarouselComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCarouselComponents/AdminCreateBannerCarouselComponent'
import AdminCreateBannerCategoryComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCategoryComponents/AdminCreateBannerCategoryComponent'
import AdminCreateBannerGroupComponent from '../../../components/admin/AdminBannerComponents/AdminBannerGroupComponents/AdminCreateBannerGroupComponent'

const AdminCreateBannerPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRef = useRef(true)
    
    const banners = useSelector(selectAllAdminBanners)
    const error = useSelector(getAdminFetchBannersError)
    const loading = useSelector(getAdminFetchBannersStatus)

    useEffect(()=>{
        if(handleRef.current){
            dispatch(adminFetchBanners())
            handleRef.current = false
        }
    },[])

    const [banner_id, setBannerId] = useState('')
    const [banner_type, setBannerType] = useState('') 

    const [banner_id_error, setBannerIdError] = useState(false) 
    const [banner_type_error, setBannerTypeError] = useState(false)

    const bannerLocations = banners?.filter(banner => !banner.status)

    if(loading == 'loading'){return <LoadingSpinner/>}
    if(error){ return <div>Error occured please refresh the page</div>}
    if(!banners){ return <div>Error occured please refresh the page</div>}

    if(!bannerLocations.length){
        return <div className='w-full h-[calc(100vh-90px)] content-center text-center'>
            <div className='h-[calc(100vh-250px)] content-center text-center rounded-md'>
                <div className='text-gray-600 mb-3'>All locations are placed with banners, If you want to change it kindly check the banners page</div>
                <Button onClick={()=>navigate('/admin/banners')} color='teal' variant="gradient" className='tracking-widest'>Go to Banners</Button>
            </div>
        </div>
    }
  return (
    <div className='w-full p-5 md:max-w-[calc(100%-210px)]'>
        <div className='col-span-1 m-5'>
            <div className='text-green-400 font-roboto font-medium tracking-wider text-lg'>Create Banner</div>
            <div className='mt-3 text-gray-500 tracking-wider'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Banners are crucial for capturing attention, promoting products, and driving sales by highlighting deals, new arrivals, or special offers. They enhance user experience and guide customers toward key actions, boosting conversions and engagement</div>
        </div>
        <div className='w-full bg-green-50 h-0.5 rounded-full'>&nbsp;</div>
        <div className='my-5 grid md:grid-cols-2 '>
            <div className='flex gap-2 flex-col md:flex-row' >
                <Select value={banner_id} onChange={(val) => {setBannerId(val); setBannerIdError(false)}} error={banner_id_error} size="md" label="Banner Location" className='col-span-1 capitalize'>
                    {bannerLocations?.map((banner, index) =>( 
                        <Option key ={index} value={banner.banner_id} className='capitalize'>{banner?.banner_location}</Option> ))
                    }
                </Select>
                <Select value={banner_type} onChange={(val) => {setBannerType(val); setBannerTypeError(false)}} error={banner_type_error} size="md" label="Banner Type" className='col-span-1'>
                    <Option value='card'>Card</Option> 
                    <Option value='carousel'>Carousel</Option> 
                    <Option value='group'>Group</Option> 
                    <Option value='category'>Category</Option> 
                </Select>
            </div>
        </div>
        {!banner_id || !banner_type ? <div className='text-gray-600 content-center text-center h-96'>Fill the Location and type</div> : ''}
        {banner_id && banner_type &&
            <div className='pt-3'>
                {banner_type == "card" && <AdminCreateBannerCardComponent banner_id={banner_id} />}
                {banner_type == "carousel" && <AdminCreateBannerCarouselComponent banner_id={banner_id}/>}
                {banner_type == "category" && <AdminCreateBannerCategoryComponent banner_id={banner_id}/>}
                {banner_type == "group" && <AdminCreateBannerGroupComponent banner_id={banner_id}/>}
            </div>
        }
    </div>
  )
}

export default AdminCreateBannerPage
