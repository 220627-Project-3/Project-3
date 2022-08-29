package com.revature.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class CartItemTest {

    @Mock
    private Product mockProduct;
    @Mock
    private User mockUser;

    private CartItem cartItemUnderTest;

    @BeforeEach
    void setUp() {
        cartItemUnderTest = new CartItem(0, mockProduct, mockUser, 0);
    }

    @Test
    void testEquals() {
        assertThat(cartItemUnderTest.equals("o")).isFalse();
    }

    @Test
    void testCanEqual() {
        assertThat(cartItemUnderTest.canEqual("other")).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(cartItemUnderTest.hashCode()).isEqualTo(cartItemUnderTest.hashCode());
    }

    @Test
    void testToString() {
        assertThat(cartItemUnderTest.toString()).isEqualTo(cartItemUnderTest.toString());
    }
}
