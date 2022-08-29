package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository mockUserRepository;

    private UserService userServiceUnderTest;

    @BeforeEach
    void setUp() {
        userServiceUnderTest = new UserService(mockUserRepository);
    }

    @Test
    void testFindById() {
        // Setup
        final Optional<User> expectedResult = Optional.of(
                new User(0, "email", "password", "firstName", "lastName", false));

        // Configure UserRepository.findById(...).
        final Optional<User> user = Optional.of(new User(0, "email", "password", "firstName", "lastName", false));
        when(mockUserRepository.findById(0)).thenReturn(user);

        // Run the test
        final Optional<User> result = userServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindById_UserRepositoryReturnsAbsent() {
        // Setup
        when(mockUserRepository.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final Optional<User> result = userServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testFindByCredentials() {
        // Setup
        final Optional<User> expectedResult = Optional.of(
                new User(0, "email", "password", "firstName", "lastName", false));

        // Configure UserRepository.findByEmailAndPassword(...).
        final Optional<User> user = Optional.of(new User(0, "email", "password", "firstName", "lastName", false));
        when(mockUserRepository.findByEmailAndPassword("email", "password")).thenReturn(user);

        // Run the test
        final Optional<User> result = userServiceUnderTest.findByCredentials("email", "password");

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByCredentials_UserRepositoryReturnsAbsent() {
        // Setup
        when(mockUserRepository.findByEmailAndPassword("email", "password")).thenReturn(Optional.empty());

        // Run the test
        final Optional<User> result = userServiceUnderTest.findByCredentials("email", "password");

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testSave() {
        // Setup
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        final User expectedResult = new User(0, "email", "password", "firstName", "lastName", false);

        // Configure UserRepository.save(...).
        final User user1 = new User(0, "email", "password", "firstName", "lastName", false);
        when(mockUserRepository.save(new User(0, "email", "password", "firstName", "lastName", false)))
                .thenReturn(user1);

        // Run the test
        final User result = userServiceUnderTest.save(user);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }
}
