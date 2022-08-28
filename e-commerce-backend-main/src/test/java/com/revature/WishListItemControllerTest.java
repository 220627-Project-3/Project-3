package com.revature;


import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.controllers.WishlistItemController;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistItem;
import com.revature.repositories.WishlistItemRepository;
import com.revature.services.ProductService;
import com.revature.services.UserService;
import com.revature.services.WishlistItemService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(WishlistItemController.class)
public class WishListItemControllerTest{
    @Autowired
    @MockBean
     WishlistItemController WishlistItemController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    @MockBean
    WishlistItemRepository wDAO;

    @Autowired
    @MockBean
    WishlistItemService wService;

    @Autowired
    @MockBean
    UserService uService;
    
    @Autowired
    @MockBean
    ProductService pService;

    @Test
    public void testDeleteWishListByID(){
     
      ResponseEntity<Boolean> re = ResponseEntity.ok().body(true);

  when(WishlistItemController.deleteWishlistitem(1)).thenReturn(re);
  assertTrue(re.getStatusCode().is2xxSuccessful());
       
    }

    @Test 
    public void testGetWishlistItemsByUser() throws Exception{
      
      User user1 = new User();
      user1.setFirstName("Bob");
      user1.setLastName("Bobby");
      user1.setPassword("password");
      user1.setId(0);

      WishlistItem item = new WishlistItem();
      item.setUser(user1);

      List<WishlistItem> list = new ArrayList<WishlistItem>();
      list.add(item);

      Optional<User> uOp = Optional.of(user1);

      when(uService.findById(0)).thenReturn(uOp);
      when(wService.findByUser(user1)).thenReturn(list);
      
      final MockHttpServletResponse response = mockMvc.perform(
        MockMvcRequestBuilders.get("/api/wishlist/{userId}", 0).accept(MediaType.APPLICATION_JSON)
        ).andReturn().getResponse();

      assertTrue(response.getStatus() == 200);

      


    }
    
    @Test
    public void testAddWishlistItem() throws Exception {
    	
    	User user1 = new User();
        user1.setFirstName("Bob");
        user1.setLastName("Bobby");
        user1.setPassword("password");
        user1.setId(0);
    	
        Product prod = new Product();
        prod.setId(0);
        prod.setDescription("desc");
        prod.setName("thing");
        prod.setPrice(11.11);
        prod.setQuantity(1);
        
        WishlistItem wItem = new WishlistItem();
        wItem.setId(0);
        wItem.setProduct(prod);
        wItem.setUser(user1);
        
        Optional<User> uOp = Optional.of(user1);
        Optional<Product> pOp = Optional.of(prod);
        
        when(uService.findById(0)).thenReturn(uOp);
        when(pService.findById(0)).thenReturn(pOp);
        when(wService.addProduct(prod, user1)).thenReturn(true);
        
        ObjectMapper objectMapper = new ObjectMapper();
        String productAsJSON = objectMapper.writeValueAsString(prod);
        
        final MockHttpServletResponse result = mockMvc.perform(
        		post("/api/wishlist/{userId}", 0)
                .contentType(MediaType.APPLICATION_JSON)
                .content(productAsJSON)
                .characterEncoding("utf-8"))
        		.andExpect(status().isOk())
                .andReturn()
                .getResponse();
                
              assertTrue(result.getStatus() == 200); 
    }
    
}