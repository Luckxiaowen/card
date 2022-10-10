import myRequest from "@/service"

const optionsOrganizeAPI = {
  CompanyFrameURL: "/admin/company-frame"
}

export function getCompanyFrame() {
  return myRequest.get({
    url: optionsOrganizeAPI.CompanyFrameURL
  })
}

export function updateCompanyFrameName(frame) {
  return myRequest.put({
    url: optionsOrganizeAPI.CompanyFrameURL,
    data: frame
  })
}

export function addCompanyFrame(frame) {
  return myRequest.post({
    url: optionsOrganizeAPI.CompanyFrameURL,
    data: frame
  })
}

export function delCompanyFrameById(id) {
  return myRequest.delete({
    url: optionsOrganizeAPI.CompanyFrameURL + `/${id}`
  })
}
