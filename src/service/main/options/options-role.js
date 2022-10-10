import myRequest from "@/service"

const optionsRoleAPI = {
  companyRoleURL: "/admin/role"
}

export function getCompanyRole() {
  return myRequest.get({
    url: optionsRoleAPI.companyRoleURL
  })
}

export function addCompanyRole(role) {
  return myRequest.post({
    url: optionsRoleAPI.companyRoleURL,
    data: role
  })
}

export function updateCompanyRole(role) {
  return myRequest.put({
    url: optionsRoleAPI.companyRoleURL,
    data: role
  })
}

export function delCompanyRole(id) {
  return myRequest.delete({
    url: optionsRoleAPI.companyRoleURL + `/${id}`
  })
}

export function getRoleMenuIds(id) {
  return myRequest.get({
    url: optionsRoleAPI.companyRoleURL + `/${id}`
  })
}
