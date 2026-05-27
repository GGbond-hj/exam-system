package com.exam.repository;

import com.exam.entity.AnswerDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerDetailRepository extends JpaRepository<AnswerDetail, Integer> {
    List<AnswerDetail> findByRecordId(Integer recordId);
    List<AnswerDetail> findByRecordIdAndQuestionId(Integer recordId, Integer questionId);
}
