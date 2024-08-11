export interface ProductCart {
    id: string,
    userId: string,
    productId: string,
    price: number,
    image: string,
    name: string,
    quantity: number
}

export interface ProductCartObject {
    [productId: string]: ProductCart
}