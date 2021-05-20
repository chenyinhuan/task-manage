import api from '@/api/index';

/**
 * 登录
 * @params params
 */
export const apiLogin = (params) => api.post(`/sys/login?username=${params.username}&password=${params.password}`, params)
