import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { authSlice } from ".";
import { cartSlice } from "./cart/cartSlice";
import { productSlice } from "./product/productSlice";


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

// Definir el tipo RootState basado en el store configurado
export type RootState = ReturnType<typeof store.getState>;

// Definir el tipo AppDispatch basado en el store configurado
export type AppDispatch = typeof store.dispatch;
