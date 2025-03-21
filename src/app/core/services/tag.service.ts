import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  getOneTag(id:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags/`+id);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tags`,data);
  }

  putData(data: any,id:String): Observable<any> {
    return this.http.put(`${this.apiUrl}/tags/`+id, data);
  }

  deleteData(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tags/${id}`);
  }

}
