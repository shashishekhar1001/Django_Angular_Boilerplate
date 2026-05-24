import { Component, inject, signal, OnInit, effect, DestroyRef } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Permission, AuthService } from '../../../../services/auth.service';
import { extractApiErrors } from '../../../../utils/error-utils';

@Component({
    selector: 'app-permission-list',
    imports: [FormsModule, TableModule, ButtonModule, InputTextModule, ConfirmDialogModule, ToastModule],
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly permissions = signal<Permission[]>([]);
  readonly searchTerm = signal<string>('');
  readonly filteredPermissions = signal<Permission[]>([]);
  readonly loading = signal<boolean>(false);
  readonly overlayState = signal<'hidden' | 'visible' | 'exiting'>('hidden');
  private _exitTimer: ReturnType<typeof setTimeout> | null = null;
  private _overlayTimer: ReturnType<typeof setTimeout> | null = null;
  readonly skeletonItems = Array.from({length: 10});

  ngOnInit(): void {
    this.loadPermissions();
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

  private loadPermissions(): void {
    this.loading.set(true);
    this.authService.getPermissions().subscribe({
      next: (perms) => {
        this.permissions.set(perms);
        this.filteredPermissions.set(perms);
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

  filterPermissions(): void {
    const term = this.searchTerm().toLowerCase();
    const filtered = this.permissions().filter(
      (permission) =>
        permission.name.toLowerCase().includes(term) ||
        permission.codename.toLowerCase().includes(term),
    );
    this.filteredPermissions.set(filtered);
  }

  addPermission(): void {
    this.router.navigate(['/admin/permissions/new']);
  }

  editPermission(permission: Permission): void {
    this.router.navigate(['/admin/permissions', permission.id, 'edit']);
  }

  deletePermission(permission: Permission): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete permission "${permission.name}"?`,
      header: 'Delete Permission',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deletePermission(permission.id).subscribe({
          next: () => {
            this.loadPermissions();
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
