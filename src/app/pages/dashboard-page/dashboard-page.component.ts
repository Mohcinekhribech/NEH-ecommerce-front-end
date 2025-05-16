import { Component, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';  // ✅ Correct import for v4+
import { OrderStatus, OrderStatusColors } from 'src/app/core/enums/order-status.enum';
import { DashboardDto } from 'src/app/core/models/dashboardDto.model';
import { OrderDtoResponse } from 'src/app/core/models/order-dto-response.model';
import { ProductDtoResponse } from 'src/app/core/models/ProductDtoResponse.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  products:ProductDtoResponse[]=[]
  orders:OrderDtoResponse[]=[]
  apiUrl = environment.apiUrl;
  dashboardDto:DashboardDto={
    totalRevenue: 0,
    revenueChange: 0,
    totalOrders: 0,
    ordersChange: 0,
    newCustomers: 0,
    customersChange: 0,
    conversionRate: 0
  }

  constructor(private dashboardService:DashboardService,public productService:ProductService,private orderService:OrderService){}

  ngOnInit()
  {
    this.productService.getBestProducts()
    .subscribe(res => {
      this.products = res
    })
    this.orderService.getRecentOrders()
    .subscribe(res => {
      this.orders = res
    })
    this.getStats()
  }
  getStatusClasses(status: OrderStatus|undefined): string {
        if(status)
          {
            const colors = OrderStatusColors[status];
              return `${colors.bg} ${colors.text}`;
          }
          return '';
    }
    getStats()
    {
      this.dashboardService.getSomeData()
      .subscribe(res=>{
        this.dashboardDto=res
      })     
    }
}
