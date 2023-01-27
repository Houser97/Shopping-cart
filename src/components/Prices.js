import React from 'react'
import '../styles/Prices.css'

const Prices = () => {
  return (
    <div className='price-container filter-subsection'>
        <h3>Prices</h3>
        <div className='prices-range'>
            <input type="range" min="0" max="2000" id='slider' defaultValue="1000"></input>
            <div className='selector'></div>
        </div>
    </div>
  )
}

export default Prices