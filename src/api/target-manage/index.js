import api from '@/api/index';

/**
 * 保存指标
 * @params params
 */
export const saveTarge = (params) => api.post(`/task/targe/saveTarge`, params);
/**
 * 指标列表
 * @params params
 */
export const getTargeList = (params) => api.get(`/task/targe/page`, {params})

/**
 * 指标列表-用户逻辑
 * @params params
 */
export const getTargeListExtend = (params) => api.post(`/task/targe/condtion/list`, params);
