import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderStatus, OrderStatusColors } from 'src/app/core/enums/order-status.enum';
import { PaymentMethod } from 'src/app/core/enums/payment-method.enum';
import { PaymentStatus } from 'src/app/core/enums/payment-status.enum';
import { OrderDtoResponse } from 'src/app/core/models/order-dto-response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent {
  @Output() notifyParent = new EventEmitter<void>();
  @Input() orderId:String='';
  order:OrderDtoResponse|null=null;
  orderStatusArray = Object.values(OrderStatus);
  selectedStatus:any;
  role:String | undefined = ''
  apiUrl = environment.apiUrl;
  constructor(private orderService:OrderService,private messageService:MessageService,private authService:AuthService,public productService:ProductService){}
  ngOnInit()
  {
    this.role =  this.authService.getAuthUser()?.role
    this.orderService.getOneOrder(this.orderId)
    .subscribe(res=>{
      if(res)
        this.order = res
    })
  }
  getStatusClasses(status: OrderStatus|undefined): string {
    if(status){
      const colors = OrderStatusColors[status];
    return `${colors.bg} ${colors.text}`;
    }
    return '';
  }

  updateStatus()
  {
    if(this.order?.id)
    this.orderService.updateOrderStatus(this.selectedStatus,this.order.id)
    .subscribe(res => {
      this.notifyParent.emit()
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'le statut Mis à jour!' });
    })
  }
}
