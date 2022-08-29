package com.revature.services;

import com.revature.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService mockUserService;

    private AuthService authServiceUnderTest;

    @BeforeEach
    void setUp() {
        authServiceUnderTest = new AuthService(mockUserService);
    }

    @Test
    void testFindByCredentials() {
        // Setup
        final Optional<User> expectedResult = Optional.of(
                new User(0, "email", "password", "firstName", "lastName", false));

        // Configure UserService.findByCredentials(...).
        final Optional<User> user = Optional.of(new User(0, "email", "password", "firstName", "lastName", false));
        when(mockUserService.findByCredentials("email", "password")).thenReturn(user);

        // Run the test
        final Optional<User> result = authServiceUnderTest.findByCredentials("email", "password");

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByCredentials_UserServiceReturnsAbsent() {
        // Setup
        when(mockUserService.findByCredentials("email", "password")).thenReturn(Optional.empty());

        // Run the test
        final Optional<User> result = authServiceUnderTest.findByCredentials("email", "password");

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testRegister() {
        // Setup
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        final User expectedResult = new User(0, "email", "password", "firstName", "lastName", false);

        // Configure UserService.save(...).
        final User user1 = new User(0, "email", "password", "firstName", "lastName", false);
        when(mockUserService.save(new User(0, "email", "password", "firstName", "lastName", false))).thenReturn(user1);

        // Run the test
        final User result = authServiceUnderTest.register(user);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }
}
