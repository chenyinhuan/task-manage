import api from '@/api/index';

/**
 * 保存指标
 * @params params
 */
export const saveTarge = (params) => api.post(`/task-admin/task/targe/saveTarge`, params);
/**
 * 指标列表
 * @params params
 */
export const getTargeList = (params) => api.get(`/task-admin/task/targe/page`, {params})

/**
 * 指标列表-用户逻辑
 * @params params
 */
export const getTargeListExtend = (params) => api.post(`/task-admin/task/targe/condtion/list`, params);

/**
 * 删除指标
 * @params params
 */
export const deleteTarget = (params) => api.post(`/task-admin/task/targe/del/${params.id}`, params);

/**
 * 通过id获取某条指标详情
 * @params params
 */
export const getTargeDetail = (params) => api.post(`/task-admin/task/targe/detail/${params.id}`, params);

/**
 * 更新指标
 * @params params
 */
export const updateTarget = (params) => api.post(`/task-admin/task/targe/updateTarge`, params);