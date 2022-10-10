<template>
  <div class="member-add">
    <div class="title">新增员工</div>
    <div class="main">
      <div class="row">
        <div class="col name">*员工姓名</div>
        <div class="col input">
          <el-input
            v-model="staffName"
            @change="handleSaveLocal"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*所属部门</div>
        <div class="col">
          <el-tree-select
            v-model="staffDepartment"
            @change="handleSaveSelect"
            :data="departmentList"
            :render-after-expand="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*岗位名称</div>
        <div class="col input">
          <el-input
            v-model="staffPosition"
            @change="handleSaveLocal"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*手机号</div>
        <div class="col input">
          <el-input
            v-model="staffPhone"
            @change="handleSaveLocal"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*邮箱</div>
        <div class="col input">
          <el-input
            v-model="staffEmail"
            @change="handleSaveLocal"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name">*微信</div>
        <div class="col input">
          <el-input
            v-model="staffWeChat"
            @change="handleSaveLocal"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="row">
        <div class="col name" style="display: flex">
          微信二维码<el-icon class="qrcode-info" size="20px"
            ><QuestionFilled />

            <div class="qrcode-img">
              <div class="error">
                <div class="image">
                  <img
                    src="https://axure-file.lanhuapp.com/a55f24b5-36b7-453b-ac28-f3e4070e47fe__e7c7ab9fa57e2492bfe1b1afbda38c64.svg"
                    alt=""
                  />
                </div>
                <span style="color: red">错误示例</span>
              </div>
              <div class="correct">
                <div class="image">
                  <img
                    src="https://axure-file.lanhuapp.com/a55f24b5-36b7-453b-ac28-f3e4070e47fe__3d4dae730744f558405efd52e5daf5dd.png"
                    width="165"
                    style="transform: translate(26px, 10px)"
                  />
                </div>
                <span style="color: green">正确示例</span>
              </div>
            </div>
          </el-icon>
        </div>
        <div class="col">
          <file-upload
            serverUrl="http://124.222.39.14:8001/admin/upload/file"
            localName="staff-qrcode-img"
            :autoSave="!isEdit"
            :preview="staffQrcode"
            :hasHttp="false"
            :token="token"
          />
          <span style="margin-top: 10px; display: inline-block; color: #999"
            >*仅支持二维码（不包含其他内容）</span
          >
        </div>
      </div>
    </div>
    <div class="row">
      <el-button type="primary" @click="handleSaveButton">保存</el-button>
      <el-button @click="handleCancelButton">取消</el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue"
import FileUpload from "@/base-ui/file-upload/file-upload.vue"
import store from "@/store"
import { useRoute, useRouter } from "vue-router"
import LocalCache from "@/utils/cache"
import { ElMessage } from "element-plus"

