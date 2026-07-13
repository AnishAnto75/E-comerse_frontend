import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const useCartStore = create((set, get) => ({
    cart: [],
    cartCount: 0,
    loading: false,
    
    // fetch cart withot populate
    fetchCartSummary: async () => {
        try {
            const res = await axios.get( `${API}user/cart`, { withCredentials: true });
            set({
                cart: res.data.data.products,
                cartCount: res.data.data.cartCount,
            });
        } catch (error) {
            console.error("fetchCartSummary error: ", error)
            set({
                cart: [],
                cartCount: 0,
            });
        }
    },

    // Fetch full cart with populate
    fetchFullCart: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${API}user/cart/full-cart`, { withCredentials: true, });
            console.log(res)
            set({
                cart: res.data.data.products,
                cartCount: res.data.data.products.length,
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

            const index = cart.findIndex( (item) => item.product_id === product_id  );

            if (index >= 0) { cart[index].quantity = updated_quantity }
            else { cart.push({ product_id , quantity: updated_quantity }) }

            set({ cart, cartCount , loading: false});
            return true;

        } catch (error) {
            set({ loading: false });
            console.log("add to cart error",error);
            return false;
        }
    },

    // Change quantity locally
    updateQuantity: (product_id, quantity) => {

        set((state) => ({
            cart: state.cart.map((item) => 
                item.product_id === product_id ? { ...item, quantity } : item
            ),
        }));
    },

    // Remove product locally
    removeFromCart: (product_id) => {

        set((state) => ({
            cart: state.cart.filter( (item) => item.product_id !== product_id),
            cartCount: state.cart.length - 1,
        }));

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