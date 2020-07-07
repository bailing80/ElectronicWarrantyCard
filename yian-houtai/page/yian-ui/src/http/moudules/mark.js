import axios from '../axios'
/* 
 * 字典管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/mark/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/mark/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/mark/findPage',
        method: 'post',
        data
    })
}
// 姓名查重
export const nameDuplicateCheck = (data) => {
    return axios({
        url: '/mark/nameDuplicateCheck',
        method: 'post',
        data
    })
}
// 手机号查重
export const telDuplicateCheck = (data) => {
    return axios({
        url: '/mark/telDuplicateCheck',
        method: 'post',
        data
    })
}
//从数据库获取所有销售人员名称
export const getSalesNames = (data) => {
    return axios({
        url: '/mark/getSalesNames',
        method: 'post',
        data
    })
}

//从数据库获取所有医院名称
export const getHospitalNames = (data) => {
    return axios({
        url: '/mark/getHospitalNames',
        method: 'post',
        data
    })
}

export const leadgGout = (data) => {
    return axios({   
        url: '/mark/leadGout',
        method: 'post', 
        data
    })
}

export const leadGin =(data) => {
    return axios({   
        url: '/mark/leadgin',
        method: 'post', 
        data :data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })

}
