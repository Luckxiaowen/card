import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import "element-plus/theme-chalk/el-loading.css"
import "element-plus/theme-chalk/el-message.css"

import * as ElementPlusIconsVue from "@element-plus/icons-vue"

export default function (app) {
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 日期显示中文
  app.use(ElementPlus, {
    locale: zhCn
  })
}
