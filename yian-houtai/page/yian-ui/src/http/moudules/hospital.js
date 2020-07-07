import axios from '../axios'
/* 
 * 医院管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/hospital/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/hospital/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/hospital/findPage',
        method: 'post',
        data
    })
}
export const exportHospitalInfo = (data) => {
    return axios({   
        url: '/hospital/exportHospitalInfo',
        method: 'post', 
        data
    })
}
export const importHospitalInfo =(data) => {
    return axios({   
        url: '/hospital/importHospitalInfo',
        method: 'post', 
        data :data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })

}
