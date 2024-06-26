package com.example.bangbang_gotgot.article.service;

import com.example.bangbang_gotgot.article.dto.ReviewDto;
import com.example.bangbang_gotgot.article.entity.Article;
import com.example.bangbang_gotgot.article.entity.Review;
import com.example.bangbang_gotgot.article.repository.ArticleRepository;
import com.example.bangbang_gotgot.article.repository.ReviewRepository;

import com.example.bangbang_gotgot.member.entity.User;
import com.example.bangbang_gotgot.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@RequiredArgsConstructor
//@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;


//    @Transactional
//    public ReviewDto createReview(ReviewDto reviewDto, Long articleId) {
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));
//        Review review = new Review(reviewDto.getContent(), article);
//        Review savedReview = reviewRepository.save(review);
//        return ReviewDto.from(savedReview);
//    }
//
    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid review ID"));
        reviewRepository.delete(review);
    }
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> findReviewsByArticleId(Long articleId) {
        return reviewRepository.findByArticleIdOrderByIdDesc(articleId);
    }

}
