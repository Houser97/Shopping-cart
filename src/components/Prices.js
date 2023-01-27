import React, { useEffect } from 'react'
import { useRef } from 'react'
import '../styles/Prices.css'

const Prices = () => {
    
    const slider = useRef(null);

    useEffect(() => {
        slider.current.addEventListener('change',(e)=>{
            console.log(e.target.value);
        });
            
        slider.current.addEventListener('input',(e)=>{
            console.log('input');
        });

        return () => {
            slider.current.removeEventListener('change',(e)=>{
                console.log('change');
            });
                
            slider.current.removeEventListener('input',(e)=>{
                console.log('input');
            });
        }
    }, [])
    

  return (
    <div className='price-container filter-subsection'>
        <h3>Prices</h3>
        <div className='prices-range'>
            <input ref={slider} type="range" min="0" max="2000" id='slider' defaultValue="1000"></input>
        </div>
    </div>
  )
}

export default Prices