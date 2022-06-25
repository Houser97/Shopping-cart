import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './components/home';
import Shop from './components/shop';
import {useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/cart';

function App() {

  const [itemsInCar, setItemsInCar] = useState(10);

  return (
    < BrowserRouter>
      <div className="App">
        <Header numberItemsInCar = {itemsInCar}/>
        <div className='fullHeight'>
          <div className='app-body'>
            <Cart submission = {[]} />
            <Navbar />
            <Routes>
              <Route path="/" element = {<Home />} />
              <Route path="/shop" element = {<Shop />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
