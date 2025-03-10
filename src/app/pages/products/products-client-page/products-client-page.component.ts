import { Component } from '@angular/core';
import { PaginatedProducts } from 'src/app/core/models/pageable/pageable-products-dto.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products-client-page',
  templateUrl: './products-client-page.component.html',
  styleUrls: ['./products-client-page.component.css']
})
export class ProductsClientPageComponent {
  constructor(private productService:ProductService){}
  products:PaginatedProducts | null = null
  currentPage = 0; // Current page index (starts from 0)
  pageSize = 6; // Number of orders per page
  searchCriteria: any = {
    name: '',
    categoryName: '',
    minPrice: null,
    maxPrice: null
  };

  ngOnInit() {
    this.loadOrders()
  }


  loadOrders(): void {
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
      this.loadOrders();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadOrders();
    }
  }
}
