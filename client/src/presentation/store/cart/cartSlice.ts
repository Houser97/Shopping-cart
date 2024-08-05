import { createSlice } from "@reduxjs/toolkit";
import { ProductCart } from "../../../domain/entities/product.cart";

export interface CartState {
  productsInCart: Record<string, ProductCart>,
  totalPrice: number,
  totalProducts: number,
}

const initialState: CartState = {
  productsInCart: {},
  totalPrice: 0,
  totalProducts: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onUpdate: (state, { payload }) => {
      state.productsInCart = payload.productsInCart;
      state.totalPrice = payload.totalPrice;
      state.totalProducts = payload.totalProducts;
    },
    onClear: (state) => {
      state.productsInCart = {};
      state.totalPrice = 0;
      state.totalProducts = 0;
    },
  }
})

export const { onUpdate, onClear } = cartSlice.actions;

