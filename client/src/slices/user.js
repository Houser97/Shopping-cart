import { createSlice } from "@reduxjs/toolkit";
import { productsDataObject } from "../assets/constants";

const API = 'http://localhost:5000/api';

export const initialState = {
    isLoading: false,
    user: null,
    validationErrors: [],
    hasErrors: false,
    productsInCart: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state) => {
            state.isLoading = true
        },
        getUserSuccess: (state, {payload}) => {
            state.user = payload.user
            state.isLoading = false
            state.hasErrors = false
            state.validationErrors = []
            state.productsInCart = payload.userCart
        },
        setValidationErrors: (state, {payload}) => {
            state.validationErrors = payload
            state.isLoading = false
            state.user = null
            state.productsInCart = []
            state.hasErrors = false
        }
        ,
        getUserFailure: (state) => {
            state.isLoading = false
            state.hasErrors = true
        },
        getUserStatus: (state) => {
            state.isLoading = true
        },
        getUserStatusSuccess: (state, {payload}) => {
            state.isLoading = false
            state.hasErrors = false
            state.user = payload
        },
        getUserStatusFailure: (state) => {
            state.hasErrors = true
        }
    }
})

export const {
    getUser, 
    getUserFailure, 
    getUserSuccess, 
    getUserStatus, 
    getUserStatusSuccess, 
    getUserStatusFailure,
    setValidationErrors
} = userSlice.actions

export const userSelector = (state) => state.user
//Se debe colocar .user. Se debe quitar en caso de que el rootReducer sea exactamente ese slice.
//.user corresponde al nombre dado a este reducer en combineReducers en store.js

export default userSlice.reducer

export function fetchUser(email, password) {
    return async (dispatch) => {
        dispatch(getUser())

        try{
            const response = await fetch(`${API}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
              })
            const user = await response.json()
            if(!Array.isArray(user)){
                const userCart = user.productsInCart.reduce((acc, product) => {
                    const currentProduct = productsDataObject[product.id]
                    currentProduct.quantity = product.quantity
                    acc.push(currentProduct)
                    return acc
                  }, [])
                dispatch(getUserSuccess({user, userCart}))
            } else {
                dispatch(setValidationErrors(user))
            }
        } catch (error) {
            dispatch(getUserStatusSuccess())
        }
    }
}
