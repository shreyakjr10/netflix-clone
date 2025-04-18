
package com.netflix.clone.subscription.repository;

import com.netflix.clone.subscription.model.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlanRepository extends MongoRepository<Plan, String> {
}
