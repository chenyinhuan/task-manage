import api from '@/api/index';

/**
 * 获取用户列表
 * @params params
 */
export const getAccountList = (params) => api.post(`/sys/user/list?page=${params.page}&limit=${params.limit}&username=${params.username}`, params);

/**
 * 删除用户
 * @params params
 */
export const delAccount = (params) => api.post(`/sys/user/delete`, params);

/**
 * 新增用户
 * @params params
 */
export const addAccount = (params) => api.post(`/sys/user/save`, params);

/**
 * 修改用户
 * @params params
 */
export const updateAccount = (params) => api.post(`/sys/user/update`, params);

