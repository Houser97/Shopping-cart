import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productsDB: [],
    updateProducts: false,
    isFetching: false
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        onProductFetchStart: (state) => {
            state.isFetching = true
        },
        onProductFetch: (state, { payload }) => {
            state.productsDB = payload.products
            state.isFetching = false
        },
        onProductFetchFail: (state) => {
            state.isFetching = false
        },
        onProductUpdate: (state) => {
            state.updateProducts = !state.updateProducts
        }
    }
})

export const { onProductFetchStart, onProductFetch, onProductFetchFail, onProductUpdate } = productSlice.actions;
