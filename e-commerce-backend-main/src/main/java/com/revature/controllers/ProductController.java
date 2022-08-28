package com.revature.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.repositories.CartRepository;
import com.revature.services.ProductService;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

	@Autowired
	private final ProductService productService;
	@Autowired
	private final CartRepository cartRepository;

	public ProductController(ProductService productService, CartRepository cartRepository) {
		this.productService = productService;
		this.cartRepository = cartRepository;

	}

	@Authorized
	@GetMapping
	public ResponseEntity<List<Product>> getInventory() {
		return ResponseEntity.ok(productService.findAll());
	}

	@Authorized
	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		try {

			Product prodResult = productService.save(product);
			return ResponseEntity.ok().body(prodResult);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return ResponseEntity.status(500).body(null);
	}

	@Authorized
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") int id) {
		Optional<Product> optional = productService.findById(id);

		if (!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(optional.get());
	}

	@Authorized
	@GetMapping("/search/any/{searchTerm}")
	public ResponseEntity<List<Product>> findByAny(@PathVariable String searchTerm) {

		Optional<List<Product>> productOptional = productService.findByAny(searchTerm);

		if (!productOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(productOptional.get());

	}

	@Authorized
	@GetMapping("/search/name/{name}")
	public ResponseEntity<List<Product>> getProductByName(@PathVariable("name") String name) {
		Optional<List<Product>> optional = productService.findByNameContainingIgnoreCase(name);

		if (!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(optional.get());
	}

	@Authorized
	@GetMapping("/search/description/{description}")
	public ResponseEntity<List<Product>> findByDescriptionContaining(@PathVariable String description) {

		Optional<List<Product>> productOptional = productService.findByDescriptionContainingIgnoreCase(description);

		if (!productOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(productOptional.get());

	}

	@Authorized
	@PutMapping
	public ResponseEntity<Product> upsert(@RequestBody Product product) {
		return ResponseEntity.ok(productService.save(product));
	}

	@Authorized
	@PatchMapping
	public ResponseEntity<List<Product>> purchase(@RequestBody List<ProductInfo> metadata, HttpSession session) {
		List<Product> productList = new ArrayList<Product>();
		User sessionData = (User) session.getAttribute("user");

		for (int i = 0; i < metadata.size(); i++) {
			Optional<Product> optional = productService.findById(metadata.get(i).getId());

			if (!optional.isPresent()) {
				return ResponseEntity.notFound().build();
			}

			Product product = optional.get();

			if (product.getQuantity() - metadata.get(i).getQuantity() < 0) {
				return ResponseEntity.badRequest().build();
			}

			product.setQuantity(product.getQuantity() - metadata.get(i).getQuantity());
			productList.add(product);
		}

		productService.saveAll(productList, metadata);
		try {
			cartRepository.deleteCartItems(sessionData.getId());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		

		return ResponseEntity.ok(productList);
	}

	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable("id") int id) {
		Optional<Product> optional = productService.findById(id);

		if (!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		productService.delete(id);

		return ResponseEntity.ok(optional.get());
	}
}
