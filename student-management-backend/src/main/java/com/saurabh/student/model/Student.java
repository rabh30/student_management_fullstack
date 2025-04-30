package com.saurabh.student.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String rollNumber;

    private String name;
    private String course;
    private String department;
    private String email;
    private String phoneNumber;
    private String address;

    @Column(name = "dob")
    private LocalDate dob;

    private String gender;
}
