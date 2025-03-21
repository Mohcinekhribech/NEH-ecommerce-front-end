import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    getSomeData(): Observable<any> {
      return this.http.get(`${this.apiUrl}/dashboard/stats`);
    }
}
