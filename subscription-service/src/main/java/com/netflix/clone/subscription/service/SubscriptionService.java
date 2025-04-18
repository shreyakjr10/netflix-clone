
package com.netflix.clone.subscription.service;

import com.netflix.clone.subscription.client.AuthServiceClient;
import com.netflix.clone.subscription.model.Subscription;
import com.netflix.clone.subscription.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    @Autowired
    private AuthServiceClient authServiceClient;
    
    public List<Subscription> getSubscriptionsByUserId(String userId) {
        return subscriptionRepository.findByUserId(userId);
    }
    
    public Optional<Subscription> getActiveSubscription(String userId) {
        return subscriptionRepository.findByUserIdAndActive(userId, true);
    }
    
    public Subscription createSubscription(String userId, String planId, String paymentMethod) {
        // Deactivate any existing active subscription
        Optional<Subscription> existingSubscription = getActiveSubscription(userId);
        existingSubscription.ifPresent(sub -> {
            sub.setActive(false);
            subscriptionRepository.save(sub);
        });
        
        // Create new subscription
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusMonths(1); // 1 month subscription
        
        Subscription subscription = new Subscription(
                userId,
                planId,
                now,
                endDate,
                true,
                paymentMethod
        );
        
        Subscription savedSubscription = subscriptionRepository.save(subscription);
        
        // Update user subscription status
        authServiceClient.updateSubscriptionStatus(userId, true);
        
        return savedSubscription;
    }
    
    public Subscription cancelSubscription(String subscriptionId) {
        Optional<Subscription> optionalSubscription = subscriptionRepository.findById(subscriptionId);
        
        if (optionalSubscription.isPresent()) {
            Subscription subscription = optionalSubscription.get();
            subscription.setActive(false);
            subscription.setEndDate(LocalDateTime.now());
            
            Subscription savedSubscription = subscriptionRepository.save(subscription);
            
            // Update user subscription status
            authServiceClient.updateSubscriptionStatus(subscription.getUserId(), false);
            
            return savedSubscription;
        }
        
        throw new RuntimeException("Subscription not found");
    }
}
