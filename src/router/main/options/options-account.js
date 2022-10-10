export default {
  path: "/main/options/options-account",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "options-account" },
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
        import("@/views/main/options/options-accountadd/options-accountadd.vue")
    }
  ]
}
