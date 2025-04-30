// src/app/components/login/login.component.ts
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; // Verify this path
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
        this.errorMessage = 'Please enter both username and password.';
        return;
    }

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        // *** Change parameter type to string ***
        next: (response: string) => {
          console.log('Login successful (text response):', response);
          // Navigation happens because the 'tap' in the service set the flag
          this.router.navigate(['/students']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Login failed:', err); // Keep logging the full error object

          // Check status code from the error object
          if (err.status === 401 || err.status === 403) {
              this.errorMessage = 'Invalid username or password.';
          } else {
              // Display a generic error, including status if available
              this.errorMessage = `Login failed (${err.status || 'network error'}). Please try again later.`;
          }
        }
      });
  }
}