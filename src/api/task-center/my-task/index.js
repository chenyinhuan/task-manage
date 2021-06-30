import api from '@/api/index';

/**
 * 我的任务页面-任务列表
 * @params params
 */
export const getMyTaskList = (params) => api.post(`/task-admin/task/tk/user/page?page=${params.page}&limit=${params.limit}`, params);

/**
 * 我的任务-新增任务记录
 * @params params
 */
export const saveTaskRecord = (params) => api.post(`/task-admin/task/tk/record/saveTaskRecord`, params);

/**
 * 我的任务-任务记录
 * @params params
 */
export const getRecordList = (params) => api.post(`/task-admin/task/tk/record/records/${params.taskId}`, params);

/**
 * 根据模板id获取字段列表，用于任务记录添加
 * @params params
 */
export const getTaskTplField = (params) => api.post(`/task-admin/task/task-admin/tasktpl/field/list/${params.taskTplId}`, params);

/**
 * 获取任务模板字段列表
 * @params params
 */
export const getRecordListInputs = (params) => api.post(`/task-admin/task/tk/record/listInputs/${params.taskId}`, params);

/**
 * 我的任务页：任务指标情况
 * @params params
 */
export const getTaskTargetList = (params) => api.post(`/task-admin/task/tk/target/user/page/${params.taskId}`, params);

/**
 * 任务中心-日历
 * @params params
 */
export const getTaskCenter = (params) => api.post(`/task-admin/task/tk/user/taskcenter`, params);

