import Card from './Card';
import ShopFilter from './ShopFilter';
import { createContext, useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { productsSelector } from '../slices/products';

export const FilterShopContext = createContext();

const Shop = () => {

    const { products } = useSelector(productsSelector);
    const isLoading = useContext(CartContext).isLoading

    const [filter, setFilter] = useState({category: 'all', price: 500});
    const [itemsToShow, setItemsToShow] = useState(structuredClone(products))

    useEffect(() => {
        const productsDataCopy = structuredClone(products)
        if(filter.category !== 'all'){
            setItemsToShow(productsDataCopy.filter(product => product.categories.includes(filter.category) && product.price <= filter.price))
        } else {
            setItemsToShow(productsDataCopy.filter(product => product.price <= filter.price))
        }
    }, [products, filter.price, filter.category])
    
    const contextProvider = {setFilter, filter}

    return(
    <div className='flex flex-col w-full'>
        {
            isLoading ? 
            <Loading />
            :
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
                                            <Card key = {`card-iterator-${product.id}`} 
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
        }
    </div>
    )
        
}

export default Shop;