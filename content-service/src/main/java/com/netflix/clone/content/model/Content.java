
package com.netflix.clone.content.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "content")
public class Content {
    
    @Id
    private String id;
    private String title;
    private String description;
    private String type; // MOVIE, SERIES
    private String genre;
    private String imageUrl;
    private String videoUrl;
    private int releaseYear;
    private float rating;
    private List<String> cast;
    
    public Content() {
    }
    
    public Content(String title, String description, String type, String genre, 
                  String imageUrl, String videoUrl, int releaseYear, float rating, List<String> cast) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.genre = genre;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.cast = cast;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }
}
