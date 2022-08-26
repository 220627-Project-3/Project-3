package com.revature.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

import com.google.gson.Gson;
import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.services.ProductService;


@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService mockProductService;

    @Test
    void testGetInventory() throws Exception {
        // Setup
        // Configure ProductService.findAll(...).
        final List<Product> products = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.findAll()).thenReturn(products);

        Gson gson = new Gson();
        String json = gson.toJson(products);
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testGetInventory_ProductServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockProductService.findAll()).thenReturn(Collections.emptyList());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("[]");
    }

    @Test
    void testCreateProduct() throws Exception {
        // Setup
        // Configure ProductService.save(...).
        final Product product = new Product(0, 0, 0.0, "description", "name");
        when(mockProductService.save(new Product(0, 0, 0.0, "description", "name"))).thenReturn(product);

        Gson gson = new Gson();
        String json = gson.toJson(product);
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(post("/api/product")
                        .content(json).contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testGetProductById() throws Exception {
        // Setup
        // Configure ProductService.findById(...).
        final Optional<Product> product = Optional.of(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.findById(0)).thenReturn(product);

        Gson gson = new Gson();
        String json = gson.toJson(product.get());
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testGetProductById_ProductServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testFindByAny() throws Exception {
        // Setup
        // Configure ProductService.findByAny(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductService.findByAny("searchTerm")).thenReturn(products);

        Gson gson = new Gson();
        String json = gson.toJson(products.get());
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/any/{searchTerm}", "searchTerm")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testFindByAny_ProductServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findByAny("searchTerm")).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/any/{searchTerm}", "searchTerm")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testFindByAny_ProductServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockProductService.findByAny("searchTerm")).thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/any/{searchTerm}", "searchTerm")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("[]");
    }

    @Test
    void testGetProductByName() throws Exception {
        // Setup
        // Configure ProductService.findByNameContainingIgnoreCase(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductService.findByNameContainingIgnoreCase("name")).thenReturn(products);
        
        Gson gson = new Gson();
        String json = gson.toJson(products.get());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/search/name/{name}", "name")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testGetProductByName_ProductServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findByNameContainingIgnoreCase("name")).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/search/name/{name}", "name")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testGetProductByName_ProductServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockProductService.findByNameContainingIgnoreCase("name"))
                .thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/search/name/{name}", "name")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("[]");
    }

    @Test
    void testFindByDescriptionContaining() throws Exception {
        // Setup
        // Configure ProductService.findByDescriptionContainingIgnoreCase(...).
        final Optional<List<Product>> products = Optional.of(
                Arrays.asList(new Product(0, 0, 0.0, "description", "name")));
        when(mockProductService.findByDescriptionContainingIgnoreCase("description")).thenReturn(products);
        
        Gson gson = new Gson();
        String json = gson.toJson(products.get());
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/description/{description}", "description")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testFindByDescriptionContaining_ProductServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findByDescriptionContainingIgnoreCase("description")).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/description/{description}", "description")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testFindByDescriptionContaining_ProductServiceReturnsNoItems() throws Exception {
        // Setup
        when(mockProductService.findByDescriptionContainingIgnoreCase("description"))
                .thenReturn(Optional.of(Collections.emptyList()));

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(
                        get("/api/product/search/description/{description}", "description")
                                .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("[]");
    }

    @Test
    void testUpsert() throws Exception {
        // Setup
        // Configure ProductService.save(...).
        final Product product = new Product(0, 0, 0.0, "description", "name");
        when(mockProductService.save(product)).thenReturn(product);
        
        Gson gson = new Gson();
        String json = gson.toJson(product);
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(put("/api/product")
                        .contentType(MediaType.APPLICATION_JSON).content(json)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();
        

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testPurchase() throws Exception {
        // Setup
        // Configure ProductService.findById(...).
        final Optional<Product> product = Optional.of(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.findById(0)).thenReturn(product);

        // Configure ProductService.saveAll(...).
        final List<Product> products = Arrays.asList(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.saveAll(Arrays.asList(new Product(0, 0, 0.0, "description", "name")),
                Arrays.asList(new ProductInfo(0, 0)))).thenReturn(products);

        Gson gson = new Gson();
        String json = gson.toJson(products);
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(patch("/api/product")
                        .content(json).contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
        verify(mockProductService).saveAll(Arrays.asList(new Product(0, 0, 0.0, "description", "name")),
                Arrays.asList(new ProductInfo(0, 0)));
    }

    @Test
    void testPurchase_ProductServiceFindByIdReturnsAbsent() throws Exception {
    	
        // Setup
    	final List<Product> products = Arrays.asList();
        when(mockProductService.findById(0)).thenReturn(Optional.empty());
        
        Gson gson = new Gson();
        String json = gson.toJson(products);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(patch("/api/product")
                        .content(json).contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("[]");
    }

    @Test
    void testDeleteProduct() throws Exception {
        // Setup
        // Configure ProductService.findById(...).
        final Optional<Product> product = Optional.of(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.findById(0)).thenReturn(product);

        Gson gson = new Gson();
        String json = gson.toJson(product.get());
        
        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(delete("/api/product/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
        verify(mockProductService).delete(0);
    }

    @Test
    void testDeleteProduct_ProductServiceFindByIdReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(delete("/api/product/{id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }
}
