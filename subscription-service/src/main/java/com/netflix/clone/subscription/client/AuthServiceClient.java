
package com.netflix.clone.subscription.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-service")
public interface AuthServiceClient {
    
    @PutMapping("/api/auth/subscription/{userId}")
    void updateSubscriptionStatus(@PathVariable("userId") String userId, 
                                 @RequestParam("active") boolean active);
}
