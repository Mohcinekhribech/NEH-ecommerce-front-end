import { Component } from '@angular/core';
import { OrderDtoResponse } from 'src/app/core/models/order-dto-response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-client-page',
  templateUrl: './orders-client-page.component.html',
  styleUrls: ['./orders-client-page.component.css']
})
export class OrdersClientPageComponent {
   constructor(private orderService:OrderService,private authService:AuthService){}
      orders : OrderDtoResponse[] = []
      showUpdateForm:boolean = false;
     
    
      ngOnInit()
      {
        var id = this.authService.getAuthUser()?.id;
        if(id)
        this.orderService.getOrdersByClientId(id)
        .subscribe(res => {
          this.orders = res
        })
      }
}
