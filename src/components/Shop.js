import '../styles/Shop.css';
import Card from './Card';
import { productsData } from '../assets/constants';
import ShopFilter from './ShopFilter';
import { createContext, useState } from 'react';

export const FilterShopContext = createContext();

const Shop = () => {

    const [filterCategory, setFilterCategory] = useState('all');

    const contextProvider = {setFilterCategory}

    return(
    <div className='shop-page'>
        <FilterShopContext.Provider value={contextProvider}>
            <div className='shop-title'>Shop</div>
            <ShopFilter />
            <div className="shop-page">
                {           
                    productsData.map(
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