import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set) => ({
            cart: [],

            setCart: (cart) =>
                set({ cart }),

            clearCart: () =>
                set({ cart: [] }),

            addItem: (item) =>
                set((state) => ({
                    cart: [...state.cart, item],
                })),

            removeItem: (id) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => item.product_id !== id
                    ),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.product_id === id
                            ? {
                                  ...item,
                                  quantity,
                              }
                            : item
                    ),
                })),
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;