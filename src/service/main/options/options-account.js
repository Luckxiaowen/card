import myRequest from "@/service"

// 账号管理相关接口
const optionsAccountAPI = {
  ACCOUNT_RESTFUL: "/admin/account/", // /:id
  ACCOUNT_RESET: "/admin/account/reset/" // /:id
}

export function addAccountRequest(data) {
  return myRequest.post({
    url: optionsAccountAPI.ACCOUNT_RESTFUL,
    data
  })
}

export function getAccountRequest() {
  return myRequest.get({
    url: optionsAccountAPI.ACCOUNT_RESTFUL
  })
}

export function getAccountInfoRequest(id) {
  return myRequest.get({
    url: optionsAccountAPI.ACCOUNT_RESTFUL + id
  })
}

export function updateAccountRequest(data) {
  return myRequest.put({
    url: optionsAccountAPI.ACCOUNT_RESTFUL,
    data
  })
}

export function resetAccountRequest(id) {
  return myRequest.post({
    url: optionsAccountAPI.ACCOUNT_RESET + id
  })
}

export function deleteAccountRequest(id) {
  return myRequest.delete({
    url: optionsAccountAPI.ACCOUNT_RESTFUL + id
  })
}
