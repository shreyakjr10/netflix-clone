
package com.netflix.clone.content.repository;

import com.netflix.clone.content.model.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContentRepository extends MongoRepository<Content, String> {
    List<Content> findByGenre(String genre);
    List<Content> findByType(String type);
    List<Content> findByReleaseYearGreaterThanEqual(int year);
}
