import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  postData(files: File[]) : Observable<any[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); 
    });
    
    return this.http.post<any[]>(`${this.apiUrl}/upload/images`, formData);
  }
  getOneCategory(name:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/upload/`+name);
  }
}