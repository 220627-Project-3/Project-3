package com.revature.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import com.google.gson.Gson;
import com.revature.models.Product;
import com.revature.models.ProductImage;
import com.revature.repositories.ProductImageRepository;
import com.revature.services.ProductImageService;
import com.revature.services.ProductService;

@WebMvcTest(ProductImageController.class)
class ProductImageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductImageService mockProductImageService;
    @MockBean
    private ProductImageRepository mockProductImageRepository;
    @MockBean
    private ProductService mockProductService;

    @Test
    void testGetProductImageById() throws Exception {
        // Setup
        // Configure ProductImageService.findById(...).
        final Optional<ProductImage> productImage = Optional.of(
                new ProductImage(0, "content".getBytes(), new Product(0, 0, 0.0, "description", "name")));
        when(mockProductImageService.findById(0)).thenReturn(productImage);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/image/byId/{product_id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("content");
    }

    @Test
    void testGetProductImageById_ProductImageServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductImageService.findById(0)).thenReturn(Optional.empty());

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/image/byId/{product_id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
        assertThat(response.getContentAsString()).isEqualTo("");
    }

    @Test
    void testGetProductImageByProductId() throws Exception {
        // Setup
        // Configure ProductImageRepository.findByProduct_Id(...).
        final ProductImage productImage = new ProductImage(0, "content".getBytes(),
                new Product(0, 0, 0.0, "description", "name"));
        when(mockProductImageRepository.findByProduct_Id(0)).thenReturn(productImage);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/image/byProductId/{product_id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("content");
    }

    @Test
    void testGetProductImageByProductId_ProductImageRepositoryReturnsNull() throws Exception {
        // Setup
        when(mockProductImageRepository.findByProduct_Id(0)).thenReturn(null);

        // Run the test
        final MockHttpServletResponse response = mockMvc.perform(get("/api/product/image/byProductId/{product_id}", 0)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void testUpdateProductImageByProductId() throws Exception {
        // Setup
        // Configure ProductService.findById(...).
        final Optional<Product> product = Optional.of(new Product(0, 0, 0.0, "description", "name"));
        when(mockProductService.findById(0)).thenReturn(product);

        when(mockProductImageRepository.findAllByProduct_Id(0)).thenReturn(Arrays.asList());
        when(mockProductImageRepository.updateProductImage(eq(0), any(byte[].class))).thenReturn(0);
        
        Gson gson = new Gson();
        String json = gson.toJson(product.get());

        // Configure ProductImageService.save(...).
        final ProductImage productImage = new ProductImage(0, "content".getBytes(),
                new Product(0, 0, 0.0, "description", "name"));
        when(mockProductImageService.save(
                new ProductImage(0, "content".getBytes(), new Product(0, 0, 0.0, "description", "name"))))
                .thenReturn(productImage);

        // Run the test
        MockMultipartHttpServletRequestBuilder builder =
                MockMvcRequestBuilders.multipart("/api/product/image/{product_id}", 0);
        
        builder.with(new RequestPostProcessor() {
            @Override
            public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                request.setMethod("PUT");
                return request;
            }
        });
        final MockHttpServletResponse response = mockMvc.perform(builder
                        .file(new MockMultipartFile("productimage", "originalFilename", MediaType.APPLICATION_JSON_VALUE,
                                "content".getBytes()))
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json);
    }

    @Test
    void testUpdateProductImageByProductId_ProductServiceReturnsAbsent() throws Exception {
        // Setup
        when(mockProductService.findById(0)).thenReturn(Optional.empty());

        // Run the test
        
        MockMultipartHttpServletRequestBuilder builder =
                MockMvcRequestBuilders.multipart("/api/product/image/{product_id}", 0);
        
        builder.with(new RequestPostProcessor() {
            @Override
            public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                request.setMethod("PUT");
                return request;
            }
        });
        
        final MockHttpServletResponse response = mockMvc.perform(builder
                        .file(new MockMultipartFile("productimage", "originalFilename", MediaType.APPLICATION_JSON_VALUE,
                                "content".getBytes()))
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }
}
