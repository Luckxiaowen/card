export default {
  path: "/main/content/content-article",
  component: () => import("@/layout/layoutBlank.vue"),
  redirect: { name: "content-article" },
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
        import("@/views/main/content/content-addarticle/content-addarticle.vue")
    }
  ]
}
