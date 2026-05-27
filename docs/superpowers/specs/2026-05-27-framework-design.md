# Exam System Framework Design

## 架构决策

- **单体应用**：所有模块在同一个 Spring Boot 项目中，共享 DB 和公共组件
- **按包拆分模块**：`controller/`、`service/`、`dto/` 下设 `student/` 和 `teacher/` 子包
- **你（框架负责人）**维护 entity、repository、common、config、utils 等共享层
- **组员A（学生模块）**在 `controller/student/`、`service/student/`、`dto/student/` 下写代码
- **组员B（教师模块）**在 `controller/teacher/`、`service/teacher/`、`dto/teacher/` 下写代码

## 技术栈

- 后端：Spring Boot 3.2.5, JPA, SQL Server, JWT (jjwt 0.12.x), BCrypt
- 前端：Vue 3 + Vite + Vue Router 4 + Axios
- DB：SQL Server，数据库名 exam_system

## 数据层（你的产出）

### Entity（对应 6 张表）

| Entity | 表 | 说明 |
|---|---|---|
| User | users | 已有 |
| Question | questions | 需创建：id, type, content, options, answer, courseId |
| Paper | papers | 需创建：id, title, duration, createdBy |
| PaperQuestion | paper_questions | 需创建：id, paperId, questionId, score |
| ExamRecord | exam_records | 需创建：id, studentId, paperId, startTime, submitTime, totalScore |
| AnswerDetail | answer_details | 需创建：id, recordId, questionId, studentAnswer, isCorrect, scoreGot |

### Repository（每个 Entity 对应一个）

- QuestionRepository, PaperRepository, PaperQuestionRepository, ExamRecordRepository, AnswerDetailRepository

## API 接口规范

所有请求需带 `Authorization: Bearer <token>` header（登录/注册除外）。
统一返回格式：`{ code: 200, message: "success", data: ... }`

### 教师模块 `/api/teacher`

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/api/teacher/questions` | 创建题目 |
| GET | `/api/teacher/questions` | 分页查题库（?page=&size=） |
| PUT | `/api/teacher/questions/{id}` | 修改题目 |
| DELETE | `/api/teacher/questions/{id}` | 删除题目 |
| POST | `/api/teacher/papers` | 创建试卷 |
| GET | `/api/teacher/papers` | 试卷列表 |
| PUT | `/api/teacher/papers/{id}` | 编辑试卷 |
| DELETE | `/api/teacher/papers/{id}` | 删除试卷 |
| POST | `/api/teacher/papers/{paperId}/questions` | 向试卷添加题目 |
| GET | `/api/teacher/exam-records` | 查看考试记录（?paperId=） |
| POST | `/api/teacher/exam-records/{recordId}/grade` | 批改主观题 |

### 学生模块 `/api/student`

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/student/papers` | 可参加的考试列表 |
| GET | `/api/student/papers/{paperId}` | 获取试卷详情（含题目，不含答案） |
| POST | `/api/student/exam-records` | 开始考试 |
| POST | `/api/student/exam-records/{recordId}/submit` | 提交答案 |
| GET | `/api/student/exam-records` | 我的考试记录列表 |
| GET | `/api/student/exam-records/{recordId}` | 考试记录详情（含得分） |

### JWT 拦截器补充

在白名单中放行学生和教师模块的接口路径。

## 前端结构

```
src/views/
├── student/    ← 组员A：学生页面
├── teacher/    ← 组员B：教师页面
├── admin/      ← 管理员页面
src/api/
├── student.js  ← 组员A：学生 API 调用
├── teacher.js  ← 组员B：教师 API 调用
```

## API 调用规范

前端统一使用 `src/utils/request.js` 发出的请求：
- `request.get('/api/xxx')` → 返回 `{ code, message, data }`
- `request.post('/api/xxx', body)` → 同上
- token 自动携带，401 自动跳转登录页
