import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',   // → matches /admin (or whatever prefix you use in parent router)
    loadComponent: () =>
      import('../components/admin/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
    children: [
      // Optional: default child when entering /admin → show dashboard overview or redirect
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',   // or load a real overview if you want
        // OR loadComponent: () => import('./.../dashboard-overview.component')...
      },

      {
        path: 'users',
        loadComponent: () =>
          import('../components/admin/user-list/user-list.component').then(m => m.UserListComponent),
      },
      {
        path: 'users/new',
        loadComponent: () =>
          import('../components/admin/user-edit/user-edit.component').then(m => m.UserEditComponent),
      },
      {
        path: 'users/:id/edit',
        loadComponent: () =>
          import('../components/admin/user-edit/user-edit.component').then(m => m.UserEditComponent),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('../components/admin/role-list/role-list.component').then(m => m.RoleListComponent),
      },
      {
        path: 'roles/new',
        loadComponent: () =>
          import('../components/admin/role-edit/role-edit.component').then(m => m.RoleEditComponent),
      },
      {
        path: 'roles/:id/edit',
        loadComponent: () =>
          import('../components/admin/role-edit/role-edit.component').then(m => m.RoleEditComponent),
      },
      {
        path: 'permissions',
        loadComponent: () =>
          import('../components/admin/permission-list/permission-list.component').then(
            m => m.PermissionListComponent
          ),
      },
      {
        path: 'permissions/new',
        loadComponent: () =>
          import('../components/admin/permission-edit/permission-edit.component').then(
            m => m.PermissionEditComponent
          ),
      },
      {
        path: 'permissions/:id/edit',
        loadComponent: () =>
          import('../components/admin/permission-edit/permission-edit.component').then(
            m => m.PermissionEditComponent
          ),
      },

      // Catch-all inside admin → go back to users list or show 404
      { path: '**', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];