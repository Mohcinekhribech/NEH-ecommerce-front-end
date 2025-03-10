import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:9090/api';
  
    constructor(private http: HttpClient) {}
  
    getSomeData(): Observable<any> {
      return this.http.get(`${this.apiUrl}/dashboard/stats`);
    }
}
