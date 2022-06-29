import { useRef } from 'react';
import './App.css';
import image from './adventure-time.png'


function App() {

  const imgRef = useRef(null)
  const square = useRef(null)

  const eventDIV = (e) => {

  } 


  return (
    <div className="App">
      <img src={image} alt='cartoon-network' className='img-project' ref={imgRef} onClick={eventDIV}></img>
      <div className='magic-div' ref={square}></div>
    </div>
  );
}

export default App;
