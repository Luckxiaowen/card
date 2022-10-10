<template>
  <div class="options-organize">
    <div class="col">
      <div class="title">当前架构</div>
      <div class="main">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
          :props="defaultProps"
          @current-change="change"
        />
      </div>
    </div>
    <div class="col">
      <div class="title">操作</div>
      <div class="main">
        <el-button @click="add('子级层名称')">添加子级层</el-button>
        <el-button @click="add('同级层名称')">添加同级层</el-button>
        <el-button @click=";(isShow = true), (key = '新名称')"
          >重命名</el-button
        >
        <el-button @click="del">删除</el-button>
      </div>
      <div v-if="isShow">
        <div style="width: 50%; margin: 20px 0">
          <el-input v-model="submitData.roleName" :placeholder="checkName">
            <template #prepend>{{ key }}</template>
          </el-input>
        </div>
        <div>
          <el-button @click="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCompanyFrame,
  updateCompanyFrameName,
  addCompanyFrame,
  delCompanyFrameById
} from "@/service/main/options/options-organize"
import { ElMessage } from "element-plus"
import { ref } from "vue"

export default {
  setup() {
    const defaultProps = {
      children: "children",
      label: "roleName"
    }
    let tree = ref(null)
    //当前所选择el-tree的节点信息
    const currentNode = ref(null)
    const key = ref("")
    //表单提交数据
    let submitData = ref({
      id: null,
      roleName: "",
      parentId: null
    })
    //选择的字段
    const checkName = ref("")
    //控制表单
    const isShow = ref(false)
    //el-tree的数据
    const treeData = ref([])
    //添加层级
    const add = (k) => {
      isShow.value = true
      key.value = k
      getParentId(currentNode)
    }
    //获取所选层级的父id
    const getParentId = () => {
      console.log(currentNode.value)
      if (key.value === "子级层名称") {
        submitData.value.parentId = currentNode.value.data.id
      } else if (key.value === "同级层名称") {
        submitData.value.parentId = currentNode.value.data.parentId || null
      } else {
        submitData.value.parentId = null
      }
      // console.log(submitData.value)
    }

    const del = () => {
      if (checkName.value == "") {
        ElMessage.warning("请选择要删除的部门")
        return
      }
      ElMessageBox.confirm(
        `确定要删除${checkName.value}?会将一起删除其子部门哦!`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        let res = await delCompanyFrameById(submitData.value.id)
        console.log(res)
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "删除成功"
          })
          getFrame()
          cancel()
        }
      })
    }

    //监听el-tree点击所发出的改变
    const change = (current, node) => {
      checkName.value = current.data.roleName
      submitData.value.roleName = ""
      submitData.value.id = current.data.id
      currentNode.value = node
    }

    //修改与新增的表单提交
    const submit = async () => {
      console.log(submitData.value)
      if (submitData.value.roleName == "") {
        ElMessage.error("部门名不能为空")
        return
      }
      if (key.value == "新名称") {
        let res = await updateCompanyFrameName(submitData.value)
        // console.log(res)
        if (res.code == 200) {
          ElMessage.success("更新成功")
          getFrame()
          cancel()
        }
      } else if (key.value == "子级层名称" || key.value == "同级层名称") {
        let res = await addCompanyFrame(submitData.value)
        // console.log(res)
        if (res.code == 200) {
          ElMessage.success("添加成功")
          getFrame()
          cancel()
        }
      }
    }

    const cancel = () => {
      submitData.value.roleName = ""
      submitData.value.id = null
      isShow.value = false
      key.value = ""
    }
    //获取公司架构
    const getFrame = async () => {
      let res = await getCompanyFrame()
      treeData.value = res.data
    }
    getFrame()

    return {
      defaultProps,
      treeData,
      getFrame,
      isShow,
      change,
      submitData,
      submit,
      cancel,
      checkName,
      key,
      tree,
      getParentId,
      currentNode,
      add,
      del
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  --el-tree-node-hover-bg-color: #d0ebff !important;
}

.options-organize {
  display: flex;
  padding: 20px;

  .col {
    .title {
      border-left: 5px solid #2c3039;
      padding-left: 10px;
      margin-bottom: 30px;
    }
  }

  .col:first-child {
    width: 300px;
  }
}
</style>
