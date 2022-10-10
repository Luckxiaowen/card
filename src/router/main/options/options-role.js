export default {
  path: "/main/options/options-role",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "options-role" },
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
}
