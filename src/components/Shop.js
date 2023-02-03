import '../styles/Shop.css';
import Card from './Card';
import { productsData } from '../assets/constants';
import ShopFilter from './ShopFilter';
import { createContext, useEffect, useState } from 'react';

export const FilterShopContext = createContext();

const Shop = () => {

    const [filter, setFilter] = useState({category: 'all', price: 500});
    const [itemsToShow, setItemsToShow] = useState(productsData)

    useEffect(() => {
        const productsDataCopy = structuredClone(productsData)
        if(filter.category !== 'all'){
            setItemsToShow(productsDataCopy.filter(product => product.categories.includes(filter.category) && product.price <= filter.price))
        } else {
            setItemsToShow(productsDataCopy.filter(product => product.price <= filter.price))
        }
    }, [filter])
    

    const contextProvider = {setFilter, filter}

    return(
    <div className='shop-page'>
        <FilterShopContext.Provider value={contextProvider}>
            <div className='shop-title'>Shop</div>
            <ShopFilter />
            <div className="shop-page">
                {   itemsToShow.length > 0 ? (    
                        itemsToShow.map(
                            function iterateImages(product, iterator){
                                return(
                                    <Card key = {iterator} 
                                    {...product} 
                                    isLazy={iterator > 1} />
                                )
                            }) 
                    ):
                    (
                        <div className='no-items'>No items match current filter</div>
                    )
                } 
            </div>  
        </FilterShopContext.Provider>
    </div>     
    )
        
}

export default Shop;