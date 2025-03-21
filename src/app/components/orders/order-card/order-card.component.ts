import { Component, Input } from '@angular/core';
import { OrderStatus, OrderStatusColors } from 'src/app/core/enums/order-status.enum';
import { PaymentMethod } from 'src/app/core/enums/payment-method.enum';
import { PaymentStatus } from 'src/app/core/enums/payment-status.enum';
import { OrderDtoResponse } from 'src/app/core/models/order-dto-response.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() order: OrderDtoResponse={
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    client: {
      id: "",
      profilePic: "",
      dateOfBirth: null,
      role: "",
      ageRange: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: ""
    },
    totalPrice: 0,
    orderedProducts: [],
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: PaymentMethod.CREDIT_CARD
  };
  selectedOrderId : String = "";
  showPopUp : boolean = false;

  getStatusClasses(status: OrderStatus|undefined): string {
        if(status)
          {
            const colors = OrderStatusColors[status];
              return `${colors.bg} ${colors.text}`;
          }
          return '';
    }
    selectOrder(orderId:String)
    {
      this.selectedOrderId = orderId;
      this.showPopUp=true;
    }
    closeModal(data: any) {
      this.showPopUp = false;
    }



}
