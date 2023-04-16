import userSlice from './slices/user'
import cartSlice from './slices/cart'
import productsSlice from './slices/products'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    products: productsSlice
})

export const store = configureStore({
    reducer: rootReducer
})