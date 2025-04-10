import { ProductDtoRequest } from "./ProductDtoRequest.model"

export interface CategoryDtoResponse {
    id:String|''
    name:String | ''
     image:String | ''
    description:string 
    products:ProductDtoRequest[]
}