export interface ProductDBResponse {
    id: string;
    title: string;
    price: number;
    authorId: string;
    images: string[];
    description: string;
    rating: number | null;
    totalReviews: number;
    slug: string;
}

export interface Meta {
    total: number;
    page:  number;
    pages: number;
}

export interface ProductDBResponseNest {
    data: ProductDBResponse[]
    meta: Meta
}