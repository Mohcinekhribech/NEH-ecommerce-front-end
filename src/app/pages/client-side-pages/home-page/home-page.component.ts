import { Component } from '@angular/core';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private categoryService:CategoryService,private productService:ProductService){}
      categories:CategoryDtoResponse[]=[]
      products:ProductDtoResponse[]=[]
    
      ngOnInit()
      {
        this.categoryService.getSomeData()
        .subscribe(res => {
          this.categories = res
        })
        this.productService.getSomeData()
    .subscribe(res => {
      this.products = res
    })
      }
}
