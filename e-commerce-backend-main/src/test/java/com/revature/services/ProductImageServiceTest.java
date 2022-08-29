package com.revature.services;

import com.revature.models.Product;
import com.revature.models.ProductImage;
import com.revature.repositories.ProductImageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductImageServiceTest {

    @Mock
    private ProductImageRepository mockProductImageRepository;

    private ProductImageService productImageServiceUnderTest;

    @BeforeEach
    void setUp() {
        productImageServiceUnderTest = new ProductImageService(mockProductImageRepository);
    }

    @Test
    void testFindById() {
        // Setup
        final Optional<ProductImage> expectedResult = Optional.of(
                new ProductImage(0, "content".getBytes(), new Product(0, 0, 0.0, "description", "name")));

        // Configure ProductImageRepository.findById(...).
        final Optional<ProductImage> productImage = Optional.of(
                new ProductImage(0, "content".getBytes(), new Product(0, 0, 0.0, "description", "name")));
        when(mockProductImageRepository.findById(0)).thenReturn(productImage);

        // Run the test
        final Optional<ProductImage> result = productImageServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindById_ProductImageRepositoryReturnsAbsent() {
        // Setup
        when(mockProductImageRepository.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final Optional<ProductImage> result = productImageServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testSave() {
        // Setup
        final ProductImage ProductImage = new ProductImage(0, "content".getBytes(),
                new Product(0, 0, 0.0, "description", "name"));
        final com.revature.models.ProductImage expectedResult = new ProductImage(0, "content".getBytes(),
                new Product(0, 0, 0.0, "description", "name"));

        // Configure ProductImageRepository.save(...).
        final com.revature.models.ProductImage productImage = new ProductImage(0, "content".getBytes(),
                new Product(0, 0, 0.0, "description", "name"));
        when(mockProductImageRepository.save(
                new ProductImage(0, "content".getBytes(), new Product(0, 0, 0.0, "description", "name"))))
                .thenReturn(productImage);

        // Run the test
        final com.revature.models.ProductImage result = productImageServiceUnderTest.save(ProductImage);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testDelete() {
        // Setup
        // Run the test
        productImageServiceUnderTest.delete(0);

        // Verify the results
        verify(mockProductImageRepository).deleteById(0);
    }
}
