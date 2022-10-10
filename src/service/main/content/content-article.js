// 公司案列详情接口
import myRequest from "@/service"

const contentArticleAPI = {
  ADD_CASECONTENT: "/admin/add-casecontent",
  UPDATE_CASECONTENT: "/admin/update-casecontent/",
  DELETE_CASECONTENT: "/admin/delete-casecontent/", // /:casecontentid
  LIST_CASECONTENT: "/admin/list-casecontent",
  PAGE_CASECONTENT: "/admin/page-casecontent",
  CASECONTENT_CONDITIONS: "/admin/casecontent-conditions"
}

export function addCaseContentRequest(data) {
  return myRequest.post({
    url: contentArticleAPI.ADD_CASECONTENT,
    data: data
  })
}

export function updateCaseContentRequest(data) {
  return myRequest.put({
    url: contentArticleAPI.UPDATE_CASECONTENT,
    data: data
  })
}

export function deleteCaseContentRequest(id) {
  return myRequest.delete({
    url: contentArticleAPI.DELETE_CASECONTENT + id
  })
}

export function listCaseContentRequest(data) {
  return myRequest.get({
    url: contentArticleAPI.LIST_CASECONTENT
  })
}

export function pageCaseContentRequest(data) {
  return myRequest.get({
    url: contentArticleAPI.PAGE_CASECONTENT,
    params: data
  })
}

export function casecontentConditionsRequest(data) {
  return myRequest.get({
    url: contentArticleAPI.CASECONTENT_CONDITIONS,
    params: data
  })
}
