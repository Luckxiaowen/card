import {
  getCompanyFrame,
  updateCompanyFrameName,
  addCompanyFrame,
  delCompanyFrameById
} from "@/service/main/options/options-organize"
import { treeMatch } from "@/utils/select-tree"

const mainModule = {
  namespaced: true,
  state: {
    departmentList: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeDepartment(state, departmentList) {
      state.departmentList = departmentList
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
    async getCompanyFrameAction({ commit }, payload) {
      const result = await getCompanyFrame()
      const newResult = treeMatch(result.data[0].children)
      commit("changeDepartment", newResult)
    },
    async updateCompanyFrameNameAction({ commit }, payload) {},
    async addCompanyFrameAction({ commit }, payload) {},
    async delCompanyFrameByIdAction({ commit }, payload) {}
  }
}

export default mainModule
