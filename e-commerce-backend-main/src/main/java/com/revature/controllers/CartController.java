package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.dtos.CartItemDto;

import com.revature.models.CartItem;
import com.revature.models.Product;
import com.revature.models.User;

import com.revature.services.CartItemService;
import com.revature.services.ProductService;
import com.revature.services.UserService;




@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class CartController {

    private final CartItemService cartItemService;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public CartController(CartItemService cartItemService, ProductService productService,
            UserService userService) {
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.userService = userService;
    }

    @Authorized
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable("userId") int userId){
        Optional<User> optionalUser = userService.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<CartItem> items =  cartItemService.findByUser(user);
            return ResponseEntity.ok().body(items);
        }
        
        return ResponseEntity.badRequest().build();
    }

    @Authorized
    @PostMapping("/{userId}")
    public ResponseEntity<Product> addCartItem(@RequestBody CartItemDto cartItemDTO, @PathVariable("userId") int userId){
        Optional<Product> optionalProduct = productService.findById(cartItemDTO.getProductId());
        Optional<User> optionalUser = userService.findById(userId);

        if(optionalProduct.isPresent() && optionalUser.isPresent()){
            Product product = optionalProduct.get();
            User user = optionalUser.get();

            cartItemService.addProduct(product,user);
            return ResponseEntity.accepted().body(product);
        }
        return ResponseEntity.badRequest().build();
    }
    
    @Authorized
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Boolean> deleteCartItem(@PathVariable("cartItemId") int cartItemId){

        if(cartItemService.deleteCartItem(cartItemId)){
            return ResponseEntity.accepted().body(true);
        }

        return ResponseEntity.badRequest().build();
    }

}


