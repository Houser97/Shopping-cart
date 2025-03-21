import { getProducts } from '@/actions/products/products';
import { ProductCard } from '@/components/Product/ProductCard';


export default async function ShopPage() {

    const productsDB = await getProducts();

    return (
        <div className='flex flex-col w-full bg-[var(--white-color)] min-h-screen'>
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
            </div>
        </div>
    )

}
