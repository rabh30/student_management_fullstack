// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Correct path to AuthService

export const authGuard: CanActivateFn = (route, state) => {
    // Inject AuthService and Router using the inject function
    const authService: AuthService = inject(AuthService); // Explicitly type the injection
    const router: Router = inject(Router);

    // Check if the user is logged in using the service method
    if (authService.isLoggedIn()) {
        return true; // User is logged in, allow access to the route
    } else {
        // User is not logged in, redirect them to the login page
        console.log('AuthGuard: User not logged in, redirecting to /login');
        router.navigate(['/login']);
        return false; // Prevent access to the route
    }
};
