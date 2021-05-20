import api from '@/api/index';

/**
 * 获取用户列表
 * @params params
 */
export const getAccountList = (params) => api.post(`/sys/user/list`, params)
