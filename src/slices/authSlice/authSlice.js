import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

    isUserValid : false,
    user : null ,
    admin : false ,

    getUserStatus : "idle",
    getUserError : null,

    getLogoutStatus : "idle",
    getLogoutError : null,
}

axios.defaults.withCredentials = true

export const fetchUser = createAsyncThunk('auth/fetchUser' , async()=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/getUser`)
        return res.data
    } catch (error) {
        console.error(error)
        throw new Error(error.response.data.message)
    }
})

export const logout = createAsyncThunk('auth/logout' , async()=>{
    const LOGOUT_URL = `${import.meta.env.VITE_BACKEND_URL}auth/logout`
    const res = await axios.post(LOGOUT_URL).catch((error)=>{
        throw new Error(error.response.data.message)
    })
    return res.data
})

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducer:{},
    extraReducers(builder){
        builder
        //fetchUser
        .addCase(fetchUser.pending , (state , action)=>{
            state.getUserStatus = 'loading'
        })
        .addCase(fetchUser.rejected , (state , action)=>{
            state.isUserValid = false
            state.getUserStatus = 'failed'
            state.getUserError = action.error.message
            state.user = null

            console.error("fetchUser : " ,action.error)
        })
        .addCase(fetchUser.fulfilled , (state , action)=>{
            state.isUserValid = true
            state.getUserStatus = 'suceeded'
            state.getUserError = null
            state.user = action.payload.data

            state.admin = action.payload.data?.user_type == "admin" ? true :  false

            console.log('fetchUser payload : ',action.payload.data)
        })

        //logout
        .addCase(logout.pending , (state , action)=>{
            state.getUserStatus = 'loading'
        })
        .addCase(logout.rejected , (state , action)=>{
            state.getLogoutStatus = 'failed'
            state.getLogoutError = action.error.message
            
            console.error("Logout : " ,action.error)
        })
        .addCase(logout.fulfilled , (state , action)=>{
            state.isUserValid = false
            state.getUserStatus = 'suceeded'
            state.getUserError = null
            state.user = null

            console.log('Logout payload : ',action.payload.message)
        })
    }
})

export const getUser = (state)=> state.auth.user
export const isUserValid = (state)=> state.auth.isUserValid
export const getAdmin = (state)=> state.auth.admin

export const getUserStatus = (state)=> state.auth.getUserStatus
export const getUserError = (state)=> state.auth.getUserError

export const getLogoutStatus = (state)=> state.auth.getLogoutStatus
export const getLogoutError = (state)=> state.auth.getLogoutError

export default authSlice.reducer
