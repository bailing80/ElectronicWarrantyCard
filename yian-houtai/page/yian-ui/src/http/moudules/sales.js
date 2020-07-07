import axios from '../axios'
/* 
 * 销售人员管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/sales/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/sales/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/sales/findPage',
        method: 'post',
        data
    })
}
export const exportSalesInfo = (data) => {
    return axios({   
        url: '/sales/exportSalesInfo',
        method: 'post', 
        data
    })
}
export const importSalesInfo =(data) => {
    return axios({   
        url: '/sales/importSalesInfo',
        method: 'post', 
        data :data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })

}
