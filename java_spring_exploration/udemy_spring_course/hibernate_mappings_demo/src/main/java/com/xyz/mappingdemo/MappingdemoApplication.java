package com.xyz.mappingdemo;

import com.xyz.mappingdemo.dao.AppDAO;
import com.xyz.mappingdemo.entity.Course;
import com.xyz.mappingdemo.entity.Instructor;
import com.xyz.mappingdemo.entity.InstructorDetail;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class MappingdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MappingdemoApplication.class, args);
	}

    @Bean
	public CommandLineRunner commandLineRunner(AppDAO appDAO) {
		return runner -> {
			// findInstructor(appDAO);
			// createInstructor(appDAO);
			// deleteInstructor(appDAO);
			// findInstructorDetails(appDAO);
			// deleteInstructorDetail(appDAO);
			// createInstructorWithCourses(appDAO);
			// findInstructorWithCourses(appDAO);
			// findCoursesForInstructor(appDAO);
			// findInstructorWithCoursesJoinFetch(appDAO);
			updateInstructor(appDAO);
		};
	}

	private void updateInstructor(AppDAO appDAO) {
		int instructorId = 1;
		Instructor instructor = appDAO.findInstructorById(instructorId);
		instructor.setLastName("tester");
		appDAO.update(instructor);
		System.out.println(instructor);
	}

	private void findInstructorWithCoursesJoinFetch(AppDAO appDAO) {
		int instructorId = 1;

		Instructor instructor = appDAO.findInstructorByIdJoinFetch(instructorId);
		System.out.println(instructor);
		System.out.println(instructor.getCourses());
	}

	private void findCoursesForInstructor(AppDAO appDAO) {
		int id = 1;
		System.out.println("Finding instructor id: " + id);
		Instructor instructor = appDAO.findInstructorById(id);
		System.out.println("Instructor: " + instructor);

		System.out.println("Finding courses");
		List<Course> courses = appDAO.findCoursesByInstructorId(id);
		instructor.setCourses(courses);
		System.out.println(courses);
	}

	private void findInstructorWithCourses(AppDAO appDAO) {
		int id = 1;
		System.out.println("Finding instructor id: " + id);
		Instructor instructor = appDAO.findInstructorById(id);
		System.out.println("Instructor: " + instructor);
		System.out.println("Associated courses: " + instructor.getCourses());
	}

	private void createInstructorWithCourses(AppDAO appDAO) {
		Instructor instructor = new Instructor("X", "YZ", "xyz@xyz.com");
		InstructorDetail instructorDetail = new InstructorDetail("youtubexyz", "stargazing");
		instructor.setInstructorDetail(instructorDetail);

		Course course1 = new Course("Course1");
		Course course2 = new Course("Course2");

		instructor.add(course1);
		instructor.add(course2);

		appDAO.save(instructor);
	}

	private void deleteInstructorDetail(AppDAO appDAO) {
		int id = 1;
		System.out.println("Deleting instructor detail id: "+ id);
		appDAO.deleteInstructorDetailById(id);
	}

	private void findInstructorDetails(AppDAO appDAO) {
		int id = 1;
		InstructorDetail instructorDetail = appDAO.findInstructorDetailById(id);
		System.out.println(instructorDetail);
		System.out.println(instructorDetail.getInstructor());
	}

	private void deleteInstructor(AppDAO appDAO) {
		int id = 1;
		System.out.println("Deleting instructor with id: " + id);
		appDAO.deleteInstructorById(id);
	}

	private void findInstructor(AppDAO appDAO) {
		int id = 3;
		System.out.println("Finding instructor with id: " + id);
		Instructor instructor = appDAO.findInstructorById(id);
		System.out.println(instructor);
		System.out.println(instructor.getInstructorDetail());
	}

	private void createInstructor(AppDAO appDAO) {
		Instructor instructor = new Instructor("X", "YZ", "xyz@xyz.com");
		InstructorDetail instructorDetail = new InstructorDetail("youtubexyz", "stargazing");
		instructor.setInstructorDetail(instructorDetail);

		System.out.println("Saving instructor: " + instructor);
		appDAO.save(instructor);
	}
}
