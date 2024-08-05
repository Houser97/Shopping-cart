import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onClear, onUpdate } from "../store";
import { CartMapper } from "../../infrastructure/mappers/cart.mapper";
import { ProductCart } from "../../domain/entities/product.cart";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCartStore = () => {

    const { productsInCart, totalPrice, totalProducts } = useTypedSelector(state => state.cart);
    const dispatch = useDispatch();


    const updateProductInCart = ({ id, quantity, product }) => {

        const currentQuantity = productsInCart[id]?.quantity ?? 0;
        const updatedQuantity = currentQuantity + quantity

        const productCartEntity = CartMapper.toProductCart(product, updatedQuantity);
        const updatedCart = { ...productsInCart, [id]: productCartEntity }

        const productsData = getProductsData(updatedCart);

        const payload = {
            productsInCart: updatedCart,
            totalPrice: productsData.price,
            totalProducts: productsData.count,
        }

        dispatch(onUpdate(payload))
    }

    const removeProduct = (id: string) => {

        const { [id]: productId, ...restProducts } = { ...productsInCart };


        const productsData = getProductsData(restProducts);

        const payload = {
            productsInCart: restProducts,
            totalPrice: productsData.price,
            totalProducts: productsData.count
        }

        dispatch(onUpdate(payload));
    }

    const getProductsData = (products: Record<string, ProductCart>,) =>
        Object.keys(products).reduce((acc, id) => {
            const { quantity, price: productPrice } = products[id]
            const price = acc.price + quantity * productPrice;
            const count = acc.count + quantity

            return {
                price,
                count
            };
        }, { count: 0, price: 0 });

    const clearCart = () => {
        dispatch(onClear());
    }

    return {
        // Properties
        productsInCart,
        totalPrice,
        totalProducts,

        // Methods
        updateProductInCart,
        removeProduct,
        clearCart
    }

}