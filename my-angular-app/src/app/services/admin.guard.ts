import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.auth.getRoles();

    if (roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      this.router.navigate(['/home']); // Normal users → home
      return false;
    }
  }
}
