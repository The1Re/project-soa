export interface Order {
    id: number,
    cusId: string,
    totalPrice: number
}

export interface OrderDetail {
    id: number,
    productId: number,
    orderId: number
}