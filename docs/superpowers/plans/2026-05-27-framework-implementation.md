# Exam System Framework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 补全数据层（Entity + Repository）、代码目录结构、API 规范文档，让组员可以并行开发学生和教师模块。

**Architecture:** 单体 Spring Boot + Vue 3 项目，按 `student/`、`teacher/` 子包拆分 Controller/Service/DTO。共享层由框架负责人维护。

**Tech Stack:** Spring Boot 3.2.5, JPA, SQL Server, jjwt 0.12.x, Vue 3, Vite, Axios

---

### Task 1: 创建 Question 实体

**Files:**
- Create: `backend/src/main/java/com/exam/entity/Question.java`

- [ ] **Step 1: 创建 Question.java**

```java
package com.exam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String options;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String answer;

    @Column(name = "course_id")
    private Integer courseId;

    public Question() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }
    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/entity/Question.java && git commit -m "feat: add Question entity"
```

---

### Task 2: 创建 Paper 实体

**Files:**
- Create: `backend/src/main/java/com/exam/entity/Paper.java`

- [ ] **Step 1: 创建 Paper.java**

```java
package com.exam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "papers")
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100)
    private String title;

    private Integer duration;

    @Column(name = "created_by")
    private Integer createdBy;

    public Paper() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Integer getCreatedBy() { return createdBy; }
    public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/entity/Paper.java && git commit -m "feat: add Paper entity"
```

---

### Task 3: 创建 PaperQuestion 实体

**Files:**
- Create: `backend/src/main/java/com/exam/entity/PaperQuestion.java`

- [ ] **Step 1: 创建 PaperQuestion.java**

```java
package com.exam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "paper_questions")
public class PaperQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "paper_id")
    private Integer paperId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(precision = 5, scale = 1)
    private Double score;

    public PaperQuestion() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getPaperId() { return paperId; }
    public void setPaperId(Integer paperId) { this.paperId = paperId; }
    public Integer getQuestionId() { return questionId; }
    public void setQuestionId(Integer questionId) { this.questionId = questionId; }
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/entity/PaperQuestion.java && git commit -m "feat: add PaperQuestion entity"
```

---

### Task 4: 创建 ExamRecord 实体

**Files:**
- Create: `backend/src/main/java/com/exam/entity/ExamRecord.java`

- [ ] **Step 1: 创建 ExamRecord.java**

```java
package com.exam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_records")
public class ExamRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "paper_id")
    private Integer paperId;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "submit_time")
    private LocalDateTime submitTime;

    @Column(name = "total_score", precision = 5, scale = 1)
    private Double totalScore;

    public ExamRecord() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }
    public Integer getPaperId() { return paperId; }
    public void setPaperId(Integer paperId) { this.paperId = paperId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getSubmitTime() { return submitTime; }
    public void setSubmitTime(LocalDateTime submitTime) { this.submitTime = submitTime; }
    public Double getTotalScore() { return totalScore; }
    public void setTotalScore(Double totalScore) { this.totalScore = totalScore; }
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/entity/ExamRecord.java && git commit -m "feat: add ExamRecord entity"
```

---

### Task 5: 创建 AnswerDetail 实体

**Files:**
- Create: `backend/src/main/java/com/exam/entity/AnswerDetail.java`

- [ ] **Step 1: 创建 AnswerDetail.java**

```java
package com.exam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "answer_details")
public class AnswerDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "record_id")
    private Integer recordId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "student_answer", columnDefinition = "NVARCHAR(MAX)")
    private String studentAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "score_got", precision = 5, scale = 1)
    private Double scoreGot;

    public AnswerDetail() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getRecordId() { return recordId; }
    public void setRecordId(Integer recordId) { this.recordId = recordId; }
    public Integer getQuestionId() { return questionId; }
    public void setQuestionId(Integer questionId) { this.questionId = questionId; }
    public String getStudentAnswer() { return studentAnswer; }
    public void setStudentAnswer(String studentAnswer) { this.studentAnswer = studentAnswer; }
    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
    public Double getScoreGot() { return scoreGot; }
    public void setScoreGot(Double scoreGot) { this.scoreGot = scoreGot; }
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/entity/AnswerDetail.java && git commit -m "feat: add AnswerDetail entity"
```

