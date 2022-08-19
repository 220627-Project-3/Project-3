package com.revature.exceptions;

public class CartItemDoesNotExistException extends IllegalArgumentException {
    public CartItemDoesNotExistException(String msg) {
        super(msg);
    }
}