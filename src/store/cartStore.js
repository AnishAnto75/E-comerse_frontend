import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

const useCartStore = create((set, get) => ({
    cart: [],
    cartSummary: [],
    cartCount: 0,
    loading: false,
    
    // fetch cart withot populate
    fetchCartSummary: async () => {
        try {
            const res = await axios.get( `${API}user/cart`, { withCredentials: true });
            console.log("fetchCartSummary Data : ",res.data)
            set({
                cartSummary: res.data?.data?.cart,
                cartCount: res.data?.data?.cartCount,
            });
            return true
        } catch (error) {
            console.error("fetchCartSummary error: ", error)
            set({ 
                cartSummary: [],
                cartCount: 0,
            });
            return false
        }
    },

    // Fetch full cart with populate
    fetchFullCart: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${API}user/cart/full-cart`, { withCredentials: true, });
            console.log("fetchFullCart Data : ",res.data)
            set({
                cart: res.data?.data?.cart,
                cartCount: res.data?.data?.cartCount,
                loading: false,
            });
            return true;
        } catch (error) { 
            console.error("error in fetchFullCart : ",error);
            set({ loading: false });
            return false;
        }
    },

    // Add product
    addToCart: async (data) => {
        try {
            set({ loading: true });
            const res = await axios.post( `${API}user/cart/add`, data , { withCredentials: true } );
            console.log("addToCart res :",res)
            const { product_id, updated_quantity, cartCount } = res.data.data;

            const cart = [...get().cart];
            const cartIndex = cart.findIndex( (item) => item.product_id._id === product_id || item.product_id === product_id)
            if (cartIndex >= 0) { cart[cartIndex].quantity = updated_quantity}
            
            const cartSummary = [...get().cartSummary];
            const summaryIndex = cartSummary.findIndex( (item) => item.product_id === product_id );
            if (summaryIndex >= 0) { cartSummary[summaryIndex].quantity = updated_quantity }
            else { cartSummary.push({ product_id , quantity: updated_quantity })}

            set({cart, cartSummary, cartCount , loading: false});
            return true;

        } catch (error) {
            set({ loading: false });
            console.log("add to cart error",error);
            return false;
        }
    },
    
    minusToCart: async (data) => {

        try {
            set({ loading: true });
            const res = await axios.post( `${API}user/cart/minus`, data , { withCredentials: true } );
            console.log("minusToCart res :",res)
            const { product_id, updated_quantity, cartCount } = res.data.data;
            const cart = [...get().cart];

            const index = cart.findIndex( (item) => item.product_id === product_id  );

            if (index >= 0) { cart[index].quantity = updated_quantity }

            set({ cart, cartCount , loading: false});
            return true;

        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message)
            console.error("minusToCart error",error);
            return false;
        }
    },

    removeProductFromCart: async (data) => {

        try {
            set({ loading: true });

            const res = await axios.post( `${API}user/cart/remove`, data , { withCredentials: true } );
            console.log("removeProductFromCart res:", res);

            const { cartCount } = res.data.data;
            const cart = get().cart.filter( (item) => item.product_id !== data.product_id );
            const cartSummary = get().cartSummary.filter( (item) => item.product_id !== data.product_id );
            
            set({ cart, cartSummary, cartCount, loading: false });
            toast.success("Product removed from cart");
            return true;

        } catch (error) {
            set({ loading: false });
            toast.error( error.response?.data?.message || "Failed to remove product");
            console.error("removeProductFromCart error:", error);
            return false;
        }
    },

    // Clear cart
    clearCart: () => {
        set({
            cart: [],
            cartCount: 0,
        });
    },
}));

export default useCartStore;