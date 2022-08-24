package com.revature;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.revature.controllers.WishlistItemController;
import com.revature.dtos.WishlistItemRequest;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistItem;
import com.revature.repositories.WishlistItemRepository;
import com.revature.services.UserService;
import com.revature.services.WishlistItemService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(WishlistItemController.class)
public class WishListItemControllerTest{
    @Autowired
    @MockBean
    static private WishlistItemController WishlistItemController;

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
}