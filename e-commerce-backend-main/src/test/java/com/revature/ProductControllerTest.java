package com.revature;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import com.revature.controllers.ProductController;
import com.revature.models.Product;
import com.revature.services.ProductService;

@SpringBootTest
public class ProductControllerTest {
	
	@Autowired
	@MockBean
	static private ProductController productController;
	
	@MockBean
	ProductService productService;
	
	@Test
	public void testGetProductByDescription() {
		
		Product mockProduct = Mockito.spy(Product.class);
		
		List<Product> mockProductList = new ArrayList<Product>();
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		
		ResponseEntity<List<Product>> r = ResponseEntity.ok(mockProductList);
		
		when(productController.findByDescriptionContaining("testString")).thenReturn(r);
		
		assertEquals(mockProductList, productController.findByDescriptionContaining("testString").getBody());
				
	}

	@Test
	public void testGetProductByName() {
		
		Product mockProduct = Mockito.spy(Product.class);
		
		List<Product> mockProductList = new ArrayList<Product>();
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		
		ResponseEntity<List<Product>> r = ResponseEntity.ok(mockProductList);
		
		when(productController.getProductByName("testString")).thenReturn(r);
		
		assertEquals(mockProductList, productController.getProductByName("testString").getBody());
				
	}
	
	@Test
	public void testGetProductById() {
		
		Product mockProduct = Mockito.spy(Product.class);
		
		Product p = new Product();
		
		ResponseEntity<Product> r = ResponseEntity.ok(mockProduct);
		
		when(productController.getProductById(anyInt())).thenReturn(r);
		
		assertEquals(mockProduct, productController.getProductById(anyInt()).getBody());
				
	}
	
	@Test
	public void testGetProductByAny() {
		
		Product mockProduct = Mockito.spy(Product.class);
		
		List<Product> mockProductList = new ArrayList<Product>();
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		
		ResponseEntity<List<Product>> r = ResponseEntity.ok(mockProductList);
		
		when(productController.findByAny("testString")).thenReturn(r);
		
		assertEquals(mockProductList, productController.findByAny("testString").getBody());
				
	}
	
	@Test
	public void testGetInventory() {
		
		Product mockProduct = Mockito.spy(Product.class);
		
		List<Product> mockProductList = new ArrayList<Product>();
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		
		ResponseEntity<List<Product>> r = ResponseEntity.ok(mockProductList);
		
		when(productController.getInventory()).thenReturn(r);
		
		assertEquals(mockProductList, productController.getInventory().getBody());
				
	}
}

