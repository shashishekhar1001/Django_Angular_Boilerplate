import { Component, inject, signal, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, Role, PermissionGroup, AuthService } from '../../../services/auth.service';
import { extractApiErrors } from '../../../utils/error-utils';

@Component({
    selector: 'app-user-edit',
    imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule
],
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly userId = signal<number | null>(null);
  readonly isNewUser = signal<boolean>(true);
  readonly user = signal<User>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    date_joined: '',
    roles: [],
    permission_groups: [],
    theme: 'light',
  });
  readonly password = signal<string>('');
  readonly selectedRoles = signal<number[]>([]);
  readonly selectedPermissionGroups = signal<number[]>([]);
  readonly availableRoles = signal<Role[]>([]);
  readonly availablePermissionGroups = signal<PermissionGroup[]>([]);
  readonly saving = signal<boolean>(false);
  isActiveValue: boolean = true;
  isStaffValue: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.userId.set(+id);
      this.isNewUser.set(false);
      this.loadUser(+id);
    } else {
      this.isNewUser.set(true);
      this.isActiveValue = true;
      this.isStaffValue = false;
    }
    this.loadRolesAndGroups();
  }

  private loadUser(id: number): void {
    this.authService.getUser(id).subscribe({
      next: (user) => {
        this.user.set(user);
        this.isActiveValue = user.is_active;
        this.isStaffValue = user.is_staff;
        this.selectedRoles.set(user.roles.map((r) => r.id));
        this.selectedPermissionGroups.set(user.permission_groups.map((g) => g.id));
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  private loadRolesAndGroups(): void {
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.availableRoles.set(roles);
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });

    this.authService.getPermissionGroups().subscribe({
      next: (groups) => {
        this.availablePermissionGroups.set(groups);
      },
      error: (error) => {
        const messages = extractApiErrors(error);
        messages.forEach(msg => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
      },
    });
  }

  saveUser(): void {
    this.saving.set(true);
    const baseUserData = {
      email: this.user().email,
      first_name: this.user().first_name,
      last_name: this.user().last_name,
      is_active: this.isActiveValue,
      is_staff: this.isStaffValue,
      role_ids: this.selectedRoles(),
      permission_group_ids: this.selectedPermissionGroups(),
    };

    if (this.isNewUser()) {
      const createData = {
        ...baseUserData,
        password: this.password(),
      };
      this.authService.createUser(createData).subscribe({
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
      this.authService.updateUser(this.userId()!, baseUserData).subscribe({
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

  deleteUser(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete user "${this.user().first_name} ${this.user().last_name}" (${this.user().email})? This action cannot be undone.`,
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteUser(this.userId()!).subscribe({
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

  updateFirstName(value: string): void {
    this.user.set({ ...this.user(), first_name: value });
  }

  updateLastName(value: string): void {
    this.user.set({ ...this.user(), last_name: value });
  }

  updateEmail(value: string): void {
    this.user.set({ ...this.user(), email: value });
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
