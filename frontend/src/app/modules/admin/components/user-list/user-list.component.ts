import { Component, inject, signal, OnInit, effect, DestroyRef } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, AuthService } from '../../../../services/auth.service';
import { extractApiErrors } from '../../../../utils/error-utils';

@Component({
    selector: 'app-user-list',
    imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly users = signal<User[]>([]);
  readonly searchTerm = signal<string>('');
  readonly filteredUsers = signal<User[]>([]);
  readonly loading = signal<boolean>(false);
  readonly overlayState = signal<'hidden' | 'visible' | 'exiting'>('hidden');
  private _exitTimer: ReturnType<typeof setTimeout> | null = null;
  private _overlayTimer: ReturnType<typeof setTimeout> | null = null;
  readonly skeletonItems = Array.from({length: 10});

  ngOnInit(): void {
    this.loadUsers();
  }

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      if (this.loading()) {
        if (this.overlayState() === 'exiting') {
          if (this._exitTimer) {
            clearTimeout(this._exitTimer);
            this._exitTimer = null;
          }
          this.overlayState.set('visible');
        }
        if (!this._overlayTimer) {
          this._overlayTimer = setTimeout(() => {
            this._overlayTimer = null;
            this.overlayState.set('visible');
          }, 300);
        }
      } else {
        if (this._overlayTimer) {
          clearTimeout(this._overlayTimer);
          this._overlayTimer = null;
        }
        if (this.overlayState() === 'visible') {
          this.overlayState.set('exiting');
          this._exitTimer = setTimeout(() => {
            this._exitTimer = null;
            this.overlayState.set('hidden');
          }, 150);
        } else {
          this.overlayState.set('hidden');
        }
      }
    });

    destroyRef.onDestroy(() => {
      if (this._overlayTimer) {
        clearTimeout(this._overlayTimer);
      }
      if (this._exitTimer) {
        clearTimeout(this._exitTimer);
      }
    });
  }

  private loadUsers(): void {
    this.loading.set(true);
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.filteredUsers.set(users);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  filterUsers(): void {
    const term = this.searchTerm().toLowerCase();
    const filtered = this.users().filter(
      (user) =>
        user.email.toLowerCase().includes(term) ||
        user.first_name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term),
    );
    this.filteredUsers.set(filtered);
  }

  hasRole(user: User, roleName: string): boolean {
    return user.roles.some((role: any) => role.name === roleName);
  }

  getPrimaryRole(user: User): string {
    return user.roles.length > 0 ? user.roles[0].name : 'No Role';
  }

  addUser(): void {
    this.router.navigate(['/admin/users/new']);
  }

  editUser(user: User): void {
    this.router.navigate(['/admin/users', user.id, 'edit']);
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete user "${user.first_name} ${user.last_name}" (${user.email})?`,
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteUser(user.id).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (error) => {
            const messages = extractApiErrors(error);
            messages.forEach(msg => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
            });
          },
        });
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
