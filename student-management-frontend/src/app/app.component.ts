// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // *** Make sure RouterOutlet is imported ***

@Component({
  selector: 'app-root', // CSS selector to use this component (usually in index.html)
  standalone: true,    // Indicates this is a standalone component
  imports: [
    CommonModule,
    RouterOutlet     // *** Make sure RouterOutlet is in the imports array ***
  ],
  templateUrl: './app.component.html', // Link to the HTML template file
  styleUrls: ['./app.component.css']   // Link to the CSS styles file
})
export class AppComponent {
  // Optional: Title property (often default from project creation)
  title = 'student-management-frontend';
}