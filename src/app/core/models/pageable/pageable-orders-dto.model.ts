import { OrderDtoResponse } from "../order-dto-response.model";

export interface PaginatedOrders {
    content: OrderDtoResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }