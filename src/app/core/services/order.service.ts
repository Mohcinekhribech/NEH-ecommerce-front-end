import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { PaginatedOrders } from '../models/pageable/pageable-orders-dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  postData(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/orders`,data);
    }

    getSomeData(): Observable<any> {
      return this.http.get(`${this.apiUrl}/orders`);
    }

    getRecentOrders(): Observable<any> {
      return this.http.get(`${this.apiUrl}/orders/recent`);
    }

    updatePaymentStatus(PaymentStatus:PaymentStatus,orderId:String)
    {
      return this.http.put(`${this.apiUrl}/orders/payment-status/${PaymentStatus}/${orderId}`,{});
    }

    updateOrderStatus(orderStatus:OrderStatus,orderId:String)
    {
      return this.http.put(`${this.apiUrl}/orders/status/${orderStatus}/${orderId}`,{});
    }

    getOneOrder(id:String): Observable<any> {
      return this.http.get(`${this.apiUrl}/orders/`+id);
    }

    getOrdersByClientId(id:String): Observable<any> {
      return this.http.get(`${this.apiUrl}/orders/client/`+id);
    }

    getPaginatedOrders(page: number, size: number): Observable<PaginatedOrders> {
      const params = new HttpParams()
        .set('page', page)
        .set('size', size);
  
      return this.http.get<PaginatedOrders>(`${this.apiUrl}/orders/pageable`, { params });
    }
}
