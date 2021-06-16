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
