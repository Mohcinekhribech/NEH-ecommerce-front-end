// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService){}
  token:String = ''; 
  private publicEndpoints = [
    '/api/product', 
    '/api/auth/logout',
    '/api/auth/authenticate',
    '/api/auth/register-client'
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token =  this.authService.getAuthToken();
    const isPublic = this.publicEndpoints.some(url => request.url.includes(url));
    if (request.method === 'GET' && isPublic) {
      return next.handle(request);
    }
  
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
