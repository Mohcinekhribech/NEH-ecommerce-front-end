import { ProductDtoResponse } from "./ProductDtoResponse.model"

export interface OrderedProductsResponse {
    orderId:String
    product:ProductDtoResponse
    quantity:number
    unitPrice:number
    totalPrice:number
}