import { OrderStatus } from "../enums/order-status.enum"
import { PaymentMethod } from "../enums/payment-method.enum"
import { PaymentStatus } from "../enums/payment-status.enum"
import { OrderedProducts } from "./ordered-products-dto.model"

export interface OrderDtoRequest {
    firstName:String
    lastName:String
    email:String
    phone:String
    address:String
    city:String
    zipCode:String
    country:String
    clientId:String
    promoCode:String
    status:OrderStatus
    paymentStatus:PaymentStatus
    paymentMethod:PaymentMethod
    totalPrice:number
    orderedProducts:OrderedProducts[]
}