import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
  private paypal: PayPalNamespace | null = null;
  private apiUrl = 'http://localhost:9090/api';
  
    constructor(private http: HttpClient,private messageService:MessageService) {}

  async loadPayPal(): Promise<PayPalNamespace> {
    if (this.paypal) return this.paypal;

    this.paypal = await loadScript({
      clientId: 'AbMJ6gUEnuZJayvLfGCg8ylURWtj9rjBePBWxt7_wxZR92LNnE2uvcAsOB4YMUIWONBrauU76K9i8bmK', // Replace with your actual Client ID
      currency: 'USD'
    });

    if (!this.paypal) {
      throw new Error('PayPal SDK failed to load');
    }
    return this.paypal;
  }

  async renderPayPalButton(containerId: string, amount: number, onSuccess: (orderId: string) => void) {
    const paypal = await this.loadPayPal();

    if (paypal?.Buttons) {
      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD", // Fix: Add currency code
                  value: amount.toString()
                }
              }
            ],
            intent: 'CAPTURE'
          });
        },
        onApprove: async (data, actions) => {
          if (actions.order) {
            const order = await actions.order.capture();
            if (order.id) {
              onSuccess(order.id);
            } else {
              console.error("Order ID is undefined");
            }
          }
        },
        onError: err => {
          console.error('PayPal error:', err);
        }
      }).render(`#${containerId}`);
    }
  }
  
    verifyPayment(id:String): Observable<any> {
      return this.http.post(`${this.apiUrl}/paypal/verify-payment/${id}`,{});
    }
}
