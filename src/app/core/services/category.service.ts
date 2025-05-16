import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category`);
  }

  getOneCategory(id:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/`+id);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category`,data);
  }

  putData(data: any,id:String): Observable<any> {
    return this.http.put(`${this.apiUrl}/category/`+id, data);
  }

  deleteData(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/category/${id}`);
  }
}
