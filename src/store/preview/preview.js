import {
  getPersonalRequest,
  getCommentsRequest,
  getPhotoRequest,
  getDescRequest
} from "@/service/preview/preview"

const mainModule = {
  namespaced: true,
  state: {
    personal: null,
    comments: [],
    photo: "",
    desc: ""
  },
  mutations: {
    changePersonal(state, personal) {
      state.personal = personal
    },
    changeComments(state, comments) {
      state.comments = comments
    },
    changePhoto(state, photo) {
      state.photo = photo
    },
    changeDesc(state, desc) {
      state.desc = desc
    }
  },
  actions: {
    async getPersonalAction({ commit }, id) {
      const result = await getPersonalRequest(id)
      commit("changePersonal", result.data)
    },
    async getCommentsAction({ commit }, id) {
      const result = await getCommentsRequest(id)
      commit("changeComments", result.data)
    },
    async getPhotoAction({ commit }, id) {
      const result = await getPhotoRequest(id)
      commit("changePhoto", result.data.photo)
    },
    async getDescAction({ commit }, id) {
      const result = await getDescRequest(id)
      commit("changeDesc", result.data.info)
    }
  }
}

export default mainModule
