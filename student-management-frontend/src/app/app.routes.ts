// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Import the components used in routing
import { LoginComponent } from './components/login/login.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
// Import the authentication guard
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Route for the login page
  { path: 'login', component: LoginComponent },

  // Route for the main student list page
  {
    path: 'students', // URL: /students
    component: StudentManagementComponent,
    canActivate: [authGuard] // Protect this route using the authGuard
  },

  // Route for adding a new student (uses StudentFormComponent)
  {
    path: 'add-student', // URL: /add-student
    component: StudentFormComponent,
    canActivate: [authGuard] // Protect this route
  },

  // Route for updating an existing student (uses StudentFormComponent)
  {
    path: 'update-student/:id', // URL: /update-student/123 (id is a parameter)
    component: StudentFormComponent,
    canActivate: [authGuard] // Protect this route
  },

  // Default route: Redirects to '/login' if the user lands on the base URL ('')
  // Later, we could make this smarter to redirect to '/students' if already logged in.
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route: Catches any undefined URLs and redirects to login
  // Alternatively, you could create a dedicated NotFoundComponent
  { path: '**', redirectTo: '/login' }
];