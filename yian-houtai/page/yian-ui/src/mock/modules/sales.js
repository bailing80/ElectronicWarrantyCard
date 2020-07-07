/* 
 * 销售人员信息系统
 */

// 保存
export function save()
{
  return {
    url: 'sales/save',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}
// 批量删除
export function batchDelete() {
  return {
    url: 'sales/delete',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}
// 分页查询
export function findPage(params) {
  let findPageData = {
    "code": 200,
    "msg": null,
    "data": {}
  }
  let pageNum = 1
  let pageSize = 8
  if(params !== null) {
    // pageNum = params.pageNum
  }
  if(params !== null) {
    // pageSize = params.pageSize
  }
  let content = this.getContent(pageNum, pageSize)
  findPageData.data.pageNum = pageNum
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = 50
  findPageData.data.content = content
  return {
    url: 'sales/findPage',
    type: 'post',
    data: findPageData
  }
}
export function getContent(pageNum, pageSize) {
  let content = []
  for(let i=0; i<pageSize; i++) {
    let obj = {}
    let index = ((pageNum - 1) * pageSize) + i + 1
    obj.id = index
    obj.name = 'name' + index
    obj.type = 'type' + index
    obj.status = 'status' + index
    obj.provincial = 'provincial' + index
    content.push(obj)
  }
  return content
}
//信息导出
export function exportSalesInfo()
{
  let leaddGout= 
  {
    "code": 200,
    "msg": null,
    "data": {}
  }
    return {
      url: '/sales/exportSalesInfo',         
      type: 'post',  
      data: {
      "code": 200,
      "msg": null,
      "data":leaddGout
      }   
  }
}
//信息导入
export function importSalesInfo()
{
  let leaddGin= 
  {
    "code": 200,
    "msg": null,
    "data": {}
  }

    return {
      url: '/sales/importSalesInfo',         
      type: 'post',  
      data: {
      "code": 200,
      "msg": null,
      "data":leaddGin
      }   
  }
}