import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
import { PromoCodeService } from 'src/app/core/services/promo-code.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  PaymentMethod = PaymentMethod;
  ttcPrice: number = 0;
  total: number = 0;
  orderId: string = '';
  cartItems: CartItem[] = [];
  apiUrl = environment.apiUrl;
  user: UserResp | null = null;
  order: OrderDtoRequest = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    promoCode: "",
    city: "",
    zipCode: "",
    country: "",
    totalPrice: 0,
    orderedProducts: [],
    clientId: "",
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: PaymentMethod.COD
  };
  orderedProduct: OrderedProducts = {
    orderId: "",
    productId: "",
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0
  };
  showPaypal: boolean = false;
  orderedProducts: OrderedProducts[] = [];
  promoCode: string = '';
  promoError: string | null = null;
  promoSuccess: boolean = false;
  discountPercentage: number = 0;
  appliedPromoCode: string | null = null;
  discountedTotal: number = 0;
  discount:number = 0;

  constructor(
    private payPalService: PayPalService,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private promoCodeService: PromoCodeService
  ) { }

  ngOnInit() {
    this.payPalService.renderPayPalButton('paypal-button-container', 100, (orderId) => {
      this.payPalService.verifyPayment(orderId)
        .subscribe(res => {
          if (res) {
            this.orderService.updatePaymentStatus(PaymentStatus.PAID, this.orderId)
              .subscribe(res => {
              });
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Votre paiement a été vérifié' });
            this.router.navigate(["/orders"])
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Votre paiement n\'a pas été validé' });
          }
        },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Votre paiement n\'a pas été validé' });
          });
    });

    this.user = this.authService.getAuthUser();
    if (this.user) {
      this.order.clientId = this.user.id;
      this.order.address = this.user?.address;
      this.order.city = this.user?.city;
      this.order.country = this.user?.country;
      this.order.email = this.user?.email;
      this.order.firstName = this.user?.firstName;
      this.order.lastName = this.user?.lastName;
      this.order.phone = this.user?.phone;
      this.order.zipCode = this.user?.zipCode;
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.calcTotalPrice();
      this.ttcPrice = this.total + this.total * 0.2;
      this.fillOrderedProductList();
      this.order.orderedProducts = this.orderedProducts;
      this.order.totalPrice = this.ttcPrice;
    });
  }

  validatePromoCode(): void {
    if (!this.promoCode.trim()) {
      this.promoError = 'Please enter a promo code.';
      this.promoSuccess = false;
      return;
    }

    this.promoCodeService.validateCode(this.promoCode).subscribe({
      next: (promo) => {
        if (promo.isActive && new Date(promo.validUntil) >= new Date()) {
          this.discountPercentage = promo.discountPercentage;
          this.promoSuccess = true;
          this.promoError = null;
          this.appliedPromoCode = promo.code;
          this.order.promoCode = promo.code;

          const discount = (this.order.totalPrice * promo.discountPercentage) / 100;
        } else {
          this.clearPromo('Promo code is expired or inactive.');
        }
      },
      error: () => {
        this.clearPromo('Invalid promo code.');
      }
    });
  }

  clearPromo(message: string): void {
    this.promoError = message;
    this.promoSuccess = false;
    this.discountPercentage = 0;
    this.appliedPromoCode = null;
    this.order.promoCode = "";
    this.discountedTotal = this.order.totalPrice;
  }

  closeModal(data: any) {
    this.showPaypal = false;
  }

  save(orderForm: NgForm) {
    if (orderForm.valid) {
      this.orderService.postData(this.order)
        .subscribe(res => {
          this.orderId = res.id;
          this.cartService.clearCart()
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Votre commande a été enregistrée avec succès' });
          if (this.order.paymentMethod == PaymentMethod.PAYPAL) {
            this.showPaypal = true;
          } else {
            this.router.navigate(["/orders"])
          }
        },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Il y a un problème avec la création de la commande' });
          });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le formulaire est invalide' });
    }
  }

  fillOrderedProductList() {
    this.orderedProducts = []; // Vider les éléments précédents si nécessaire

    this.cartItems.map((item) => {
      const orderedProduct = {
        orderId: '',
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.finalPrice,
        totalPrice: item.product.finalPrice * item.quantity
      };

      this.orderedProducts.push(orderedProduct);  // Ajouter le nouvel objet
    });
  }
}
