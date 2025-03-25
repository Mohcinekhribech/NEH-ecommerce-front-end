import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatedProducts } from 'src/app/core/models/pageable/pageable-products-dto.model';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent {

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  products: PaginatedProducts | null = null
  showUpdateForm: boolean = false;
  currentPage = 0; // Current page index (starts from 0)
  pageSize = 10; // Number of orders per page
  searchCriteria: any = {
    name: '',
    categoryName: '',
    minPrice: null,
    maxPrice: null
  };
  apiUrl = environment.apiUrl;
  
  ngOnInit() {
    this.loadOrders()
  }

  deleteItem(id: String): void {
    this.products? this.products.content  = this.products?.content.filter(item => item.id !== id):'';
  }

  deleteProduct(id: String,event:Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: ' Yes ',
      rejectLabel: ' No ',
      acceptButtonStyleClass: 'bg-[#8DB600] text-white px-2',
      rejectButtonStyleClass: 'mr-2.5 bg-grat-200 border px-2',
      accept: () => {
        this.productService.deleteData(id).subscribe(
          res => {
            this.deleteItem(id)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'the product deleted', life: 3000 });
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'You have cancel the deletion', life: 3000 });
      }
    });
  }

  // searchProducts() {
  //   this.productService.searchProducts(this.searchCriteria)
  //     .subscribe(response => {
  //       this.products = response;
  //     });
  // }

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
