import React from 'react'
import '../styles/ShopFilter.css'
import Categories from './Categories'

const ShopFilter = () => {
  return (
    <div className='shop-filter'>
        <Categories />
        <div className='price filter-subsection'>
            <h3>Prices</h3>
            <div className='prices-list'>
            </div>
        </div>
    </div>
  )
}

export default ShopFilter