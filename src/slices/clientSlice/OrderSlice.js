import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const ORDER_URL = `${import.meta.env.VITE_BACKEND_URL}order/`

const orderAdapter = createEntityAdapter({
    selectId : (order)=> order._id
})

const initialState = orderAdapter.getInitialState({
    checkOutAddress : null,
    checkOutProducts : null,
    checkOutPaymentMethod : null,

})

const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers:{
        setCheckOutAddress : (state , action)=>{
            state.checkOutAddress = action.payload
        } ,
        setCheckOutProducts : (state , action)=>{
            state.checkOutProducts = action.payload
        },
        setCheckOutPaymentMethod : (state , action)=>{
            state.checkOutPaymentMethod = action.payload
        },
        emptyCheckOut : (state , action)=>{
            state.checkOutAddress = null
            state.checkOutProducts = null
            state.checkOutPaymentMethod = null
        }
    },
    extraReducers(builder){
        }
})

export const {
    selectById : selectOrderById,
    selectIds : selectOrderIds,
    selectTotal : seleteTotalNumberOfOrder,
    selectAll : selectAllOrder
} = orderAdapter.getSelectors((state) => state.order)

export const {setCheckOutAddress , setCheckOutProducts , setCheckOutPaymentMethod, emptyCheckOut} = orderSlice.actions

export const getCheckOutAddress = (state)=>state.order.checkOutAddress
export const getCheckOutProduct = (state)=>state.order.checkOutProducts 
export const getCheckOutPaymentMethod = (state)=>state.order.checkOutPaymentMethod
export const getFetchOrderStatus  = (state)=>state.order.fetchOrderStatus
export const getFetchOrderError  = (state)=>state.order.fetchOrderError

export default orderSlice.reducer
