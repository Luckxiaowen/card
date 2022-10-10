<template>
  <div class="login-board">
    <div class="left">
      <div class="title">
        <img src="@/assets/images/logo.png" class="logo" alt="" />
        <span class="name">91名片</span>
      </div>
    </div>
    <div class="right">
      <div class="login-box">
        <h3>欢迎登录</h3>
        <div class="login-content">
          <el-form :model="account" ref="ruleFormRef" :rules="rules">
            <el-form-item prop="phonenumber">
              <div class="label">账号</div>
              <el-input
                v-model="account.phonenumber"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="password">
              <div class="label">密码</div>
              <el-input
                v-model="account.password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
            <div class="forget">
              <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
              <el-link type="primary">忘记密码</el-link>
            </div>
            <el-form-item>
              <el-button
                type="primary"
                color="#146af3"
                @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import store from "@/store"
import localCache from "@/utils/cache"

export default {
  setup() {
    const isKeepPassword = ref(true)
    const ruleFormRef = ref(null)

    const account = reactive({
      phonenumber: localCache.getCache("phonenumber") ?? "",
      password: localCache.getCache("password") ?? ""
    })

    const rules = {
      phonenumber: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      ]
    }

    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          // TODO：发起登录请求

          if (isKeepPassword.value) {
            // 本地缓存
            localCache.setCache("phonenumber", account.phonenumber)
            localCache.setCache("password", account.password)

            store.dispatch("login/accountLoginAction", { ...account })
          } else {
            localCache.removeCache("phonenumber")
            localCache.removeCache("password")
          }
        } else {
          console.log("error submit!", fields)
        }
      })
    }

    return { account, rules, ruleFormRef, submitForm, isKeepPassword }
  }
}
</script>

<style lang="scss" scoped>
.login-board {
  display: flex;
  width: 1000px;
  height: 650px;
  transform: translateY(-10px);

  .left,
  .right {
    flex: 1;
  }

  .left {
    background-color: rgba(91, 144, 235, 0.5);
    box-sizing: border-box;

    .title {
      display: flex;
      align-items: center;
      margin-top: 25px;
      margin-left: 25px;

      .logo {
        width: 40px;
      }
      .name {
        font-size: 26px;
        color: #fff;
        font-weight: 700;
        margin-left: 15px;
      }
    }
  }

  .right {
    background-color: #fff;

    .login-box {
      padding: 130px 100px;

      > h3 {
        font-size: 28px;
        font-weight: 700;
        color: #0669eb;
        margin-bottom: 30px;
      }

      .el-input {
        height: 42px;
      }

      .forget {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .el-button {
        width: 100%;
        height: 42px;
      }
    }
  }
}
</style>
