import { Component, inject, signal, OnInit, effect, DestroyRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role, AuthService } from '../../../../services/auth.service';
import { extractApiErrors } from '../../../../utils/error-utils';

@Component({
    selector: 'app-role-list',
    imports: [FormsModule, TableModule, ButtonModule, InputTextModule, ConfirmDialogModule, ToastModule],
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly roles = signal<Role[]>([]);
  readonly searchTerm = signal<string>('');
  readonly filteredRoles = signal<Role[]>([]);
  readonly loading = signal<boolean>(false);
  readonly overlayState = signal<'hidden' | 'visible' | 'exiting'>('hidden');
  private _exitTimer: ReturnType<typeof setTimeout> | null = null;
  private _overlayTimer: ReturnType<typeof setTimeout> | null = null;
  readonly skeletonItems = Array.from({length: 10});

  @ViewChild(Table) private table!: Table;

  ngOnInit(): void {
    this.loadRoles();
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

  private loadRoles(): void {
    this.loading.set(true);
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.filteredRoles.set(roles);
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

  filterRoles(): void {
    const term = this.searchTerm().toLowerCase();
    const filtered = this.roles().filter((role) => role.name.toLowerCase().includes(term));
    this.filteredRoles.set(filtered);
    if (this.table) {
      this.table.first = 0;
    }
  }

  addRole(): void {
    this.router.navigate(['/admin/roles/new']);
  }

  editRole(role: Role): void {
    this.router.navigate(['/admin/roles', role.id, 'edit']);
  }

  deleteRole(role: Role): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete role "${role.name}"?`,
      header: 'Delete Role',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteRole(role.id).subscribe({
          next: () => {
            this.loadRoles();
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
