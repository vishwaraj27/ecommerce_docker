import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // --------------------------
  // 🔹 User Login
  // --------------------------
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // --------------------------
  // 🔹 User Registration
  // --------------------------
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  // --------------------------
  // 🔹 Save session info
  // --------------------------
  saveSession(token: string, email: string, roles: string[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // --------------------------
  // 🔹 Get JWT token
  // --------------------------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // --------------------------
  // 🔹 Check login status
  // --------------------------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // --------------------------
  // 🔹 Get stored roles
  // --------------------------
  getRoles(): string[] {
    const storedRoles = localStorage.getItem('roles');

    if (storedRoles) {
      try {
        return JSON.parse(storedRoles);
      } catch {
        return [];
      }
    }

    // Fallback → extract roles from JWT if they are not in storage
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Spring Boot sometimes uses:
      // "roles": ["ROLE_ADMIN"]
      // OR "authorities": [{"authority": "ROLE_ADMIN"}]
      if (payload.roles) return payload.roles;
      if (payload.authorities) 
        return payload.authorities.map((a: any) => a.authority);

      return [];
    } catch {
      return [];
    }
  }

  // --------------------------
  // 🔹 Get username (email fallback)
  // --------------------------
  getUsername(): string {
  const name = localStorage.getItem('name');
  return name ? name : 'User';
}

  // --------------------------
  // 🔹 Get stored email
  // --------------------------
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // --------------------------
  // 🔹 Logout user
  // --------------------------
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    window.location.href = '/'; // full redirect to login
  }
}
