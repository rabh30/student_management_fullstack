// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // !!! Make sure this URL is exactly correct !!!
    // private apiUrl = 'http://localhost:8080/admin/login'; // Your confirmed login URL
    // !!! IMPORTANT: Replace with your ACTUAL Render backend students API URL !!!
private apiUrl = 'https://student-management-fullstack.onrender.com/admin/login'; // <-- ADJUSTED URL

    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: { username: string; password: string }): Observable<string> { // <<< Change Observable type to string
        return this.http.post( // <<< Remove <any> type argument
            this.apiUrl,
            credentials,
            { responseType: 'text' } // <<< Tell HttpClient to expect plain text
        ).pipe(
            tap(response => { // response here will be the plain text string
                console.log('Backend response (text):', response); // Log the text response
                // Check if the response text indicates success (adjust if needed)
                if (response && response.toLowerCase().includes('success')) { // Or check for specific text
                    localStorage.setItem('isLoggedIn', 'true');
                    this.loggedIn.next(true);
                } else {
                    // Optional: Handle cases where 200 OK is returned but text doesn't indicate success
                    console.warn('Login response did not indicate success:', response);
                    // Maybe throw an error here or handle differently?
                    // For now, we'll assume any non-empty 200 text response is okay
                    localStorage.setItem('isLoggedIn', 'true'); // Still setting loggedIn for now
                    this.loggedIn.next(true); // Still setting loggedIn for now
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('isLoggedIn');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.loggedIn.value;
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('isLoggedIn');
    }
}