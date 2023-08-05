import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import {useState, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { productsData, API } from './assets/constants';
import ProductData from './components/ProductData';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BuyAnimation from './components/BuyAnimation';
import ScrollToTop from './components/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStatus, userSelector, updateCart } from './slices/user';
import { cartSelector } from './slices/cart';
import { productsSelector, setProducts } from './slices/products';
import Loading from './components/Loading';

export const CartContext = createContext();

function App() {

  const dispatch = useDispatch()

  const { productsInCart } = useSelector(cartSelector)
  const { user } = useSelector(userSelector)
  //Valor Redux que se usa para activar useEffect y recuperar nuevas Reviews.
  const { updateProducts } = useSelector(productsSelector)
  /*Estado para mostrar animación de botón BUY */
  const [showAnimation, setShowAnimation] = useState(false)
  
  const [isLoading, setIsLoading] = useState(true)

  const getAverageRating = (reviews, products) => {
    const reviewsById = reviews.reduce((acc, current) => {
      //Se crea objeto con las reviews, en donde la llave es el id del item correspondiente.
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
    //Se actualiza el objeto de productos que contiene campos de REVIEWS y RATING.
    dispatch(setProducts({updatedProducts}))
    return updatedProducts
  }

  /*Obtener todas las reviews y calcular rating promedio para cada producto. */
  useEffect(() => {
    fetch(`${API}/get_reviews`)
    .then(data => data.json())
    .then(reviews => {
        getAverageRating(reviews, structuredClone(productsData));
    })
  }, [updateProducts]) 

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
    API, 
    isLoading, 
    setIsLoading, 
    showAnimation, 
    setShowAnimation
  }

  return (
    <BrowserRouter basename='/Shopping-Cart'>
      <CartContext.Provider value = {cartContextValue}>
        <div className="App">
          {
            isLoading 
            ? <Loading />
            :
            <>
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
            </>
          }
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
