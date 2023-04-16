import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import {useState, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { productsData, productsDataObject } from './assets/constants';
import ProductData from './components/ProductData';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BuyAnimation from './components/BuyAnimation';
import ScrollToTop from './components/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStatus, userSelector, updateCart } from './slices/user';
import { cartSelector } from './slices/cart';

export const CartContext = createContext();
//const API = 'http://localhost:5000/api';
const API = 'https://shopping-cart-a2.onrender.com/api'

function App() {

  const dispatch = useDispatch()

  const {productsInCart} = useSelector(cartSelector)
  const {user} = useSelector(userSelector)
  /*Estado para mostrar animación de botón BUY */
  const [showAnimation, setShowAnimation] = useState(false)
  
  const [isLoading, setIsLoading] = useState(true)
  /*Estado con estructura general de productos con rating actualizado. */
  const [globalUpdatedProducts, setGlobalUpdatedProducts] = useState(structuredClone(productsData))
  /*Sirve para actualizar reviews apenas se haga un post */
  const [updateReviews, setUpdateReviews] = useState(false)

  const getAverageRating = (reviews, products) => {
    const reviewsById = reviews.reduce((acc, current) => {
        if(!acc[current.item]){
            acc[current.item] = {count: 0, sum: 0, reviews: []}
        }

        acc[current.item].count += 1
        acc[current.item].sum += current.rating
        acc[current.item].reviews.push(current)

        return acc;
    }, {})

    const updatedProducts = products.map((productObject) => {
        const { count, sum, reviews } = reviewsById[productObject.id] || {}
        if(count){
            productObject.rating = Math.round(sum/count)
            productObject.reviewsCount = count
            productObject.reviews = reviews
        }
        return productObject
    })

    setIsLoading(false)
    return updatedProducts
  }

  /*Obtener todas las reviews y calcular rating promedio para cada producto. */
  useEffect(() => {
    fetch(`${API}/get_reviews`)
    .then(data => data.json())
    .then(reviews => {
        setGlobalUpdatedProducts(getAverageRating(reviews, structuredClone(productsData)));
    })
  }, [updateReviews]) 

  /*Obtener sesión del usuario si es que se refresca aplicación. */
  useEffect(() => {
    dispatch(getUserStatus())
  }, []) 

  useEffect(() => {
    if(!user) return undefined
    fetch(`${API}/update_user_cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({productsInCart})
    }).then(() => {
      dispatch(updateCart({newCart: productsInCart}))
    })
  }, [productsInCart])

  const cartContextValue = {
    user, 
    API, 
    setGlobalUpdatedProducts, 
    globalUpdatedProducts, 
    setUpdateReviews,
    isLoading, 
    setIsLoading, 
    showAnimation, 
    setShowAnimation
  }

  return (
    <BrowserRouter basename='/'>
      <CartContext.Provider value = {cartContextValue}>
        <div className="App">
          <BuyAnimation />
          <Header />
          <ScrollToTop>
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/shop" element = {<Shop />} />
                <Route path="/product/:id" element = {<ProductData />} />
                <Route path="/:id/:edit/review" element = {<ReviewForm />} />
                <Route path="/sign-up" element = {<SignUpForm />} />
                <Route path="/login" element = {<LoginForm />} />
            </Routes>
          </ScrollToTop>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
