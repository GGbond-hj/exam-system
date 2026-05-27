package com.exam.repository;

import com.exam.entity.PaperQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperQuestionRepository extends JpaRepository<PaperQuestion, Integer> {
    List<PaperQuestion> findByPaperId(Integer paperId);
    void deleteByPaperId(Integer paperId);
}
