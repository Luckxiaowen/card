const { defineConfig } = require("@vue/cli-service")
const { resolve } = require("path")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")

module.exports = defineConfig({
  // 1.配置方式一：CLI提供的属性
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: "./build",
  publicPath: "./", // 默认是/，会拼接域名，服务器用 --- ./会引入本地资源，本地测试用
  devServer: {
    proxy: {
      "^/api": {
        target: "http://124.222.39.14:8001",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true // 把本地源修改为目标源，避免后端做验证
      }
    }
  },
  // 2.配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        components: "@/components"
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
