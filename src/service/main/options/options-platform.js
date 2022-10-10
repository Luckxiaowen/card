import myRequest from "@/service"

const optionsPlatformAPI = {
  ADD_COMPANY: "/superadmin/add-company",
  DELETE_COMPANY: "/superadmin/delete-company/", // /:companyid
  LIST_COMPANY: "/superadmin/list-company",
  MODIFY_COMPANY: "/superadmin/modify-company",
  SEARCH_COMPANY: "/superadmin/search-company"
}

export function addCompanyRequest(data) {
  return myRequest.post({
    url: optionsPlatformAPI.ADD_COMPANY,
    data
  })
}

export function deleteCompanyRequest(id) {
  return myRequest.delete({
    url: optionsPlatformAPI.DELETE_COMPANY + id
  })
}

export function listCompanyRequest() {
  return myRequest.get({
    url: optionsPlatformAPI.LIST_COMPANY
  })
}

export function modifyCompanyRequest(data) {
  return myRequest.put({
    url: optionsPlatformAPI.MODIFY_COMPANY,
    data
  })
}

export function searchCompanyRequest(data) {
  return myRequest.get({
    url: optionsPlatformAPI.SEARCH_COMPANY,
    params: data
  })
}
