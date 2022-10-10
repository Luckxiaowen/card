export default {
  path: "/main/member/member-staff",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "member-staff" },
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
      component: () => import("@/views/main/member/member-add/member-add.vue")
    }
  ]
}
