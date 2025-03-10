import { ProductMediaDtoRequest } from "./ProductMediaDtoRequest.model"

export interface ProductDtoRequest {
    id:String|''
    name:String | ''
    quantity:number
    weight:number
    purchasePrice:number | ''
    finalPrice:number | ''
    categoryId:String | ''
    description:String | '' 
    benefits:String | '' 
    howToUse:String | '' 
    tags:String[]
}