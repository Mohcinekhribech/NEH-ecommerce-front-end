import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDtoRequest } from 'src/app/core/models/CategoryDtoRequest.model';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { ProductDtoRequest } from 'src/app/core/models/ProductDtoRequest.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.css']
})
export class ProductUpdateFormComponent {
  constructor(private productService:ProductService ,private categoryService:CategoryService , private route : ActivatedRoute, private router : Router){}
  categories:CategoryDtoResponse[]=[]
  productId:string|null = '' ;
  categoryDtoRequest : CategoryDtoRequest ={
    id: '',
    name: '',
    description: '',
    image: ''
  }
  productDtoRequest : ProductDtoRequest ={
    id: '',
    name: '',
    description: '',
    quantity: 0,
    weight: 0,
    purchasePrice: 0,
    finalPrice: '',
    categoryId: '',
    tags: [],
    benefits: '',
    howToUse: ''
  }

  ngOnInit()
  {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId)
        this.productService.getOneProduct(this.productId)
      .subscribe(res => {
        this.productDtoRequest = res;
        this.categoryDtoRequest = res.category;
        this.productDtoRequest.categoryId = res.category.id
      })
    });
    this.categoryService.getSomeData()
    .subscribe(res => {
      this.categories = res
    })
  }

  putData()
  {
    this.productService.putData(this.productDtoRequest,this.productDtoRequest.id).subscribe(
      res => {
      Swal.fire({
        title: "Product Updated!",
        icon: "success"
      });
      this.router.navigate(['/dashboard/products']);
    },
    error => {
      Swal.fire({
        title: "problem in update product !",
        icon: "error"
      });
    }
  )
  }
}
