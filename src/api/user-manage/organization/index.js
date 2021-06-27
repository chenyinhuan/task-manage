import api from '@/api/index';

/**
 * 获取组织列表
 * @params params
 */
export const getDeptList = (params) => api.get(`/task-admin/sys/dept/list`, params)
/**
 * 删除部门
 * @params params
 */
export const deleteDept = (params) => api.post(`/task-admin/sys/dept/delete?deptId=${params.deptId}`, params)

/**
 * 新建组织
 * @params params
 */
export const saveAddDept = (params) => api.post(`/task-admin/sys/dept/save`, params)
/**
 * 修改组织
 * @params params
 */
export const updateAddDept = (params) => api.post(`/task-admin/sys/dept/update`, params)
/**
 * 树形用户列表
 * @params params
 */
export const getDeptListusers = (params) => api.get(`/task-admin/sys/dept/listusers`, params)
