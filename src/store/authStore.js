import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useUserStore = create((set) => ({

    user: null,
    isAuthenticated: false,
    loading: false,

    getUser: async () => {

        try {
            set({ loading: true });
            const { data } = await axios.get( `${API_URL}auth/me`, { withCredentials: true} );
            console.log("initialize res : ",data)
            set({ user: data.data.user, isAuthenticated: true, loading: false });
            return true
        } catch {
            set({ user: null, isAuthenticated: false, loading: false });
            return false
        }
    },

    login: async (email, password) => {
        try {
            set({ loading: true });
            const { data } = await axios.post( `${API_URL}auth/login`, {data: { email, password }}, { withCredentials: true });
            console.log("login res : ",data)
            set({ user: data.data.user, isAuthenticated: true, loading: false });
            return { success: true, message: data.message };

        } catch (error) {
            console.error("login error : ", error)
            set({user: null, isAuthenticated: false,loading: false });
            return { 
                success: false,
                message: error.response?.data?.message || "Login Failed",
            };
        }

    },

    signup: async (userData) => {
        try {
            set({ loading: true });
            const { data } = await axios.post( `${API_URL}auth/signup`, { data: userData },{ withCredentials: true } );
            console.log("signup res:", data)
            set({ user: data.data.user, isAuthenticated: true, loading: false });
            return { success: true, message: data.message };
        } catch (error) {
            console.error("signup Error : " , error)
            set({ loading: false,});
            return { success: false, message: error.response?.data?.message || "Signup Failed",};
        }
    },

    logout: async () => {
        try {
            console.log('jg')
            await axios.post( `${API_URL}auth/logout`, {}, { withCredentials: true });
        } finally {
            set({ user: null, isAuthenticated: false });
        }
    },
}));

export default useUserStore;