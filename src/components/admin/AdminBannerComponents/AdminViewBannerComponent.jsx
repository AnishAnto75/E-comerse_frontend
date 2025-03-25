import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, useSelect } from '@material-tailwind/react'
import React, { useState } from 'react'
import AdminCarouselBannerComponent from './AdminBannerCarouselComponents/AdminCarouselBannerComponent'
import AdminCardBannerComponent from './AdminBannerCardComponents/AdminCardBannerComponent'
import AdminGroupBannerComponent from './AdminBannerGroupComponents/AdminGroupBannerComponent'
import AdminCategoryBannerComponent from './AdminBannerCategoryComponents/AdminCategoryBannerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteBanner, getAdminDeleteBannerStatus } from '../../../slices/adminSlice/adminBannerSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminViewBannerComponent = ({banner}) => {

    const navigate = useNavigate()
    const [deleteModal, setDeleteModal] = useState(false);
    
    const dispatch = useDispatch()
    const deleteBannerStatus = useSelector(getAdminDeleteBannerStatus)

    const deleteBanner = ()=>{
        setDeleteModal(!deleteModal)
        if(banner?.banner_id){
            dispatch(adminDeleteBanner(banner.banner_id))
            return
        }else toast.error("Internal Server Error, kindly Reload the page")
    }

  return (
    <div className='relative'>
        <div className='absolute top-0 right-0 flex gap-2'>
            {/* Edit */}
            <Button onClick={()=>navigate(`/admin/banners/edit-banner/${banner?.banner_id}`)} variant="text" size='sm' className='text-blue-500 px-5 py-1 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
            </Button>
            {/* Delete */}
            <Button onClick={()=>setDeleteModal(!deleteModal)} color='red' className='px-5 py-1' variant="gradient" loading={deleteBannerStatus == 'loading'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </Button>
            <Dialog open={deleteModal} handler={()=>setDeleteModal(!deleteModal)}>
                <DialogHeader>Delete Banner</DialogHeader>
                <DialogBody className='text-center'>
                    Do You Really Want to delete this banner?
                </DialogBody>
                <DialogFooter>
                    <Button onClick={()=>setDeleteModal(!deleteModal)} variant="text" color="red" className="mr-1">
                        <span>No</span>
                    </Button>
                    <Button onClick={()=>deleteBanner()} variant="gradient" color="green" >
                        <span>Yes</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
        {
            banner?.banner_type == 'carousel' ? <AdminCarouselBannerComponent banner= {banner} />:
            banner?.banner_type == 'card' ? <AdminCardBannerComponent banner= {banner}/>:
            banner?.banner_type == 'group' ? <AdminGroupBannerComponent banner= {banner} />:
            banner?.banner_type == 'category' ? <AdminCategoryBannerComponent banner= {banner}/>: ''
        }
    </div>
  )
}

export default AdminViewBannerComponent