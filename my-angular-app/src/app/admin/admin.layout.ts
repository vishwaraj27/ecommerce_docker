import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="admin-container">
      <aside class="sidebar">
        <h2 class="title">Admin Panel</h2>

        <nav>
          <a routerLink="dashboard">Dashboard</a>
          <a routerLink="products">Products</a>
          <a routerLink="categories">Categories</a>
          <a routerLink="orders">Orders</a>
          <a routerLink="users">Users</a>
          <a routerLink="analytics">Analytics</a>
        </nav>

      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-container { display: flex; height: 100vh; }
    .sidebar { width: 240px; background: #1a1d23; color: white; padding: 20px; }
    .content { flex: 1; padding: 20px; background: #f5f6fa; }
    a { display:block; color:white; margin:10px 0; text-decoration:none; cursor:pointer }
    a:hover { text-decoration:underline; }
  `]
})
export class AdminLayoutComponent {}
