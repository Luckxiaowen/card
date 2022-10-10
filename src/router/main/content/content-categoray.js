export default {
  path: "/main/content/content-categoray",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "content-categoray" },
  children: [
    {
      path: "",
      name: "content-categoray",
      component: () =>
        import("@/views/main/content/content-categoray/content-categoray.vue")
    },
    {
      path: "/main/content/content-addcate",
      name: "content-addcate",
      component: () =>
        import("@/views/main/content/content-addcate/content-addcate.vue")
    }
  ]
}
