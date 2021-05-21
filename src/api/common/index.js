import api from '@/api/index';

/**
 * 登录
 * @params params
 */
export const apiLogin = (params) => api.post(`/sys/login?username=${params.username}&password=${params.password}`, params)

/**
 * 获取侧边栏
 * @params params
 */
export const getNav = (params) => api.post(`/sys/menu/nav`, params)
