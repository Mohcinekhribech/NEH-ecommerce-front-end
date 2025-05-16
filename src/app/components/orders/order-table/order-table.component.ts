import { Component } from '@angular/core';
import { OrderStatus, OrderStatusColors } from 'src/app/core/enums/order-status.enum';
import { PaymentMethod } from 'src/app/core/enums/payment-method.enum';
import { PaymentStatus } from 'src/app/core/enums/payment-status.enum';
import { OrderDtoResponse } from 'src/app/core/models/order-dto-response.model';
import { PaginatedOrders } from 'src/app/core/models/pageable/pageable-orders-dto.model';
import { OrderService } from 'src/app/core/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
  constructor(private orderService:OrderService){}
    orders : PaginatedOrders|null = null
    showPopUp:boolean = false;
    currentPage = 0; // Current page index (starts from 0)
    pageSize = 10; // Number of orders per page
    apiUrl = environment.apiUrl;


    selectedOrderId:String=''
    
  
    ngOnInit()
    {
      this.loadOrders()
    }
    getStatusClasses(status: OrderStatus|undefined): string {
      if(status)
        {
          const colors = OrderStatusColors[status];
            return `${colors.bg} ${colors.text}`;
        }
        return '';
  }
  closeModal(data: any) {
    this.showPopUp = false;
  }
  selectOrder(orderId:String)
  {
    this.selectedOrderId = orderId;
    this.showPopUp=true;
  }

  getReadableStatus(status: any): string {
    return OrderStatus[status as keyof typeof OrderStatus] || status;
  }
  

  loadOrders(): void {
    this.orderService.getPaginatedOrders(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.orders = response;
      }, error => {
        console.error('Error fetching orders:', error);
      });
  }

  nextPage(): void {
    if (this.orders && this.currentPage < this.orders.totalPages - 1) {
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
