package com.practicafinal.apirest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ApirestTiendaApplication implements CommandLineRunner {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ApirestTiendaApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		String pass = "appstore";
		for (int i = 0; i < 3; i++) {
			String passBCrypt = passwordEncoder.encode(pass);
			System.out.println(passBCrypt);
		}
	}

}
