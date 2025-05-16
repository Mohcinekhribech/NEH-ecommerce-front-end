import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfluencerModel } from '../models/influencer.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InfluencerService {
    private apiUrl = `${environment.apiUrl}/influencers`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<InfluencerModel[]> {
        return this.http.get<InfluencerModel[]>(this.apiUrl);
    }

    getById(id: string): Observable<InfluencerModel> {
        return this.http.get<InfluencerModel>(`${this.apiUrl}/${id}`);
    }

    create(influencer: InfluencerModel): Observable<InfluencerModel> {
        return this.http.post<InfluencerModel>(this.apiUrl, influencer);
    }

    update(influencer: InfluencerModel): Observable<InfluencerModel> {
        return this.http.put<InfluencerModel>(`${this.apiUrl}/${influencer.id}`, influencer);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    toggleStatus(id: string): Observable<InfluencerModel> {
        return this.http.patch<InfluencerModel>(`${this.apiUrl}/${id}/toggle`, {});
    }
} 