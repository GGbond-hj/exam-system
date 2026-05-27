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

### POST /api/teacher/exam-records/{recordId}/grade`
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

### POST /api/student/exam-records/{recordId}/submit`
提交答案
- 请求体：`{ answers: [{ questionId, answer }] }`

### GET /api/student/exam-records
我的考试记录列表

### GET /api/student/exam-records/{recordId}
考试记录详情（含得分）
