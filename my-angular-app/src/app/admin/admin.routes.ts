import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin.layout';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/product-list.component')
            .then(m => m.ProductListComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./products/product-edit.component')
            .then(m => m.ProductEditComponent)
      },

      

      // ⭐ NEW: Orders page placeholder
      {
        path: 'orders',
        loadComponent: () =>
          import('./placeholders/orders-placeholder.component')
            .then(m => m.OrdersPlaceholderComponent)
      },

      // ⭐ NEW: Users management placeholder
      {
        path: 'users',
        loadComponent: () =>
          import('./placeholders/users-placeholder.component')
            .then(m => m.UsersPlaceholderComponent)
      },

      // ⭐ NEW: Analytics page placeholder
      {
        path: 'analytics',
        loadComponent: () =>
          import('./placeholders/analytics-placeholder.component')
            .then(m => m.AnalyticsPlaceholderComponent)
      },
      {
       path: 'categories',
       loadComponent: () => import('./categories/category-list.component').then(m => m.CategoryListComponent)
      },
      {
       path: 'categories/:id',
        loadComponent: () => import('./categories/category-edit.component').then(m => m.CategoryEditComponent)
      },


      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
