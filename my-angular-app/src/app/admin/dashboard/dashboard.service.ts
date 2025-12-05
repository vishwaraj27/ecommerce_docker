import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = `${environment.apiUrl}/admin/dashboard`;

  constructor(private http: HttpClient) {}

  getSummary() {
    return this.http.get(this.base + '/summary');
  }

  getRecentOrders() {
    return this.http.get(this.base + '/recent-orders');
  }
}
