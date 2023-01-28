import React, { useEffect } from 'react'
import { useRef } from 'react'
import '../styles/Prices.css'

const Prices = () => {
    
    const slider = useRef(null);
    const value = useRef(null);


    useEffect(() => {
        const helper = slider.current;
        slider.current.addEventListener('change',(e)=>{
            
        });
            
        slider.current.addEventListener('input', (e)=>{
            value.current.textContent = `$${e.target.value}`
        });

        return () => {
            helper.removeEventListener('change',(e)=>{
                console.log('change');
            });
                
            helper.removeEventListener('input',(e)=>{
                console.log('input');
            });
        }
    }, [])
    

  return (
    <div className='price-container filter-subsection'>
        <h3>Prices</h3>
        <div className='prices-range'>
            <input ref={slider} type="range" min="0" max="2000" id='slider' defaultValue="1000"></input>
            <span ref={value} className='value'>$1000</span>
        </div>
    </div>
  )
}

export default Prices