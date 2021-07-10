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
