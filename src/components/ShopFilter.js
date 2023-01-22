import React from 'react'
import '../styles/ShopFilter.css'

const ShopFilter = () => {

    const categoriesList = ['Videogames','Electronics','Music']

  return (
    <div className='shop-filter'>
        <div className='categories filter-subsection'>
            <h3>Categories</h3>
            <div className='categories-list'>
                {
                    categoriesList.map((category, index) => {
                        return(
                            <div key={`category-item-${index}`} className='category-item'>{category}</div>
                        )
                    })
                }
            </div>
        </div>
        <div className='price filter-subsection'>
            <h3>Prices</h3>
            <div className='prices-list'>

            </div>
        </div>
    </div>
  )
}

export default ShopFilter