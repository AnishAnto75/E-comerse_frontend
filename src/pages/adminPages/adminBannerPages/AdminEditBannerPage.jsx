import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import AdminEditCategoryBannerComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCategoryComponents/AdminEditCategoryBannerComponent.jsx'
import { adminDeleteBanner, changeDeleteBannerStatus, changeEditBannerStatus, getAdminDeleteBannerStatus, getAdminEditBannerStatus } from '../../../slices/adminSlice/adminBannerSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import AdminEditCardBannerComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCardComponents/AdminEditCardBannerComponent.jsx'
import AdminEditGroupComponent from '../../../components/admin/AdminBannerComponents/AdminBannerGroupComponents/AdminEditGroupComponent.jsx'
import AdminEditCarouselBannerComponent from '../../../components/admin/AdminBannerComponents/AdminBannerCarouselComponents/AdminEditCarouselBannerComponent.jsx'
import ErrorComponent from '../../../components/ErrorComponent.jsx'

const AdminEditBannerPage = () => {

    const {id} = useParams()

    const dispatch = useDispatch()
    const handleRef = useRef(true)
    const navigate = useNavigate()

    const [deleteModal, setDeleteModal] = useState(false);

    const [loading , setLoading ] = useState(false)
    const [error , setError ] = useState(false)
    const [banner , setBanner ]  = useState(null) 
    const [banner_type, setBannerType] = useState('')

    const deleteBannerStatus = useSelector(getAdminDeleteBannerStatus)
    const editBannerStatus = useSelector(getAdminEditBannerStatus)

    const fetchBanner = async()=>{
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/banner_id/${id}`)
            setBanner(res.data.data)
            setBannerType(res.data.data.banner_type)
            console.log("fetchBanner response : ",res.data)
        } catch (error) {
            setError(true)
            console.error("error in fetchBanner function :",error)
        } finally { setLoading(false) }
    }

    useEffect(()=>{
        if(handleRef.current){
            fetchBanner()
            handleRef.current = false
        }
        if(deleteBannerStatus == 'success'){
            navigate('/admin/banners')
            dispatch(changeDeleteBannerStatus())
        }
        if(editBannerStatus == 'success'){
            navigate('/admin/banners')
            dispatch(changeEditBannerStatus())
        }
    },[deleteBannerStatus, editBannerStatus])

    if (loading) { return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}
    if(!banner || !banner.status){return <ErrorComponent/>}

  return (
    <div className='w-full'>
        <div className='relative gap-5 m-1'>
            <div onClick={()=>navigate('/admin/banners')} className='absolute left-0 top-[3px] z-50 hover:bg-gray-100 cursor-pointer p-2 rounded-full '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </div>
        </div>
        <div className='flex max-w-full gap-3 ml-14 mt-3 tracking-wider '>
            <Chip color='deep-purple' variant="gradient" value='Edit' className='px-5 text-center'/>
            <Chip color='teal' variant="gradient" value={banner.banner_location ? banner.banner_location : ''} className='px-5 text-center'/>
            <Chip variant="gradient" value={banner.banner_type ? banner.banner_type : ''} className='px-5 text-center '/>
            {banner?.hidden && <Chip size="md" color='blue' variant="gradient" value='HIDDEN' className='w-20 text-center'/>}
        </div>
        <div className='p-5 pt-7'>
            {banner_type == "card" && <AdminEditCardBannerComponent banner={banner} />}
            {banner_type == "carousel" && <AdminEditCarouselBannerComponent banner={banner}/>}
            {banner_type == "category" && <AdminEditCategoryBannerComponent banner={banner}/>}
            {banner_type == "group" && <AdminEditGroupComponent banner={banner}/>}
        </div>
    </div>
  )
}

export default AdminEditBannerPage