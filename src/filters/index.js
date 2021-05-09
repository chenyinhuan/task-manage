export const filterParams = (params) => { // 过滤空参数
    Object.keys(params).forEach((item) => {
        if (params[item] === null) {
        delete params[item];
        } else if (params[item].length === 0) {
        delete params[item];
        }
    });
   return params;
};