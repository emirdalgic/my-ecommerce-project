package com.emirdalgic.ecommerce.exception;

import lombok.Getter;

@Getter
public enum MessageType {
    NO_RECORD_EXIST("no record found"),
    GENERAL_EXCEPTION("an error occured");

    private final String message;
    MessageType(String message){
        this.message = message;
    }
}
