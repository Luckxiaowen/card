import {
  listStaffRequest,
  pageStaffRequest,
  addStaffRequest,
  updateStaffRequest,
  deleteStaffRequest,
  getStaffRequest,
  uploadFileRequest,
  excelImportRequest
} from "@/service/main/member/member-staff"

const mainModule = {
  namespaced: true,
  state: {
    staffList: [],
    staffInfo: null,
    pageNum: 1,
    pageSize: 10,
    pageTotal: 0
  },
  getters: {
    getCurrentStaff(state) {
      return (index) => state.staffList[index]
    }
  },
  mutations: {
    changeMemberList(state, staffList) {
      state.staffList = staffList
    },
    changeStaffInfo(state, staffInfo) {
      state.staffInfo = staffInfo
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
    async pageSyaffAction({ state, commit }) {
      const data = {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
      const result = await pageStaffRequest(data)
      commit("changePageTotal", result.data.total)
      commit("changeMemberList", result.data.data)
    },
    async getStaffInfoAction({ commit }, id) {
      const result = await getStaffRequest(id)
      commit("changeStaffInfo", result.data)
    },
    async addStaffAction({ commit }, { data, callback }) {
      const result = await addStaffRequest(data)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "操作成功":
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
    async deleteStaffAction({ commit, dispatch }, id) {
      const result = await deleteStaffRequest(id)
      console.log(result)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "操作成功":
          ElMessage.success({
            message: "删除成功"
          })
          dispatch("pageSyaffAction")
          break
        default:
          ElMessage.error({
            message: msg
          })
      }
    },
    async updateStaffAction({ commit }, { data, callback }) {
      const result = await updateStaffRequest(data)
      console.log(result)
      const msg = result.msg || result.errorMsg
      switch (msg) {
        case "操作成功":
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
    async uploadFileAction({ commit }, payload) {},

    async excelImportAction({ commit, dispatch }, { data, callback }) {
      console.log(data)
      const result = await excelImportRequest(data)
      console.log(result)
      setTimeout(() => {
        // ElMessage.success({
        //   message: "导入成功"
        // })
        callback()
      }, 1000)
      // const msg = result.msg || result.errorMsg
      // 更新员工列表
      // dispatch('')
    }
  }
}

export default mainModule
