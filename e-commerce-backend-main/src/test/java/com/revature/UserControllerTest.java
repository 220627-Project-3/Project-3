package com.revature;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.revature.controllers.UserController;
import com.revature.models.User;
import com.revature.repositories.UserRepository;

@SpringBootTest
public class UserControllerTest {
	
	@Autowired
	UserRepository uDAO;
	
	@Test
	public void testGetUserById() {
		
		UserController mockCon = Mockito.spy(new UserController(uDAO));
		ResponseEntity<User> mockUser = mockCon.getById(1);
		Mockito.verify(mockCon).getById(1);
		
		assertTrue(mockUser.getBody().getEmail().equals("johndoe@email.com"));
		
	}

}