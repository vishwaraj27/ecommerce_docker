// src/app/admin/products/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductDto {
  id?: number;
  name: string;
  description?: string;
   category: {
    id: number | null;
  };
  price?: number;
  costPrice?: number;
  stockQuantity?: number;
  reorderLevel?: number;
  images?: string; // comma separated filenames from backend
  featured?: boolean;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private base = `${environment.apiUrl}/admin/products`;

  constructor(private http: HttpClient) {}

  list(page = 0, size = 20, search?: string): Observable<any> {
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    if (search) params = params.set('search', search);
    return this.http.get<any>(this.base, { params });
  }

  get(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.base}/${id}`);
  }

  // Create: product JSON + optional images
  create(product: ProductDto, files?: File[]): Observable<any> {
    const form = new FormData();
    form.append('product', JSON.stringify(product));
    if (files && files.length) {
      files.forEach(f => form.append('images', f, f.name));
    }
    return this.http.post(this.base, form);
  }

  update(id: number, product: ProductDto, files?: File[], appendImages = true): Observable<any> {
    const form = new FormData();
    form.append('product', JSON.stringify(product));
    if (files && files.length) {
      files.forEach(f => form.append('images', f, f.name));
    }
    form.append('appendImages', String(appendImages));
    return this.http.put(`${this.base}/${id}`, form);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  // helper to build full URL for stored images (local static serving)
  imageUrl(filename: string): string {
    if (!filename) return '';
    return `http://localhost:8080/uploads/${filename}`;
  }
}
