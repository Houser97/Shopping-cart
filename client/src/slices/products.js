import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [], //Estado con estructura general de productos con rating actualizado, reviews y número de reviews.
    updateProducts: false //Sirve para activar fetch y recuperar reviews. Se cambia en ReviewForm y ReviewCard
}

const toggleUpdateProducts = (state) => {
    return !state.updateProducts
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, {payload}) => {
            state.products = payload.updatedProducts
        },
        updateProducts: (state) => {
            state.updateProducts = toggleUpdateProducts(state)
        }
    }
})

export const productsSelector = (state) => state.products

export const {
    setProducts,
    updateProducts
} = productsSlice.actions

export default productsSlice.reducer