import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const ADDRESS_URL = `${import.meta.env.VITE_BACKEND_URL}address/`

axios.defaults.withCredentials = true
export const addNewAddress = createAsyncThunk('address/addNewAddress' , async(data)=>{
    const res = await axios.post(`${ADDRESS_URL}add-address` , {data}).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

export const deleteAddress = createAsyncThunk('address/deleteAddress' , async(data)=>{
    const res = await axios.patch(`${ADDRESS_URL}delete-address` , {data}).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

export const editAddress = createAsyncThunk('address/editAddress' , async(data)=>{
    const res = await axios.patch(`${ADDRESS_URL}edit-address` , {data}).catch((error)=>{
        console.log(error)
        throw new Error(error.response.data.message)
    })
    return res.data
})

const initialState = {

    address : null,

    addNewAddressStatus : "idle",
    addNewAddressError : null,

    deleteAddressStatus : "idle",
    deleteAddressError : null,

    editAddressStatus : "idle",
    editAddressError : null
}

const AddressSlice = createSlice({
    name : 'address',
    initialState,
    reducers:{
        addAllAddress : (state , action)=>{
            const address = action.payload.address
            if(!address){
                return
            }
            state.address = address
            return 
        },
        changeEditAddressStatus : (state , action)=>{
            state.editAddressStatus = action.payload
            return
        } 
    },
    extraReducers(builder){
        builder
        .addCase(addNewAddress.pending , (state , action)=>{
            state.addNewAddressStatus = 'loading'
        })
        .addCase(addNewAddress.rejected , (state , action)=>{
            state.addNewAddressStatus = 'failed'
            state.addNewAddressError = action.error.message

            console.error("addNewAddress error : " ,action.error)
        })
        .addCase(addNewAddress.fulfilled , (state , action)=>{
            state.addNewAddressStatus = 'suceeded'
            state.addNewAddressError = null
            
            console.log("addNewAddress payload : " ,action.payload)

            state.address = action.payload.data.address
        })
        
        .addCase(deleteAddress.pending , (state , action)=>{
            state.deleteAddressStatus = 'loading'
        })
        .addCase(deleteAddress.rejected , (state , action)=>{
            state.deleteAddressStatus = 'failed'
            state.deleteAddressError = action.error.message

            console.error("deleteAddress error : " ,action.error)
        })
        .addCase(deleteAddress.fulfilled , (state , action)=>{
            state.deleteAddressStatus = 'suceeded'
            state.deleteAddressError = null

            console.log("deleteAddress payload : " ,action.payload)
            
            state.address = action.payload.data.address
        })
        
        .addCase(editAddress.pending , (state , action)=>{
            state.editAddressStatus = 'loading'
        })
        .addCase(editAddress.rejected , (state , action)=>{
            state.editAddressStatus = 'failed'
            state.editAddressError = action.error.message

            console.error("editAddress error : " ,action.error)
        })
        .addCase(editAddress.fulfilled , (state , action)=>{
            state.editAddressStatus = 'suceeded'
            state.editAddressError = null

            console.log("editAddress payload : " ,action.payload)
            
            state.address = action.payload.data.address
        })
    }
})

export const {addAllAddress , changeEditAddressStatus} = AddressSlice.actions

export const getAddress = (state)=>state.address.address

export const getAddNewAddressStatus = (state)=>state.address.addNewAddressStatus 
export const getAddNewAddressError = (state)=>state.address.addNewAddressError

export const getdeleteAddressStatus = (state)=>state.address.deleteAddressStatus
export const getdeleteAddressError = (state)=>state.address.deleteAddressError 

export const getEditAddressStatus = (state)=>state.address.editAddressStatus
export const getEditAddressError = (state)=>state.address.editAddressError

export default AddressSlice.reducer
