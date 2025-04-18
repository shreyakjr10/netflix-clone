
package com.netflix.clone.content.controller;

import com.netflix.clone.content.model.Content;
import com.netflix.clone.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    
    @Autowired
    private ContentService contentService;
    
    @GetMapping
    public ResponseEntity<List<Content>> getAllContent() {
        return ResponseEntity.ok(contentService.getAllContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable String id) {
        Optional<Content> content = contentService.getContentById(id);
        return content.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Content>> getContentByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(contentService.getContentByGenre(genre));
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Content>> getContentByType(@PathVariable String type) {
        return ResponseEntity.ok(contentService.getContentByType(type));
    }
    
    @PostMapping
    public ResponseEntity<Content> addContent(@RequestBody Content content) {
        return ResponseEntity.ok(contentService.addContent(content));
    }
}
