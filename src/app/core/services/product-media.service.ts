import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductMediaService {
  private apiUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  getSomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product-media`);
  }

  getOneProductMedia(id:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/product-media/`+id);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product-media`,data);
  }

  postAllData(data: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/product-media/all`,data);
  }

  putData(data: any,id:String): Observable<any> {
    return this.http.put(`${this.apiUrl}/product-media/`+id, data);
  }

  deleteData(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product-media/${id}`);
  }
}
