<template>
  <div>
    <div class="content-addarticle">
      <div class="title">{{ isEdit ? "编辑文章" : "新增文章" }}</div>
      <div class="main">
        <div class="row">
          <div class="col name">*文章名称</div>
          <div class="col input">
            <el-input
              v-model="articleName"
              @input="handleSaveInput"
              placeholder="请输入"
            />
          </div>
        </div>
        <div class="row">
          <div class="col name">*所属分类</div>
          <div class="col input">
            <el-select
              v-model="articleType"
              @change="handleSelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in categoray"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="col name">*基础浏览量</div>
          <div class="col input">
            <el-input
              v-model="articleView"
              @input="handleSaveInput"
              placeholder="请输入"
              type="number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col name">*文章封面</div>
          <div class="col">
            <el-upload
              v-model:file-list="articleImage"
              action="http://124.222.39.14:8001/upload-me"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :hasHttp="false"
              :limit="1"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
        </div>
        <div class="row editor">
          <div class="col name">*文章内容</div>
          <div class="col">
            <div
              style="
                border: 1px solid #ccc;
                margin-top: 10px;
                max-width: calc(100vw - 400px);
              "
            >
              <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
                style="border-bottom: 1px solid #ccc"
              />
              <Editor
                :defaultConfig="editorConfig"
                :mode="mode"
                v-model="articleContent"
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
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"
import { onBeforeUnmount, ref, shallowRef, computed } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { useRoute, useRouter } from "vue-router"
import { uploadImageRequest } from "@/service/main/upload/upload"
import store from "@/store"
import LocalCache from "@/utils/cache"
import { ElMessage } from "element-plus"

export default {
  components: { Editor, Toolbar },
  setup() {
    // 获取案例分类
    store.dispatch("contentCategoray/listCompanycateAction")

    const router = useRouter()
    const route = useRoute()

    const categoray = computed(() => store.state.contentCategoray.categoray)

    // 根据id回显文章内容

    const articleNameLocal = LocalCache.getCache("article-name")
    const articleTypeLocal = LocalCache.getCache("article-type")
    const articleViewLocal = LocalCache.getCache("article-view") ?? 0
    const articleImageLocal = LocalCache.getCache("article-image") ?? []
    const articleContentLocal = LocalCache.getCache("article-content")

    const articleName = ref(articleNameLocal)
    const articleType = ref(articleTypeLocal)
    const articleView = ref(articleViewLocal)
    const articleImage = ref(articleImageLocal)
    const articleContent = ref(articleContentLocal)

    const isEdit = route.query.isEdit

    // 非编辑状态时内容清空
    if (isEdit) {
      articleName.value = ""
      articleType.value = ""
      articleView.value = 0
      articleImage.value = []
      articleContent.value = ""

      // 显示编辑状态的内容
      setTimeout(() => {
        if (isEdit) {
          const index = route.query.index
          const findOut =
            store.state.contentArticle.companycase[index] ??
            LocalCache.getCache("companycaseEditTemp")

          LocalCache.setCache("companycaseEditTemp", findOut)
          LocalCache.setCache("article-image", [
            { name: "", url: findOut.imgPath }
          ])

          articleName.value = findOut.title
          articleType.value = findOut.caseId
          articleView.value = findOut.visitorNum
          articleContent.value = findOut.content
          articleImage.value = [{ name: "", url: findOut.imgPath }]
        }
      }, 0)
    }

    // 图片上传逻辑
    const dialogImageUrl = ref("")
    const dialogVisible = ref(false)

    const handleSuccess = (res, file, files) => {
      const url = res.data.url
      LocalCache.setCache("article-image", [{ name: "", url }])
    }

    const handleRemove = (uploadFile, uploadFiles) => {
      if (!isEdit) {
        LocalCache.setCache("article-image", [])
      }
    }

    const handlePictureCardPreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }

    // 富文本逻辑
    const editorRef = shallowRef()

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

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 本地保存逻辑
    const handleSaveInput = () => {
      if (!isEdit) {
        LocalCache.setCache("article-name", articleName.value)
        LocalCache.setCache("article-view", articleView.value)
      }
    }

    const handleSelect = (value) => {
      LocalCache.setCache("article-type", value)
    }

    const handleChange = (editor) => {
      articleContent.value = editor.getHtml()
      // 不是编辑时不自动保存
      if (!isEdit) {
        LocalCache.setCache("article-content", articleContent.value)
      }
    }

    const handleSaveClick = async () => {
      // 规则校验
      if (!articleName.value) {
        return ElMessage.warning({
          message: "请输入文章名称"
        })
      }
      if (!articleType.value) {
        return ElMessage.warning({
          message: "请选择所属分类"
        })
      }
      if (articleView.value < 0) {
        console.log(articleView.value)
        return ElMessage.warning({
          message: "浏览量不能为负"
        })
      }

      if (articleImage.value.length === 0) {
        return ElMessage.warning({
          message: "请上传文章封面"
        })
      }
      if (articleContent.value === "<p><br></p>") {
        return ElMessage.warning({
          message: "请输入文章内容"
        })
      }

      const id = route.query.id
      const imgPath = "http://" + LocalCache?.getCache("article-image")[0]?.url

      if (isEdit) {
        // 编辑文章
        const data = {
          id: id,
          title: articleName.value,
          caseId: articleType.value,
          imgPath,
          visitorNum: articleView.value,
          content: articleContent.value
        }

        store.dispatch("contentArticle/updateCompanycaseAction", {
          data,
          callback() {
            router.go(-1)
          }
        })
      } else {
        // 新增文章
        const data = {
          title: articleName.value,
          caseId: articleType.value,
          imgPath,
          visitorNum: articleView.value,
          content: articleContent.value
        }
        store.dispatch("contentArticle/addCompanycaseAction", {
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
      articleContent.value = ""
      LocalCache.removeCache("article-name")
      LocalCache.removeCache("article-type")
      LocalCache.removeCache("article-view")
      LocalCache.removeCache("article-image")
    })

    return {
      categoray,
      articleName,
      articleType,
      articleView,
      articleContent,
      editorRef,
      mode: "default",
      toolbarConfig,
      editorConfig,
      isEdit,
      articleImage,
      dialogImageUrl,
      dialogVisible,
      handleSelect,
      handleCreated,
      handleChange,
      handleSaveClick,
      handleSaveInput,
      handleCancelClick,
      handleSuccess,
      handleRemove,
      handlePictureCardPreview
    }
  }
}
</script>

<style lang="scss" scoped>
.content-addarticle {
  padding: 20px;

  .title {
    border-left: 5px solid #2c3039;
    padding-left: 10px;
    margin-bottom: 30px;
  }

  .main {
    > .row {
      display: flex;
      margin-bottom: 30px;

      .name {
        padding-top: 3px;
        width: 100px;
      }

      .input {
        width: 300px;
      }

      .el-select {
        width: 300px;
      }
    }
  }
}

.el-dialog__body {
  img {
    width: 100% !important;
  }
}
</style>
