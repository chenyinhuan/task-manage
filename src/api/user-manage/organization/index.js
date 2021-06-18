import api from '@/api/index';

/**
 * 获取组织列表
 * @params params
 */
export const getDeptList = (params) => api.get(`/sys/dept/list?deptId=${params.deptId}`, params)
/**
 * 删除部门
 * @params params
 */
export const deleteDept = (params) => api.post(`/sys/dept/delete?deptId=${params.deptId}`, params)

/**
 * 新建组织
 * @params params
 */
export const saveAddDept = (params) => api.post(`/sys/dept/save`, params)
/**
 * 修改组织
 * @params params
 */
export const updateAddDept = (params) => api.post(`/sys/dept/update`, params)
