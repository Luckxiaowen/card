<template>
  <div class="content-config">
    <div class="module-show">
      <div class="title">模块展示</div>
      <div class="main">
        <el-switch v-model="isShow" active-text="打开" inactive-text="关闭" />
      </div>
    </div>
    <div class="module-message">
      <div class="title">模块信息</div>
      <div class="main">
        <div class="row">
          <div class="col name">*模块名称</div>
          <div class="col input">
            <el-input v-model="moduleMessage" placeholder="请输入" />
          </div>
        </div>

        <div class="row">
          <div class="col name">*模块banner</div>
          <div class="col"><file-upload /></div>
        </div>
      </div>
    </div>
    <div class="module-save">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import FileUpload from "@/base-ui/file-upload/file-upload.vue"
export default {
  components: {
    FileUpload
  },
  setup() {
    const isShow = ref(true)
    const moduleMessage = ref("")
    return { isShow, moduleMessage }
  }
}
</script>

<style lang="scss" scoped>
.content-config {
  padding: 20px;

  .module-show,
  .module-message {
    margin-bottom: 30px;
    .title {
      border-left: 5px solid #2c3039;
      padding-left: 10px;
      margin-bottom: 20px;
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
}
</style>
