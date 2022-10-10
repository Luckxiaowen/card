import {
  addCompanyRequest,
  deleteCompanyRequest,
  listCompanyRequest,
  modifyCompanyRequest,
  searchCompanyRequest
} from "@/service/main/options/options-platform"

const mainModule = {
  namespaced: true,
  state: {
    companyList: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeCompanyList(state, companyList) {
      state.companyList = companyList
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
    async addCompanyAction({ commit }, payload) {
      const result = await addCompanyRequest()
    },
    async deleteCompanyAction({ commit }, payload) {
      const result = await deleteCompanyRequest()
    },
    async listCompanyAction({ commit }, payload) {
      const result = await listCompanyRequest()
      commit("changeCompanyList", result.data)
    },
    async modifyCompanyAction({ commit }, payload) {
      const result = await modifyCompanyRequest()
    },
    async searchCompanyAction({ commit }, payload) {
      const result = await searchCompanyRequest()
    }
  }
}

export default mainModule
