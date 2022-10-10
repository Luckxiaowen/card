import {
  addCompanyinfoRequest,
  deleteCompanyinfoRequest,
  updateCompanyinfoRequest,
  updateSortRequest,
  pageCompanyinfoRequest
} from "@/service/main/description/description-category"

const mainModule = {
  namespaced: true,
  state: {
    companyinfo: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeCompanyinfo(state, companyinfo) {
      state.companyinfo = companyinfo
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
    async addCompanyinfoAction({ commit }, { data, callback }) {
      const result = await addCompanyinfoRequest(data)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "分公司分简介添加成功！":
          ElMessage.success({
            message: "添加成功"
          })
          callback()
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async deleteCompanyinfoAction({ commit, dispatch }, id) {
      const result = await deleteCompanyinfoRequest(id)
      const msg = result.msg || result.errorMsg
      if (msg === "分公司简介删除成功！") {
        ElMessage.success({
          message: "删除成功"
        })
        dispatch("pageCompanyinfoAction")
      } else {
        ElMessage.error({
          message: msg
        })
      }
    },
    async pageCompanyinfoAction({ state, commit }) {
      const data = {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
      const result = await pageCompanyinfoRequest(data)

      commit("changePageTotal", result.data.total)
      commit("changeCompanyinfo", result.data.data)
    },
    async updateCompanyinfoAction({ commit }, { data, callback }) {
      // console.log(payload)
      const result = await updateCompanyinfoRequest(data)

      console.log(result)

      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "分公司分简介修改成功！":
          ElMessage.success({
            message: "修改成功"
          })
          callback()
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async updateSortAction({ commit, dispatch }, payload) {
      const result = await updateSortRequest(payload)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "上移成功":
          dispatch("pageCompanyinfoAction")
          ElMessage.success({
            message: msg
          })
          break
        case "下移成功":
          dispatch("pageCompanyinfoAction")
          ElMessage.success({
            message: msg
          })
          break
        case "已是第一条":
          dispatch("pageCompanyinfoAction")
          ElMessage.warning({
            message: msg
          })
          break
        case "已是最后一条":
          dispatch("pageCompanyinfoAction")
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
