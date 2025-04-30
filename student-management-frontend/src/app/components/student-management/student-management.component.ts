// src/app/components/student-management/student-management.component.ts
import { Component, OnInit, Inject } from '@angular/core'; // Import Inject
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService, Student } from '../../service/student.service'; // Verify this path
import { AuthService } from '../../service/auth.service'; // Verify this path
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
      // Inject both services using @Inject decorator
      @Inject(StudentService) private studentService: StudentService, // Use @Inject here
      @Inject(AuthService) private authService: AuthService,       // Use @Inject here
      private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.isLoading = false;
        console.log('Students loaded:', this.students);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to load student list. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  deleteStudent(id: number | undefined): void {
    if (id === undefined) {
        console.error('Cannot delete student: ID is undefined.');
        this.errorMessage = 'Error: Cannot delete student without an ID.';
        return;
    }

    if (confirm(`Are you sure you want to delete student with ID: ${id}?`)) {
      this.isLoading = true;
      this.studentService.deleteStudent(id).subscribe({
        next: (response: any) => {
          console.log(`Student with id ${id} deleted successfully.`);
          this.isLoading = false;
          this.loadStudents(); // Refresh list
        },
        error: (err: HttpErrorResponse) => {
          console.error(`Error deleting student with id ${id}:`, err);
          this.errorMessage = `Failed to delete student. ${err.message || ''}`;
          this.isLoading = false;
        }
      });
    }
  }

  logout(): void {
      this.authService.logout();
  }
}