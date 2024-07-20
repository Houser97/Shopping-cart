import { useState, useCallback } from "react";
import { Product } from "../../domain/entities/product";
import { Review } from "../../domain/entities/review";
import { productRepositoryProvider, reviewRepositoryProvider } from "../providers";
import { TotalReactions, UserReactions } from "../../domain/entities/reaction";

export const useProduct = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalReactions, setTotalReactions] = useState<TotalReactions>({});
    const [userReactions, setUserReactions] = useState<UserReactions>({});

    const getProductById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const [productData, reviewsData] = await Promise.all([
                productRepositoryProvider.getProductById(id),
                reviewRepositoryProvider.getReviews(id)
            ]);

            const { reviews: fetchedReviews, totalReactions: fetchedTotalReactions, userReactions: fetchedUserReactions } = reviewsData;

            setProduct(productData);
            setReviews(fetchedReviews);
            setTotalReactions(fetchedTotalReactions);
            setUserReactions(fetchedUserReactions);
        } catch (error) {
            console.error("Failed to fetch product data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        product,
        reviews,
        totalReactions,
        userReactions,
        getProductById
    };
};