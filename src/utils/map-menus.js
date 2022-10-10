// 查找当前路径所对应的路由
export function pathMapToMenu(userMenus, currentPath, breadcrumbs) {
  for (const menu of userMenus) {
    if (menu.childrenMenu?.length !== 0 && menu.childrenMenu !== null) {
      const findMenu = pathMapToMenu(menu.childrenMenu ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (
      (menu.childrenMenu?.length === 0 || menu.childrenMenu === null) &&
      menu.path === currentPath
    ) {
      return menu
    }
  }
}

let firstMenu = null

export function mapMenusToRoutes(userMenus) {
  const routes = []

  // 1. 先去加载默认所有的routes
  const allRoutes = []
  const routeFiles = require.context("../router/main", true, /\.js/) // 参数：基础路径，递归（false：查找第一层文件夹文件，true：查找多层文件夹文件），要找的文件后缀

  // 返回文件所在路径
  routeFiles.keys().forEach((key) => {
    // 这里拼接可以用resolve吗？最好不要，因为可能会有问题
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus) => {
    if (menus !== null) {
      for (const menu of menus) {
        // 如果childrenMenu等于null或[]时，就导入路由，如果不等于就继续递归
        if (menu.childrenMenu == null || menu.childrenMenu.length == 0) {
          const route = allRoutes.find((route) => {
            return route.path === menu.path
          })
          if (route) routes.push(route)
          // 默认激活第一个菜单
          if (!firstMenu) {
            firstMenu = menu
          }
        } else {
          _recurseGetRoute(menu.childrenMenu)
        }
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }
