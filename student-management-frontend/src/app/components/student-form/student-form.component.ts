// src/app/components/student-form/student-form.component.ts
import { Component, OnInit, Inject, HostBinding } from '@angular/core'; // Import HostBinding
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../service/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  // Use HostBinding to add classes based on the mode
  @HostBinding('class.mode-add') get isAddMode() { return !this.isUpdateMode; }
  @HostBinding('class.mode-update') get isUpdateModeBinding() { return this.isUpdateMode; }

  // Your existing properties
  student: Student = {
    rollNumber: '', name: '', course: '', department: '', email: '',
    phoneNumber: '', address: '', dob: '', gender: 'Male'
  };
  isUpdateMode = false;
  studentId: number | null = null;
  isLoading = false;
  errorMessage = '';
  pageTitle = 'Add New Student';

  constructor(
    @Inject(StudentService) private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isUpdateMode = true; // This now automatically toggles the host class
      this.studentId = +idParam;
      this.pageTitle = `Update Student (ID: ${this.studentId})`;
      this.loadStudentData();
    } else {
      this.isUpdateMode = false; // This now automatically toggles the host class
      this.pageTitle = 'Add New Student';
    }
  }

  // ... (rest of your methods: loadStudentData, formatDateForInput, onSubmit, onCancel) ...
  loadStudentData(): void {
    if (!this.studentId) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.studentService.getStudentById(this.studentId).subscribe({
        next: (data: Student) => {
            this.student = { ...data, dob: this.formatDateForInput(data.dob) };
            this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
            console.error(`Error fetching student data for ID ${this.studentId}:`, err);
            this.errorMessage = `Failed to load student data. ${err.message || ''}`;
            this.isLoading = false;
        }
    });
  }

  private formatDateForInput(dateStr: string | null | undefined): string {
      if (!dateStr) return '';
      try {
          const date = new Date(dateStr);
          date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
      } catch (e) {
          console.error("Error formatting date:", dateStr, e);
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) { return dateStr; }
          return '';
      }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    let operation: Observable<Student>;
    if (this.isUpdateMode && this.studentId) {
      operation = this.studentService.updateStudent(this.studentId, this.student);
    } else {
      operation = this.studentService.addStudent(this.student);
    }
    operation.subscribe({
      next: (result: Student) => {
        console.log(`Student ${this.isUpdateMode ? 'updated' : 'added'} successfully:`, result);
        this.isLoading = false;
        this.router.navigate(['/students']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(`Error ${this.isUpdateMode ? 'updating' : 'adding'} student:`, err);
        this.errorMessage = `Failed to ${this.isUpdateMode ? 'update' : 'save'} student. ${err.error?.message || err.message || ''}`;
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}