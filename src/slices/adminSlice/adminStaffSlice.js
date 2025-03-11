import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const adminAllStaff = createAsyncThunk('admin/adminAllStaff' , async()=>{
    const ADMIN_ALL_STAFF = `${import.meta.env.VITE_BACKEND_URL}admin/all-staff`
    const res = await axios.post(ADMIN_ALL_STAFF).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

const adminStaffAdapter = createEntityAdapter({
    selectId : (staff)=> staff._id
})

const initialState = adminStaffAdapter.getInitialState({
    adminStaffStatus : 'idle', 
    adminStaffError : null
})

const adminStaffSlice = createSlice({
    name : 'adminStaff',
    initialState,
    reducer:{},
    extraReducers(builder){
        builder
        //fetchStaff
        .addCase(adminAllStaff.pending , (state , action)=>{
            state.adminStaffStatus = 'loading'
        })
        .addCase(adminAllStaff.rejected , (state , action)=>{
            state.adminStaffStatus = 'failed'
            state.adminStaffError = action.error.message

            console.error("adminAddNewProduct error : " ,action.error)
        })
        .addCase(adminAllStaff.fulfilled , (state , action)=>{
            state.adminStaffStatus = 'suceeded'
            state.adminStaffError = null
            adminStaffAdapter.addMany(state , action.payload.data)            
        
            console.log('adminAllStaff payload : ',action.payload.data)
        })
    }
})

export const {
    selectById : selectAdminStaffById,
    selectIds : selectAdminStaffIds,
    selectTotal : seleteTotalNumberOfAdminStaff,
    selectAll : selectAllAdminStaff
} = adminStaffAdapter.getSelectors((state) => state.adminStaff)


export const getAdminStaffStatus = (state)=> state.adminStaff.adminStaffStatus
export const getAdminStaffError = (state)=> state.adminStaff.adminStaffError


export default adminStaffSlice.reducer
