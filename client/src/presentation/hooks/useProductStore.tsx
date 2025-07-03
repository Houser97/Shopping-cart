import { useDispatch } from "react-redux";
import { productRepositoryProvider } from "../providers/product-repository.provider";
import { onProductFetch, onProductFetchFail, onProductFetchStart } from "../store";
import { useTypedSelector } from "../store/config/typed-selector";

import { useState, useCallback } from "react";
import { Product } from "../../domain/entities/product";
import { DetailedReview } from "../../domain/entities/review";

import { TotalReactions } from "../../domain/entities/reaction";
import { reviewRepositoryProvider } from "../providers";


export const useProductStore = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<DetailedReview[]>([]);
    const [totalReactions, setTotalReactions] = useState<TotalReactions>({});
    const { productsDB, isFetching } = useTypedSelector(state => state.product);


    const dispatch = useDispatch();

    const startFetch = async () => {
        dispatch(onProductFetchStart());
        try {
            const products = await productRepositoryProvider.getProducts();
            dispatch(onProductFetch({ products }))
        } catch (error) {
            dispatch(onProductFetchFail());
            console.log(error)
        }
    }


    const getProductById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const [productData, reviewsData] = await Promise.all([
                productRepositoryProvider.getProductById(id),
                reviewRepositoryProvider.getReviews(id)
            ]);

            const { reviews: fetchedReviews, totalReactions: fetchedTotalReactions } = reviewsData;

            setProduct(productData);
            setReviews(fetchedReviews);
            setTotalReactions(fetchedTotalReactions);
        } catch (error) {
            setProduct(undefined);
            setReviews([]);
            setTotalReactions({});

        } finally {
            setIsLoading(false);
        }
    }, []);



    return {
        productsDB,
        isFetching,
        isLoading,
        product,
        reviews,
        totalReactions,

        startFetch,
        getProductById
    }
}