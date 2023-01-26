import React, { useContext, useRef, useState } from 'react'
import '../styles/Categories.css'
import { FilterShopContext } from './Shop'

const Categories = () => {

    const setFilterCategory = useContext(FilterShopContext).setFilterCategory;
    const currentFilter = useContext(FilterShopContext).filterCategory;
    const [categoryPreviousIndex, setCategoryPreviousIndex] = useState(null);
    const categoriesArray = useRef([])

    const categoriesList = ['Videogames','Electronics','Music']

    const setCategoryBackground = (index) => {
        if(categoryPreviousIndex || categoryPreviousIndex === 0 ){
            categoriesArray.current[categoryPreviousIndex].classList.remove("selected")
            categoriesArray.current[categoryPreviousIndex].classList.add("category-item")
        }
        if(categoryPreviousIndex !== index){
            categoriesArray.current[index].classList.add("selected")
            categoriesArray.current[index].classList.remove("category-item")
            setCategoryPreviousIndex(index)
        } else {
            categoriesArray.current[index].classList.remove("selected")
            categoriesArray.current[index].classList.add("category-item") 
        }
    }

    const updateFilter = (category) => {
        if(currentFilter === category){
            setFilterCategory('all')
        } else {
            setFilterCategory(category)
        }
    }

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
                        ref={((category) => categoriesArray.current[index] = category)}
                        onClick={() => {
                            updateFilter(category);
                            setCategoryBackground(index);
                        }}>
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