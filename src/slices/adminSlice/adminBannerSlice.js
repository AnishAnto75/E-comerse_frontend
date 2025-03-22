import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true

export const adminFetchBanners = createAsyncThunk('admin/adminFetchBanners' , async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}admin/banner/all-banners`).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

export const adminDeleteBanner = createAsyncThunk('admin/adminDeleteBanner' , async(data)=>{
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}admin/banner/delete-banner/${data}`).catch((error)=>{
        console.error(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

export const adminCreateBanner = createAsyncThunk('admin/adminCreateBanner' , async(data)=>{
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}admin/banner/create-banner`, {data}).catch((error)=>{
        throw new Error(error.response.data.message)
    })
    return res.data
})

const adminBannerAdapter = createEntityAdapter({
    selectId : (banner)=> banner._id
})

const initialState = adminBannerAdapter.getInitialState({

    adminFetchBannersStatus : "idle",
    adminFetchBannersError : null ,

    adminDeleteBannerStatus : "idle",
    adminDeleteBannerError : null,

    adminCreateBannerStatus : "idle",
    adminCreateBannerError : null
})

const adminBannerSlice = createSlice({
    name : 'adminBanner',
    initialState,
    reducers:{
        changeCreateBannerStatus : (state)=>{
            state.adminCreateBannerStatus = 'idle'
        },
    },
    extraReducers(builder){
        builder
        //fetchBanner
        .addCase(adminFetchBanners.pending , (state , action)=>{
            state.adminFetchBannersStatus = 'loading'
        })
        .addCase(adminFetchBanners.rejected , (state , action)=>{
            state.adminFetchBannersStatus = 'failed'
            state.adminFetchBannersError = action.error.message

            console.error("adminFetchBanners error : " ,action.error)
        })
        .addCase(adminFetchBanners.fulfilled , (state , action)=>{
            state.adminFetchBannersStatus = 'succeeded'
            state.adminFetchBannersError = null
            adminBannerAdapter.addMany(state , action.payload.data)            

            console.log('adminFetchBanners payload : ',action.payload)
        })

        //deleteBanner
        .addCase(adminDeleteBanner.pending , (state , action)=>{
            state.adminDeleteBannerStatus = 'loading'
        })
        .addCase(adminDeleteBanner.rejected , (state , action)=>{
            state.adminDeleteBannerStatus = 'failed'
            state.adminDeleteBannerError = action.error.message

            console.error("adminDeleteBanner error : " ,action.error)
        })
        .addCase(adminDeleteBanner.fulfilled , (state , action)=>{
            state.adminDeleteBannerStatus = 'succeeded'
            state.adminDeleteBannerError = null
            adminBannerAdapter.upsertOne(state , action.payload.data)            

            console.log('adminDeleteBanner payload : ',action.payload)
        })

        //createBanner
        .addCase(adminCreateBanner.pending , (state , action)=>{
            state.adminCreateBannerStatus = 'loading'
        })
        .addCase(adminCreateBanner.rejected , (state , action)=>{
            state.adminCreateBannerStatus = 'failed'
            state.adminCreateBannerError = action.error
            toast.error(action.error.message)
            console.error("adminCreateBanner error : " ,action.error)
        })
        .addCase(adminCreateBanner.fulfilled , (state , action)=>{
            state.adminCreateBannerStatus = 'success'
            state.adminCreateBannerError = null
            adminBannerAdapter.upsertOne(state, action.payload.data)
            toast.success(action.payload.message)
            console.log('adminCreateBanner payload : ',action.payload)            
        })
    }
})

export const {
    selectById : selectAdminBannerById,
    selectIds : selectAdminBannerIds,
    selectTotal : seleteTotalNumberOfAdminBanners,
    selectAll : selectAllAdminBanners
} = adminBannerAdapter.getSelectors((state) => state.adminBanner)

export const {changeCreateBannerStatus} = adminBannerSlice.actions

export const getAdminFetchBannersStatus = (state)=> state.adminBanner.adminFetchBannersStatus
export const getAdminFetchBannersError = (state)=> state.adminBanner.adminFetchBannersError

export const getAdminDeleteBannerStatus = (state)=> state.adminBanner.adminDeleteBannerStatus
export const getAdminDeleteBannerError = (state)=> state.adminBanner.adminDeleteBannerError

export const getAdminCreateBannerStatus = (state)=> state.adminBanner.adminCreateBannerStatus
export const getAdminCreateBannerError = (state)=> state.adminBanner.adminCreateBannerError

export default adminBannerSlice.reducer