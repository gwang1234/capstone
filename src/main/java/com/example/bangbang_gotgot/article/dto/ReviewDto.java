package com.example.bangbang_gotgot.article.dto;

import com.example.bangbang_gotgot.article.entity.Review;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ReviewDto{
    private String content;
    private String title;
    private Long articleId;
//    private Long id;
//    private String content;
//    private LocalDateTime createdAt;
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//    public static ReviewDto from(Review review) {
//
//        ReviewDto dto = new ReviewDto();
//        dto.id = review.getId();
//        dto.content = review.getContent();
//        dto.createdAt = review.getCreatedAt();
//        return dto;
//    }
}
