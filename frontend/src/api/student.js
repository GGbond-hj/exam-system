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
