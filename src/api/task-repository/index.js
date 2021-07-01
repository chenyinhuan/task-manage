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

/**
 * 删除任务模板
 * @params params
 */
export const delTaskTpl = (params) => api.post(`/task-admin/task/tasktpl/delTaskTpl/${params.id}`, params)

/**
 * 获取任务模板第一步详情
 * @params params
 */
export const getTaskTplDetail = (params) => api.post(`/task-admin/task/tasktpl/getTaskTplDetail/${params.id}`, params)

/**
 * 获取任务模板第二步详情
 * @params params
 */
export const getTaskTargeTplDetail = (params) => api.post(`/task-admin/task/tasktpl/getTaskTargeTplDetail/${params.id}`, params)

/**
 * 更新任务模板（第一步）
 * @params params
 */
export const updateTaskTpl = (params) => api.post(`/task-admin/task/tasktpl/updateTaskTpl`, params);

/**
 * 更新任务模板（第一步）
 * @params params
 */
export const upateTaskTargeTpl = (params) => api.post(`/task-admin/task/tasktpl/upateTaskTargeTpl/${params.taskTplId}`, params);

/**
 * 复制模板
 * @params params
 */
export const copyTaskTpl = (params) => api.post(`/task-admin/task/tasktpl/copyTaskTpl/${params.taskTplId}`, params);

/**
 * 取消任务
 * @params params
 */

export const cancelTask = (params) => api.post(`/task-admin/task/tk/cancel/${params.id}`, params)

/**
 * 任务详情
 * @params params
 */
export const getTaskDetailById = (params) => api.post(`/task-admin/task/tk/getDetail/${params.id}`, params)
/**
 * 更新任务
 * @params params
 */

export const updateTaskDetail = (params) => api.post(`/task-admin/task/tk/repo/update`, params)

