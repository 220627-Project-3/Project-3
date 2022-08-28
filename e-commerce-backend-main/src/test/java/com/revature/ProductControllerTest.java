package com.revature;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.revature.controllers.ProductController;
import com.revature.controllers.ProductImageController;
import com.revature.models.Product;

@SpringBootTest
public class ProductControllerTest {

	@Autowired
	@MockBean
	static private ProductController productController;

	@Autowired
	@MockBean
	static private ProductImageController productImageController;

	@Test
	public void testGetInventory() {
		Product mockProduct = Mockito.spy(Product.class);

		List<Product> mockProductList = new ArrayList<Product>();
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);
		mockProductList.add(mockProduct);

		ResponseEntity<List<Product>> re = ResponseEntity.ok(mockProductList);
		
		when(productController.getInventory()).thenReturn(re);
		
		assertEquals(mockProductList, productController.getInventory().getBody());
	}
	
	@Test
	public void testCreateProduct() {
		Product sampleProduct = Mockito.mock(Product.class);

		ResponseEntity<Product> re = ResponseEntity.ok(sampleProduct);

		when(productController.createProduct(sampleProduct)).thenReturn(re);

		assertTrue(re.getStatusCode().is2xxSuccessful());
	}
	
	@Test
	public void testGetProductById() {
		Product mockProduct = Mockito.mock(Product.class);
		int mockId = 1;
		ResponseEntity<Product> re = ResponseEntity.ok(mockProduct);
		
		when(productController.getProductById(mockId)).thenReturn(re);
		assertEquals(mockProduct, productController.getProductById(mockId).getBody());
	}
	
	
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
	public void testUpdateProduct() {
		Product sampleProduct = Mockito.mock(Product.class);

		ResponseEntity<Product> re = ResponseEntity.ok(sampleProduct);

		when(productController.upsert(sampleProduct)).thenReturn(re);

		assertTrue(re.getStatusCode().is2xxSuccessful());
	}

	@Test
	public void testUpdateProductImage() {
		Product sampleProduct = Mockito.mock(Product.class);

		ResponseEntity<Product> re = ResponseEntity.ok(sampleProduct);

		MultipartFile mf = Mockito.mock(MultipartFile.class);

		when(productImageController.updateProductImageByProductId(1, mf)).thenReturn(re);

		assertTrue(re.getStatusCode().is2xxSuccessful());
	}
	

}
