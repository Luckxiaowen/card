<template>
  <div class="options-roleadd">
    <div class="title">{{ title }}</div>
    <div class="main">
      <div class="row">
        <div class="col name">*角色名称</div>
        <div class="col input">
          <el-input v-model="submitData.roleName" placeholder="请输入" />
        </div>
      </div>
      <div class="row">
        <div class="col name">*角色权限</div>
        <div class="col input">
          <el-tree
            :data="data"
            :default-checked-keys="checkTreeData"
            :default-expanded-keys="checkTreeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check="currentChecked"
            ref="tree"
          />
        </div>
      </div>
      <div class="row">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import loginModule from "@/store/login/login"
import { ref, onMounted } from "vue"
import {
  addCompanyRole,
  getRoleMenuIds,
  updateCompanyRole
} from "@/service/main/options/options-role"
import { ElMessage } from "element-plus"
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const defaultProps = {
      children: "childrenMenu",
      label: "menuName"
    }
    const title = ref("新增角色")

    const submitData = ref({
      roleName: "",
      menuId: []
    })
    let tree = ref(null)
    const data = ref([])
    let checkTreeData = ref([])
    const currentChecked = (data, checkedData) => {
      // console.log(tree.value.getCheckedKeys().concat(tree.value.getHalfCheckedKeys()) )
      submitData.value.menuId = [
        ...tree.value.getCheckedKeys().concat(tree.value.getHalfCheckedKeys())
      ]
      // console.log(submitData.value);
    }

    const submit = async () => {
      if (
        submitData.value.roleName == "" &&
        submitData.value.menuId.length == 0
      ) {
        ElMessage.error("角色名和权限不能为空")
        return
      }

      let res
      if (title.value == "新增用户") {
        res = await addCompanyRole(submitData.value)
      } else {
        res = await updateCompanyRole(submitData.value)
      }
      if (res.code == 200) {
        ElMessage.success("操作成功!")
        router.go(-1)
      }
    }
    const route = useRoute()

    onMounted(async () => {
      data.value = loginModule.state.menu
      title.value = route.query.title
      let id = route.query.id || null
      submitData.value.roleName = route.query.name || ""
      if (id != null) {
        let res = await getRoleMenuIds(id)
        console.log(res.data)
        submitData.value.menuId = [...res.data]
        checkTreeData.value = [...res.data]
      }
    })
    return {
      defaultProps,
      data,
      currentChecked,
      tree,
      submitData,
      submit,
      title,
      checkTreeData
    }
  }
}
</script>

<style lang="scss" scoped>
.options-roleadd {
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
