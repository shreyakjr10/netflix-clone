
package com.netflix.clone.subscription.config;

import com.netflix.clone.subscription.model.Plan;
import com.netflix.clone.subscription.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PlanRepository planRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (planRepository.count() == 0) {
            // Create subscription plans
            Plan basicPlan = new Plan(
                    "Basic",
                    8.99,
                    "Good video quality in SD (480p). Watch on any phone, tablet, computer or TV.",
                    "SD",
                    1
            );

            Plan standardPlan = new Plan(
                    "Standard",
                    13.99,
                    "Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV.",
                    "HD",
                    2
            );

            Plan premiumPlan = new Plan(
                    "Premium",
                    17.99,
                    "Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.",
                    "Ultra HD",
                    4
            );

            // Save all plans
            List<Plan> plans = Arrays.asList(basicPlan, standardPlan, premiumPlan);
            planRepository.saveAll(plans);
        }
    }
}
