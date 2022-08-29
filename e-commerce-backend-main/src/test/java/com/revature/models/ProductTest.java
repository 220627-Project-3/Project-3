package com.revature.models;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

class ProductTest {

	@MockBean
    private Product productUnderTest;

    @BeforeEach
    void setUp() {
        productUnderTest = new Product(0, 0, 0.0, "description", "name");
    }

    @Test
    void testEquals() {
        assertThat(productUnderTest.equals("o")).isFalse();
    }

    @Test
    void testCanEqual() {
        assertThat(productUnderTest.canEqual("other")).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(productUnderTest.hashCode()).isEqualTo(productUnderTest.hashCode());
    }

    @Test
    void testToString() {
    	
        assertThat(productUnderTest.toString()).isEqualTo(productUnderTest.toString());
    }
}
