import React, { useContext, useEffect } from 'react'
import { useRef } from 'react'
import '../styles/Prices.css'
import { FilterShopContext } from './Shop';

const Prices = () => {
    
    const slider = useRef(null);
    const value = useRef(null);

    const setFilter = useContext(FilterShopContext).setFilter;

    useEffect(() => {
        const helper = slider.current;
        slider.current.addEventListener('change',(e)=>{
            setFilter(prevState => ({
                ...prevState,
                price: e.target.value
            }))
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
            <input ref={slider} type="range" min="0" max="1000" id='slider' defaultValue="500"></input>
            <span ref={value} className='value'>$500</span>
        </div>
    </div>
  )
}

export default Prices