---

### Task 6: 创建 5 个 Repository 接口

**Files:**
- Create: `backend/src/main/java/com/exam/repository/QuestionRepository.java`
- Create: `backend/src/main/java/com/exam/repository/PaperRepository.java`
- Create: `backend/src/main/java/com/exam/repository/PaperQuestionRepository.java`
- Create: `backend/src/main/java/com/exam/repository/ExamRecordRepository.java`
- Create: `backend/src/main/java/com/exam/repository/AnswerDetailRepository.java`

- [ ] **Step 1: 创建 QuestionRepository.java**

```java
package com.exam.repository;

import com.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
```

- [ ] **Step 2: 创建 PaperRepository.java**

```java
package com.exam.repository;

import com.exam.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Integer> {
    List<Paper> findByCreatedBy(Integer createdBy);
}
```

- [ ] **Step 3: 创建 PaperQuestionRepository.java**

```java
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
```

- [ ] **Step 4: 创建 ExamRecordRepository.java**

```java
package com.exam.repository;

import com.exam.entity.ExamRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRecordRepository extends JpaRepository<ExamRecord, Integer> {
    List<ExamRecord> findByStudentId(Integer studentId);
    List<ExamRecord> findByPaperId(Integer paperId);
    Optional<ExamRecord> findByStudentIdAndPaperId(Integer studentId, Integer paperId);
}
```

- [ ] **Step 5: 创建 AnswerDetailRepository.java**

```java
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
```

- [ ] **Step 6: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/repository/QuestionRepository.java backend/src/main/java/com/exam/repository/PaperRepository.java backend/src/main/java/com/exam/repository/PaperQuestionRepository.java backend/src/main/java/com/exam/repository/ExamRecordRepository.java backend/src/main/java/com/exam/repository/AnswerDetailRepository.java && git commit -m "feat: add repository interfaces for all entities"
```

---

### Task 7: 创建后端模块包结构

**Files:**
- Create 目录：
  - `backend/src/main/java/com/exam/controller/student/`
  - `backend/src/main/java/com/exam/controller/teacher/`
  - `backend/src/main/java/com/exam/controller/admin/`
  - `backend/src/main/java/com/exam/service/student/`
  - `backend/src/main/java/com/exam/service/teacher/`
  - `backend/src/main/java/com/exam/dto/student/`
  - `backend/src/main/java/com/exam/dto/teacher/`

- [ ] **Step 1: 创建目录，每个目录放置 `.gitkeep`**

```bash
cd "D:\github\exam-system"
mkdir -p backend/src/main/java/com/exam/controller/student
mkdir -p backend/src/main/java/com/exam/controller/teacher
mkdir -p backend/src/main/java/com/exam/controller/admin
mkdir -p backend/src/main/java/com/exam/service/student
mkdir -p backend/src/main/java/com/exam/service/teacher
mkdir -p backend/src/main/java/com/exam/dto/student
mkdir -p backend/src/main/java/com/exam/dto/teacher
```

每个目录下放置 `.gitkeep` 占位。

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add backend/src/main/java/com/exam/controller/student/ backend/src/main/java/com/exam/controller/teacher/ backend/src/main/java/com/exam/controller/admin/ backend/src/main/java/com/exam/service/student/ backend/src/main/java/com/exam/service/teacher/ backend/src/main/java/com/exam/dto/student/ backend/src/main/java/com/exam/dto/teacher/ && git commit -m "feat: create module package structure for student/teacher/admin"
```

---

### Task 8: 前端模块目录和 API 存根

