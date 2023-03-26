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

export const CartContext = createContext();
const API = 'http://localhost:5000/api';

function App() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [productsInCart, setProductsInCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  /*Estado para mostrar animación de botón BUY */
  const [showAnimation, setShowAnimation] = useState(false)
  
  const [isLoading, setIsLoading] = useState(true)
  /*Estado con estructura general de productos con rating actualizado. */
  const [globalUpdatedProducts, setGlobalUpdatedProducts] = useState(structuredClone(productsData))
  /*Sirve para actualizar reviews apenas se haga un post */
  const [updateReviews, setUpdateReviews] = useState(false)

  const checkIfProductAlreadyInCar = (productId) => {
    return productsInCart.some(product => product.id === productId);
  }

  const addCurrentProductQuantity = (newQuantity, productId) => {
    const productsHelper = structuredClone(productsInCart)
    const productIndex = productsHelper.findIndex(product => product.id === productId)
    productsHelper[productIndex].quantity += newQuantity
    setProductsInCar([...productsHelper]);
  }

  const changeTotalPrice = () => {
    setTotalPrice(productsInCart.reduce((acc, current) => acc + current.quantity*current.price, 0));
  }

  const updateTotalProductInCard = () => {
    setTotalProducts(productsInCart.reduce((acc, current) => acc + current.quantity, 0))
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
      setProductsInCar([...productsInCart, product])
    }
  }

  const removeProduct = (id) => {
    setProductsInCar(oldArray => oldArray.filter(product => product.id !== id))
  } 

  useEffect(() => {
    changeTotalPrice();
    updateTotalProductInCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeTotalPrice, productsInCart])

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
    fetch(`${API}/check_user_status`, {
      credentials: 'include'
    })
    .then(data => data.json())
    .then(user => {
      if(!user) return undefined;
      /*Se deben servir los productos del usuario al carrito */
        const userCart = user.cart.reduce((acc, product) => {
          const currentProduct = productsDataObject[product.id]
          currentProduct.quantity = product.quantity
          acc.push(currentProduct)
          return acc
        }, [])
        setProductsInCar(userCart)
        setUser(user);
    })
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
    }).then(data=> data.json()).then(data => {
      const userCopy = structuredClone(user)
      userCopy.cart = productsInCart
      setUser(userCopy)
    })
  }, [productsInCart])

  const cartContextValue = {productsInCart, totalPrice, totalProducts,
    addProduct, removeProduct, user, setUser, API, setProductsInCar, 
    setGlobalUpdatedProducts, globalUpdatedProducts, setUpdateReviews,
    isLoading, setIsLoading, showAnimation, setShowAnimation
  }

  return (
    <BrowserRouter basename='Shopping-cart/'>
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
