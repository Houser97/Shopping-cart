export interface Product {
    id: string,
    title: string,
    price: number,
    authorId: string,
    images: string[],
    description: string,
    rating: number | null,
    totalReviews: number,
}