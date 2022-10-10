import myRequest from "@/service"

const descriptionCategoryAPI = {
  ADD_COMPANYINFO: "/admin/add-companyinfo",
  DELETE_COMPANYINFO: "/admin/delete-companyinfo/", // /admin/delete-companyinfo/:cominfoid
  LIST_COMPANYINFO: "/admin/list-companyinfo",
  UPDATE_COMPANYINFO: "/admin/update-companyinfo",
  UPDATE_SORT: "/admin/updateSort",
  PAGE_COMPANYINFO: "/admin/page-companyinfo"
}

export function addCompanyinfoRequest(data) {
  return myRequest.post({
    url: descriptionCategoryAPI.ADD_COMPANYINFO,
    data
  })
}

export function deleteCompanyinfoRequest(id) {
  return myRequest.put({
    url: descriptionCategoryAPI.DELETE_COMPANYINFO + id
  })
}

export function listCompanyinfoRequest() {
  return myRequest.get({
    url: descriptionCategoryAPI.LIST_COMPANYINFO
  })
}

export function updateCompanyinfoRequest(data) {
  return myRequest.put({
    url: descriptionCategoryAPI.UPDATE_COMPANYINFO,
    data
  })
}

export function updateSortRequest(data) {
  return myRequest.get({
    url: descriptionCategoryAPI.UPDATE_SORT,
    params: data
  })
}

export function pageCompanyinfoRequest(data) {
  return myRequest.get({
    url: descriptionCategoryAPI.PAGE_COMPANYINFO,
    params: data
  })
}
