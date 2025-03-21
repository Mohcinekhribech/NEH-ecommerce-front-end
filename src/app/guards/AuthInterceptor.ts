// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../core/services/loading.service';
import { environment } from 'src/environment/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router:Router , private loadingService:LoadingService){}
  token:String = ''; 
  private publicEndpoints = [
    environment.apiUrl+'/auth/logout',
    environment.apiUrl+'/auth/authenticate',
    environment.apiUrl+'/auth/register-client'
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    let token = this.authService.getAuthToken();  // Get the token from your auth service

    // Add the Authorization header with the Bearer token if it exists
    if (token && (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE' ) && !this.publicEndpoints.includes(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle Unauthorized error - typically if the token has expired or is invalid
          this.router.navigate(['/login']);  // Redirect to login page
        } else if (error.status === 403) {
          // Handle Forbidden error - if the user doesn't have the required permissions
          console.error('You do not have permission to access this resource');
          // Optionally show a message to the user
        }
        return throwError(error);  // Return the error to the component
      })
    );
  }
}
