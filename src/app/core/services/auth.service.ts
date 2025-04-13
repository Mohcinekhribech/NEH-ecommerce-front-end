import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { UserResp } from '../models/UserResp.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private isRefreshing = false;
  
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  clientRegister(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-client`,data);
  }

  adminRegister(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-admin`,data);
  }

  authentication(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`,data);
  }

  getUserInfo(token: string): any {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }

  setAuthInfo(token: string, user: UserResp): void {
    this.cookieService.set('token', token, undefined, '/', undefined, false, 'Lax');
    this.cookieService.set('user', JSON.stringify(user), undefined, '/', undefined, false, 'Lax');
  }

  getAuthToken() : string
  {
    // console.log(this.cookieService.get('token'))
    return this.cookieService.get('token');
  }
  getAuthUser(): UserResp | null {
    const raw = this.cookieService.get('user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to parse user cookie:', e);
      return null;
    }
  }

  // Clear the authentication token from the cookie
  clearAuthToken(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
  }

  // Check if the user is authenticated based on the presence of a valid token in the cookie
  isAuthenticated(): boolean {
    return this.cookieService.check('token');
  }

  getRefreshToken(): String {
    return this.cookieService.get('refreshToken');
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl+'/logout', {});
  }
}
