import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CategoryDto {
  id: number;
  name: string;
  slug?: string;
  parent?: { id: number; name: string } | null;
  active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private base = `${environment.apiUrl}/admin/categories`;

  constructor(private http: HttpClient) {}

  list(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.base);
  }

  get(id: number) {
    return this.http.get<CategoryDto>(`${this.base}/${id}`);
  }

  create(data: Partial<CategoryDto>) {
    return this.http.post(this.base, data);
  }

  update(id: number, data: Partial<CategoryDto>) {
    return this.http.put(`${this.base}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
