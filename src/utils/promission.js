import store from "@/store" // 拿到的是createStore创建的store实例

export function usePermission(pageName, handleName) {
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission)
}

export function mapMenusToPermissions(userMenus) {
  const permissions = []

  const _recurseGetPermission = (menus) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []) // []是递归出口
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 0. 获取操作的权限
//   const isCreate = usePermission(props.pageName, "create");
//   const isUpdate = usePermission(props.pageName, "update");
//   const isDelete = usePermission(props.pageName, "delete");
//   const isQuery = usePermission(props.pageName, "query");
