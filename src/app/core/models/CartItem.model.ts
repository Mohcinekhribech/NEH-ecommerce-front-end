import { ProductDtoResponse } from "./ProductDtoResponse.model";

export interface CartItem {
    product: ProductDtoResponse;
    quantity: number;
}