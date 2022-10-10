import { getCompanyRole } from "@/service/main/options/options-role.js"

const mainModule = {
  namespaced: true,
  state: {
    roleList: [],
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  mutations: {
    changeRoleList(state, roleList) {
      state.roleList = roleList
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
    async getCompanyRolAction({ commit }) {
      const result = await getCompanyRole()
      const beforeRoleList = result.data
      if (beforeRoleList && beforeRoleList.length > 0) {
        var afterRoleList = beforeRoleList.map((item) => ({
          value: item.id,
          label: item.name
        }))
      }
      commit("changeRoleList", afterRoleList)
    }
  }
}

export default mainModule
