import { createRouter, createWebHashHistory } from "vue-router"
import localCache from "@/utils/cache"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

const routes = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue") // 路由懒加载
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        path: "/main/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/main/password-reset/password-reset.vue")
      }
    ]
  },
  {
    path: "/preview/:id",
    name: "preview",
    component: () => import("@/views/preview/preview.vue") // 路由懒加载
  },
  {
    path: "/:pathMatch(.*)*", // ()里面是匹配正则，后面的*作用是以斜杠分割，解析成数组
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  NProgress.start()
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }

  if (to.path === "/main") {
    return "/main/home"
  }
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router
