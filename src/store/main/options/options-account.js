import {
  addAccountRequest,
  getAccountRequest,
  getAccountInfoRequest,
  updateAccountRequest,
  resetAccountRequest, // id
  deleteAccountRequest // id
} from "@/service/main/options/options-account.js"

const mainModule = {
  namespaced: true,
  state: {
    accountList: [],
    accountInfo: null,
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  getters: {
    getCurrentAccount(state) {
      return (index) => state.accountList[index]
    }
  },
  mutations: {
    changeAccountList(state, accountList) {
      state.accountList = accountList
    },
    changeAccountInfo(state, accountInfo) {
      state.accountInfo = accountInfo
    },
    changePageNum(state, pageNum) {
      state.pageNum = pageNum
    },
    changePageSize(state, pageSize) {
      state.pageSize = pageSize
    },
    changePageTotal(state, pageTotal) {
      state.pageTotal = pageTotal
    }
  },
  actions: {
    async getAccountAction({ commit }) {
      const result = await getAccountRequest()
      commit("changeAccountList", result.data)
    },
    async getAccountInfoRequest({ commit }, id) {
      const result = await getAccountInfoRequest(id)
      commit("changeAccountInfo", result.data)
    },
    async deleteAccountAction({ dispatch }, id) {
      const result = await deleteAccountRequest(id)
      const msg = result.msg || result.errorMsg
      if (msg === "操作成功") {
        ElMessage.success({
          message: "删除成功"
        })
        dispatch("getAccountAction")
      } else {
        ElMessage.error({
          message: msg
        })
      }
    },
    async updateAccountAction({ dispatch }, { data, callback }) {
      console.log(data)
      const result = await updateAccountRequest(data)
      console.log(result)
      const msg = result.msg || result.errorMsg
      if (msg === "操作成功") {
        ElMessage.success({
          message: "修改成功"
        })
        callback()
        dispatch("getAccountAction")
      } else {
        ElMessage.error({
          message: msg
        })
      }
    },
    async resetAccountAction(ctx, id) {
      const result = await resetAccountRequest(id)
      const msg = result.msg || result.errorMsg
      if (msg === "操作成功") {
        ElMessage.success({
          message: "重置成功"
        })
      } else {
        ElMessage.error({
          message: msg
        })
      }
    },
    async addAccountAction({ commit, dispatch }, { data, callback }) {
      const result = await addAccountRequest(data)
      const msg = result.msg || result.errorMsg
      if (msg === "操作成功") {
        ElMessage.success({
          message: "添加成功"
        })
        dispatch("getAccountAction")
        callback()
      } else {
        ElMessage.error({
          message: msg
        })
      }
    }
  }
}

export default mainModule
