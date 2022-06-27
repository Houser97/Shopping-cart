import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './components/home';
import Shop from './components/shop';
import {useState, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/cart';

export const AddProductContext = createContext();
export const AppCurrentProductStateContext = createContext();

function App() {

  const [itemsInCar, setItemsInCar] = useState(0);
  const [productsInCar, setProductsInCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  return (
    <BrowserRouter>
      <AddProductContext.Provider value={addProduct}>
        <div className="App">
          <Header numberItemsInCar = {itemsInCar}/>
          <div className='fullHeight'>
            <div className='app-body'>
              <Cart submission = {productsInCar} totalPrice = {totalPrice} />
              <Navbar />
              <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/shop" element = {<Shop />} />
              </Routes>
            </div>
          </div>
        </div>
      </ AddProductContext.Provider>
    </BrowserRouter>
  );
}

export default App;
