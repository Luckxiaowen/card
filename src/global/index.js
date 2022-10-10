import registerElement from "./register-element"
import registerProperties from "./register-properties"

export function globalRegister(app) {
  // 写法一：
  // registerElement(app);

  // 写法二：
  app.use(registerElement) // 注册插件默认函数参数就是app
  app.use(registerProperties)
}
