<template>
  <div class="description-addcate">
    <div class="title">{{ isEdit ? "编辑分类" : "新增分类" }}</div>
    <div class="main">
      <div class="row">
        <div class="col name">*分类名称</div>
        <div class="col input">
          <el-input
            v-model="infoName"
            @input="handleSaveInput"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row editor">
        <div class="col name">*内容简介</div>
        <div class="col">
          <div style="border: 1px solid #ccc; margin-top: 10px">
            <Toolbar
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
              style="border-bottom: 1px solid #ccc"
            />
            <Editor
              :defaultConfig="editorConfig"
              :mode="mode"
              v-model="infoHtml"
              style="height: 400px; overflow-y: hidden"
              @onCreated="handleCreated"
              @onChange="handleChange"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <el-button type="primary" @click="handleSaveClick">保存</el-button>
        <el-button @click="handleCancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { useRoute, useRouter } from "vue-router"
import { uploadImageRequest } from "@/service/main/upload/upload"
import store from "@/store"
import LocalCache from "@/utils/cache"
import { ElMessage } from "element-plus"

export default {
  components: { Editor, Toolbar },
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 名称和简介参数
    let companyinfoName = LocalCache.getCache("companyinfo-name")
    let companyinfoHtml = LocalCache.getCache("companyinfo-html")

    const infoName = ref(companyinfoName)
    const infoHtml = ref(companyinfoHtml)

    const isEdit = route.query.isEdit
    if (isEdit) infoHtml.value = ""

    // 编辑器相关逻辑
    const editorRef = shallowRef()

    onMounted(() => {
      // 编辑状态时加载该内容（需要是异步任务才能加载）
      setTimeout(() => {
        if (isEdit) {
          const index = route.query.index
          const findOut =
            store.state.descriptionCategory.companyinfo[index] ??
            LocalCache.getCache("companyinfoEditTemp")

          LocalCache.setCache("companyinfoEditTemp", findOut)

          infoName.value = findOut.infoName
          infoHtml.value = findOut.infoContent
        }
      }, 0)
    })

    // 编辑器配置
    const toolbarConfig = {}
    const editorConfig = { MENU_CONF: {} }
    editorConfig.placeholder = "请输入内容..."
    editorConfig.MENU_CONF["uploadImage"] = {
      // 上传图片配置
      server: "http://124.222.39.14:8001/upload-me",
      async customUpload(file, insertFn) {
        // file 即选中的文件
        const result = await uploadImageRequest({ file: file })
        const url = "http://" + result.data.url
        const alt = ""
        const href = "javascript:;"
        // 最后插入图片
        insertFn(url, alt, href)
      }
    }

    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return

      editor.destroy()
    })

    // 编辑器回调函数
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 输入内容时保存到本地，避免刷新清空的情况
    const handleChange = (editor) => {
      infoHtml.value = editor.getHtml()
      // 不是编辑时不自动保存
      if (!isEdit) {
        LocalCache.setCache("companyinfo-html", infoHtml.value)
      }
    }

    const handleSaveInput = (value) => {
      if (!isEdit) {
        LocalCache.setCache("companyinfo-name", value)
      }
    }

    // 保存逻辑
    const handleSaveClick = async () => {
      // 规则校验
      if (!infoName.value) {
        return ElMessage.warning({
          message: "请输入分类名称"
        })
      }

      if (infoHtml.value === "<p><br></p>") {
        return ElMessage.warning({
          message: "请输入内容简介"
        })
      }

      if (isEdit) {
        // 编辑公司分类保存
        const id = route.query.id
        const data = {
          id: id,
          infoName: infoName.value,
          infoContent: infoHtml.value
        }
        store.dispatch("descriptionCategory/updateCompanyinfoAction", {
          data,
          callback() {
            router.go(-1)
          }
        })
      } else {
        // 新增公司分类保存
        const data = {
          infoName: infoName.value,
          infoContent: infoHtml.value
        }
        store.dispatch("descriptionCategory/addCompanyinfoAction", {
          data,
          callback() {
            router.go(-1)
          }
        })
      }
    }

    const handleCancelClick = () => {
      ElMessageBox.confirm("确定要取消吗？").then(() => {
        router.go(-1)
      })
    }

    router.beforeEach(() => {
      // 清除缓存
      infoName.value = ""
      infoHtml.value = ""
      LocalCache.removeCache("companyinfo-name")
      LocalCache.removeCache("companyinfo-html")
    })

    return {
      editorRef,
      mode: "default",
      infoHtml,
      toolbarConfig,
      editorConfig,
      infoName,
      isEdit,
      handleCreated,
      handleChange,
      handleSaveClick,
      handleSaveInput,
      handleCancelClick
    }
  }
}
</script>

<style lang="scss" scoped>
.description-addcate {
  padding: 20px;

  .title {
    border-left: 5px solid #2c3039;
    padding-left: 10px;
    margin-bottom: 30px;
  }
  .main {
    > .row {
      display: flex;
      margin-bottom: 20px;

      .name {
        padding-top: 3px;
        width: 100px;
      }

      .input {
        width: 300px;
      }
    }

    .editor {
      margin-bottom: 30px;
    }
  }
}
</style>
