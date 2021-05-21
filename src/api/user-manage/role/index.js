import api from '@/api/index';
/**
 * 角色列表
 * @params params
 */
export const getRoleList = (params) => api.get(`/sys/role/list`, params)
/**
 * 新建角色
 * @params params
 */
export const saveAddRole = (params) => api.post(`/sys/role/save`, params)
/**
 * 删除角色
 * @params params
 */
export const deleteRole = (params) => api.post(`/sys/role/delete`, params)
/**
 * 当前账户角色选择
 * @params params
 */
export const getRoleSelect = (params) => api.get(`/sys/role/select`, params)