import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { OrderStatus } from 'src/app/core/enums/order-status.enum';
import { PaymentMethod } from 'src/app/core/enums/payment-method.enum';
import { PaymentStatus } from 'src/app/core/enums/payment-status.enum';
import { CartItem } from 'src/app/core/models/CartItem.model';
import { OrderDtoRequest } from 'src/app/core/models/order-dto-request.model';
import { OrderedProducts } from 'src/app/core/models/ordered-products-dto.model';
import { UserResp } from 'src/app/core/models/UserResp.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PayPalService } from 'src/app/core/services/paypal.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  PaymentMethod = PaymentMethod
  ttcPrice:number=0;
  total:number = 0;
  orderId:String=''
  cartItems:CartItem[]=[]
  user:UserResp |null = null ;
  order:OrderDtoRequest = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    totalPrice: 0,
    orderedProducts: [],
    clientId: "",
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: PaymentMethod.COD
  }
  orderedProduct:OrderedProducts={
    orderId: "",
    productId: "",
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0
  }
  showPaypal:boolean = false;
  orderedProducts:OrderedProducts[]=[]
  constructor(private payPalService:PayPalService,private cartService:CartService,private orderService : OrderService, private authService : AuthService,private messageService:MessageService){
  }

  ngOnInit()
  {
    this.payPalService.renderPayPalButton('paypal-button-container', 100, (orderId) => {
      this.payPalService.verifyPayment(orderId)
                    .subscribe(res => {
                      if(res)
                      {
                        this.orderService.updatePaymentStatus(PaymentStatus.PAID,this.orderId)
                        .subscribe(res => {
                          
                        })
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your payment is verified' });
                      }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'your payment is not passed' });
                      }
                    },
                    err =>{
                      console.log(err)
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'your payment is not passed' });
                    }
                  );
    });
    this.user = this.authService.getAuthUser()
    if(this.user)
    {
      this.order.clientId = this.user.id
      this.order.address = this.user?.address
      this.order.city = this.user?.city
      this.order.country = this.user?.country
      this.order.email = this.user?.email
      this.order.firstName = this.user?.firstName
      this.order.lastName = this.user?.lastName
      this.order.phone = this.user?.phone
      this.order.zipCode = this.user?.zipCode
    }
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.calcTotalPrice();
      this.ttcPrice = this.total + this.total*0.2;
      this.fillOrderedProductList()
      this.order.orderedProducts = this.orderedProducts
      this.order.totalPrice = this.ttcPrice
    });
  }
  closeModal(data: any) {
    this.showPaypal = false;
  }
  save(orderForm:NgForm)
  {
    if (orderForm.valid) {
      this.orderService.postData(this.order)
      .subscribe(res => {
        this.orderId = res.id
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your order saved successfully' });
        if(this.order.paymentMethod == PaymentMethod.PAYPAL)
          this.showPaypal = true;
      },
    err =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there is a problem current the creation of the order' });
    })
    }else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'the form is invalid' });

    }
  }
  fillOrderedProductList() {
    this.orderedProducts = []; // Clear previous items if any
  
    this.cartItems.map((item) => {
      const orderedProduct = {
        orderId:'',
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.finalPrice,
        totalPrice: item.product.finalPrice * item.quantity
      };
  
      this.orderedProducts.push(orderedProduct);  // Push new object
    });
  }
}