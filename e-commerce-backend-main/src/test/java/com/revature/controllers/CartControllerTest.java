package com.revature.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.google.gson.Gson;
import com.revature.controllers.CartController;
import com.revature.dtos.Responses;
import com.revature.models.CartItem;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.repositories.CartRepository;
import com.revature.services.CartItemService;
import com.revature.services.ProductService;
import com.revature.services.UserService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CartController.class)
public class CartControllerTest {

	@Autowired
	@MockBean
	static private CartController CartController;
	
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    @MockBean
	private CartRepository cr;
    
    @Autowired
    @MockBean
	private CartItemService cit;
    
    @Autowired
    @MockBean
	private ProductService ps;
    
    @Autowired
    @MockBean
	private UserService us;
    
	@Test
	public void testGetCartItems() throws Exception {
		
		User user1 = new User();
		user1.setFirstName("Bob");
		user1.setEmail("Bob@email.com");
		user1.setLastName("Bobby");
		user1.setPassword("password");
		user1.setId(0);
		
		Product product = new Product(0,0,0.0,"description","name");
		
		CartItem item = new CartItem();
		
		item.setId(0);
		item.setProduct(product);
		item.setQuantity(0);
		item.setUser(user1);
		
		List<CartItem> cart = new ArrayList<CartItem>();
		cart.add(item);
		
		when(CartController.getCartItems(0)).thenReturn(ResponseEntity.ok().body(cart));

		Gson gson = new Gson();
		String json = gson.toJson(cart);
				
		final MockHttpServletResponse response = mockMvc.perform(
				MockMvcRequestBuilders.get("/api/cart/{userId}",0)
				.accept(MediaType.APPLICATION_JSON))
				.andReturn().getResponse();
		
        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(json.toString());
	}
	
	@Test
	void testGetCartItems_CartItemServiceReturnsNoItems() throws Exception {
		
		User user1 = new User();
		user1.setFirstName("Bob");
		user1.setLastName("Bobby");
		user1.setPassword("password");
		user1.setId(0);
		when(cit.findByUser(user1)).thenReturn(Collections.emptyList());
		
		final MockHttpServletResponse response = mockMvc.perform(get("/api/cart/{userId}",user1.getId())
				.accept(MediaType.APPLICATION_JSON))
				.andReturn().getResponse();
		
        // Verify the results
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo("");		
		
	}

	
	@Test
	public void testEmptyCart() {
		
		ResponseEntity<Boolean> re = ResponseEntity.ok().body(true);

		doReturn(re).when(CartController).emptyCart(1);

	}

}
