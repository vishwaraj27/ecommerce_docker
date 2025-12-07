import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  // Login
  email = '';
  password = '';

  // Register
  regName = '';
  regEmail = '';
  regPassword = '';
  regConfirmPassword = '';

  // Forgot Password
  forgotEmail = '';
  showForgot = false;

  message = '';
  loading = false;
  showRegister = false;
  passwordTip = '';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ LOGIN
  login() {
    if (!this.email || !this.password) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    const body = { email: this.email, password: this.password };

    this.http.post<any>(`${environment.apiUrl}/auth/login`, body).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name);
        try {
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const roles = payload.roles || payload.authorities || [];

          if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/dashboard']);  // ⭐ Admin redirect
          } else {
          this.router.navigate(['/home']);             // ⭐ Normal user
           }
 
         } catch (_) {
            this.router.navigate(['/home']);
          }
        },
         error: () => {
        this.message = 'Invalid credentials';
      }
    });
  }

  // ✅ PASSWORD VALIDATION
  private validatePassword(password: string): string | null {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /\d/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) return 'At least 8 characters required.';
    if (!upper.test(password)) return 'Must include at least one uppercase letter.';
    if (!lower.test(password)) return 'Must include at least one lowercase letter.';
    if (!number.test(password)) return 'Must include at least one number.';
    if (!special.test(password)) return 'Must include at least one special character.';
    return null;
  }

  // ✅ REGISTER (with password validation + delay)
  register() {
    
     this.message = 'Registration is disabled - testing phase.';
    this.passwordTip = '';
    this.clearRegisterFields();
    return;
    
    /* if (!this.regName || !this.regEmail || !this.regPassword || !this.regConfirmPassword) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const passwordError = this.validatePassword(this.regPassword);
    if (passwordError) {
      this.message = passwordError;
      this.passwordTip =
        'Tip: Use a mix of uppercase, lowercase, numbers, and symbols for a strong password.';
      return;
    }

    if (this.regPassword !== this.regConfirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    const body = {
      name: this.regName,
      email: this.regEmail,
      password: this.regPassword
    };

    this.http.post<any>(`${environment.apiUrl}/auth/register`, body).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Registration successful! Please login.';
        this.passwordTip = '';
        this.clearRegisterFields();
        setTimeout(() => this.toggleForm(false), 1500);
      },
      error: () => {
        this.loading = false;
        this.message = 'Registration failed. Please try again.';
      }
    });*/
  }

  // ✅ FORGOT PASSWORD
  sendResetLink() {
    if (!this.forgotEmail) {
      this.message = 'Please enter your registered email.';
      return;
    }

    this.loading = true;
    const body = { email: this.forgotEmail };

    this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`, body).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Password reset link sent to your email.';
        this.showForgot = false;
      },
      error: () => {
        this.loading = false;
        this.message = 'Unable to send reset link. Please try again.';
      }
    });
  }

  // ✅ Toggle forms
  toggleForm(toRegister?: boolean) {
    this.showRegister = toRegister ?? !this.showRegister;
    this.message = '';
    this.passwordTip = '';
    this.clearLoginFields();
    this.clearRegisterFields();
  }

  toggleForgot() {
    this.showForgot = !this.showForgot;
    this.message = '';
  }

  private clearLoginFields() {
    this.email = '';
    this.password = '';
  }

  private clearRegisterFields() {
    this.regName = '';
    this.regEmail = '';
    this.regPassword = '';
    this.regConfirmPassword = '';
  }
}
