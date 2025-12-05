import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  // used by checkout page (already implemented)
  checkout(): Observable<any> {
    return this.http.post(`${this.base}/checkout`, {}, this.authHeaders());
  }

  // ⭐ GET ALL ORDERS
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.base, this.authHeaders());
  }
}
