import { Component, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, DashboardActivity } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { extractApiErrors } from '../../utils/error-utils';

type LoadingPhase = 'loading' | 'exiting' | 'done';

@Component({
    selector: 'app-dashboard',
    imports: [ButtonModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentUser = this.authService.currentUser;
  readonly userCount = signal<number>(0);
  readonly roleCount = signal<number>(0);
  readonly permissionGroupCount = signal<number>(0);
  readonly recentRegistrations = signal<number>(0);
  readonly recentActivities = signal<DashboardActivity[]>([]);
  readonly loadingPhase = signal<LoadingPhase>('loading');
  readonly isLoading = computed(() => this.loadingPhase() !== 'done');
  readonly error = signal<string | null>(null);

  private exitTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly exitDuration = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0 : 200;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      if (this.exitTimer) clearTimeout(this.exitTimer);
    });
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Cancel any pending exit animation
    if (this.exitTimer) {
      clearTimeout(this.exitTimer);
      this.exitTimer = null;
    }
    this.loadingPhase.set('loading');
    this.error.set(null);

    this.authService.getDashboardStats().subscribe({
      next: (stats) => {
        this.userCount.set(stats.user_count);
        this.roleCount.set(stats.role_count);
        this.permissionGroupCount.set(stats.permission_group_count);
        this.recentRegistrations.set(stats.recent_registrations);
        this.recentActivities.set(stats.recent_activities);
        this.loadingPhase.set('exiting');
        this.exitTimer = setTimeout(() => {
          this.loadingPhase.set('done');
          this.exitTimer = null;
        }, this.exitDuration);
      },
      error: (err) => {
        this.loadingPhase.set('done');
        const messages = extractApiErrors(err);
        this.error.set(messages.join(' '));
      },
    });
  }

  hasAdminRole(): boolean {
    const user = this.authService.currentUser();
    return !!(user && (user.is_superuser || this.authService.hasRole('admin')));
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
  }
}
