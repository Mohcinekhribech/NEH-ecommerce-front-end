import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommissionModel } from '../models/commission.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommissionService {
    private apiUrl = `${environment.apiUrl}/commissions`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<CommissionModel[]> {
        return this.http.get<CommissionModel[]>(this.apiUrl);
    }

    getById(id: string): Observable<CommissionModel> {
        return this.http.get<CommissionModel>(`${this.apiUrl}/${id}`);
    }

    getByInfluencerId(influencerId: string): Observable<CommissionModel[]> {
        return this.http.get<CommissionModel[]>(`${this.apiUrl}/influencer/${influencerId}`);
    }

    create(commission: CommissionModel): Observable<CommissionModel> {
        return this.http.post<CommissionModel>(this.apiUrl, commission);
    }

    update(commission: CommissionModel): Observable<CommissionModel> {
        return this.http.put<CommissionModel>(`${this.apiUrl}/${commission.id}`, commission);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    markAsPaid(id: string): Observable<CommissionModel> {
        return this.http.patch<CommissionModel>(`${this.apiUrl}/${id}/mark-paid`, {});
    }

    getUnpaidCommissions(): Observable<CommissionModel[]> {
        return this.http.get<CommissionModel[]>(`${this.apiUrl}/unpaid`);
    }

    getPaidCommissions(): Observable<CommissionModel[]> {
        return this.http.get<CommissionModel[]>(`${this.apiUrl}/paid`);
    }

    getCommissionSummary(influencerId: string): Observable<{ totalCommission: number, unpaidCommission: number }> {
        return this.http.get<{ totalCommission: number, unpaidCommission: number }>(
          `${this.apiUrl}/influencer/${influencerId}/commission-summary`
        );
      }

      markAllAsPaidByInfluencerId(influencerId: string): Observable<CommissionModel[]> {
        return this.http.patch<CommissionModel[]>(
          `${this.apiUrl}/influencer/${influencerId}/mark-all-paid`, {}
        );
      }
      
      
} 