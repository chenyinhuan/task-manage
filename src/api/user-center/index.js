import api from '@/api/index';

/**
 * 修改密碼
 * @params params
 */
export const resetPassword = (params) => api.post(`/task-admin/sys/user/password?password=${params.password}&newPassword=${params.newPassword}`, params);
