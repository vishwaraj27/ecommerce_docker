import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private productService: ProductService) {}

  search(query: string): Observable<Product[]> {
    return this.productService.searchProducts(query);
  }
}
