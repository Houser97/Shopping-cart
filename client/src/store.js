import userSlice from './slices/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: rootReducer
})