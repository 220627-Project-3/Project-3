package com.revature;

import static org.junit.jupiter.api.Assertions.assertFalse;
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
import org.springframework.http.StreamingHttpOutputMessage.Body;

import com.revature.controllers.WishlistItemController;
import com.revature.models.Product;
import com.revature.models.WishlistItem;
import com.revature.repositories.WishlistItemRepository;
import com.revature.services.WishlistItemService;

@SpringBootTest
public class WishListItemControllerTest{
    @Autowired
    @MockBean
    static private WishlistItemController WishlistItemController;

    @Autowired
    @MockBean
    WishlistItemRepository wDAO;
    WishlistItemService wService;
    
    @Test
    public void testDeleteWishListByID(){
     
      ResponseEntity<Boolean> re = ResponseEntity.ok().body(true);

  when(WishlistItemController.deleteWishlistitem(1)).thenReturn(re);
  assertTrue(re.getStatusCode().is2xxSuccessful());
       
    }
}