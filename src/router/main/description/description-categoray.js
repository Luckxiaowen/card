export default {
  path: "/main/description/description-categoray",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "description-categoray" },
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
}
