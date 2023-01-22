import React from 'react'
import '../styles/ShopFilter.css'

const ShopFilter = () => {
  return (
    <div className='shop-filter'>
        <div className='categories'>
            <h3>Categories</h3>
            <div className='categories-list'>
                Videogames, Electronics, Music
            </div>
        </div>
        <div className='price'>
            <h3>Prices</h3>
            <div className='prices-list'>
                Videogames, Electronics, Music
            </div>
        </div>
    </div>
  )
}

export default ShopFilter