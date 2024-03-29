import { createSlice } from "@reduxjs/toolkit";
import { API, productsDataObject } from "../assets/constants";
import { serveUserCart } from "./cart";

export const initialState = {
    isLoading: false,
    user: null,
    validationErrors: [],
    hasErrors: false,
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
        },
        setValidationErrors: (state, {payload}) => {
            state.validationErrors = payload
            state.isLoading = false
            state.user = null
            state.hasErrors = false
        }
        ,
        getUserFailure: (state) => {
            state.isLoading = false
            state.hasErrors = true
        },
        updateCart: (state,{payload}) => {
            state.user.cart = payload.newCart
        },
        updateReviews: (state, {payload}) => {
            state.user = payload.updatedUser
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const {
    getUser, 
    getUserFailure, 
    getUserSuccess, 
    setValidationErrors,
    updateCart,
    updateReviews,
    logout
} = userSlice.actions

export const userSelector = (state) => state.user
//Se debe colocar .user. Se debe quitar en caso de que el rootReducer sea exactamente ese slice.
//.user corresponde al nombre dado a este reducer en combineReducers en store.js

export default userSlice.reducer

const setCart = (userCart) => {
    if(!userCart.length) return userCart 
    return userCart.reduce((acc, product) => {
        //Se obtiene la información del producto y se actualiza su campo de quantity.
        //En la base de datos solo se guarda el ID del producto y su cantidad.
        const currentProduct = {...productsDataObject[product.id]}
        currentProduct.quantity += product.quantity
        acc.push(currentProduct)
        return acc
    }, [])
}

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
                const userCart = setCart(user.cart)
                dispatch(getUserSuccess({user, userCart}))
                dispatch(serveUserCart({userCart}))
                return true
            } else {
                dispatch(setValidationErrors(user))
                return false
            }
        } catch (error) {
            dispatch(getUserFailure())
        }
    }
}

export const getUserStatus = () => {
    return async (dispatch) => {

        dispatch(getUser())

        const data = await fetch(`${API}/check_user_status`, {
            credentials: 'include'
        })

        const user = await data.json()

        const payload = user ? {user, userCart: setCart(user.cart)} : {user, userCart: []}
        dispatch(getUserSuccess(payload))
        dispatch(serveUserCart(payload))

    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        const response = await fetch(`${API}/logout`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const isLogout = await response.json()

        if(isLogout){
            dispatch(logout())
            return true
        }

        return false
    }
}