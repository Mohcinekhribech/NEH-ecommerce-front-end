import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedProducts } from '../models/pageable/pageable-products-dto.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private dhToEurRate :number = 11;

  constructor(private http: HttpClient) {}

  getSomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product`);
  }

  getEuroPrice(finalPrice : number): number {
    const rawPrice = finalPrice / this.dhToEurRate;
    return Math.ceil(rawPrice / 5) * 5;
  }

  getBestProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/best`);
  }

  getOneProduct(id:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/`+id);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product`,data);
  }

  postAllData(data: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/all`,data);
  }

  putData(data: any,id:String): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/`+id, data);
  }

  deleteData(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`);
  }
  searchProducts(criteria: any): Observable<any[]> {
    let params = new HttpParams();

    if (criteria.name) {
      params = params.set('name', criteria.name);
    }
    if (criteria.categoryName) {
      params = params.set('categoryName', criteria.categoryName);
    }
    if (criteria.minPrice !== null) {
      params = params.set('minPrice', criteria.minPrice.toString());
    }
    if (criteria.maxPrice !== null) {
      params = params.set('maxPrice', criteria.maxPrice.toString());
    }

    return this.http.get<any[]>(`${this.apiUrl}/product/search`, { params });
  }
  getPaginatedProducts(page: number, size: number,criteria: any): Observable<PaginatedProducts> {
        let params = new HttpParams()
          .set('page', page)
          .set('size', size);

          if (criteria.name) {
            params = params.set('name', criteria.name);
          }
          if (criteria.categoryName) {
            params = params.set('categoryName', criteria.categoryName);
          }
          if (criteria.minPrice !== null) {
            params = params.set('minPrice', criteria.minPrice.toString());
          }
          if (criteria.maxPrice !== null) {
            params = params.set('maxPrice', criteria.maxPrice.toString());
          }
    
        return this.http.get<PaginatedProducts>(`${this.apiUrl}/product/search`, { params });
      }
}
