import { Component, inject, signal, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role, Permission, AuthService } from '../../../services/auth.service';
import { extractApiErrors } from '../../../utils/error-utils';

@Component({
    selector: 'app-role-edit',
    imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule
],
    templateUrl: './role-edit.component.html',
    styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly roleId = signal<number | null>(null);
  readonly isNewRole = signal<boolean>(true);
  readonly name = signal<string>('');
  readonly selectedPermissionIds = signal<number[]>([]);
  readonly availablePermissions = signal<Permission[]>([]);
  readonly saving = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.roleId.set(+id);
      this.isNewRole.set(false);
      this.loadRole(+id);
    } else {
      this.isNewRole.set(true);
    }
    this.loadPermissions();
  }

  private loadRole(id: number): void {
    this.authService.getRole(id).subscribe({
      next: (role) => {
        this.name.set(role.name);
        this.selectedPermissionIds.set(role.permissions.map((p) => p.id));
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  private loadPermissions(): void {
    this.authService.getPermissions().subscribe({
      next: (perms) => {
        this.availablePermissions.set(perms);
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  saveRole(): void {
    this.saving.set(true);
    const roleData = {
      name: this.name(),
      permission_ids: this.selectedPermissionIds(),
    };

    if (this.isNewRole()) {
      this.authService.createRole(roleData).subscribe({
        next: () => {
          this.saving.set(false);
          this.goBack();
        },
        error: (error) => {
          this.saving.set(false);
          const messages = extractApiErrors(error);
          messages.forEach(msg => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          });
        },
      });
    } else {
      this.authService.updateRole(this.roleId()!, roleData).subscribe({
        next: () => {
          this.saving.set(false);
          this.goBack();
        },
        error: (error) => {
          this.saving.set(false);
          const messages = extractApiErrors(error);
          messages.forEach(msg => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          });
        },
      });
    }
  }

  deleteRole(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete role "${this.name()}"? This action cannot be undone.`,
      header: 'Delete Role',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteRole(this.roleId()!).subscribe({
          next: () => {
            this.goBack();
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
    this.router.navigate(['/admin/roles']);
  }
}
