import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

// export const adminFetchOrder = createAsyncThunk('admin/adminFetchOrder' , async(id)=>{    
//     const ADMIN_ADD_NEW_PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}admin/order/${id}`
//     const res = await axios.get(ADMIN_ADD_NEW_PRODUCT_URL , {data}).catch((error)=>{
//         console.log(error)
//         throw new Error(error.response.data.message)
//     })
//     return res.data
// })

const initialState = {
    order : null,
    adminFetchOrderStatus : 'idle',
    adminFetchOrderError : null
}

const adminOrderSlice = createSlice({
    name : 'adminOrder',
    initialState,
    reducer:{},
    extraReducers(builder){
        // builder
        // .addCase(adminFetchOrder.pending , (state , action)=>{
        //     state.adminFetchOrderStatus = 'loading'
        // })
        // .addCase(adminFetchOrder.rejected , (state , action)=>{
        //     state.adminFetchOrderStatus = 'failed'
        //     state.adminFetchOrderError = action.error.message

        //     console.error("adminFetchOrder error : " ,action.error)
        // })
        // .addCase(adminFetchOrder.fulfilled , (state , action)=>{
        //     state.adminFetchOrderStatus = 'suceeded'
        //     state.adminFetchOrderError = null
        //     state.order = action.payload.data            
        
        //     console.log('adminFetchOrder payload : ',action.payload.data)
        // })
    }
})

export const getAdminFetchOrderStatus = (state)=> state.adminOrder.adminFetchOrderStatus
export const getAdminFetchOrderError = (state)=> state.adminOrder.adminFetchOrderError

export default adminOrderSlice.reducer
