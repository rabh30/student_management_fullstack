package com.saurabh.student.service;

import com.saurabh.student.model.Student;
import com.saurabh.student.repository.StudentRepository;
// Import the standard JPA Exception for handling "not found" cases
import jakarta.persistence.EntityNotFoundException; // Use javax.persistence if using older Spring Boot/JPA
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students (Existing - No Change)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID (Existing - No Change)
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Save a new student (Existing - No Change)
    // This could also be used for updates if the student object has an ID,
    // but the new updateStudent method is more explicit.
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Delete student by ID (Existing - No Change)
    public void deleteStudent(Long id) {
        // Consider adding 'if (studentRepository.existsById(id))' check
        studentRepository.deleteById(id);
    }

    // ***********************************************
    // ***      NEW METHOD TO HANDLE UPDATES       ***
    // ***********************************************
    /**
     * Updates an existing student identified by ID.
     *
     * @param id The ID of the student to update.
     * @param studentDetails An object containing the new details for the student.
     * @return The updated Student object.
     * @throws EntityNotFoundException if no student with the given ID is found.
     */
    public Student updateStudent(Long id, Student studentDetails) {
        // 1. Find the existing student or throw an exception if not found
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));

        // 2. Update the existing student's fields with the new details
        existingStudent.setRollNumber(studentDetails.getRollNumber());
        existingStudent.setName(studentDetails.getName());
        existingStudent.setCourse(studentDetails.getCourse());
        existingStudent.setDepartment(studentDetails.getDepartment());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setPhoneNumber(studentDetails.getPhoneNumber());
        existingStudent.setAddress(studentDetails.getAddress());
        existingStudent.setDob(studentDetails.getDob());
        existingStudent.setGender(studentDetails.getGender());
        // NOTE: We don't update the ID

        // 3. Save the updated student (JPA knows to update because the entity has an ID)
        return studentRepository.save(existingStudent);
    }
}