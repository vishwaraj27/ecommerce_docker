import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminProductService, ProductDto } from './product.service';
import { CategoryService, CategoryDto } from '../categories/category.service';

@Component({
  standalone: true,
  selector: 'app-product-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: any;
  categories: CategoryDto[] = [];

  // -----------------------------------------
  // USE category.id instead of slug
  // -----------------------------------------
  model: ProductDto = {
    name: '',
    description: '',
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
    reorderLevel: 0,
    images: '',
    featured: false,
    active: true,
    category: { id: null }
  };

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  loading = false;
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: AdminProductService,
    private categorySvc: CategoryService
  ) {}

  ngOnInit(): void {
    this.categorySvc.list().subscribe({
      next: (data) => (this.categories = data)
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (!this.id || this.id === 'new') {
      this.isNew = true;
      return;
    }

    this.load();
  }

  // -----------------------------------------
  // CATEGORY CHANGE HANDLER (ID ONLY)
  // -----------------------------------------
  onCategoryChange(id: number) {
    this.model.category = { id };
  }

  load() {
    const idNum = Number(this.id);
    this.loading = true;

    this.svc.get(idNum).subscribe({
      next: (p: any) => {
        this.model = {
          name: p.name,
          description: p.description,
          price: p.price,
          costPrice: p.costPrice,
          stockQuantity: p.stockQuantity,
          reorderLevel: p.reorderLevel,
          images: p.images,
          featured: p.featured,
          active: p.active,
          id: p.id,
          category: { id: p.category ? p.category.id : null }
        };

        // Show image previews
        this.imagePreviews = [];
        if (p.images) {
          this.imagePreviews = p.images
            .split(',')
            .map((f: string) => this.svc.imageUrl(f));
        }

        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  onFiles(e: any) {
    const files: FileList = e.target.files;

    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);

      const reader = new FileReader();
      reader.onload = (ev: any) => this.imagePreviews.push(ev.target.result);
      reader.readAsDataURL(files[i]);
    }
  }

  removePreview(index: number) {
    this.imagePreviews.splice(index, 1);
  }

  save() {
    if (!this.model.name) return alert('Name is required');

    if (!this.model.category?.id)
      return alert('Category is required');

    this.loading = true;

    if (this.isNew) {
      this.svc.create(this.model, this.selectedFiles).subscribe({
        next: () => this.finish(),
        error: () => {
          this.loading = false;
          alert('Create failed');
        }
      });
    } else {
      this.svc
        .update(Number(this.id), this.model, this.selectedFiles, true)
        .subscribe({
          next: () => this.finish(),
          error: () => {
            this.loading = false;
            alert('Update failed');
          }
        });
    }
  }

  finish() {
    this.loading = false;
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }
}
