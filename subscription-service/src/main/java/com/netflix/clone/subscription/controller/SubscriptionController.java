
package com.netflix.clone.subscription.controller;

import com.netflix.clone.subscription.model.Subscription;
import com.netflix.clone.subscription.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    
    @Autowired
    private SubscriptionService subscriptionService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Subscription>> getSubscriptionsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionsByUserId(userId));
    }
    
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<Subscription> getActiveSubscription(@PathVariable String userId) {
        Optional<Subscription> subscription = subscriptionService.getActiveSubscription(userId);
        return subscription.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Subscription> createSubscription(@RequestBody SubscriptionRequest request) {
        Subscription subscription = subscriptionService.createSubscription(
                request.getUserId(),
                request.getPlanId(),
                request.getPaymentMethod()
        );
        return ResponseEntity.ok(subscription);
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Subscription> cancelSubscription(@PathVariable String id) {
        try {
            Subscription subscription = subscriptionService.cancelSubscription(id);
            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Request object
    public static class SubscriptionRequest {
        private String userId;
        private String planId;
        private String paymentMethod;
        
        public String getUserId() {
            return userId;
        }
        
        public void setUserId(String userId) {
            this.userId = userId;
        }
        
        public String getPlanId() {
            return planId;
        }
        
        public void setPlanId(String planId) {
            this.planId = planId;
        }
        
        public String getPaymentMethod() {
            return paymentMethod;
        }
        
        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
    }
}
