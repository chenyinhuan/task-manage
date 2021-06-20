import api from '@/api/index';
/**
 * 角色列表
 * @params params
 */
export const getRoleList = (params) => api.get(`/task-admin/sys/role/list`, {params})
/**
 * 新建角色
 * @params params
 */
export const saveAddRole = (params) => api.post(`/task-admin/sys/role/save`, params)
/**
 * 删除角色
 * @params params
 */
export const deleteRole = (params) => api.post(`/task-admin/sys/role/delete`, params)
/**
 * 当前账户角色选择
 * @params params
 */
export const getRoleSelect = (params) => api.get(`/task-admin/sys/role/select`, params)
/**
 * 修改
 * @params params
 */
export const updateRole = (params) => api.post(`/task-admin/sys/role/update`, params)

/**
 * 通过id获取角色
 * @params params
 */
export const getRoleInfo = (params) => api.post(`/task-admin/sys/role/info/${params.id}`, params)
