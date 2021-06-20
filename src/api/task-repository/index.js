import api from '@/api/index';

/**
 * 模板列表
 * @params params
 */
export const getTasktplList = (params) => api.post(`/task-admin/task/tasktpl/page?page=${params.page}&limit=${params.limit}`, params)

/**
 * 保存任务模板（第一步）
 * @params params
 */
export const saveTaskTpl = (params) => api.post(`/task-admin/task/tasktpl/saveTaskTpl`, params);
/**
 * 保存任务模板（第2步）
 * @params params
 */
export const saveTaskTargeTpl = (params) => api.post(`/task-admin/task/tasktpl/saveTaskTargeTpl/${params.taskTplId}`, params);
/**
 * 任务列表
 * @params params
 */
export const getTaskList = (params) => api.post(`/task-admin/task/tk/repo/page?page=${params.page}&limit=${params.limit}`, params)
  /**
 * 保存任务
 * @params params
 */
export const saveTask = (params) => api.post(`/task-admin/task/tk/repo/save`, params)
/**
 * 模板列表
 * @params params
 */
export const getTasktpl = (params) => api.post(`/task-admin/task/tasktpl/list`, params)
/**
 * 任务详情
 * @params params
 */
export const getTaskDetail = (params) => api.post(`/task-admin/task/tk/sender/task/detail/${params.taskId}`, params)

/**
 * 任务详情
 * @params params
 */
export const turnonoff = (params) => api.post(`/task-admin/task/tasktpl/turnonoff/${params.taskTplId}/${params.status}`, params)
