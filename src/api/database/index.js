import api from '@/api/index';


/**
 * 获取列表
 * @params params
 */
export const getPageList = (params) => api.post(`/task-admin/task/field/api/list?page=${params.page}&limit=${params.limit}`, params)
