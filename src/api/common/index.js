import api from '@/api/index';

/**
 * 登录
 * @params params
 */
export const apiLogin = (params) => api.post(`/task-admin/sys/login?username=${params.username}&password=${params.password}`, params)

/**
 * 退出登录
 * @params params
 */
export const apiLogout = (params) => api.get(`/task-admin/logout`, {params})


/**
 * 获取侧边栏
 * @params params
 */
export const getNav = (params) => api.post(`/task-admin/sys/menu/nav`, params)

/**
 * 获取用户信息
 * @params params
 */
export const getUserInfo = (params) => api.post(`/task-admin/sys/user/info`, params)

/**
 * 获取侧边栏
 * @params params
 */
export const getMenuList = (params) => api.post(`/task-admin/sys/menu/list`, params)

/**
 * 获取某个页面菜单数据
 * @params params
 */
export const getMenuById = (params) => api.post(`/task-admin/sys/menu/info/${params.menuId}`, params)

/**
 * 获取某个页面菜单数据
 * @params params
 */
export const upload = (params) => api.post(`/task-admin/sys/oss/upload`, params,{ headers: { 'Content-Type': 'multipart/form-data' } })

/**
/**
 * 导入统一方法
 * @param params
 * @returns {*}
 */
export function importExcel (params) {
  return api({
    url:`/task-admin/sys/streamer/import`,
    method: 'post',
    data:params,
    // responseType: 'blob'
  }).then(res => res);
}