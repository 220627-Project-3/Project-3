package com.revature.services;

import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistItem;
import com.revature.repositories.WishlistItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WishlistItemServiceTest {

    @Mock
    private WishlistItemRepository mockWishlistitemRepository;

    private WishlistItemService wishlistItemServiceUnderTest;

    @BeforeEach
    void setUp() {
        wishlistItemServiceUnderTest = new WishlistItemService(mockWishlistitemRepository);
    }

    @Test
    void testFindByUser() {
        // Setup
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        final List<WishlistItem> expectedResult = Arrays.asList(
                new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                        new User(0, "email", "password", "firstName", "lastName", false)));

        // Configure WishlistItemRepository.findByUser(...).
        final List<WishlistItem> wishlistItems = Arrays.asList(
                new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                        new User(0, "email", "password", "firstName", "lastName", false)));
        when(mockWishlistitemRepository.findByUser(
                new User(0, "email", "password", "firstName", "lastName", false))).thenReturn(wishlistItems);

        // Run the test
        final List<WishlistItem> result = wishlistItemServiceUnderTest.findByUser(user);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByUser_WishlistItemRepositoryReturnsNoItems() {
        // Setup
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        when(mockWishlistitemRepository.findByUser(
                new User(0, "email", "password", "firstName", "lastName", false))).thenReturn(Collections.emptyList());

        // Run the test
        final List<WishlistItem> result = wishlistItemServiceUnderTest.findByUser(user);

        // Verify the results
        assertThat(result).isEqualTo(Collections.emptyList());
    }

    @Test
    void testAddProduct() {
        // Setup
        final Product product = new Product(0, 0, 0.0, "description", "name");
        final User user = new User(0, "email", "password", "firstName", "lastName", false);

        // Configure WishlistItemRepository.findByUser(...).
        final List<WishlistItem> wishlistItems = Arrays.asList(
                new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                        new User(0, "email", "password", "firstName", "lastName", false)));
        when(mockWishlistitemRepository.findByUser(
                new User(0, "email", "password", "firstName", "lastName", false))).thenReturn(wishlistItems);

        // Configure WishlistItemRepository.save(...).
        final WishlistItem wishlistItem = new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false));
        when(mockWishlistitemRepository.save(new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false)))).thenReturn(wishlistItem);

        // Run the test
        final boolean result = wishlistItemServiceUnderTest.addProduct(product, user);

        // Verify the results
        assertThat(result).isTrue();
        verify(mockWishlistitemRepository).save(new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false)));
    }

    @Test
    void testAddProduct_WishlistItemRepositoryFindByUserReturnsNoItems() {
        // Setup
        final Product product = new Product(0, 0, 0.0, "description", "name");
        final User user = new User(0, "email", "password", "firstName", "lastName", false);
        when(mockWishlistitemRepository.findByUser(
                new User(0, "email", "password", "firstName", "lastName", false))).thenReturn(Collections.emptyList());

        // Configure WishlistItemRepository.save(...).
        final WishlistItem wishlistItem = new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false));
        when(mockWishlistitemRepository.save(new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false)))).thenReturn(wishlistItem);

        // Run the test
        final boolean result = wishlistItemServiceUnderTest.addProduct(product, user);

        // Verify the results
        assertThat(result).isTrue();
        verify(mockWishlistitemRepository).save(new WishlistItem(0, new Product(0, 0, 0.0, "description", "name"),
                new User(0, "email", "password", "firstName", "lastName", false)));
    }

    @Test
    void testDeleteWishlistItem() {
        // Setup
        // Run the test
        final boolean result = wishlistItemServiceUnderTest.deleteWishlistItem(0);

        // Verify the results
        assertThat(result).isTrue();
        verify(mockWishlistitemRepository).deleteById(0);
    }
}
