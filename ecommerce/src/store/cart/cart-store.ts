import { CartData } from "@/actions/cart/cart";
import { ProductCart } from "@/domain/entities/product.cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: Record<string, ProductCart>,
    totalPrice: number,
    totalProducts: number,
    updateCart: (cartData: CartData) => void
}

export const useCartStore = create<State>()(
    persist((set) => ({
        cart: {},
        totalPrice: 0,
        totalProducts: 0,
        updateCart: (cartData) => {
            const { productsInCart, totalPrice, totalProducts } = cartData;
            set({ cart: productsInCart, totalPrice, totalProducts })
        },
    }), {
        name: 'shopping-cart'
    })
);