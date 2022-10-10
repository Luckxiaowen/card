export const mockMenu = [
  {
    id: 1,
    menuName: "首页",
    path: "/main/home",
    icon: "House",
    childrenMenu: []
  },
  {
    id: 2,
    menuName: "个性化简介",
    path: "/main/description",
    icon: "Menu",
    childrenMenu: [
      {
        id: 3,
        menuName: "配置",
        path: "/main/description/description-config",
        icon: "",
        childrenMenu: null
      },
      {
        id: 4,
        menuName: "分类管理",
        path: "/main/description/description-categoray",
        icon: "",
        childrenMenu: null
      }
    ]
  },
  {
    id: 5,
    menuName: "个性化内容",
    path: "/main/content",
    icon: "Menu",
    childrenMenu: [
      {
        id: 6,
        menuName: "配置",
        path: "/main/content/content-config",
        icon: "",
        childrenMenu: null
      },
      {
        id: 7,
        menuName: "分类管理",
        path: "/main/content/content-categoray",
        icon: "",
        childrenMenu: null
      },
      {
        id: 8,
        menuName: "文章管理",
        path: "/main/content/content-article",
        icon: "",
        childrenMenu: null
      }
    ]
  },
  {
    id: 9,
    menuName: "人员",
    path: "/main/member",
    icon: "User",
    childrenMenu: [
      {
        id: 10,
        menuName: "员工管理",
        path: "/main/member/member-staff",
        icon: "",
        childrenMenu: null
      },
      {
        id: 11,
        menuName: "客户管理",
        path: "/main/member/member-client",
        icon: "",
        childrenMenu: null
      }
    ]
  },
  {
    id: 12,
    menuName: "设置",
    path: "/main/options",
    icon: "Setting",
    childrenMenu: [
      {
        id: 13,
        menuName: "组织架构",
        path: "/main/options/options-organize",
        icon: "",
        childrenMenu: null
      },
      {
        id: 14,
        menuName: "角色管理",
        path: "/main/options/options-role",
        icon: "",
        childrenMenu: null
      },
      {
        id: 15,
        menuName: "账号管理",
        path: "/main/options/options-account",
        icon: "",
        childrenMenu: null
      },
      {
        id: 16,
        menuName: "平台管理",
        path: "/main/options/options-platform",
        icon: "",
        childrenMenu: null
      }
    ]
  }
]
