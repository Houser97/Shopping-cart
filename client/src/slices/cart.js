import { createSlice } from "@reduxjs/toolkit";
import { productsData } from "../assets/constants";

const isProductAlreadyInCar = (state, productId) => {
  return state.productsInCart.some(product => product.id === productId);
}

const addProductQuantity = (state, newQuantity, productId) => {
  //Structured clone no es válido con el state, por lo que se recurre a lo JSON.
  const productsHelper = JSON.parse(JSON.stringify(state.productsInCart))
  const productIndex = productsHelper.findIndex(product => product.id === productId)
  productsHelper[productIndex].quantity += newQuantity
  return [...productsHelper];
}

const changeTotalPrice = (productsInCart) => productsInCart.reduce((acc, current) => acc + current.quantity*current.price, 0);

const updateTotalProductInCard = (productsInCart) => productsInCart.reduce((acc, current) => acc + current.quantity, 0)

const initialState = {
    productsInCart: [],
    totalPrice: 0,
    totalProducts: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addProductsToCart: (state, {payload}) => {
        const {id, numberOfProducts} = payload
        if(isProductAlreadyInCar(state, id)){
          const products = addProductQuantity(state, numberOfProducts, id)
          state.productsInCart = products
          state.totalPrice = changeTotalPrice(products)
          state.totalProducts = updateTotalProductInCard(products)
        } else {
          /*usar [...] crea SHALLOW COPY del arreglo pero las referencias a los objetos siguen presente. */
          /*Por esta razón se debe aplicar DEEP COPY */
          let helper = structuredClone(productsData)
          const product = helper.filter(product => product.id === id)[0];
          product.quantity = numberOfProducts;
          state.productsInCart = [...state.productsInCart, product]
          state.totalPrice = changeTotalPrice([...state.productsInCart])
          state.totalProducts = updateTotalProductInCard([...state.productsInCart])
        }
      },
      removeProduct: (state, {payload}) => {
        const {id} = payload
        const updatedProducts = state.productsInCart.filter(product => product.id !== id)
        state.productsInCart = updatedProducts
        state.totalPrice = changeTotalPrice(updatedProducts)
        state.totalProducts = updateTotalProductInCard(updatedProducts)
      },
      clearCart: (state) => {
        state.productsInCart = []
        state.totalPrice = 0
        state.totalProducts = 0
      },
      serveUserCart: (state, {payload}) => {
        const {userCart} = payload
        state.productsInCart = userCart
        state.totalPrice = changeTotalPrice([...userCart])
        state.totalProducts = updateTotalProductInCard([...userCart])
      }
    }
})

export const cartSelector = (state) => state.cart

export const {addProductsToCart, removeProduct, clearCart, serveUserCart} = cartSlice.actions;

export default cartSlice.reducer
