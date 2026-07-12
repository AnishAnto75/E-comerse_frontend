import { create } from "zustand";

const useAddressStore = create((set) => ({

    addresses:[],

    selectedAddress:null,

    setAddresses:(addresses)=>
        set({addresses}),

    selectAddress:(address)=>
        set({
            selectedAddress:address
        })

}));

export default useAddressStore;