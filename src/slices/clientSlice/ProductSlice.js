import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}product/`

axios.defaults.withCredentials = true

const productAdapter = createEntityAdapter({
    selectId : (product)=> product._id
})

const initialState = productAdapter.getInitialState({

})

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers:{},
    extraReducers(builder){}
})

export const {
    selectById : selectProductById,
    selectIds : selectProductIds,
    selectTotal : seleteTotalNumberOfProducts,
    selectAll : selectAllProduct
} = productAdapter.getSelectors((state) => state.product)

export default productSlice.reducer
