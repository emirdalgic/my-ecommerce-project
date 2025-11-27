package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IProductController;
import com.emirdalgic.ecommerce.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/Products")
public class ProductController implements IProductController {
    @Autowired
    private IProductService productService;
}
