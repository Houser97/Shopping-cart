import React, { useEffect } from 'react'
import { useRef } from 'react'
import '../styles/Prices.css'

const Prices = () => {
    
    const slider = useRef(null);
    const selector = useRef(null)

    useEffect(() => {
        slider.current.addEventListener('change',(e)=>{
            
        });
            
        slider.current.addEventListener('input',(e)=>{
            const relativeValue = Math.floor(e.target.value*slider.current.offsetWidth/199.9)/10
            selector.current.style.left = `${relativeValue}px`
            console.log(relativeValue);
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
            <div ref={selector} className='selector'></div>
        </div>
    </div>
  )
}

export default Prices