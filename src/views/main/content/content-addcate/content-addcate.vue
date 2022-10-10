<template>
  <div class="content-addcate">
    <div class="title">{{ isEdit ? "编辑分类" : "新增分类" }}</div>
    <div class="main">
      <div class="row">
        <div class="col name">*分类名称</div>
        <div class="col input">
          <el-input
            v-model="caseName"
            @input="handleSaveInput"
            placeholder="请输入"
          />
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
import { ref } from "vue"
import store from "@/store"
import { useRoute, useRouter } from "vue-router"
import LocalCache from "@/utils/cache"
import { ElMessage } from "element-plus"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isEdit = route.query.isEdit

    // 获取缓存
    let companycaseName = LocalCache.getCache("companycate-name")
    const caseName = ref(companycaseName)

    // 判断是否为编辑状态，还是新增状态
    // 如果是编辑：则清除缓存，显示当前分类内容
    // 如果是新增：则显示缓存内容
    if (isEdit) {
      caseName.value = ""
      const index = route.query.index
      const findOut =
        store.state.contentCategoray.companycate[index] ??
        LocalCache.getCache("companycateEditTemp")

      LocalCache.setCache("companycateEditTemp", findOut)

      caseName.value = findOut?.caseName
    }

    const handleSaveInput = (value) => {
      if (!isEdit) {
        LocalCache.setCache("companycate-name", value)
      }
    }

    // 保存逻辑
    const handleSaveClick = () => {
      // 校验规则
      if (!caseName.value) {
        return ElMessage.warning({
          message: "请输入分类名称"
        })
      }

      if (isEdit) {
        // 编辑状态
        const id = route.query.id
        const data = {
          id: id,
          caseName: caseName.value
        }
        store.dispatch("contentCategoray/updateCompanycateAction", {
          data,
          callback() {
            router.go(-1)
          }
        })
      } else {
        // 新增状态
        const data = { caseName: caseName.value }

        store.dispatch("contentCategoray/addCompanycateAction", {
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
      LocalCache.removeCache("companycate-name")
    })

    return {
      handleSaveInput,
      handleSaveClick,
      handleCancelClick,
      caseName,
      isEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.content-addcate {
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
    }
  }
}
</style>
