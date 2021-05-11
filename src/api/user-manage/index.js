import api from '../';

/**
 * 获取用户信息
 * @params params
 */
export const apiLogin = (params) => api.get(`/user/login`, {params})
