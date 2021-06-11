import api from '@/api/index';

/**
 * 模板列表
 * @params params
 */
export const getTasktplList = (params) => api.post(`/task/tasktpl/page`, params)

/**
 * 保存任务模板（第一步）
 * @params params
 */
export const saveTaskTpl = (params) => api.post(`/task/tasktpl/saveTaskTpl`, params);
/**
 * 保存任务模板（第2步）
 * @params params
 */
export const saveTaskTargeTpl = (params) => api.post(`/task/tasktpl/saveTaskTargeTpl/${params.taskTplId}`, params);
/**
 * 任务列表
 * @params params
 */
export const getTaskList = (params) => api.post(`/task/tk/repo/page`, params)
  /**
 * 保存任务
 * @params params
 */
export const saveTask = (params) => api.post(`/task/tk/repo/save`, params)
