import request from '@/utils/request'
import qs from 'qs'
// 查询列表
export const getPageList = (data) => {
    return request({
        url: `/tdms/query/list`,
        method: 'post',
        data
    })
}
// 新增
export const add = (data) => {
    return request({
        url: `/tdms/add`,
        method: 'post',
        data
    })
}
// 修改
export const modify = (data) => {
    return request({
        url: `/tdms/modify`,
        method: 'post',
        data
    })
}
//失效
export const cancel = (id) => {
    return request({
        url: `/tdms/cancel/${id}`,
        method: 'get',
    })
}

//查看zip里面的文件
export const queryPdf = (params) => {
    return request({
        url: `/tdms/queryPdf`,
        method: 'get',
        params
    })
}
