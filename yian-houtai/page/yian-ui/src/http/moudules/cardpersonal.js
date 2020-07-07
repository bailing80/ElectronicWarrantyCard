import axios from '../axios'
/* 
 * 电子保修卡-个人客户信息管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/cardpersonal/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/cardpersonal/delete',
        method: 'post',
        data
    })
}
//批量导出
export const batchExport = (data) => {
    return axios({
        url: '/cardpersonal/batchExport',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/cardpersonal/findPage',
        method: 'post',
        data
    })
}
// 查看详情
export const getDetails = (data) => {
    return axios({
        url: '/cardpersonal/getDetails',
        method: 'post',
        data
    })
}
//找序列号
export const findXuliehao = (data) => {
    return axios({   
        url: '/cardpersonal/findXuliehao',
        method: 'post', 
        data
    })
}
  

//
export const exportExcel = (data) => {
    return axios({   
        url: '/cardpersonal/exportExcel',
        method: 'post', 
        data
    })
}
//导入
export const importExcel =(data) => {
    return axios({   
        url: '/cardpersonal/importExcel',
        method: 'post', 
        data :data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })

}
