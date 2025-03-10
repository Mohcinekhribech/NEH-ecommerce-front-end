import { ProductDtoResponse } from "../ProductDtoResponse.model";

export interface PaginatedProducts {
    content: ProductDtoResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}