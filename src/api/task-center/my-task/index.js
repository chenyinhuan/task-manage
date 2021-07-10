import api from '@/api/index';

/**
 * 我的任务页面-任务列表
 * @params params
 */
export const getMyTaskList = (params) => api.post(`/task-admin/task/tk/user/page?page=${params.page}&limit=${params.limit}`, params);

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
 * 我的任务页：任务指标情况
 * @params params
 */
export const getTaskTargetList = (params) => api.post(`/task-admin/task/tk/target/user/page/${params.taskId}`, params);

/**
 * 任务中心-日历
 * @params params
 */
export const getTaskCenter = (params) => api.post(`/task-admin/task/tk/user/taskcenter`, params);

/**
 * 我派发的任务头部统计接口
 * @params params
 */
export const countRepo = (params) => api.post(`/task-admin/task/tk/repo/page/count`, params);

/**
 * 任务中心头部统计接口
 * @params params
 */
export const countTaskCenter = (params) => api.post(`/task-admin/task/tk/user/taskcenter/count`, params);

/**
 * 添加上级评论
 * @params params
 */
export const saveComment = (params) => api.post(`/task-admin/task/tk/sender/task/comment/${params.id}/${params.comment}`, params);
