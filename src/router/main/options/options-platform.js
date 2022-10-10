export default {
  path: "/main/options/options-platform",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "options-platform" },
  children: [
    {
      path: "",
      name: "options-platform",
      component: () =>
        import("@/views/main/options/options-platform/options-platform.vue")
    },
    {
      path: "/main/options/options-companyadd",
      name: "options-companyadd",
      component: () =>
        import("@/views/main/options/options-companyadd/options-companyadd.vue")
    }
  ]
}
