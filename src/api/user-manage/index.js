import api from '../';

/**
 * 登录
 * @params params
 */
export const apiLogin = (params) => api.post(`/sys/login`, params)
