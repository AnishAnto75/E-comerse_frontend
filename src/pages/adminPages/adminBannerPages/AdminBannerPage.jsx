import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Button, Typography } from '@material-tailwind/react'
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";
import AdminViewBannerComponent from '../../../components/admin/AdminBannerComponents/AdminViewBannerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { adminFetchBanners, getAdminFetchBannersError, getAdminFetchBannersStatus, selectAllAdminBanners } from '../../../slices/adminSlice/adminBannerSlice.js'
import ErrorComponent from '../../../components/ErrorComponent.jsx';
import AdminSideBar from '../../../components/admin/AdminSideBar.jsx';

const AdminBannerPage = () => {

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
    },[banners])

    if(loading == 'loading'){return <LoadingSpinner/>}
    if (error) { return <ErrorComponent/>}
    if(!banners){ return <div>Error occured please refresh the page</div>}

  return (
    <div className='flex'>
    <AdminSideBar />
    <div className='w-full p-3 md:max-w-[calc(100%-210px)]'>
        <Typography variant='h6' color='gray' className='text-center font-bold font-poppins'>Banners</Typography>
        <Tabs value="html" className='mt-3'>
            <TabsHeader>
                {banners?.map((banner, index) => (
                    <Tab key={index} value={banner.banner_id} className='capitalize'>
                        <span className='text-sm'>{banner.banner_location}</span>
                        { !banner.status && 
                        <span className='pl-1 text-red-500'>!</span>
                    }
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {banners?.map(( banner, index) => (
                    <TabPanel key={index} value={banner.banner_id}>
                        {!banner.status ? 
                            <div className='h-[calc(100vh-250px)] content-center text-center rounded-md'>
                                <Button onClick={()=>navigate('/admin/banners/create-banner')} color='blue' variant="gradient" >Create Banner</Button>
                            </div>
                            :
                            <AdminViewBannerComponent banner={banner}/>
                        }
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
    </div>
  )
}

export default AdminBannerPage