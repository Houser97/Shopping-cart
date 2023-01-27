import React from 'react'
import '../styles/ShopFilter.css'
import Categories from './Categories'
import Prices from './Prices'

const ShopFilter = () => {
  return (
    <div className='shop-filter'>
        <Categories />
        <Prices />
    </div>
  )
}

export default ShopFilter