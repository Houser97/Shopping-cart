import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import {useState, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { productsData } from './assets/constants';
import ProductData from './components/ProductData';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

export const CartContext = createContext();
const API = 'http://localhost:5000/api';

function App() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [productsInCar, setProductsInCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  /*Estado con estructura general de productos con rating actualizado. */
  const [globalUpdatedProducts, setGlobalUpdatedProducts] = useState(structuredClone(productsData))
  const [globalReviews, setGlobalReviews] = useState([]) 
  /*Sirve para actualizar reviews apenas se haga un post */
  const [updateReviews, setUpdateReviews] = useState(false)

  const checkIfProductAlreadyInCar = (productId) => {
    return productsInCar.some(product => product.id === productId);
  }

  const addCurrentProductQuantity = (newQuantity, productId) => {
    const productsHelper = structuredClone(productsInCar)
    const productIndex = productsHelper.findIndex(product => product.id === productId)
    productsHelper[productIndex].quantity += newQuantity
    setProductsInCar([...productsHelper]);
  }

  const changeTotalPrice = () => {
    setTotalPrice(productsInCar.reduce((acc, current) => acc + current.quantity*current.price, 0));
  }

  const updateTotalProductInCard = () => {
    setTotalProducts(productsInCar.reduce((acc, current) => acc + current.quantity, 0))
  }

  const addProduct = (numberOfProducts, id) => {
    if(checkIfProductAlreadyInCar(id)){
      addCurrentProductQuantity(numberOfProducts, id)
    } else {
      /*usar [...] crea SHALLOW COPY del arreglo pero las referencias a los objetos siguen presente. */
      /*Por esta razón se debe aplicar DEEP COPY */
      let helper = structuredClone(productsData)
      const product = helper.filter(product => product.id === id)[0];
      product.quantity = numberOfProducts;
      setProductsInCar([...productsInCar, product])
    }
  }

  const removeProduct = (id) => {
    setProductsInCar(oldArray => oldArray.filter(product => product.id !== id))
  } 

  useEffect(() => {
    changeTotalPrice();
    updateTotalProductInCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeTotalPrice, productsInCar])

  const getAverageRating = (reviews, products) => {
    const reviewsById = reviews.reduce((acc, current) => {
        if(!acc[current.item]){
            acc[current.item] = {count: 0, sum: 0}
        }

        acc[current.item].count += 1
        acc[current.item].sum += current.rating

        return acc;
    }, {})

    const updatedProducts = products.map((productObject) => {
        const { count, sum } = reviewsById[productObject.id] || {}
        if(count){
            productObject.rating = Math.round(sum/count)
        }
        return productObject
    })
    return updatedProducts
  }

  /*Obtener todas las reviews y calcular rating promedio para cada producto. */
  useEffect(() => {
    fetch(`${API}/get_reviews`)
    .then(data => data.json())
    .then(reviews => {
        setGlobalReviews(reviews)
        setGlobalUpdatedProducts(getAverageRating(reviews, globalUpdatedProducts))
    })
  }, [updateReviews]) 

  const cartContextValue = {productsInCar, totalPrice, totalProducts,
    addProduct, removeProduct, user, setUser, API, 
    setGlobalReviews, globalReviews ,setGlobalUpdatedProducts, 
    globalUpdatedProducts, setUpdateReviews}

  return (
    <BrowserRouter basename='Shopping-cart/'>
      <CartContext.Provider value = {cartContextValue}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/shop" element = {<Shop />} />
            <Route path="/product/:id" element = {<ProductData />} />
            <Route path="/:id/review" element = {<ReviewForm />} />
            <Route path="/sign-up" element = {<SignUpForm />} />
            <Route path="/login" element = {<LoginForm />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
