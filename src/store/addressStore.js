import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

const useAddressStore = create((set, get) => ({
    address: [],
    loading: false,
    
    fetchAddresses: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${API}user/address`, { withCredentials: true, });
            console.log("fetchAddresses Data : ",res)
            set({
                address: res.data.data,
                loading: false,
            });
            return true;
        } catch (error) { 
            console.error("error in fetchAddresses : ",error);
            set({ loading: false });
            return false;
        }
    },

    addAddress: async (data) => {

        try {
            set({ loading: true });
            const res = await axios.post( `${API}user/address/add`, data , { withCredentials: true } );
            console.log("addAddress res :",res.data?.data)
            toast.success(res.data?.message)
            const address = [...get().address];
            address.push(res.data?.data)
            set({ address, loading: false});
            return true;

        } catch (error) {
            set({ loading: false });
            console.log("addAddress error",error);
            toast.error(error.response?.data?.message)
            return false;
        }
    },

    deleteAddress: async (_id) => {
        try {
            set({ loading: true });

            await axios.patch(`${API}user/address/delete`, { _id }, { withCredentials: true });
            const address = get().address.filter( (item) => item._id !== _id );

            set({ address, loading: false })

            toast.success("Address deleted successfully");
            return true;

        } catch (error) {
            set({ loading: false });
            console.error("deleteAddress error:", error);
            toast.error(error.response?.data?.message || "Failed to delete address");
            return false;
        }
    },

}));

export default useAddressStore;