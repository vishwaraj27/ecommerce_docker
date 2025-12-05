import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from './product.service';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = `${environment.apiUrl}/cart`;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}`, this.getAuthHeaders()).pipe(
      tap(items => this.cartCountSubject.next(items.reduce((sum, item) => sum + item.quantity, 0)))
    );
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${productId}`, {}, this.getAuthHeaders()).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${productId}?quantity=${quantity}`, {}, this.getAuthHeaders()).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${productId}`, this.getAuthHeaders()).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`, this.getAuthHeaders()).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  refreshCartCount(): void {
    this.getCart().subscribe();
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
