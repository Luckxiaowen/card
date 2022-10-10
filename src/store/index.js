import { createStore } from "vuex"
import login from "./login/login"
import descriptionCategory from "./main/description/description-categoray"
import contentCategoray from "./main/content/content-categoray"
import contentArticle from "./main/content/content-article"
import memberStaff from "./main/member/member-staff"
import optionsOrganize from "./main/options/options-organize"
import optionsPlatform from "./main/options/options-platform"
import optionsAccount from "./main/options/options-account"
import optionsRole from "./main/options/options-role"
import preview from "./preview/preview"

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取全部数据
    async getInitialDataAction({ commit }) {}
  },
  modules: {
    login,
    descriptionCategory,
    contentCategoray,
    contentArticle,
    memberStaff,
    optionsOrganize,
    optionsPlatform,
    optionsAccount,
    optionsRole,
    preview
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLogin")
}

export default store
