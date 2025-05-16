import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromoCodeModel } from '../models/promo-code.model';
import { environment } from '../../../environments/environment';
import { PromoCodeDtoRequest } from '../models/PromoCodeDtoRequest.model';

@Injectable({
    providedIn: 'root'
})
export class PromoCodeService {
    private apiUrl = `${environment.apiUrl}/promo-codes`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<PromoCodeModel[]> {
        return this.http.get<PromoCodeModel[]>(this.apiUrl);
    }

    getById(id: string): Observable<PromoCodeModel> {
        return this.http.get<PromoCodeModel>(`${this.apiUrl}/${id}`);
    }

    create(promoCode: PromoCodeDtoRequest): Observable<PromoCodeModel> {
        return this.http.post<PromoCodeModel>(this.apiUrl, promoCode);
    }

    update(promoCode: PromoCodeDtoRequest): Observable<PromoCodeModel> {
        return this.http.put<PromoCodeModel>(`${this.apiUrl}/${promoCode.id}`, promoCode);
    }

    getByInfluencerId(influencerId: string): Observable<PromoCodeModel[]> {
        return this.http.get<PromoCodeModel[]>(`${this.apiUrl}/influencer/${influencerId}`);
      }      

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    toggleStatus(id: string): Observable<PromoCodeModel> {
        return this.http.patch<PromoCodeModel>(`${this.apiUrl}/${id}/toggle`, {});
    }

    validateCode(code: string): Observable<PromoCodeModel> {
        return this.http.get<PromoCodeModel>(`${this.apiUrl}/validate/${code}`);
    }
} 