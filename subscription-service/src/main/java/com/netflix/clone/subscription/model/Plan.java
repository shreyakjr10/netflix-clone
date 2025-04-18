
package com.netflix.clone.subscription.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plans")
public class Plan {
    
    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private String quality;
    private int deviceCount;
    
    public Plan() {
    }
    
    public Plan(String name, double price, String description, String quality, int deviceCount) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quality = quality;
        this.deviceCount = deviceCount;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public int getDeviceCount() {
        return deviceCount;
    }

    public void setDeviceCount(int deviceCount) {
        this.deviceCount = deviceCount;
    }
}
