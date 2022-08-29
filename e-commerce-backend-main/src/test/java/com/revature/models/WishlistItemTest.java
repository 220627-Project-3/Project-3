package com.revature.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class WishlistItemTest {

    @Mock
    private Product mockProduct;
    @Mock
    private User mockUser;

    private WishlistItem wishlistItemUnderTest;

    @BeforeEach
    void setUp() {
        wishlistItemUnderTest = new WishlistItem(0, mockProduct, mockUser);
    }

    @Test
    void testEquals() {
        assertThat(wishlistItemUnderTest.equals("o")).isFalse();
    }

    @Test
    void testCanEqual() {
        assertThat(wishlistItemUnderTest.canEqual("other")).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(wishlistItemUnderTest.hashCode()).isEqualTo(wishlistItemUnderTest.hashCode());
    }

    @Test
    void testToString() {
        assertThat(wishlistItemUnderTest.toString()).isEqualTo(wishlistItemUnderTest.toString());
    }
}
