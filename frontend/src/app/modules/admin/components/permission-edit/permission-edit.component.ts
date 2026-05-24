import { Component, inject, signal, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { extractApiErrors } from '../../../../utils/error-utils';

@Component({
    selector: 'app-permission-edit',
    imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
],
    templateUrl: './permission-edit.component.html',
    styleUrls: ['./permission-edit.component.css']
})
export class PermissionEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly permissionId = signal<number | null>(null);
  readonly isNewPermission = signal<boolean>(true);
  readonly name = signal<string>('');
  readonly codename = signal<string>('');
  readonly saving = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.permissionId.set(+id);
      this.isNewPermission.set(false);
      this.loadPermission(+id);
    } else {
      this.isNewPermission.set(true);
    }
  }

  private loadPermission(id: number): void {
    this.authService.getPermission(id).subscribe({
      next: (permission) => {
        this.name.set(permission.name);
        this.codename.set(permission.codename);
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  savePermission(): void {
    this.saving.set(true);
    const permissionData = {
      name: this.name(),
      codename: this.codename(),
    };

    if (this.isNewPermission()) {
      this.authService.createPermission(permissionData).subscribe({
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
      this.authService.updatePermission(this.permissionId()!, permissionData).subscribe({
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

  deletePermission(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete permission "${this.name()}" (${this.codename()})? This action cannot be undone.`,
      header: 'Delete Permission',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deletePermission(this.permissionId()!).subscribe({
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
    this.router.navigate(['/admin/permissions']);
  }
}
