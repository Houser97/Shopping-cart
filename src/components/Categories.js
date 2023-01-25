import React from 'react'
import '../styles/Categories.css'

const Categories = () => {

    const categoriesList = ['Videogames','Electronics','Music']

  return (
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
  )
}

export default Categories