export const pathMap = (path, isEdit = false) =>
  ({
    "/main/home": [{ name: "首页", path: "/main/home" }],
    "/main/description/description-config": [
      { name: "个性化简介", path: "/main/description/description-config" },
      { name: "配置", path: "/main/description/description-config" }
    ],
    "/main/description/description-categoray": [
      { name: "个性化简介", path: "/main/description/description-categoray" },
      { name: "分类管理", path: "/main/description/description-categoray" }
    ],
    "/main/description/description-addcate": [
      { name: "个性化简介", path: "/main/description/description-categoray" },
      { name: "分类管理", path: "/main/description/description-categoray" },
      {
        name: `${isEdit ? "编辑分类" : "新增分类"}`,
        path: "/main/description/description-addcate"
      }
    ],
    "/main/content/content-config": [
      { name: "个性化内容", path: "/main/content/content-config" },
      { name: "配置", path: "/main/content/content-config" }
    ],
    "/main/content/content-categoray": [
      { name: "个性化内容", path: "/main/content/content-categoray" },
      { name: "分类管理", path: "/main/content/content-categoray" }
    ],
    "/main/content/content-addcate": [
      { name: "个性化内容", path: "/main/content/content-categoray" },
      { name: "分类管理", path: "/main/content/content-categoray" },
      {
        name: `${isEdit ? "编辑分类" : "新增分类"}`,
        path: "/main/content/content-addcate"
      }
    ],
    "/main/content/content-article": [
      { name: "个性化内容", path: "/main/content/content-article" },
      { name: "文章管理", path: "/main/content/content-article" }
    ],
    "/main/content/content-addarticle": [
      { name: "个性化内容", path: "/main/content/content-article" },
      { name: "文章管理", path: "/main/content/content-article" },
      {
        name: `${isEdit ? "编辑文章" : "新增文章"}`,
        path: "/main/content/content-addarticle"
      }
    ],
    "/main/member/member-staff": [
      { name: "人员", path: "/main/member/member-staff" },
      { name: "员工管理", path: "/main/member/member-staff" }
    ],
    "/main/member/member-add": [
      { name: "人员", path: "/main/member/member-staff" },
      { name: "员工管理", path: "/main/member/member-staff" },
      {
        name: `${isEdit ? "编辑员工" : "新增员工"}`,
        path: "/main/member/member-add"
      }
    ],
    "/main/member/member-client": [
      { name: "人员", path: "/main/member/member-client" },
      { name: "客户管理", path: "/main/member/member-client" }
    ],
    "/main/options/options-organize": [
      { name: "设置", path: "/main/options/options-organize" },
      { name: "组织架构", path: "/main/options/options-organize" }
    ],
    "/main/options/options-role": [
      { name: "设置", paht: "/main/options/options-role" },
      { name: "角色管理", path: "/main/options/options-role" }
    ],
    "/main/options/options-roleadd": [
      { name: "设置", paht: "/main/options/options-role" },
      { name: "角色管理", path: "/main/options/options-role" },
      {
        name: `${isEdit ? "编辑角色" : "新增角色"}`,
        path: "/main/options/options-roleadd"
      }
    ],
    "/main/options/options-account": [
      { name: "设置", path: "/main/options/options-account" },
      { name: "账号管理", path: "/main/options/options-account" }
    ],
    "/main/options/options-accountadd": [
      { name: "设置", path: "/main/options/options-account" },
      { name: "账号管理", path: "/main/options/options-account" },
      {
        name: `${isEdit ? "编辑账号" : "新增账号"}`,
        path: "/main/options/options-accountadd"
      }
    ],
    "/main/options/options-platform": [
      { name: "设置", path: "/main/options/options-platform" },
      { name: "平台管理", path: "/main/options/options-platform" }
    ],
    "/main/options/options-companyadd": [
      { name: "设置", path: "/main/options/options-platform" },
      { name: "平台管理", path: "/main/options/options-platform" },
      {
        name: `${isEdit ? "编辑企业" : "新增企业"}`,
        path: "/main/options/options-companyadd"
      }
    ]
  }[path])
