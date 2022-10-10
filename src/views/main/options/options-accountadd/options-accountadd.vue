<template>
  <div class="options-accountadd">
    <div class="title">新增账号</div>
    <div class="main">
      <div class="row">
        <div class="col name">*姓名</div>
        <div class="col input">
          <el-input
            v-model="accountName"
            @input="handleNameInput"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*手机号</div>
        <div class="col input">
          <el-input
            v-model="accountPhone"
            @input="handlePhoneInput"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*角色</div>
        <div class="col">
          <el-select
            v-model="accountRole"
            @change="handleRoleChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div class="module-save">
      <el-button type="primary" @click="handleSaveclick">保存</el-button>
      <el-button @click="handleCancelClick">取消</el-button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue"
import store from "@/store"
import localCache from "@/utils/cache"
import { useRouter, useRoute } from "vue-router"
import { ElMessage } from "element-plus"

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 请求角色列表
    store.dispatch("optionsRole/getCompanyRolAction")
    // 获取角色列表
    const roleList = computed(() => store.state.optionsRole.roleList)

    // 角色表单数据
    const accountName = ref("")
    const accountPhone = ref("")
    const accountRole = ref("")

    // 本地缓存逻辑
    // 判断是否为编辑状态, 如果是则：显示角色的信息
    // 如果不是则：显示缓存信息
    const isEdit = route.query.isEdit
    const id = route.query.id

    if (isEdit) {
      // 编辑状态
      // TODO：找到当前账户进行回显
      // 请求单个管理员信息
      store.dispatch("optionsAccount/getAccountInfoRequest", id)

      const result = computed(() => store.state.optionsAccount.accountInfo)

      watch(
        () => result,
        (newVal) => {
          const account = newVal?.value
          accountName.value = account?.username
          accountPhone.value = account?.telNumber
          accountRole.value = account?.roleId
        },
        { immediate: true, deep: true }
      )
    } else {
      // 新增状态
      accountName.value = localCache.getCache("accountName")
      accountPhone.value = localCache.getCache("accountPhone")
      accountRole.value = localCache.getCache("accountRole")
    }

    // 缓存输入内容（新增和编辑分开缓存）
    const handleNameInput = (value) => {
      accountName.value = value
      localCache.setCache("accountName", value)
    }
    const handlePhoneInput = (value) => {
      accountPhone.value = value
      localCache.setCache("accountPhone", value)
    }
    const handleRoleChange = () => {
      localCache.setCache("accountRole", accountRole.value)
    }

    // 保存与取消
    const handleSaveclick = () => {
      // 规则校验
      if (!accountName.value) {
        return ElMessage.warning({
          message: "请输入姓名"
        })
      }
      if (!accountPhone.value) {
        return ElMessage.warning({
          message: "请输入手机号"
        })
      }
      if (!accountRole.value) {
        return ElMessage.warning({
          message: "请选择角色"
        })
      }

      const data = {
        username: accountName.value,
        telNumber: accountPhone.value,
        roleId: accountRole.value
      }

      if (isEdit) {
        // 编辑状态
        store.dispatch("optionsAccount/updateAccountAction", {
          data: { ...data, id },
          callback() {
            router.go(-1)
          }
        })
      } else {
        // 新增状态
        store.dispatch("optionsAccount/addAccountAction", {
          data,
          callback() {
            localCache.removeCache("accountName")
            localCache.removeCache("accountPhone")
            localCache.removeCache("accountRole")
            router.go(-1)
          }
        })
      }
    }
    const handleCancelClick = () => {
      ElMessageBox.confirm("确定要取消吗？")
        .then(() => {
          localCache.removeCache("accountName")
          localCache.removeCache("accountPhone")
          localCache.removeCache("accountRole")
          router.go(-1)
        })
        .catch(() => {})
    }

    router.beforeEach(() => {
      // 清除缓存
      localCache.removeCache("accountName")
      localCache.removeCache("accountPhone")
      localCache.removeCache("accountRole")
    })

    return {
      roleList,
      accountName,
      accountPhone,
      accountRole,
      handleNameInput,
      handlePhoneInput,
      handleRoleChange,
      handleSaveclick,
      handleCancelClick
    }
  }
}
</script>

<style lang="scss" scoped>
.options-accountadd {
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
        width: 70px;
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
</style>
