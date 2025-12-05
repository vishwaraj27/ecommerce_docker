// src/app/services/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Attach token if it exists
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  // Handle unauthorized or forbidden responses
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token');
        router.navigate(['/']); // Redirect to login
      }
      return throwError(() => err);
    })
  );
};
