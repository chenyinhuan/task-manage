import api from '@/api/index';

/**
 * 我的任务-新增任务记录
 * @params params
 */
export const saveTaskRecord = (params) => api.post(`/task-admin/task/tk/record/saveTaskRecord`, params);

/**
 * 获取任务模板字段列表
 * @params params
 */
export const getRecordListInputs = (params) => api.post(`/task-admin/task/tk/record/listInputs/${params.taskId}`, params);

/**
 * 更新记录
 * @params params
 */
export const updateTaskRecord = (params) => api.post(`/task-admin/task/tk/record/updateTaskRecord`, params);

/**
 * 删除记录
 * @params params
 */
export const removeTaskRecord = (params) => api.post(`/task-admin/task/tk/record/records/remove/${params.id}`, params);

/**
 * 获取某一条记录详情
 * @params params
 */
export const getTaskRecord = (params) => api.post(`/task-admin/task/tk/record/getTaskRecord/${params.id}`, params);
