import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export interface DashboardStats {
  user_count: number;
  role_count: number;
  permission_group_count: number;
  recent_registrations: number;
  recent_activities: DashboardActivity[];
}

export interface DashboardActivity {
  title: string;
  time: string;
  user_id: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  theme: 'light' | 'dark';
  roles: Role[];
  permission_groups: PermissionGroup[];
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  codename: string;
}

export interface PermissionGroup {
  id: number;
  name: string;
  permissions: Permission[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8000/api/auth';
  private readonly http = inject(HttpClient);

  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  // Signals for reactive state management
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);

  // Computed signals
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly userRoles = computed(() => this._currentUser()?.roles || []);
  readonly userPermissions = computed(() => {
    const user = this._currentUser();
    if (!user) return [];

    const rolePermissions = user.roles.flatMap((role) => role.permissions);
    const groupPermissions = user.permission_groups.flatMap((group) => group.permissions);
    return [...new Set([...rolePermissions, ...groupPermissions])];
  });

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this._isAuthenticated.set(true);
    }
  }

  register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register/`, userData).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      }),
    );
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ access: string; refresh: string; user: User }> {
    return this.http
      .post<{ access: string; refresh: string; user: User }>(`${this.apiUrl}/login/`, credentials)
      .pipe(
        tap((response) => {
          this.setTokens(response.access, response.refresh);
          this.setUser(response.user);
          this._isAuthenticated.set(true);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        }),
      );
  }

  refreshToken(): Observable<{ access: string }> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<{ access: string }>(`${this.apiUrl}/token/refresh/`, { refresh }).pipe(
      tap((response) => {
        this.setToken(response.access);
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private setTokens(access: string, refresh: string): void {
    this.cookieService.set('access_token', access, undefined, '/', undefined, true, 'Strict');
    this.cookieService.set('refresh_token', refresh, undefined, '/', undefined, true, 'Strict');
  }

  private setToken(access: string): void {
    this.cookieService.set('access_token', access, undefined, '/', undefined, true, 'Strict');
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/`).pipe(
      tap((user) => {
        this.setUser(user);
        this._isAuthenticated.set(true);
      }),
      catchError((error) => {
        console.error('Failed to load profile:', error);
        return throwError(() => error);
      }),
    );
  }

  getToken(): string | null {
    return this.cookieService.get('access_token') || null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  private getRefreshToken(): string | null {
    return this.cookieService.get('refresh_token') || null;
  }

  setUser(user: User): void {
    this._currentUser.set(user);
  }

  hasRole(roleName: string): boolean {
    return this.userRoles().some((role) => role.name === roleName);
  }

  hasPermission(permissionCodename: string): boolean {
    return this.userPermissions().some((permission) => permission.codename === permissionCodename);
  }

  hasAnyRole(roleNames: string[]): boolean {
    return roleNames.some((roleName) => this.hasRole(roleName));
  }

  hasAnyPermission(permissionCodenames: string[]): boolean {
    return permissionCodenames.some((codename) => this.hasPermission(codename));
  }

  // User management methods
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch users:', error);
        return throwError(() => error);
      }),
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user:', error);
        return throwError(() => error);
      }),
    );
  }

  createUser(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_active?: boolean;
    is_staff?: boolean;
    role_ids?: number[];
    permission_group_ids?: number[];
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/`, userData).pipe(
      catchError((error) => {
        console.error('Failed to create user:', error);
        return throwError(() => error);
      }),
    );
  }

  updateUser(
    id: number,
    userData: Partial<{
      email: string;
      first_name: string;
      last_name: string;
      is_active: boolean;
      is_staff: boolean;
      role_ids: number[];
      permission_group_ids: number[];
    }>,
  ): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/`, userData).pipe(
      catchError((error) => {
        console.error('Failed to update user:', error);
        return throwError(() => error);
      }),
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to delete user:', error);
        return throwError(() => error);
      }),
    );
  }

  // Dashboard methods
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch dashboard stats:', error);
        return throwError(() => error);
      }),
    );
  }

  // Password reset methods
  forgotPassword(email: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.apiUrl}/password-reset/`, { email }).pipe(
      catchError((error) => {
        console.error('Password reset request failed:', error);
        return throwError(() => error);
      }),
    );
  }

  updateTheme(theme: 'light' | 'dark'): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/profile/`, { theme }).pipe(
      catchError((error) => {
        console.error('Failed to update theme:', error);
        return throwError(() => error);
      }),
    );
  }

  // Role and Permission methods
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch roles:', error);
        return throwError(() => error);
      }),
    );
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/roles/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch role:', error);
        return throwError(() => error);
      }),
    );
  }

  createRole(data: { name: string; description?: string; permission_ids?: number[] }): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles/`, data).pipe(
      catchError((error) => {
        console.error('Failed to create role:', error);
        return throwError(() => error);
      }),
    );
  }

  updateRole(id: number, data: Partial<{ name: string; description: string; permission_ids: number[] }>): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/roles/${id}/`, data).pipe(
      catchError((error) => {
        console.error('Failed to update role:', error);
        return throwError(() => error);
      }),
    );
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/roles/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to delete role:', error);
        return throwError(() => error);
      }),
    );
  }

  getPermission(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}/permissions/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch permission:', error);
        return throwError(() => error);
      }),
    );
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/permissions/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch permissions:', error);
        return throwError(() => error);
      }),
    );
  }

  createPermission(data: { name: string; codename: string }): Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/permissions/`, data).pipe(
      catchError((error) => {
        console.error('Failed to create permission:', error);
        return throwError(() => error);
      }),
    );
  }

  updatePermission(id: number, data: Partial<{ name: string; codename: string }>): Observable<Permission> {
    return this.http.patch<Permission>(`${this.apiUrl}/permissions/${id}/`, data).pipe(
      catchError((error) => {
        console.error('Failed to update permission:', error);
        return throwError(() => error);
      }),
    );
  }

  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/permissions/${id}/`).pipe(
      catchError((error) => {
        console.error('Failed to delete permission:', error);
        return throwError(() => error);
      }),
    );
  }

  getPermissionGroups(): Observable<PermissionGroup[]> {
    return this.http.get<PermissionGroup[]>(`${this.apiUrl}/permission-groups/`).pipe(
      catchError((error) => {
        console.error('Failed to fetch permission groups:', error);
        return throwError(() => error);
      }),
    );
  }
}
