<template>
  <div class="options-companyadd">
    <div class="title">模块信息</div>
    <div class="main">
      <div class="row">
        <div class="col name">*企业名称</div>
        <div class="col input">
          <el-input v-model="companyName" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*企业简称</div>
        <div class="col input">
          <el-input v-model="companyDesc" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*企业logo</div>
        <div class="col input" style="width: calc(100% - 50px)">
          <file-upload
            serverUrl="http://124.222.39.14:8001/upload-me"
            localName="company-logo"
            :autoSave="!isEdit"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*管理员姓名</div>
        <div class="col input">
          <el-input v-model="companyAdmin" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*管理员手机</div>
        <div class="col input">
          <el-input v-model="companyAdminPhone" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*有效期至</div>
        <div class="col">
          <el-date-picker
            v-model="companyExpire"
            type="date"
            placeholder="请选择时间"
            style="width: 300px"
          />
        </div>
      </div>

      <div class="title">企业权限</div>

      <div class="main">
        <div class="row">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'childrenMenu', label: 'menuName' }"
            :default-checked-keys="companyPromission"
            @check="handleCheckChange"
          />
        </div>
      </div>
      <div class="row">
        <el-button type="primary" @click="handleSaveClick">保存</el-button>
        <el-button @click="handleCancleClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import store from "@/store"
import FileUpload from "@/base-ui/file-upload/file-upload.vue"
import LocalCache from "@/utils/cache"
export default {
  components: {
    FileUpload
  },
  setup() {
    // 获取菜单
    const menus = computed(() => store.state.login.menu)

    const route = useRoute()
    const router = useRouter()

    const elTreeRef = ref(null)

    const isEdit = route.query.isEdit

    const companyPromission = ref([])

    const companyName = ref("")
    const companyDesc = ref("")
    const companyAdmin = ref("")
    const companyAdminPhone = ref("")
    const companyExpire = ref(null)

    const handleCheckChange = (val1, val2) => {
      companyPromission.value = val2.checkedKeys
    }

    const handleSaveClick = () => {}

    const handleCancleClick = () => {}

    router.beforeEach(() => {
      // 清除缓存
    })

    return {
      elTreeRef,
      isEdit,
      companyName,
      companyDesc,
      companyAdmin,
      companyAdminPhone,
      companyExpire,
      menus,
      companyPromission,
      handleSaveClick,
      handleCancleClick,
      handleCheckChange
    }
  }
}
</script>

<style lang="scss" scoped>
.options-companyadd {
  padding: 20px;

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

.el-input__inner {
  width: 300px !important;
}
</style>
