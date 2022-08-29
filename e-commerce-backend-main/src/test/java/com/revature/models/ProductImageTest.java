package com.revature.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class ProductImageTest {

    @Mock
    private Product mockProduct;

    private ProductImage productImageUnderTest;

    @BeforeEach
    void setUp() {
        productImageUnderTest = new ProductImage(0, "content".getBytes(), mockProduct);
    }

    @Test
    void testEquals() {
        assertThat(productImageUnderTest.equals("o")).isFalse();
    }

    @Test
    void testCanEqual() {
        assertThat(productImageUnderTest.canEqual("other")).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(productImageUnderTest.hashCode()).isEqualTo(productImageUnderTest.hashCode());
    }

    @Test
    void testToString() {
        assertThat(productImageUnderTest.toString()).isEqualTo(productImageUnderTest.toString());
    }
}
