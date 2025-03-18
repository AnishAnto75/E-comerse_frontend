import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import axios from 'axios'
import { Badge, Button, Typography } from '@material-tailwind/react'
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";
import AdminViewBannerComponent from '../../../components/admin/AdminBannerComponents/AdminViewBannerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { adminFetchBanners, getAdminFetchBannersError, getAdminFetchBannersStatus, selectAllAdminBanners } from '../../../slices/adminSlice/adminBannerSlice.js'
import AdminCreateBannerComponent from '../../../components/admin/AdminBannerComponents/AdminCreateBannerComponent.jsx'

const AdminBannerPage = () => {

    const handleRef = useRef(true)
    const dispatch = useDispatch()
    
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
    if(error){ return <div>Error occured please refresh the page</div>}
    if(!banners){ return <div>Error occured please refresh the page</div>}

  return (
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
                            <AdminCreateBannerComponent banner={banner}/>
                            :
                            <AdminViewBannerComponent banner={banner}/>
                        }
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
  )
}

export default AdminBannerPage