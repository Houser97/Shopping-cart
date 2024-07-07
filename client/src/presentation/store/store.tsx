import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { authSlice } from "../../presentation/store";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Definir el tipo RootState basado en el store configurado
export type RootState = ReturnType<typeof store.getState>;

// Definir el tipo AppDispatch basado en el store configurado
export type AppDispatch = typeof store.dispatch;
