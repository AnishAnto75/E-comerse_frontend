import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../slices/authSlice/authSlice.js'
import productReducer from '../slices/clientSlice/ProductSlice.js'
import cartReducer from '../slices/clientSlice/CartSlice.js'
import addressReducer from '../slices/clientSlice/AddressSlice.js'
import orderReducer from '../slices/clientSlice/OrderSlice.js'

import adminProductReducer from '../slices/adminSlice/adminProductSlice.js'
import adminStaffReducer from '../slices/adminSlice/adminStaffSlice.js' 
import adminOrderReducer from '../slices/adminSlice/adminOrderSlice.js' 

export const store = configureStore({
    reducer : {
        auth : authReducer,
        
        product : productReducer ,
        cart : cartReducer,
        address : addressReducer,
        order : orderReducer ,

        adminProduct : adminProductReducer,
        adminStaff : adminStaffReducer,
        adminOrder : adminOrderReducer
    },
})
