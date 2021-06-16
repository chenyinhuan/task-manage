import api from '@/api/index';

/**
 * 我的任务页面-任务列表
 * @params params
 */
export const getMyTaskList = (params) => api.post(`/task/tk/user/page`, params);

/**
 * 我的任务-新增任务记录
 * @params params
 */
export const saveTaskRecord = (params) => api.post(`/task/tk/record/saveTaskRecord`, params);

/**
 * 我的任务-任务记录
 * @params params
 */
export const getRecordList = (params) => api.post(`/task/tk/record/records/${params.taskId}`, params);

/**
 * 根据模板id获取字段列表，用于任务记录添加
 * @params params
 */
export const getTaskTplField = (params) => api.post(`/task/tasktpl/field/list/${params.taskTplId}`, params);

/**
 * 获取任务模板字段列表
 * @params params
 */
export const getRecordListInputs = (params) => api.post(`/task/tk/record/listInputs/${params.taskTplId}`, params);
