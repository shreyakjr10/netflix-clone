
package com.netflix.clone.content.service;

import com.netflix.clone.content.model.Content;
import com.netflix.clone.content.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {
    
    @Autowired
    private ContentRepository contentRepository;
    
    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }
    
    public Optional<Content> getContentById(String id) {
        return contentRepository.findById(id);
    }
    
    public List<Content> getContentByGenre(String genre) {
        return contentRepository.findByGenre(genre);
    }
    
    public List<Content> getContentByType(String type) {
        return contentRepository.findByType(type);
    }
    
    public Content addContent(Content content) {
        return contentRepository.save(content);
    }
}
