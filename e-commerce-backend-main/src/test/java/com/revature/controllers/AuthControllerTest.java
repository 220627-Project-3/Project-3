package com.revature.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.google.gson.Gson;
import com.revature.models.User;
import com.revature.services.AuthService;
import com.revature.services.UserService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService mockAuthService;
    @MockBean
    private UserService mockUserService;
    
    @InjectMocks
    MockHttpSession mockHttpSession;

    @Test
    void testLogin() throws Exception {
        // Setup
        // Configure AuthService.findByCredentials(...).
        final Optional<User> user = Optional.of(new User(0, "email", "password", "firstName", "lastName", false));
        when(mockAuthService.findByCredentials("email", "password")).thenReturn(user);

        Gson gson = new Gson();
        String body = gson.toJson(user.get());
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/auth/login")
                        .content(body).contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(body);
    }

    @Test
    void testLogin_AuthServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockAuthService.findByCredentials("email", "password")).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/auth/login")
                        .content("content").contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testCurrentSession() throws Exception {
        // Setup
        // Configure UserService.findById(...).
        final Optional<User> user = Optional.of(new User(0, "email", "password", "firstName", "lastName", false));
        when(mockUserService.findById(0)).thenReturn(user);
        
        mockHttpSession.setAttribute("user", user.get());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/auth/session").session(mockHttpSession)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        Gson gson = new Gson();
        String responseData = gson.toJson(user.get());
        
        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(responseData);
    }

    @Test
    void testCurrentSession_UserServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockUserService.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/auth/session").session(mockHttpSession)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testLogout() throws Exception {
        // Setup
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/auth/logout")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testRegister() throws Exception {
        // Setup
        // Configure AuthService.register(...).
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        when(mockAuthService.register(new User(0, "email", "password", "firstName", "lastName", false)))
                .thenReturn(user);
        
        Gson gson = new Gson();
        String body = gson.toJson(user);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/auth/register")
                        .content(body).contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.getContentAsString()).isEqualTo(body);
    }
}
