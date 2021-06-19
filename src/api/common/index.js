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

/**
 * 获取用户信息
 * @params params
 */
export const getUserInfo = (params) => api.post(`/sys/user/info`, params)

/**
 * 获取侧边栏
 * @params params
 */
export const getMenuList = (params) => api.post(`/sys/menu/list`, params)

/**
 * 获取某个页面菜单数据
 * @params params
 */
export const getMenuById = (params) => api.post(`/sys/menu/info/${params.menuId}`, params)

/**
 * 获取某个页面菜单数据
 * @params params
 */
export const upload = (params) => api.post(`/sys/oss/upload`, params,{ headers: { 'Content-Type': 'multipart/form-data' } })
