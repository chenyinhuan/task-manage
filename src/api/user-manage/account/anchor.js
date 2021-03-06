import api from '@/api/index';

/**
 * 获取以关联主播列表
 * @params params
 */
export const getAnchorList = (params) => api.post(`/task-admin/sys/streamer/list`, params);

/**
 * 删除主播
 * @params params
 */
export const delAnchor = (params) => api.post(`/task-admin/sys/streamer/deleteStreamer?id=${params.id}`, params);

/**
 * 新增主播
 * @params params
 */
export const addAnchor = (params) => api.post(`/task-admin/sys/streamer/addStreamer?name=${params.name}`, params);

/**
 * 编辑主播名
 * @params params
 */
export const updateAnchor = (params) => api.post(`/task-admin/sys/streamer/updateStreamer?name=${params.name}&id=${params.id}`, params);

/**
 * 保存关联主播信息
 * @params userId
 */
export const saveAssociatedAnchor = (params) => api.post(`/task-admin/sys/streamer/saveRelation`, params)
