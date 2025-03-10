import { CategoryDtoRequest } from "./CategoryDtoRequest.model"
import { ProductMediaDtoRequest } from "./ProductMediaDtoRequest.model"
import { TagDtoRequest } from "./TagDtoRequest.model"

export interface ProductDtoResponse {
    id:String|''
    name:String | ''
    quantity:number
    weight:number
    purchasePrice:number 
    finalPrice:number 
    category:CategoryDtoRequest | null
    description:String | ''
    benefits:String | '' 
    howToUse:String | ''  
    tags:TagDtoRequest[]
    productMedias:ProductMediaDtoRequest[]
}