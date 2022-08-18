package com.revature.controllers;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.repositories.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" }, allowCredentials = "true")
public class UserController {
	
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id) {
    	Optional<User> optionalUser = userRepository.findById(id);
		
    	User user;
    	
    	if (optionalUser.isPresent()) {
    		user = optionalUser.get();
    		return ResponseEntity.ok().body(user);
    	}
    	
    	return ResponseEntity.status(400).build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
    	Optional<User> optionalUser = userRepository.findById(user.getId());
		
    	User oldUser;
    	
    	if(optionalUser.isPresent()) {
    		oldUser = optionalUser.get();
    		user.setId(oldUser.getId());
    		User newUser = userRepository.save(user);
    		return ResponseEntity.accepted().body(newUser);
    	}
    	
    	return ResponseEntity.badRequest().build();
    	
    }
    
}
