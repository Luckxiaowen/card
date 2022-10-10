import { accountLoginRequest } from "@/service/login/login"
import localCache from "@/utils/cache"
import { mapMenusToRoutes } from "@/utils/map-menus"
import router from "@/router"
import { mockMenu } from "@/mock/menu.js"

const loginModule = {
  namespaced: true,
  state: {
    token: "",
    menu: [],
    permissions: []
  },
  getters: {},
  mutations: {
    // 这里叫change原因是下一次登录时更新，获取最新的token和userinfo
    changeToken(state, token) {
      state.token = token
    },
    changeMenu(state, menu) {
      state.menu = menu
      // 获取动态路由
      const routes = mapMenusToRoutes(menu)
      // 注册动态路由
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户按钮的权限
      // const permissions = mapMenusToPermissions(userMenus)
      // state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload) {
      // 1. 用户登录逻辑
      const loginResult = await accountLoginRequest(payload)

      if (loginResult.code === 200) {
        ElMessage.success({
          message: "登录成功"
        })

        const { menu, token } = loginResult.data
        commit("changeToken", token)
        localCache.setCache("token", token)

        // 角色菜单
        // commit("changeMenu", menu)
        // localCache.setCache("menu", menu)

        // 模拟菜单
        commit("changeMenu", mockMenu)
        localCache.setCache("menu", mockMenu)

        router.push("/main")
      } else {
        ElMessage.error({
          message: "登录失败"
        })
      }
    },
    loadLocalLogin({ commit, dispatch }) {
      dispatch("getInitialDataAction", null, { root: true }) // 向父级store调用方法

      const token = localCache.getCache("token")
      commit("changeToken", token)

      const menu = localCache.getCache("menu")
      commit("changeMenu", menu)
    }
  }
}

export default loginModule
