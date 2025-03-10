import { ProductDtoRequest } from "./ProductDtoRequest.model"

export interface TagDtoResponse {
    id:String|''
    name:String | ''
    products:ProductDtoRequest[]
}