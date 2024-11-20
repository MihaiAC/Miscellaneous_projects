package com.ltc.cruddemo;

import com.ltc.cruddemo.dao.StudentDAO;
import com.ltc.cruddemo.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CruddemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CruddemoApplication.class, args);
	}

	// Executed after the Spring Beans have been loaded.
	@Bean
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
		return runner -> {
			createMultipleStudents(studentDAO);
		};
	}

	private void createStudent(StudentDAO studentDAO) {
		// Create the Student object
		System.out.println("Creating new student object");
		Student tempStudent = new Student("Paul", "Doe", "paul@ltc.com");

		// Save the Student object
		System.out.println("Saving the student object");
		studentDAO.save(tempStudent);

		// Display id of the saved object
		System.out.println("Saved object; generated id: " + tempStudent.getId());
	}

	private void createMultipleStudents(StudentDAO studentDAO) {
		System.out.println("Creating multiple Student objects.");
		Student tempStudent1 = new Student("John", "Doe", "john@ltc.com");
		Student tempStudent2 = new Student("Mary", "Public", "maria@ltc.com");
		Student tempStudent3 = new Student("Joh", "Ndoe", "joh@ltc.com");

		System.out.println("Saving the objects.");
		studentDAO.save(tempStudent1);
		studentDAO.save(tempStudent2);
		studentDAO.save(tempStudent3);
	}

}
