package com.revature.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    private User userUnderTest;

    @BeforeEach
    void setUp() {
        userUnderTest = new User(0, "email", "password", "firstName", "lastName", false);
    }

    @Test
    void testEquals() {
        assertThat(userUnderTest.equals("o")).isFalse();
    }

    @Test
    void testCanEqual() {
        assertThat(userUnderTest.canEqual("other")).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(userUnderTest.hashCode()).isEqualTo(userUnderTest.hashCode());
    }

    @Test
    void testToString() {
        assertThat(userUnderTest.toString()).isEqualTo(userUnderTest.toString());
    }
}