export default {
  components: {
    FileUpload
  },
  setup() {
    // 获取部门列表
    store.dispatch("optionsOrganize/getCompanyFrameAction")

    const departmentList = computed(
      () => store.state.optionsOrganize.departmentList
    )

    const token = LocalCache.getCache("token")

    const router = useRouter()
    const route = useRoute()
    const isEdit = route.query.isEdit
    const id = route.query.id

    const staffNameLocal = LocalCache.getCache("staff-name")
    const staffDepartmentLocal = LocalCache.getCache("staff-department")
    const staffPositionLocal = LocalCache.getCache("staff-position")
    const staffPhoneLocal = LocalCache.getCache("staff-phone")
    const staffEmailLocal = LocalCache.getCache("staff-email")
    const staffWeChatLocal = LocalCache.getCache("staff-wechat")

    const staffName = ref(staffNameLocal)
    const staffDepartment = ref(staffDepartmentLocal)
    const staffPosition = ref(staffPositionLocal)
    const staffPhone = ref(staffPhoneLocal)
    const staffEmail = ref(staffEmailLocal)
    const staffWeChat = ref(staffWeChatLocal)
    const staffQrcode = ref([])

    // 请求当前员工信息
    if (isEdit) {
      store.dispatch("memberStaff/getStaffInfoAction", id)
      // 获取当前员工
      const currentStaff = computed(() => store.state.memberStaff.staffInfo)

      watch(
        currentStaff,
        (newVal, oldVal) => {
          const staff = newVal
          staffName.value = staff?.username
          staffDepartment.value = staff?.depId
          staffPosition.value = staff?.station
          staffPhone.value = staff?.phonenumber
          staffEmail.value = staff?.email
          staffWeChat.value = staff?.telWeixin
          staffQrcode.value = [staff?.weixinCode]
        },
        { immediate: true, deep: true }
      )
    }

    // 本地保存
    const handleSaveLocal = () => {
      LocalCache.setCache("staff-name", staffName.value)
      LocalCache.setCache("staff-position", staffPosition.value)
      LocalCache.setCache("staff-phone", staffPhone.value)
      LocalCache.setCache("staff-email", staffEmail.value)
      LocalCache.setCache("staff-wechat", staffWeChat.value)
    }
    const handleSaveSelect = (value) => {
      LocalCache.setCache("staff-department", value)
    }

    const handleSaveButton = () => {
      // 规则校验
      if (!staffName.value) {
        return ElMessage.warning({
          message: "请输入员工名称"
        })
      }
      if (!staffDepartment.value) {
        return ElMessage.warning({
          message: "请选择所属部门"
        })
      }
      if (!staffPosition.value) {
        return ElMessage.warning({
          message: "请输入岗位名称"
        })
      }
      if (!staffPhone.value) {
        return ElMessage.warning({
          message: "请输入手机号"
        })
      }
      if (!staffEmail.value) {
        return ElMessage.warning({
          message: "请输入邮箱"
        })
      }
      if (!staffWeChat.value) {
        return ElMessage.warning({
          message: "请输入微信号"
        })
      }
      // 发起请求
      const data = {
        depId: staffDepartment.value,
        email: staffEmail.value,
        phonenumber: staffPhone.value,
        station: staffPosition.value,
        telWeixin: staffWeChat.value,
        username: staffName.value,
        weixinCode: LocalCache.getCache("staff-qrcode-img") ?? ""
      }
      console.log(data)
      // 判断是编辑状态，还是新增状态
      if (isEdit) {
        // 编辑状态

        store.dispatch("memberStaff/updateStaffAction", {
          data: { ...data, id },
          callback() {
            LocalCache.removeCache("staff-name")
            LocalCache.removeCache("staff-department")
            LocalCache.removeCache("staff-position")
            LocalCache.removeCache("staff-phone")
            LocalCache.removeCache("staff-email")
            LocalCache.removeCache("staff-wechat")
            LocalCache.removeCache("staff-qrcode-img")
            LocalCache.removeCache("staffLocal")
            router.go(-1)
          }
        })
      } else {
        // 新增状态
        store.dispatch("memberStaff/addStaffAction", {
          data,
          callback() {
            LocalCache.removeCache("staff-name")
            LocalCache.removeCache("staff-department")
            LocalCache.removeCache("staff-position")
            LocalCache.removeCache("staff-phone")
            LocalCache.removeCache("staff-email")
            LocalCache.removeCache("staff-wechat")
            LocalCache.removeCache("staff-qrcode-img")
            router.go(-1)
          }
        })
      }
    }
    const handleCancelButton = () => {
      ElMessageBox.confirm("确定要取消吗？")
        .then(() => {
          // 清除缓存
          LocalCache.removeCache("staff-name")
          LocalCache.removeCache("staff-department")
          LocalCache.removeCache("staff-position")
          LocalCache.removeCache("staff-phone")
          LocalCache.removeCache("staff-email")
          LocalCache.removeCache("staff-wechat")
          LocalCache.removeCache("staff-qrcode-img")
          LocalCache.removeCache("staffLocal")
          router.go(-1)
        })
        .catch(() => {})
    }

    router.beforeEach(() => {
      // 清除缓存
      LocalCache.removeCache("staff-name")
      LocalCache.removeCache("staff-department")
      LocalCache.removeCache("staff-position")
      LocalCache.removeCache("staff-phone")
      LocalCache.removeCache("staff-email")
      LocalCache.removeCache("staff-wechat")
      LocalCache.removeCache("staff-qrcode-img")
      LocalCache.removeCache("staffLocal")
    })

    return {
      token,
      isEdit,
      departmentList,
      staffName,
      staffDepartment,
      staffPosition,
      staffPhone,
      staffEmail,
      staffWeChat,
      staffQrcode,
      handleSaveLocal,
      handleSaveSelect,
      handleSaveButton,
      handleCancelButton
    }
  }
}
</script>

<style lang="scss" scoped>
.member-add {
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
        width: 110px;
      }

      .input {
        width: 300px;
      }

      .el-select {
        width: 300px;
      }
    }
  }

  .qrcode-info {
    position: relative;
    padding-left: 3px;
    margin-top: -3px;
    padding-right: 15px;
  }

  .qrcode-info:hover .qrcode-img {
    display: block;
    display: flex;
  }

  .qrcode-img {
    position: absolute;
    left: 35px;
    top: -150px;
    width: 500px;
    background: #fff;
    z-index: 9;
    display: none;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba($color: #000000, $alpha: 0.17);
    box-sizing: border-box;
    padding: 30px;

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      box-sizing: border-box;

      .image {
        display: flex;
        align-content: center;
        justify-content: center;
        padding-bottom: 30px;
      }
    }
  }
}
</style>
