export function treeMatch(beforeList) {
  const afterList = beforeList.map((item) => {
    if (item.children.length >= 0) {
      return {
        value: item.id,
        label: item.roleName,
        children: treeMatch(item.children)
      }
    }
  })
  return afterList
}
