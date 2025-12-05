import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CategoryService, CategoryDto } from './category.service';

@Component({
  standalone: true,
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: CategoryDto[] = [];
  loading = false;

  constructor(private svc: CategoryService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.list().subscribe({
      next: (res) => {
        this.categories = res || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  create() {
    this.router.navigate(['/admin/categories', 'new']);
  }

  edit(id: number) {
    this.router.navigate(['/admin/categories', id]);
  }

  disable(id: number) {
    if (!confirm('Disable this category?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
