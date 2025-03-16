import { getProducts } from '@/actions/products/products';
import { ProductCard } from '@/components/Product/ProductCard';


// import { useProductStore } from '../../hooks/useProductStore';
// import { ProductCard } from '../../components/products/cards/ProductCard';
// import { PageLoader } from '../../components/ui/loaders/PageLoader';



export default async function ShopPage () {


    //const { productsDB, isFetching, startFetch } = useProductStore();
    const productsDB = await getProducts();


    // if (isFetching)
    //     return <PageLoader />


    // const [filter, setFilter] = useState({ category: 'all', price: 500 });
    // const [itemsToShow, setItemsToShow] = useState(structuredClone(products))

    // useEffect(() => {
    //     const productsDataCopy = structuredClone(products)
    //     if (filter.category !== 'all') {
    //         setItemsToShow(productsDataCopy.filter(product => product.categories.includes(filter.category) && product.price <= filter.price))
    //     } else {
    //         setItemsToShow(productsDataCopy.filter(product => product.price <= filter.price))
    //     }
    // }, [products, filter.price, filter.category])

    // const contextProvider = { setFilter, filter }

    return (
        <div className='flex flex-col w-full bg-[var(--white-color)]'>
            <div className='flex flex-col mt-[var(--header-height)] w-full '>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows-[repeat(auto-fit,minmax(0,1fr))]
                py-12 w-full m-0 px-5 gap-10 gap-y-12 justify-center 2sm:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] md:px-10">
                    {productsDB.length > 0 ? (
                        productsDB.map(
                            (product, iterator) => {
                                return (
                                    <ProductCard key={`${product.id}`}
                                        product={product}
                                        isLazy={iterator > 1} />
                                )
                            })
                    ) :
                        (
                            <div className='text-5xl font-bold text-center self-center h-full py-10'>No items match current filter</div>
                        )
                    }
                </div>

                {/* <FilterShopContext.Provider value={contextProvider}>
                    <div className='bg-[var(--blue-color)] text-7xl text-center text-white font-bold py-5'>Shop</div>
                    <ShopFilter />

                </FilterShopContext.Provider> */}
            </div>
        </div>
    )

}
