import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private base = `${environment.apiUrl}/addresses/me`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
  }

  list() {
    return this.http.get<any[]>(this.base, this.getHeaders());
  }

  create(data: any) {
    return this.http.post(this.base, data, this.getHeaders());
  }

  update(id: number, data: any) {
    return this.http.put(`${this.base}/${id}`, data, this.getHeaders());
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`, this.getHeaders());
  }

  setDefault(id: number) {
    return this.http.post(`${this.base}/${id}/default`, {}, this.getHeaders());
  }
}
