import api from '@/api/index';

/**
 * 获取组织列表
 * @params params
 */
export const getDeptList = (params) => api.get(`/sys/dept/list`, params)
