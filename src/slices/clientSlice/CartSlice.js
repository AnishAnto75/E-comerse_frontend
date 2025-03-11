import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const CART_URL = `${import.meta.env.VITE_BACKEND_URL}cart/`

axios.defaults.withCredentials = true
export const addToCart = createAsyncThunk('cart/addToCart' , async(data)=>{
    const res = await axios.post(`${CART_URL}add-product-to-cart` , {data}).catch((error)=>{
        throw new Error(error.response.data.message)
    })
    return res.data
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart' , async(data)=>{
    const res = await axios.patch(`${CART_URL}remove-product-from-cart` , {data}).catch((error)=>{
        throw new Error(error.response.data.message)
    })
    return res.data
})

const processCart = async(state , products)=>{

    let totalMrp = 0
    let totalSellingPrice = 0
    let no_of_products_in_cart = 0

    products.map(product=>{
        const stock = product.product_id.product_stock
        totalMrp += stock.mrp * product.quantity
        totalSellingPrice += stock.price * product.quantity
        no_of_products_in_cart += product.quantity
    })

    state.cart = products
    state.totalMrp = totalMrp
    state.totalSellingPrice = totalSellingPrice
    state.discount = totalMrp - totalSellingPrice
    state.totalAmount = state.deliveryCharge + totalSellingPrice
    state.no_of_products_in_cart = no_of_products_in_cart
}

const cartSlice = createSlice({
    name : 'cart',
    initialState :{
        cart : null,
        no_of_products_in_cart : 0,
        totalMrp : 0,
        totalSellingPrice : 0,
        discount : 0,
        deliveryCharge : 50,
        totalAmount : 0 ,
    
        addToCartStatus : 'idle' ,
        addToCartError : null,
        
        removeFromCartStatus : 'idle' ,
        removeFromCartError : null
    },
    reducers:{
        addCartProduct : (state , action)=>{
            const cart = action.payload?.length ? action.payload : null
            if(!cart){
                state.cart = null
                state.no_of_products_in_cart = 0 
                return
            }
            if(cart){ processCart(state , cart)}
            return
        },
        emptyCart : (state , action)=>{
            console.log('done')
            state.cart = null
            state.no_of_products_in_cart = 0
            state.totalMrp = 0
            state.totalSellingPrice = 0
            state.discount = 0
            state.deliveryCharge = 50
            state.totalAmount = 0     
        }
    },
    extraReducers(builder){
        builder
        .addCase(addToCart.pending , (state , action)=>{
            state.addToCartStatus = 'loading'
        })
        .addCase(addToCart.rejected , (state , action)=>{
            state.addToCartStatus = 'failed'
            state.addToCartError = action.error.message

            console.error("addToCart error : " ,action.error)
        })
        .addCase(addToCart.fulfilled , (state , action)=>{
            state.addToCartStatus = 'suceeded'
            state.addToCartError = null

            console.log("addToCart payload : " ,action.payload)
            processCart(state , action.payload.data)
        })

        //removeFromCart
        .addCase(removeFromCart.pending , (state , action)=>{
            state.removeFromCartStatus = 'loading'
        })
        .addCase(removeFromCart.rejected , (state , action)=>{
            state.removeFromCartStatus = 'failed'
            state.removeFromCartError = action.error.message

            console.error("removeFromCart error : " ,action.error)
        })
        .addCase(removeFromCart.fulfilled , (state , action)=>{
            state.removeFromCartStatus = 'suceeded'
            state.removeFromCartError = null

            console.log("removeFromCart payload : " ,action.payload)
            processCart(state , action.payload.data)

        })
    }
})

export const {addCartProduct, emptyCart} = cartSlice.actions

export const getCart = (state)=> state.cart.cart
export const getCartTotalMrp = (state)=> state.cart.totalMrp
export const getCartTotalSellingPrice = (state)=> state.cart.totalSellingPrice
export const getCartDiscount = (state)=> state.cart.discount
export const getCartNoOfProductsInCart = (state)=> state.cart.no_of_products_in_cart
export const getCartDeliveryCharge = (state)=> state.cart.deliveryCharge
export const getCartTotalAmount = (state)=> state.cart.totalAmount

export const getAddToCartStatus = (state)=> state.cart.addToCartStatus
export const getAddToCartError = (state)=> state.cart.addToCartError

export const getRemoveFromCartStatus = (state)=> state.cart.removeFromCartStatus
export const getRemoveFromCartError = (state)=> state.cart.removeFromCartError

export default cartSlice.reducer
