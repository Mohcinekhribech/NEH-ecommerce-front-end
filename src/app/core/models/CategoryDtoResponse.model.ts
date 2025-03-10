import { ProductDtoRequest } from "./ProductDtoRequest.model"

export interface CategoryDtoResponse {
    id:String|''
    name:String | ''
     image:String | ''
    description:String | '' 
    products:ProductDtoRequest[]
}