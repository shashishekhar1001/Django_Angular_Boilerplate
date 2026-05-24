import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, type Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';

const fadeSlide = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%' })
    ], { optional: true }),
    query(':leave', [
      animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-6px)' }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(6px)' }),
      animate('300ms 150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
  ])
]);

@Component({
    selector: 'app-admin-dashboard',
    imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    animations: [fadeSlide]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly routerSubscription = new Subscription();

  readonly sidebarOpen = signal<boolean>(false);
  readonly userManagementOpen = signal<boolean>(false);
  readonly currentUrl = signal<string>('');
  readonly isUserManagementChildActive = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/admin/users') || url.startsWith('/admin/roles') || url.startsWith('/admin/permissions');
  });
  readonly reducedMotion = signal<boolean>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  ngOnInit(): void {
    this.currentUrl.set(this.router.url);
    this.routerSubscription.add(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl.set(event.urlAfterRedirects || event.url);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  toggleUserManagement(): void {
    this.userManagementOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['animation'] ?? '';
  }
}
