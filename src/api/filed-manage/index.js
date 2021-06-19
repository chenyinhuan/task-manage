import api from '@/api/index';

/**
 * 保存原生字段
 * @params params
 */
export const saveNative = (params) => api.post(`/task/field/save`, params);

/**
 * 保存衍生字段
 * @params params
 */
export const saveComplex = (params) => api.post(`/task/field/complex/save`, params);

/**
 * 根据id获取原生字段枚举值
 * @params userId
 */
export const getNativeEnums = (params) => api.post(`/task/field/info/${params.id}`, params);

/**
 * 获取原生字段数据
 * @params userId
 */
export const getNativeList = (params) => api.post(`/task/field/condtion/list`, params)

/**
 * 获取列表
 * @params userId
 */
export const getPageList = (params) => api.post(`/task/field/page?page=${params.page}&limit=${params.limit}&type=${params.type}`, params)
