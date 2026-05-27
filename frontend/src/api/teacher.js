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
