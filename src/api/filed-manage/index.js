import api from '@/api/index';

/**
 * 保存原生字段
 * @params params
 */
export const saveBasic = (params) => api.post(`/task-admin/task/field/save`, params);

/**
 * 保存衍生字段
 * @params params
 */
export const saveComplex = (params) => api.post(`/task-admin/task/field/complex/save`, params);

/**
 * 根据id获取原生字段枚举值
 * @params params
 */
export const getNativeEnums = (params) => api.post(`/task-admin/task/field/info/${params.id}`, params);

/**
 * 获取原生字段数据
 * @params params
 */
export const getNativeList = (params) => api.post(`/task-admin/task/field/condtion/list`, params)

/**
 * 获取列表
 * @params params
 */
export const getPageList = (params) => api.post(`/task-admin/task/field/page?page=${params.page}&limit=${params.limit}&type=${params.type}`, params)

/**
 * 根据原生字段id获取信息
 * @params id
 */
 export const getBasicDetail = (params) => api.post(`/task-admin/task/field/basic/detail/${params.id}`, params)

 /**
 *  编辑原生字段
 * @params 
 */
  export const updateBasic = (params) => api.post(`/task-admin/task/field/basic/update`, params)

/**
 * 根据衍生字段id获取信息
 * @params id
 */
 export const getComplexcDetail = (params) => api.post(`/task-admin/task/field/complex/detail/${params.id}`, params)

/**
 * 编辑衍生字段
 * @params id
 */
    export const updateComplex = (params) => api.post(`/task-admin/task/field/complex/update`, params)

/**
 * 删除字段
 * @params id
 */
    export const deleteField = (params) => api.post(`/task-admin/task/field/del/${params.id}`, params)
    