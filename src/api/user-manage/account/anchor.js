import api from '@/api/index';

/**
 * 获取以关联主播列表
 * @params params
 */
export const getAnchorList = (params) => api.post(`/task-admin/sys/user/list?page=${params.page}&limit=${params.limit}&username=${params.username}`, params);

/**
 * 删除主播
 * @params params
 */
export const delAnchor = (params) => api.post(`/task-admin/sys/user/delete`, params);

/**
 * 新增主播
 * @params params
 */
export const addAnchor = (params) => api.post(`/task-admin/sys/user/save`, params);

/**
 * 编辑主播名
 * @params params
 */
export const updateAnchor = (params) => api.post(`/task-admin/sys/user/update`, params);

/**
 * 保存关联主播信息
 * @params userId
 */
export const saveAssociatedAnchor = (params) => api.post(`/task-admin/sys/user/info/${params.userId}`, params)
