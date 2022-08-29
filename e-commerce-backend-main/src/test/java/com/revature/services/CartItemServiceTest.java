package com.revature.services;

import static org.mockito.ArgumentMatchers.eq;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.models.CartItem;
import com.revature.models.User;
import com.revature.repositories.CartRepository;


@ExtendWith(MockitoExtension.class)
public class CartItemServiceTest {

	@InjectMocks
	private CartItemService cis;
	
	@Mock
	private CartRepository cr;
	
	@Test
	void testAddProduct() {

		CartItem dummyItem = new CartItem();		
		cis.addProduct(dummyItem);
		Mockito.verify(cr,Mockito.times(1)).save(eq(dummyItem));

	}
	
	@Test
	void testFindByUser() {
		
		User dummyUser = new User();
		cis.findByUser(dummyUser);
		Mockito.verify(cr,Mockito.times(1)).findByUser(eq(dummyUser));
		
	}

	@Test
	void testDeleteByProduct_IdAndUserId() {

		cis.deleteByProduct_IdAndUserId(0, 0);
		Mockito.verify(cr,Mockito.times(1)).deleteByProduct_IdAndUserId(eq(0),eq(0));	
	}
	

}
