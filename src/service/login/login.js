import myRequest from "../index"

const LoginAPI = {
  ACCOUNT_LOGIN: "/login"
}

export function accountLoginRequest(account) {
  console.log(account)
  return myRequest.post({
    url: LoginAPI.ACCOUNT_LOGIN,
    data: account
    // showLoading: false,
  })
}
