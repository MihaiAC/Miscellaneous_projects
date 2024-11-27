package com.xyz.mappingdemo;

import com.xyz.mappingdemo.dao.AppDAO;
import com.xyz.mappingdemo.entity.Instructor;
import com.xyz.mappingdemo.entity.InstructorDetail;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MappingdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MappingdemoApplication.class, args);
	}

    @Bean
	public CommandLineRunner commandLineRunner(AppDAO appDAO) {
		return runner -> {
			createInstructor(appDAO);
		};
	}

	private void createInstructor(AppDAO appDAO) {
		Instructor instructor = new Instructor("X", "YZ", "xyz@xyz.com");
		InstructorDetail instructorDetail = new InstructorDetail("youtubexyz", "stargazing");
		instructor.setInstructorDetail(instructorDetail);

		System.out.println("Saving instructor: " + instructor);
		appDAO.save(instructor);
	}

}
