import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const adminAddNewProduct = createAsyncThunk('admin/adminAddNewProduct' , async(data)=>{

    const ADMIN_ADD_NEW_PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}admin/add-product`
    const res = await axios.post(ADMIN_ADD_NEW_PRODUCT_URL , {data}).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

const adminProductAdapter = createEntityAdapter({
    selectId : (product)=> product._id
})

const initialState = adminProductAdapter.getInitialState({

    adminAddNewProductStatus : "idle",
    adminAddNewProductError : null ,

})

const adminProductSlice = createSlice({
    name : 'adminProduct',
    initialState,
    reducer:{},
    extraReducers(builder){
        builder
        //fetchUser
        .addCase(adminAddNewProduct.pending , (state , action)=>{
            state.adminAddNewProductStatus = 'loading'
        })
        .addCase(adminAddNewProduct.rejected , (state , action)=>{
            state.adminAddNewProductStatus = 'failed'
            state.adminAddNewProductError = action.error.message

            console.error("adminAddNewProduct error : " ,action.error)
        })
        .addCase(adminAddNewProduct.fulfilled , (state , action)=>{
            state.adminAddNewProductStatus = 'suceeded'
            state.adminAddNewProductError = null
            adminProductAdapter.addOne(state , action.payload.data)            
        
            console.log('adminAddNewProduct payload : ',action.payload.data)
        })
    }
})

export const {
    selectById : selectAdminProductById,
    selectIds : selectAdminProductIds,
    selectTotal : seleteTotalNumberOfAdminProducts,
    selectAll : selectAllAdminProduct
} = adminProductAdapter.getSelectors((state) => state.adminProduct)

export const getAdminAddNewProductStatus = (state)=> state.adminProduct.adminAddNewProductStatus
export const getAdminAddNewProductError = (state)=> state.adminProduct.adminAddNewProductError

export default adminProductSlice.reducer
