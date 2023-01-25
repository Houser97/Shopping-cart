import React, { useContext } from 'react'
import '../styles/Categories.css'
import { FilterShopContext } from './Shop'

const Categories = () => {

    const setFilterCategory = useContext(FilterShopContext).setFilterCategory;

    const categoriesList = ['Videogames','Electronics','Music']

  return (
    <div className='categories filter-subsection'>
        <h3>Categories</h3>
        <div className='categories-list'>
            {
                categoriesList.map((category, index) => {
                    return(
                        <div 
                        key={`category-item-${index}`} 
                        className='category-item'
                        onClick={() => setFilterCategory(category)}>
                                {category}
                        </div>
                    )
                })
            }
        </div>
    </div>  
  )
}

export default Categories