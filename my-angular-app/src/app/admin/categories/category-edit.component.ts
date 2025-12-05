import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category.service';

@Component({
  standalone: true,
  selector: 'app-category-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  id: any;
  isNew = false;
  model: any = { name: '', parentId: 0, active: true };
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: CategoryService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id || this.id === 'new') {
      this.isNew = true;
      return;
    }
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.get(Number(this.id)).subscribe({
      next: (res) => { this.model = res; this.loading = false; },
      error: () => this.loading = false
    });
  }

  save() {
    if (!this.model.name || !this.model.name.trim()) {
      alert('Name required');
      return;
    }
    this.loading = true;
    if (this.isNew) {
      this.svc.create(this.model).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/admin/categories']); },
        error: () => { this.loading = false; alert('Save failed'); }
      });
    } else {
      this.svc.update(Number(this.id), this.model).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/admin/categories']); },
        error: () => { this.loading = false; alert('Save failed'); }
      });
    }
  }

  cancel() { this.router.navigate(['/admin/categories']); }
}
