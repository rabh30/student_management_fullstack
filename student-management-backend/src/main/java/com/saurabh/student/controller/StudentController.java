package com.saurabh.student.controller;

import com.saurabh.student.model.Student;
import com.saurabh.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Import ResponseEntity
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
// Assuming global CORS config (CorsConfig.java) is active, so @CrossOrigin is not needed here
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students (Existing - No Change)
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get student by ID (Existing - No Change)
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        // Return 404 if not found, 200 OK if found
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok) // If student exists, wrap in ResponseEntity.ok()
                .orElseGet(() -> ResponseEntity.notFound().build()); // Otherwise, build a 404 response
    }

    // Add a new student (Existing - No Change - Assuming service handles ID generation)
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        // Assuming saveStudent generates ID if missing and returns the saved entity
        return studentService.saveStudent(student);
    }

    // Delete student by ID (Existing - No Change)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        // Consider adding logic here or in service to return 404 if ID doesn't exist
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build(); // Return 200 OK on successful deletion attempt
    }

    // ***********************************************
    // ***      NEW METHOD TO HANDLE UPDATES       ***
    // ***********************************************
    @PutMapping("/{id}") // Handles PUT requests to /students/{id}
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,             // Gets the ID from the URL path
            @RequestBody Student studentDetails // Gets the updated student data from the request body
    ) {
        // --- IMPORTANT ASSUMPTION ---
        // This assumes your StudentService has an 'updateStudent' method like:
        // public Student updateStudent(Long id, Student details) { ... }
        // which finds the student by 'id', updates its fields with 'details', and saves/returns it.
        // If your service ONLY has 'saveStudent', you might need different logic here, like:
        // studentDetails.setId(id); // Manually set the ID
        // Student updated = studentService.saveStudent(studentDetails);
        // But having a dedicated update method in the service is better practice.

        try {
            Student updatedStudent = studentService.updateStudent(id, studentDetails);
            return ResponseEntity.ok(updatedStudent); // Return 200 OK with the updated student
        } catch (RuntimeException e) {
            // Example: Catch a specific exception if your service throws one when ID not found
            // Or, if updateStudent returns null when ID not found:
            // Student updatedStudent = studentService.updateStudent(id, studentDetails);
            // if (updatedStudent == null) {
            //     return ResponseEntity.notFound().build(); // Return 404 Not Found
            // }
            // return ResponseEntity.ok(updatedStudent);

            // For now, returning not found for any runtime exception during update
            // You should refine this based on your service's error handling
            System.err.println("Error updating student with ID " + id + ": " + e.getMessage());
            return ResponseEntity.notFound().build(); // Or ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}