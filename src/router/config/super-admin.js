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
        path: "/main/home",
        name: "home",
        component: () => import("@/views/main/home/home.vue")
      },
      {
        path: "/main/description/description-categoray",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "", // 相当于匹配父级路径
            name: "description-categoray",
            component: () =>
              import(
                "@/views/main/description/description-categoray/description-categoray.vue"
              )
          },
          {
            path: "/main/description/description-addcate",
            name: "description-addcate",
            component: () =>
              import(
                "@/views/main/description/description-addcate/description-addcate.vue"
              )
          }
        ]
      },
      {
        path: "/main/description/description-config",
        name: "description-config",
        component: () =>
          import(
            "@/views/main/description/description-config/description-config.vue"
          )
      },
      {
        path: "/main/content/content-article",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "content-article",
            component: () =>
              import("@/views/main/content/content-article/content-article.vue")
          },
          {
            path: "/main/content/content-addarticle",
            name: "content-addarticle",
            component: () =>
              import(
                "@/views/main/content/content-addarticle/content-addarticle.vue"
              )
          }
        ]
      },
      {
        path: "/main/content/content-categoray",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "content-categoray",
            component: () =>
              import(
                "@/views/main/content/content-categoray/content-categoray.vue"
              )
          },
          {
            path: "/main/content/content-addcate",
            name: "content-addcate",
            component: () =>
              import("@/views/main/content/content-addcate/content-addcate.vue")
          }
        ]
      },
      {
        path: "/main/content/content-config",
        name: "content-config",
        component: () =>
          import("@/views/main/content/content-config/content-config.vue")
      },
      {
        path: "/main/member/member-staff",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "member-staff",
            component: () =>
              import("@/views/main/member/member-staff/member-staff.vue")
          },
          {
            path: "/main/member/member-add",
            name: "member-add",
            component: () =>
              import("@/views/main/member/member-add/member-add.vue")
          }
        ]
      },
      {
        path: "/main/member/member-client",
        name: "member-client",
        component: () =>
          import("@/views/main/member/member-client/member-client.vue")
      },
      {
        path: "/main/options/options-account",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "options-account",
            component: () =>
              import("@/views/main/options/options-account/options-account.vue")
          },
          {
            path: "/main/options/options-accountadd",
            name: "options-accountadd",
            component: () =>
              import(
                "@/views/main/options/options-accountadd/options-accountadd.vue"
              )
          }
        ]
      },
      {
        path: "/main/options/options-platform",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "options-platform",
            component: () =>
              import(
                "@/views/main/options/options-platform/options-platform.vue"
              )
          },
          {
            path: "/main/options/options-companyadd",
            name: "options-companyadd",
            component: () =>
              import(
                "@/views/main/options/options-companyadd/options-companyadd.vue"
              )
          }
        ]
      },
      {
        path: "/main/options/options-role",
        component: () => import("@/layout/layoutBlank.vue"),
        children: [
          {
            path: "",
            name: "options-role",
            component: () =>
              import("@/views/main/options/options-role/options-role.vue")
          },
          {
            path: "/main/options/options-roleadd",
            name: "options-roleadd",
            component: () =>
              import("@/views/main/options/options-roleadd/options-roleadd.vue")
          }
        ]
      },
      {
        path: "/main/options/options-organize",
        name: "options-organize",
        component: () =>
          import("@/views/main/options/options-organize/options-organize.vue")
      },
      {
        path: "/main/password-reset",
        name: "password-reset",
        meta: {
          hidden: true
        },
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
