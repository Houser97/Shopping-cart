import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import {useState} from "react";

function App() {

  const [itemsInCar, setItemsInCar] = useState(10);

  return (
    <div className="App">
      <Header numberItemsInCar = {itemsInCar}/>
      <div className='fullHeight'>
        <div className='app-body'>
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default App;
