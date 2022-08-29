package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.repositories.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository mockProductRepository;

    private ProductService productServiceUnderTest;

    @BeforeEach
    void setUp() {
        productServiceUnderTest = new ProductService(mockProductRepository);
    }

    @Test
    void testFindAll() {
        // Setup
        final List<Product> expectedResult = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));

        // Configure ProductRepository.findAll(...).
        final List<Product> products = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductRepository.findAll()).thenReturn(products);

        // Run the test
        final List<Product> result = productServiceUnderTest.findAll();

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindAll_ProductRepositoryReturnsNoItems() {
        // Setup
        when(mockProductRepository.findAll()).thenReturn(Collections.emptyList());

        // Run the test
        final List<Product> result = productServiceUnderTest.findAll();

        // Verify the results
        assertThat(result).isEqualTo(Collections.emptyList());
    }

    @Test
    void testFindById() {
        // Setup
        final Optional<Product> expectedResult = Optional.of(new Product(0, 0, 0.0, "description", "name"));

        // Configure ProductRepository.findById(...).
        final Optional<Product> product = Optional.of(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductRepository.findById(0)).thenReturn(product);

        // Run the test
        final Optional<Product> result = productServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindById_ProductRepositoryReturnsAbsent() {
        // Setup
        when(mockProductRepository.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final Optional<Product> result = productServiceUnderTest.findById(0);

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testFindByDescriptionContainingIgnoreCase() {
        // Setup
        final Optional<List<Product>> expectedResult = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));

        // Configure ProductRepository.findByDescriptionContainingIgnoreCase(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductRepository.findByDescriptionContainingIgnoreCase("description")).thenReturn(products);

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByDescriptionContainingIgnoreCase(
                "description");

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByDescriptionContainingIgnoreCase_ProductRepositoryReturnsAbsent() {
        // Setup
        when(mockProductRepository.findByDescriptionContainingIgnoreCase("description")).thenReturn(Optional.empty());

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByDescriptionContainingIgnoreCase(
                "description");

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testFindByDescriptionContainingIgnoreCase_ProductRepositoryReturnsNoItems() {
        // Setup
        when(mockProductRepository.findByDescriptionContainingIgnoreCase("description"))
                .thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByDescriptionContainingIgnoreCase(
                "description");

        // Verify the results
        assertThat(result).isEqualTo(Optional.of(Collections.emptyList()));
    }

    @Test
    void testFindByAny() {
        // Setup
        final Optional<List<Product>> expectedResult = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));

        // Configure ProductRepository.findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductRepository.findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase("searchTerm",
                "searchTerm")).thenReturn(products);

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByAny("searchTerm");

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByAny_ProductRepositoryReturnsAbsent() {
        // Setup
        when(mockProductRepository.findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase("searchTerm",
                "searchTerm")).thenReturn(Optional.empty());

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByAny("searchTerm");

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testFindByAny_ProductRepositoryReturnsNoItems() {
        // Setup
        when(mockProductRepository.findByDescriptionContainingIgnoreCaseOrNameContainingIgnoreCase("searchTerm",
                "searchTerm")).thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByAny("searchTerm");

        // Verify the results
        assertThat(result).isEqualTo(Optional.of(Collections.emptyList()));
    }

    @Test
    void testFindByNameContainingIgnoreCase() {
        // Setup
        final Optional<List<Product>> expectedResult = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));

        // Configure ProductRepository.findByNameContainingIgnoreCase(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductRepository.findByNameContainingIgnoreCase("name")).thenReturn(products);

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByNameContainingIgnoreCase("name");

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testFindByNameContainingIgnoreCase_ProductRepositoryReturnsAbsent() {
        // Setup
        when(mockProductRepository.findByNameContainingIgnoreCase("name")).thenReturn(Optional.empty());

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByNameContainingIgnoreCase("name");

        // Verify the results
        assertThat(result).isEmpty();
    }

    @Test
    void testFindByNameContainingIgnoreCase_ProductRepositoryReturnsNoItems() {
        // Setup
        when(mockProductRepository.findByNameContainingIgnoreCase("name"))
                .thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final Optional<List<Product>> result = productServiceUnderTest.findByNameContainingIgnoreCase("name");

        // Verify the results
        assertThat(result).isEqualTo(Optional.of(Collections.emptyList()));
    }

    @Test
    void testSave() {
        // Setup
        final Product product = new Product(0, 0, 0.0, "description", "name");
        final Product expectedResult = new Product(0, 0, 0.0, "description", "name");

        // Configure ProductRepository.save(...).
        final Product product1 = new Product(0, 0, 0.0, "description", "name");
        when(mockProductRepository.save(new Product(0, 0, 0.0, "description", "name"))).thenReturn(product1);

        // Run the test
        final Product result = productServiceUnderTest.save(product);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testSaveAll() {
        // Setup
        final List<Product> productList = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        final List<ProductInfo> metadata = Arrays.asList(new ProductInfo(0, 0));
        final List<Product> expectedResult = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));

        // Configure ProductRepository.saveAll(...).
        final List<Product> products = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductRepository.saveAll(Arrays.asList(new Product(0, 0, 0.0, "description", "name"))))
                .thenReturn(products);

        // Run the test
        final List<Product> result = productServiceUnderTest.saveAll(productList, metadata);

        // Verify the results
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    void testSaveAll_ProductRepositoryReturnsNoItems() {
        // Setup
        final List<Product> productList = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        final List<ProductInfo> metadata = Arrays.asList(new ProductInfo(0, 0));
        when(mockProductRepository.saveAll(Arrays.asList(new Product(0, 0, 0.0, "description", "name"))))
                .thenReturn(Collections.emptyList());

        // Run the test
        final List<Product> result = productServiceUnderTest.saveAll(productList, metadata);

        // Verify the results
        assertThat(result).isEqualTo(Collections.emptyList());
    }

    @Test
    void testDelete() {
        // Setup
        // Run the test
        productServiceUnderTest.delete(0);

        // Verify the results
        verify(mockProductRepository).deleteById(0);
    }
}
