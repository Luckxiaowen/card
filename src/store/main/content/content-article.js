import {
  addCaseContentRequest,
  updateCaseContentRequest,
  deleteCaseContentRequest,
  listCaseContentRequest,
  pageCaseContentRequest,
  casecontentConditionsRequest
} from "@/service/main/content/content-article"

const mainModule = {
  namespaced: true,
  state: {
    companycase: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeCompanycase(state, companycase) {
      state.companycase = companycase
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
    async pageCompanycaseAction({ state, commit }) {
      const data = {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
      const result = await pageCaseContentRequest(data)

      commit("changePageTotal", result.data.total)
      commit("changeCompanycase", result.data.data)
    },
    async addCompanycaseAction({ commit, dispatch }, { data, callback }) {
      const result = await addCaseContentRequest(data)
      dispatch("pageCompanycaseAction")
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "添加成功":
          ElMessage.success({
            message: "添加成功"
          })
          callback()
          break
        case "当前公司已有相同文章标题的文章，请修改标题":
          ElMessage.error({
            message: msg
          })
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async updateCompanycaseAction({ commit, dispatch }, { data, callback }) {
      const result = await updateCaseContentRequest(data)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "更新成功":
          ElMessage.success({
            message: "修改成功"
          })
          callback()
          break
        case "当前公司已有相同文章标题的文章，请修改标题":
          ElMessage.error({
            message: msg
          })
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
      dispatch("pageCompanycaseAction")
    },
    async deleteCompanycaseAction({ commit, dispatch }, id) {
      const result = await deleteCaseContentRequest(id)
      dispatch("pageCompanycaseAction")
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "删除成功":
          ElMessage.success({
            message: msg
          })
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async casecontentConditionsAction({ commit }, payload) {
      const result = await casecontentConditionsRequest(payload)

      commit("changeCompanycase", result.data)
    }
  }
}

export default mainModule
