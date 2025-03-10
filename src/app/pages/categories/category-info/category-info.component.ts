import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDtoResponse } from 'src/app/core/models/CategoryDtoResponse.model';
import { PaginatedProducts } from 'src/app/core/models/pageable/pageable-products-dto.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent {
    constructor(private categoryService:CategoryService , private productService:ProductService , private route : ActivatedRoute, private router : Router){}
    categoryId:string|null = '' ;
    category : CategoryDtoResponse ={
      id: '',
      name: '',
      image: '',
      description: '',
      products: []
    }
    currentPage = 0; // Current page index (starts from 0)
      pageSize = 10; // Number of orders per page
      products: PaginatedProducts | null = null
      searchCriteria: any = {
        name: '',
        categoryName: '',
        minPrice: null,
        maxPrice: null
      };
    selectedImage:String = ""
    ngOnInit()
    {
      this.route.paramMap.subscribe(params => {
        this.categoryId = params.get('id');
        if(this.categoryId)
          this.categoryService.getOneCategory(this.categoryId)
        .subscribe(res => {
          this.category = res;
          this.searchCriteria.categoryName = this.category.name
          this.loadProducts()
        })
      });
    }
    loadProducts(): void {
      this.productService.getPaginatedProducts(this.currentPage, this.pageSize,this.searchCriteria)
        .subscribe(response => {
          this.products = response;
          this.products.number = this.products.number+1
        }, error => {
          console.error('Error fetching orders:', error);
        });
    }
  
    nextPage(): void {
      if (this.products && this.currentPage < this.products.totalPages - 1) {
        this.currentPage++;
        this.loadProducts();
      }
    }
  
    prevPage(): void {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.loadProducts();
      }
    }
}
