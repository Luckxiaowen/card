<template>
  <div class="password-reset">
    <div class="title">修改密码</div>
    <div class="main">
      <div class="row">
        <div class="col name">*原密码</div>
        <div class="col input">
          <el-input v-model="moduleMessage" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*新密码</div>
        <div class="col input">
          <el-input v-model="moduleMessage" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*新密码确认</div>
        <div class="col input">
          <el-input v-model="moduleMessage" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router"

export default {
  setup() {
    const route = useRoute()
    return {}
  }
}
</script>

<style lang="scss" scoped>
.password-reset {
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