**Files:**
- Create: `frontend/src/views/student/.gitkeep`
- Create: `frontend/src/views/teacher/.gitkeep`
- Create: `frontend/src/views/admin/.gitkeep`
- Create: `frontend/src/api/student.js`
- Create: `frontend/src/api/teacher.js`
- Modify: `frontend/src/router/index.js` (更新 views 路径)

- [ ] **Step 1: 创建前端模块目录**

```bash
cd "D:\github\exam-system"
mkdir -p frontend/src/views/student
mkdir -p frontend/src/views/teacher
mkdir -p frontend/src/views/admin
mkdir -p frontend/src/api
```

- [ ] **Step 2: 创建 student API 存根**

```javascript
// frontend/src/api/student.js
import request from '../utils/request'

// 获取可参加的考试列表
export function getPapers() {
  return request.get('/api/student/papers')
}

// 获取试卷详情
export function getPaperDetail(paperId) {
  return request.get(`/api/student/papers/${paperId}`)
}

// 开始考试
export function startExam(paperId) {
  return request.post('/api/student/exam-records', { paperId })
}

// 提交答案
export function submitExam(recordId, answers) {
  return request.post(`/api/student/exam-records/${recordId}/submit`, { answers })
}

// 获取考试记录列表
export function getExamRecords() {
  return request.get('/api/student/exam-records')
}

// 获取考试记录详情
export function getExamRecordDetail(recordId) {
  return request.get(`/api/student/exam-records/${recordId}`)
}
```

- [ ] **Step 3: 创建 teacher API 存根**

```javascript
// frontend/src/api/teacher.js
import request from '../utils/request'

// 创建题目
export function createQuestion(data) {
  return request.post('/api/teacher/questions', data)
}

// 分页查题库
export function getQuestions(params) {
  return request.get('/api/teacher/questions', { params })
}

// 修改题目
export function updateQuestion(id, data) {
  return request.put(`/api/teacher/questions/${id}`, data)
}

// 删除题目
export function deleteQuestion(id) {
  return request.delete(`/api/teacher/questions/${id}`)
}

// 创建试卷
export function createPaper(data) {
  return request.post('/api/teacher/papers', data)
}

// 试卷列表
export function getPapers() {
  return request.get('/api/teacher/papers')
}

// 编辑试卷
export function updatePaper(id, data) {
  return request.put(`/api/teacher/papers/${id}`, data)
}

// 删除试卷
export function deletePaper(id) {
  return request.delete(`/api/teacher/papers/${id}`)
}

// 向试卷添加题目
export function addQuestionToPaper(paperId, data) {
  return request.post(`/api/teacher/papers/${paperId}/questions`, data)
}

// 查看考试记录
export function getExamRecords(params) {
  return request.get('/api/teacher/exam-records', { params })
}

// 批改主观题
export function gradeExam(recordId, data) {
  return request.post(`/api/teacher/exam-records/${recordId}/grade`, data)
}
```

- [ ] **Step 4: 更新路由 — 将 views 路径指向新目录**

修改 `frontend/src/router/index.js` 中 routes 数组的 component 路径：

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/student',
    name: 'StudentHome',
    component: () => import('../views/student/StudentHome.vue'),
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/teacher',
    name: 'TeacherHome',
    component: () => import('../views/teacher/TeacherHome.vue'),
    meta: { requiresAuth: true, role: 'teacher' }
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('../views/admin/AdminHome.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.path === '/login') {
    if (token && role) {
      next('/' + role)
    } else {
      next()
    }
    return
  }

  if (!token) {
    next('/login')
    return
  }

  if (to.meta.role && to.meta.role !== role) {
    next('/' + role)
    return
  }

  next()
})

