import { productRepositoryProvider } from "@/providers/product-repository.provider";
import { reviewRepositoryProvider } from "@/providers/review-repository.provider";

export const getProducts = async () => {

    try {
        const products = await productRepositoryProvider.getProducts();
        return products;
    } catch (error) {
        console.log(error)
        return [];
    }

}

export const getProductById = async (id: string) => {
    try {
        const [productData, reviewsData] = await Promise.all([
            productRepositoryProvider.getProductById(id),
            reviewRepositoryProvider.getReviews(id)
        ]);
        

        const { reviews, totalReactions } = reviewsData;

        return { reviews, totalReactions, product: productData }

    } catch (error) {
        console.log(error)
        return {}
    }
}

export const getProductBySlug = async (slug: string) => {
    try {
        const productData = await productRepositoryProvider.getProductBySlug(slug)
        return { product: productData }

    } catch (error) {
        console.log(error)
        return {}
    }
}