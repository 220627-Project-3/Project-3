package com.revature;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;

import java.util.List;

import org.mockito.Mockito;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.revature.controllers.CartController;
import com.revature.models.CartItem;
import com.revature.services.CartItemService;
import com.revature.services.ProductService;
import com.revature.services.UserService;

@SpringBootTest
public class CartControllerTest {

private CartItemService cit;
private ProductService ps;
private UserService us;
private CartController cc;



public CartControllerTest(CartItemService cit, ProductService ps, UserService us, CartController cc) {
	super();
	this.cit = cit;
	this.ps = ps;
	this.us = us;
	this.cc = cc;
}




@SuppressWarnings("unlikely-arg-type")
public void testGetCartItems() {
	CartController mockController = Mockito.spy(new CartController(cit, ps, us));
	
	Mockito.verify(mockController).getCartItems(anyInt());
	
	OngoingStubbing<ResponseEntity<List<CartItem>>> ci = Mockito.when(Mockito.verify(mockController).getCartItems(anyInt())).thenReturn( new ResponseEntity <List<CartItem>> (HttpStatus.ACCEPTED));
	
	assertNotNull(ci);
	
	assertTrue(ci.equals(HttpStatus.ACCEPTED));
	
	
}
	
}
