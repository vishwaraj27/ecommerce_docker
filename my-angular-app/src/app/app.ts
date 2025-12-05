import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';          // 👈 ADD THIS

import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // 👈 for *ngIf, *ngFor, etc
    RouterOutlet,
    NavbarComponent
  ],
  template: `
    <!-- Global navbar for all logged-in user pages -->
    <app-navbar
      *ngIf="showNavbar"
      [username]="username"
      [cartCount]="cartCount">
    </app-navbar>

    <!-- Routed page content -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  username = 'User';
  cartCount = 0;
  currentUrl = '/';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername() || 'User';

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.currentUrl = e.urlAfterRedirects;
      });
  }

  get showNavbar(): boolean {
    if (
      this.currentUrl === '/' ||
      this.currentUrl.startsWith('/reset-password') ||
      this.currentUrl.startsWith('/admin')
    ) {
      return false;
    }
    return true;
  }
}
