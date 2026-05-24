import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if not authenticated at all → redirect to login
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const user = authService.currentUser();

  // If we already have the user profile, check admin status synchronously
  if (user) {
    if (user.is_superuser || authService.hasRole('admin')) {
      return true;
    }
    // Authenticated but not admin → redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // User is authenticated (valid token) but profile not loaded yet
  // Load the profile, then check admin status
  return authService.loadProfile().pipe(
    map(() => {
      const loadedUser = authService.currentUser();
      if (loadedUser && (loadedUser.is_superuser || authService.hasRole('admin'))) {
        return true;
      }
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/dashboard']);
      return of(false);
    }),
  );
};
