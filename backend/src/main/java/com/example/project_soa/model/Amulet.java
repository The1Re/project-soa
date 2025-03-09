package com.example.project_soa.model;

import jakarta.persistence.*;

import java.io.Serializable;

public class Amulet implements Serializable {

    private Integer id; 

    private String name;
    private String templeName;
    private int price;
    private String type;

    public Amulet() {}

    public Amulet(String name, String templeName, int price, String type) {
        this.name = name;
        this.templeName = templeName;
        this.price = price;
        this.type = type;
    }

    public Integer getId() {  
        return this.id;
    }

    public void setId(Integer id) { 
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTempleName() {
        return this.templeName;
    }

    public void setTempleName(String templeName) {
        this.templeName = templeName;
    }

    public int getPrice() {
        return this.price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
