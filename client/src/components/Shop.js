import Card from './Card';
import { productsData } from '../assets/constants';
import ShopFilter from './ShopFilter';
import { createContext, useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';

export const FilterShopContext = createContext();

const Shop = () => {

    const [filter, setFilter] = useState({category: 'all', price: 500});
    /*Estado con estructura general de productos con rating actualizado. */
    const [updatedProducts, setUpdatedProducts] = useState(structuredClone(productsData))
    const [itemsToShow, setItemsToShow] = useState(structuredClone(updatedProducts))
    const [reviews, setReviews] = useState([])

    const API = useContext(CartContext).API;

    const getAverageRating = (reviews, products) => {
        const reviewsById = reviews.reduce((acc, current) => {
            if(!acc[current.item]){
                acc[current.item] = {count: 0, sum: 0}
            }

            acc[current.item].count += 1
            acc[current.item].sum += current.rating

            return acc;
        }, {})

        const updatedProducts = products.map((productObject) => {
            const { count, sum } = reviewsById[productObject.id] || {}
            if(count){
                productObject.rating = Math.round(sum/count)
            }
            return productObject
        })
        return updatedProducts
    }

/*Obtener todas las reviews y calcular rating promedio para cada producto. */
    useEffect(() => {
        fetch(`${API}/get_reviews`)
        .then(data => data.json())
        .then(reviews => {
            setReviews(reviews)
            setUpdatedProducts(getAverageRating(reviews, updatedProducts))
        })
    }, []) 

    useEffect(() => {
        const productsDataCopy = structuredClone(updatedProducts)
        if(filter.category !== 'all'){
            setItemsToShow(productsDataCopy.filter(product => product.categories.includes(filter.category) && product.price <= filter.price))
        } else {
            setItemsToShow(productsDataCopy.filter(product => product.price <= filter.price))
        }
    }, [reviews ,filter.price, filter.category])
    
    const contextProvider = {setFilter, filter, reviews}

    return(
    <div className='flex flex-col mt-[var(--header-height)] w-full bg-white'>
        <FilterShopContext.Provider value={contextProvider}>
            <div className='bg-[var(--blue-color)] text-7xl text-center text-white font-bold py-5'>Shop</div>
            <ShopFilter />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows-[repeat(auto-fit,minmax(0,1fr))]
            py-12 w-full m-0 px-5 gap-10 gap-y-12 justify-center 2sm:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] md:px-10">
                {   itemsToShow.length > 0 ? (    
                        itemsToShow.map(
                            (product, iterator) => {
                                return(
                                    <Card key = {`card-iterator-${iterator}`} 
                                    {...product} 
                                    isLazy={iterator > 1} />
                                )
                            }) 
                    ):
                    (
                        <div className='text-5xl font-bold text-center self-center h-full py-10'>No items match current filter</div>
                    )
                } 
            </div>  
        </FilterShopContext.Provider>
    </div>     
    )
        
}

export default Shop;