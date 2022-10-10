import {
  listCompanycateRequest,
  addCompanycateRequest,
  deleteCompanycateRequest,
  updateCompanycateRequest,
  pageCompanycateRequest,
  companycateUpdateSortRequest
} from "@/service/main/content/content-categoray"

const mainModule = {
  namespaced: true,
  state: {
    companycate: [],
    categoray: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeCompanycate(state, companycate) {
      state.companycate = companycate
    },
    changePageNum(state, pageNum) {
      state.pageNum = pageNum
    },
    changePageSize(state, pageSize) {
      state.pageSize = pageSize
    },
    changePageTotal(state, pageTotal) {
      state.pageTotal = pageTotal
    },
    changeCategoray(state, categoray) {
      state.categoray = categoray
    }
  },
  actions: {
    async listCompanycateAction({ state, commit }) {
      const result = await listCompanycateRequest()
      const newResult = result.data.map((item) => ({
        value: item.id,
        label: item.caseName
      }))
      commit("changeCategoray", newResult)
    },
    async pageCompanycateAction({ state, commit }) {
      const data = {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
      const result = await pageCompanycateRequest(data)

      commit("changePageTotal", result.data.total)
      commit("changeCompanycate", result.data.data)
    },
    async addCompanycateAction({ commit, dispatch }, { data, callback }) {
      const result = await addCompanycateRequest(data)
      dispatch("pageCompanycateAction")
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "案列分类添加成功":
          ElMessage.success({
            message: "添加成功"
          })
          callback()
          break
        case "Required request parameter 'caseName' for method parameter type String is not present":
          ElMessage.error({
            message: "请输入分类名称"
          })
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async updateCompanycateAction({ commit, dispatch }, { data, callback }) {
      const result = await updateCompanycateRequest(data)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "修改成功":
          ElMessage.success({
            message: msg
          })
          callback()
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
      dispatch("pageCompanycateAction")
    },
    async deleteCompanycateAction({ commit, dispatch }, id) {
      const result = await deleteCompanycateRequest(id)
      dispatch("pageCompanycateAction")
      console.log(result)
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
    async companycateUpdateSortAction({ commit, dispatch }, payload) {
      const result = await companycateUpdateSortRequest(payload)
      console.log(result)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "上移成功":
          dispatch("pageCompanycateAction")
          ElMessage.success({
            message: msg
          })
          break
        case "下移成功":
          dispatch("pageCompanycateAction")
          ElMessage.success({
            message: msg
          })
          break
        case "已是第一条":
          dispatch("pageCompanycateAction")
          ElMessage.warning({
            message: msg
          })
          break
        case "已是最后一条":
          dispatch("pageCompanycateAction")
          ElMessage.warning({
            message: msg
          })
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    }
  }
}

export default mainModule
