import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard';

import { AdminLoginComponent } from './admin-login/admin-login';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { adminGuard } from './admin-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'employee-dashboard', component: EmployeeDashboardComponent },

  // ADMIN LOGIN
  { path: 'admin-login', component: AdminLoginComponent },

  //  ADMIN DASHBOARD (THIS WAS MISSING)
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },

  // SAFETY FALLBACK
  { path: '**', redirectTo: '' }
];
