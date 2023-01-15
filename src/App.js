import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import {useState, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export const CartContext = createContext()

function App() {

  const [itemsInCar, setItemsInCar] = useState(0);
  const [productsInCar, setProductsInCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const removeProduct = (e) => {
    const ID = e.target.id;
    let productsInCarHelper = productsInCar;
    let iterator = 0;
    let elementPosition = 0;
    productsInCar.forEach(product => {
      if(product.id === ID){
        elementPosition = iterator;
      }
      iterator ++;
    })
    setProductsInCar([...productsInCarHelper.slice(0,elementPosition), ...productsInCarHelper.slice(elementPosition+1)]);
  }

  const checkIfProductAlreadyInCar = (currentProductId) => {
    let productsIdInCar = []
    productsInCar.forEach(product => productsIdInCar.push(product.id));
    const isProductAlreadyInCar = productsIdInCar.includes(currentProductId);
    return isProductAlreadyInCar;
  }

  const addCurrentProductQuantity = (productId, Quantity, newProduct) => {
    let productsInCarHelper = [...productsInCar];
    let iterator = 0;
    let positionProduct = 0;
    let quantityToAdd = parseInt(newProduct.quantity);

    productsInCar.forEach(product => {
      if(product.id === productId){
       quantityToAdd += parseInt(product.quantity);
       positionProduct = iterator;
      }
      iterator ++;
    })
    newProduct.quantity = quantityToAdd;
    productsInCarHelper[positionProduct] = newProduct;
    setProductsInCar([...productsInCarHelper]);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeTotalPrice = () => {
    let totalPrice = 0;
    productsInCar.forEach(product => {
      totalPrice += parseInt(product.quantity) * parseInt(product.price);
    })
    setTotalPrice(totalPrice);
  }

  const updateTotalProductInCard = () => {
    let products = 0;
    productsInCar.forEach(product => {
      products += parseInt(product.quantity);
    })
    setItemsInCar(products)
  }

  const addProduct = (e) => {
    const ID = e.target.id;
    let productRaw = document.getElementById(`${ID}-card`);
    let childs = productRaw.childNodes;

    const price = childs[0].textContent.slice(1);
    const imgSrc = childs[1].childNodes[0].src;
    const nameProduct = childs[2].textContent;
    const quantityProducts = childs[3].childNodes[1].textContent;

    const product = {image: imgSrc, name: nameProduct, price: price, id: ID, quantity: quantityProducts}

    if(checkIfProductAlreadyInCar(ID)){
      addCurrentProductQuantity(ID, quantityProducts, product)
    } else {
      setProductsInCar([...productsInCar, product])
    }
  }

  useEffect(() => {
    changeTotalPrice();
    updateTotalProductInCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeTotalPrice, productsInCar])

  const cartContextValue = {productsInCar, totalPrice, addProduct, removeProduct}

  return (
    <BrowserRouter basename='Shopping-cart/'>
      <CartContext.Provider value = {cartContextValue}>
        <div className="App">
          <Header numberItemsInCar = {itemsInCar}/>
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/shop" element = {<Shop />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
