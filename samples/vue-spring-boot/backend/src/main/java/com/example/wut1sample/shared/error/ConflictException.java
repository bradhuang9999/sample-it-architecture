package com.example.wut1sample.shared.error;

public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
