import myRequest from "@/service"

// 公司案列分类管理接口
const contentCategorayAPI = {
  ADD_COMPANYCATE: "/admin/add-companycase",
  DELETE_COMPANYCATE: "/admin/delete-companycase/", // /:comcaseid
  LIST_COMPANYCATE: "/admin/list-companycase",
  UPDATE_COMPANYCATE: "/admin/update-companycase",
  PAGE_COMPANYCATE: "/admin/page-companycase",
  COMPANYCATE_UPDATESORT: "/admin/companycase-updateSort"
}

export function addCompanycateRequest(data) {
  return myRequest.post({
    url: contentCategorayAPI.ADD_COMPANYCATE,
    params: data
  })
}

export function deleteCompanycateRequest(id) {
  return myRequest.delete({
    url: contentCategorayAPI.DELETE_COMPANYCATE + id
  })
}

export function listCompanycateRequest() {
  return myRequest.get({
    url: contentCategorayAPI.LIST_COMPANYCATE
  })
}

export function updateCompanycateRequest(data) {
  return myRequest.put({
    url: contentCategorayAPI.UPDATE_COMPANYCATE,
    data
  })
}

export function pageCompanycateRequest(data) {
  return myRequest.get({
    url: contentCategorayAPI.PAGE_COMPANYCATE,
    params: data
  })
}

export function companycateUpdateSortRequest(data) {
  return myRequest.get({
    url: contentCategorayAPI.COMPANYCATE_UPDATESORT,
    params: data
  })
}
