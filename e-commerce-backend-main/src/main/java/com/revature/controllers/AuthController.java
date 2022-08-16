package com.revature.controllers;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.dtos.LoginRequest;
import com.revature.dtos.RegisterRequest;
import com.revature.models.User;
import com.revature.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" }, allowCredentials = "true")
public class AuthController {

	Logger logger = LoggerFactory.getLogger(AuthController.class);

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
		Optional<User> optional = authService.findByCredentials(loginRequest.getEmail(), loginRequest.getPassword());

		if (!optional.isPresent()) {
			return ResponseEntity.badRequest().build();
		}

		session.setAttribute("user", optional.get());

		return ResponseEntity.ok(optional.get());
	}

	@GetMapping("/session")
	public ResponseEntity<User> currentSession(HttpSession session, HttpServletResponse response) {
		
		User curUser = (User) session.getAttribute("user");
		
		if(curUser != null) {
			return ResponseEntity.ok().body(curUser);
		}
		
		// Destroy JSESSIONID if session is invalid
		Cookie cookie = new Cookie("JSESSIONID", null);
		cookie.setPath("/");
		cookie.setHttpOnly(false);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(curUser);
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(HttpSession session) {
		session.removeAttribute("user");

		return ResponseEntity.ok().build();
	}

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest) {

		User created = null;

		try {
			created = authService.register(new User(0,
					registerRequest.getEmail(),
					registerRequest.getPassword(),
					registerRequest.getFirstName(),
					registerRequest.getLastName(),
					false));

			return ResponseEntity.status(HttpStatus.CREATED).body(created);

		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}

		return ResponseEntity.badRequest().body(created);
	}
}
