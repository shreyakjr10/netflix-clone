
package com.netflix.clone.subscription.service;

import com.netflix.clone.subscription.model.Plan;
import com.netflix.clone.subscription.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {
    
    @Autowired
    private PlanRepository planRepository;
    
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }
    
    public Optional<Plan> getPlanById(String id) {
        return planRepository.findById(id);
    }
    
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }
}
