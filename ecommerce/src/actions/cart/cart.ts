import { ProductCart } from "@/domain/entities/product.cart";
import { cartRepositoryProvider } from "@/providers/cart-repository.provider";
const productsInCart = {} // viene del gestor de estado

export interface CartData {
    productsInCart: Record<string, any>;
    totalPrice: number;
    totalProducts: number;
}

export const getProducts = async () => {
    try {
        return await cartRepositoryProvider.getProducts();
    } catch (error) {
        console.log(error)
        //toast('Login to make this operation', ToastTypes.ERROR);
        return {};
    }
}

export const createProduct = async (userId: string, productId: string, quantity: number) => {
    try {
        return await cartRepositoryProvider.createProduct(userId, productId, quantity);
    } catch (error) {
        //toast(`${error}`, ToastTypes.ERROR);
        return {}
    }

}

export const updateProduct = async (id: string, quantity: number) => {
    try {
        return await cartRepositoryProvider.updateProduct(id, quantity);
    } catch (error) {
        //toast(`${error}`, ToastTypes.ERROR);
        return {}
    }
}

export const addProducts = (products: ProductCart[]): CartData => {
    const cart = products.reduce((prev, product) => {
        const { productId } = product;
        return { ...prev, [productId]: product }
    }, {})

    const productsData = getProductsData(cart);

    const cartData = {
        productsInCart: cart,
        totalPrice: productsData.price,
        totalProducts: productsData.count,
    }

    return cartData

    //dispatch(onUpdate(payload))
}

export const loadDbProducts = async () => {
    const products = await getProducts()
    if (Object.keys(products).length > 0) {
        return addProducts(Object.values(products))
    }
    return null;
}


export const updateCart = (product: ProductCart, productsInCart: Record<string, ProductCart>): CartData => {
    const { productId } = product;

    const updatedCart = { ...productsInCart, [productId]: product }

    const productsData = getProductsData(updatedCart);

    const cartData = {
        productsInCart: updatedCart,
        totalPrice: productsData.price,
        totalProducts: productsData.count,
    }

    return cartData;

    //dispatch(onUpdate(payload))
}

// export const removeProduct = async (id: string) => {
//     try {
//         const { productId } = await cartRepositoryProvider.deleteProduct(id);
//         const { [productId]: product, ...restProducts } = { ...productsInCart };

//         const productsData = getProductsData(restProducts);

//         const payload = {
//             productsInCart: restProducts,
//             totalPrice: productsData.price,
//             totalProducts: productsData.count
//         }

//         //dispatch(onUpdate(payload));
//     } catch (error) {
//         console.log(error)
//         //toast(`${error}`, ToastTypes.ERROR);
//     }
// }

export const getProductsData = (products: Record<string, ProductCart>,) =>
    Object.keys(products).reduce((acc, id) => {
        const { quantity, price: productPrice } = products[id]
        const price = (100 * acc.price + quantity * productPrice * 100) / 100;
        const count = acc.count + quantity

        return {
            price,
            count
        };
    }, { count: 0, price: 0 });

export const handlePayment = async () => {
    try {
        const deleteProducts = await cartRepositoryProvider.handlePayment();
        //dispatch(onClear());
        return deleteProducts
    } catch (error) {
        //toast(`${error}`, ToastTypes.ERROR);
        return []
    }
}


