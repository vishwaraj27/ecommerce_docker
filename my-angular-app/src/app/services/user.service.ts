import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Get full user details including defaultAddressId
  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

   getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }
  // Update user basic info
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/me`, data);
  }
}
