import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  products: Record<string, any>,
  priceProducts: Record<string, any>,
  totalPrice: number,
  totalProducts: number,
}

const initialState: CartState = {
  products: {},
  priceProducts: {},
  totalPrice: 0,
  totalProducts: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onUpdate: (state, { payload }) => {
      state.products = payload.products;
      state.priceProducts = payload.priceProducts;
      state.totalPrice = payload.totalPrice;
      state.totalProducts = payload.totalProducts;
    },
    onClear: (state) => {
      state.products = {};
      state.priceProducts = {};
      state.totalPrice = 0;
      state.totalProducts = 0;
    },
  }
})

export const { onUpdate, onClear } = cartSlice.actions;

