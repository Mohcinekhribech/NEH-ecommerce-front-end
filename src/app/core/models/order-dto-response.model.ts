import { OrderStatus } from "../enums/order-status.enum"
import { UserResp } from "./UserResp.model"
import { PaymentStatus } from "../enums/payment-status.enum"
import { PaymentMethod } from "../enums/payment-method.enum"
import { OrderedProductsResponse } from "./ordered-products-dto-response.model"

export interface OrderDtoResponse {
    id: String
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    city: String
    zipCode: String
    country: String
    client: UserResp
    totalPrice: number
    status: OrderStatus
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    orderedProducts: OrderedProductsResponse[]
}