export default router
```

- [ ] **Step 5: 迁移现有的占位页面到子目录**

将 `StudentHome.vue`、`TeacherHome.vue`、`AdminHome.vue` 分别移动到对应子目录：

```bash
cd "D:\github\exam-system"
mv frontend/src/views/StudentHome.vue frontend/src/views/student/StudentHome.vue
mv frontend/src/views/TeacherHome.vue frontend/src/views/teacher/TeacherHome.vue
mv frontend/src/views/AdminHome.vue frontend/src/views/admin/AdminHome.vue
```

- [ ] **Step 6: Commit**

```bash
cd "D:\github\exam-system" && git add frontend/src/views/student/ frontend/src/views/teacher/ frontend/src/views/admin/ frontend/src/api/ frontend/src/router/index.js && git rm frontend/src/views/StudentHome.vue frontend/src/views/TeacherHome.vue frontend/src/views/AdminHome.vue && git commit -m "feat: reorganize frontend views by module and add API stubs"
```

---

### Task 9: 写入 API 规范文档

**Files:**
- Create: `docs/API-SPEC.md`

- [ ] **Step 1: 创建 API-SPEC.md**

```markdown
# API 接口规范

## 通用说明

- 统一返回格式：`{ code: 200, message: "success", data: ... }`
- 所有接口（除登录/注册）需带 `Authorization: Bearer <token>` header
- 基础路径：`http://localhost:8080`

## 认证接口

### POST /api/user/login
- 请求体：`{ username, password }`
- 返回：`{ code, message, data: { token, role } }`

### POST /api/user/register
- 请求体：`{ username, password, role }`
- role 可选值：`student`、`teacher`、`admin`

---

## 教师模块 `/api/teacher`

### POST /api/teacher/questions
创建题目
- 请求体：`{ type, content, options, answer, courseId? }`
- type：`single_choice | multi_choice | true_false | fill_blank | short_answer`

### GET /api/teacher/questions
分页查题库
- 参数：`?page=1&size=20&type=&courseId=`
- 返回：`{ code, message, data: { list: [...], total, page, size } }`

### PUT /api/teacher/questions/{id}
修改题目
- 请求体：`{ type?, content?, options?, answer?, courseId? }`

### DELETE /api/teacher/questions/{id}
删除题目

### POST /api/teacher/papers
创建试卷
- 请求体：`{ title, duration, questionIds?: [...] }`

### GET /api/teacher/papers
试卷列表
- 返回：`{ code, message, data: [...] }`

### PUT /api/teacher/papers/{id}
编辑试卷
- 请求体：`{ title?, duration? }`

### DELETE /api/teacher/papers/{id}
删除试卷

### POST /api/teacher/papers/{paperId}/questions
向试卷添加题目
- 请求体：`{ questionId, score }` 或 `{ questions: [{ questionId, score }] }`

### GET /api/teacher/exam-records
查看考试记录
- 参数：`?paperId=`

### POST /api/teacher/exam-records/{recordId}/grade
批改主观题
- 请求体：`{ details: [{ questionId, scoreGot }] }`

---

## 学生模块 `/api/student`

### GET /api/student/papers
可参加的考试列表
- 返回：`{ code, message, data: [...] }`

### GET /api/student/papers/{paperId}
获取试卷详情（含题目，不含答案）

### POST /api/student/exam-records
开始考试
- 请求体：`{ paperId }`

### POST /api/student/exam-records/{recordId}/submit
提交答案
- 请求体：`{ answers: [{ questionId, answer }] }`

### GET /api/student/exam-records
我的考试记录列表

### GET /api/student/exam-records/{recordId}
考试记录详情（含得分）
```

- [ ] **Step 2: Commit**

```bash
cd "D:\github\exam-system" && git add docs/API-SPEC.md && git commit -m "docs: add API specification for student and teacher modules"
```

---

### Task 10: 最终验证

- [ ] **Step 1: 验证后端编译通过**

```bash
cd "D:\github\exam-system\backend" && ./apache-maven-3.9.6/bin/mvn compile -q
```
Expected: BUILD SUCCESS

- [ ] **Step 2: 验证前端构建通过**

```bash
cd "D:\github\exam-system\frontend" && npm run build
```
Expected: 无错误

- [ ] **Step 3: 查看最终文件结构**

```bash
cd "D:\github\exam-system" && find . -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/target/*' -not -path '*/apache-maven-3.9.6/*' | sort
```
