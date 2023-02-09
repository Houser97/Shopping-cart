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

export const CartContext = createContext()

function App() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [productsInCar, setProductsInCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const cartContextValue = {productsInCar, totalPrice, totalProducts ,addProduct, removeProduct}

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
