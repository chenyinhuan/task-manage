import api from '@/api/index';

/**
 * 获取用户列表
 * @params params
 */
export const getAccountList = (params) => api.post(`/task-admin/sys/user/list?page=${params.page}&limit=${params.limit}&username=${params.username}`, params);

/**
 * 删除用户
 * @params params
 */
export const delAccount = (params) => api.post(`/task-admin/sys/user/delete`, params);

/**
 * 新增用户
 * @params params
 */
export const addAccount = (params) => api.post(`/task-admin/sys/user/save`, params);

/**
 * 修改用户
 * @params params
 */
export const updateAccount = (params) => api.post(`/task-admin/sys/user/update`, params);

/**
 * 通过id获取指定账户消息
 * @params userId
 */
export const getUserInfo = (params) => api.get(`/task-admin/sys/user/info/${params.userId}`, params)

