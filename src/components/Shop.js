import '../styles/Shop.css';
import Card from './Card';
import { productsData } from '../assets/constants';
import ShopFilter from './ShopFilter';
import { createContext, useEffect, useState } from 'react';

export const FilterShopContext = createContext();

const Shop = () => {

    const [filterCategory, setFilterCategory] = useState('all');
    const [itemsToShow, setItemsToShow] = useState(productsData)

    useEffect(() => {
        if(filterCategory !== 'all'){
            const productsDataCopy = structuredClone(productsData)
            setItemsToShow(productsDataCopy.filter(product => product.categories.includes(filterCategory)))
        }
    }, [filterCategory])
    

    const contextProvider = {setFilterCategory}

    return(
    <div className='shop-page'>
        <FilterShopContext.Provider value={contextProvider}>
            <div className='shop-title'>Shop</div>
            <ShopFilter />
            <div className="shop-page">
                {           
                    itemsToShow.map(
                        function iterateImages(product, iterator){
                            return(
                                <Card key = {iterator} {...product} />
                            )
                        }) 
                } 
            </div>  
        </FilterShopContext.Provider>
    </div>     
    )
        
}

export default Shop;