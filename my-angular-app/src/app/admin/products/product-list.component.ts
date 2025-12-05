// src/app/admin/products/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminProductService } from './product.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  page = 0;
  size = 20;
  totalPages = 0;
  totalElements = 0;
  search = '';
  loading = false;

  constructor(private svc: AdminProductService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 0) {
    this.loading = true;
    this.svc.list(page, this.size, this.search).subscribe({
      next: (res) => {
        this.products = res.content || [];
        this.page = res.page || 0;
        this.size = res.size || this.size;
        this.totalPages = res.totalPages || 0;
        this.totalElements = res.totalElements || 0;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  searchNow() {
    this.load(0);
  }

  clearSearch() {
    this.search = '';
    this.load(0);
  }

  edit(p: any) {
    this.router.navigate(['/admin/products', p.id]);
  }

  createNew() {
    this.router.navigate(['/admin/products', 'new']);
  }

  delete(p: any) {
    if (!confirm('Delete product? This will soft-delete it.')) return;
    this.svc.delete(p.id).subscribe({
      next: () => this.load(this.page),
      error: (e) => alert('Delete failed')
    });
  }

  // quick indicator helper
  lowStock(p: any): boolean {
    return p.stockQuantity != null && p.reorderLevel != null && p.stockQuantity <= p.reorderLevel;
  }
}
