// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of a Student object (matches your backend JSON)
export interface Student {
    id?: number; // id is optional when creating, present otherwise
    rollNumber: string;
    name: string;
    course: string;
    department: string;
    email: string;
    phoneNumber: string;
    address: string;
    dob: string; // Keep as string (YYYY-MM-DD) for date input compatibility
    gender: string;
}


@Injectable({
    providedIn: 'root' // Makes the service available application-wide
})
export class StudentService {
    // !!! IMPORTANT: Replace with your ACTUAL backend students API base URL !!!
    private apiUrl = 'http://localhost:8080/students'; // <-- ADJUST THIS URL

    constructor(private http: HttpClient) { }

    // GET all students
    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiUrl);
    }

    // GET a single student by ID (for update form)
    getStudentById(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.apiUrl}/${id}`);
    }

    // POST (add) a new student
    addStudent(student: Student): Observable<Student> {
        // We don't send the ID when creating a new student
        const { id, ...studentData } = student;
        return this.http.post<Student>(this.apiUrl, studentData);
    }

    // PUT (update) an existing student
    updateStudent(id: number, student: Student): Observable<Student> {
        return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
    }

    // DELETE a student by ID
    deleteStudent(id: number): Observable<any> { // Response might be void or just status
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}