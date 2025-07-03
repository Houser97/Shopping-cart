import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onClear, onUpdate } from "../store";
import { ProductCart } from "../../domain/entities/product.cart";
import { cartRepositoryProvider } from "../providers";
import { ToastTypes, toast } from "../../config/helpers/Toaster/Toaster";


const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCartStore = () => {

    const { productsInCart, totalPrice, totalProducts } = useTypedSelector(state => state.cart);
    const dispatch = useDispatch();

    const getProducts = async () => {
        try {
            return await cartRepositoryProvider.getProducts();
        } catch (error) {
            toast('Login to make this operation', ToastTypes.ERROR);
            return {};
        }
    }

    const createProduct = async (userId: string, productId: string, quantity: number) => {
        try {
            return await cartRepositoryProvider.createProduct(userId, productId, quantity);
        } catch (error) {
            toast(`${error}`, ToastTypes.ERROR);
            return {}
        }

    }

    const updateProduct = async (id: string, quantity: number) => {
        try {
            return await cartRepositoryProvider.updateProduct(id, quantity);
        } catch (error) {
            toast(`${error}`, ToastTypes.ERROR);
            return {}
        }
    }

    const addProducts = (products: ProductCart[]) => {

        const cart = products.reduce((prev, product) => {
            const { productId } = product;
            return { ...prev, [productId]: product }
        }, {})

        const productsData = getProductsData(cart);

        const payload = {
            productsInCart: cart,
            totalPrice: productsData.price,
            totalProducts: productsData.count,
        }

        dispatch(onUpdate(payload))
    }

    const loadDbProducts = async () => {
        const products = await getProducts()
        if (Object.keys(products).length > 0)
            addProducts(Object.values(products));
    }


    const updateCart = (product: ProductCart) => {
        const { productId } = product;

        const updatedCart = { ...productsInCart, [productId]: product }

        const productsData = getProductsData(updatedCart);

        const payload = {
            productsInCart: updatedCart,
            totalPrice: productsData.price,
            totalProducts: productsData.count,
        }

        dispatch(onUpdate(payload))
    }

    const removeProduct = async (id: string) => {
        try {
            const { productId } = await cartRepositoryProvider.deleteProduct(id);
            const { [productId]: product, ...restProducts } = { ...productsInCart };

            const productsData = getProductsData(restProducts);

            const payload = {
                productsInCart: restProducts,
                totalPrice: productsData.price,
                totalProducts: productsData.count
            }

            dispatch(onUpdate(payload));
        } catch (error) {
            toast(`${error}`, ToastTypes.ERROR);
        }
    }

    const getProductsData = (products: Record<string, ProductCart>,) =>
        Object.keys(products).reduce((acc, id) => {
            const { quantity, price: productPrice } = products[id]
            const price = (100 * acc.price + quantity * productPrice * 100) / 100;
            const count = acc.count + quantity

            return {
                price,
                count
            };
        }, { count: 0, price: 0 });

    const handlePayment = async () => {
        try {
            const deleteProducts = await cartRepositoryProvider.handlePayment();
            dispatch(onClear());
            return deleteProducts
        } catch (error) {
            toast(`${error}`, ToastTypes.ERROR);
            return []
        }
    }

    return {
        // Properties
        productsInCart,
        totalPrice,
        totalProducts,

        // Methods
        updateProduct,
        removeProduct,
        handlePayment,
        getProducts,
        createProduct,
        loadDbProducts,
        updateCart
    }

}