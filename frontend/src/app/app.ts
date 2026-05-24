import { Component, signal, OnInit, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly authService = inject(AuthService);

  protected readonly isDark = signal<boolean>(false);
  protected readonly overlayActive = signal<boolean>(false);
  protected readonly overlayMode = signal<string>('');
  private animating = false;

  constructor() {
    // Reactively sync theme when user profile loads (e.g. after login / refresh)
    effect(() => {
      const user = this.authService.currentUser();
      if (user?.theme) {
        const isDark = user.theme === 'dark';
        this.isDark.set(isDark);
        document.documentElement.classList.toggle('dark', isDark);
        // Keep localStorage in sync
        localStorage.setItem('theme', user.theme);
      }
    });
  }

  ngOnInit(): void {
    // Apply theme from localStorage for initial render (before auth loads)
    this.applyThemeFromLocalStorage();
  }

  private applyThemeFromLocalStorage(): void {
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
      return;
    }

    if (saved === 'light') {
      this.isDark.set(false);
      document.documentElement.classList.remove('dark');
      return;
    }

    // No explicit preference — detect OS setting
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
      // Seed localStorage so the first toggle has a correct starting point
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  toggleTheme(event: MouseEvent): void {
    if (this.animating) return;
    this.animating = true;

    const nextDark = !this.isDark();
    const originX = event.clientX;
    const originY = event.clientY;

    // Set overlay origin to click position
    document.documentElement.style.setProperty('--overlay-x', `${originX}px`);
    document.documentElement.style.setProperty('--overlay-y', `${originY}px`);

    // Set semi-transparent tint overlay (dark tint for dark mode, light tint for light mode)
    this.overlayMode.set(nextDark ? 'dark-mode' : 'light-mode');

    // Show and animate the overlay (radial wipe from click point)
    this.overlayActive.set(true);

    // Toggle theme mid-expansion while content is softly blurred behind the overlay
    setTimeout(() => {
      this.isDark.set(nextDark);
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      // Persist theme to backend if the user is authenticated
      if (this.authService.isAuthenticated()) {
        this.authService.updateTheme(nextDark ? 'dark' : 'light')
          .subscribe({
            error: (err) => console.error('Failed to save theme to profile:', err),
          });
      }
    }, 300);

    // Reverse the animation — content fades back into view in the new theme
    setTimeout(() => {
      this.overlayActive.set(false);
      this.overlayMode.set('');
    }, 600);

    // Fully reset after reverse transition completes
    setTimeout(() => {
      this.animating = false;
    }, 1100);
  }
}
