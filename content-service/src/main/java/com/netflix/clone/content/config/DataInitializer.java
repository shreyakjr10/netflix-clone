
package com.netflix.clone.content.config;

import com.netflix.clone.content.model.Content;
import com.netflix.clone.content.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ContentRepository contentRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (contentRepository.count() == 0) {
            // Sample movies
            Content movie1 = new Content(
                    "Inception",
                    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                    "MOVIE",
                    "Sci-Fi",
                    "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",
                    "https://example.com/videos/inception.mp4",
                    2010,
                    8.8f,
                    Arrays.asList("Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page")
            );

            Content movie2 = new Content(
                    "The Shawshank Redemption",
                    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                    "MOVIE",
                    "Drama",
                    "https://m.media-amazon.com/images/I/71715eBi1sL._AC_UF1000,1000_QL80_.jpg",
                    "https://example.com/videos/shawshank.mp4",
                    1994,
                    9.3f,
                    Arrays.asList("Tim Robbins", "Morgan Freeman", "Bob Gunton")
            );

            // Sample series
            Content series1 = new Content(
                    "Stranger Things",
                    "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
                    "SERIES",
                    "Sci-Fi",
                    "https://m.media-amazon.com/images/I/71d9reMDKjL._AC_UF1000,1000_QL80_.jpg",
                    "https://example.com/videos/stranger-things.mp4",
                    2016,
                    8.7f,
                    Arrays.asList("Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder")
            );

            Content series2 = new Content(
                    "Breaking Bad",
                    "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
                    "SERIES",
                    "Drama",
                    "https://m.media-amazon.com/images/I/61pBPzwgVbL._AC_UF1000,1000_QL80_.jpg",
                    "https://example.com/videos/breaking-bad.mp4",
                    2008,
                    9.5f,
                    Arrays.asList("Bryan Cranston", "Aaron Paul", "Anna Gunn")
            );

            // Save all content
            List<Content> contentList = Arrays.asList(movie1, movie2, series1, series2);
            contentRepository.saveAll(contentList);
        }
    }
}
