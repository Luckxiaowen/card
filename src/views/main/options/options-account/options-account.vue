<template>
  <div class="description-categoray">
    <div class="row">
      <div class="col input">
        <el-input v-model="accountKeyword" placeholder="编号/手机号/姓名" />
      </div>
      <div class="col">
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="row">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="accountList" stripe style="width: 100%">
        <el-table-column label="用户编号" prop="id" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="手机号" prop="phonenumber" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="最近登录时间" prop="latelyLogin" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="创建人" prop="createUser" />
        <el-table-column min-width="150">
          <template #header> 操作 </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              @click="handleResetPwd(scope.$index, scope.row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row" v-show="listCount">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="page.currentPage"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next, sizes"
        :total="listCount"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store"
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { ElMessageBox } from "element-plus"

export default {
  setup() {
    // 请求管理员账号
    store.dispatch("optionsAccount/getAccountAction")
    const accountList = computed(() => store.state.optionsAccount.accountList)

    const router = useRouter()

    const accountKeyword = ref("")

    const handleSearch = () => {}

    const handleReset = () => {}

    const handleAdd = () => {
      router.push({ name: "options-accountadd" })
    }

    const handleEdit = (index, row) => {
      router.push({
        path: "/main/options/options-accountadd",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("确定要删除吗？")
        .then(() => {
          store.dispatch("optionsAccount/deleteAccountAction", row.id)
        })
        .catch(() => {})
    }

    const handleResetPwd = (index, row) => {
      ElMessageBox.confirm("确定要重置密码吗？")
        .then(() => {
          store.dispatch("optionsAccount/resetAccountAction", row.id)
        })
        .catch(() => {})
    }

    const tableData = [
      {
        usercode: "ZH327942432",
        username: "2022-11-11",
        phonenumber: "136****88",
        role: "xxx",
        latelyLogin: "2022-11-11",
        createTime: "2022-11-11",
        createBy: "张三/ZH3289742"
      },
      {
        usercode: "ZH327942432",
        username: "2022-11-11",
        phonenumber: "136****88",
        role: "xxx",
        latelyLogin: "2022-11-11",
        createTime: "2022-11-11",
        createBy: "张三/ZH3289742"
      },
      {
        usercode: "ZH327942432",
        username: "2022-11-11",
        phonenumber: "136****88",
        role: "xxx",
        latelyLogin: "2022-11-11",
        createTime: "2022-11-11",
        createBy: "张三/ZH3289742"
      }
    ]

    const currentPage = computed(() => store.state.optionsAccount.pageNum)
    const pageSize = computed(() => store.state.optionsAccount.pageSize)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }
    const listCount = computed(() => store.state.optionsAccount.pageTotal)

    const handleCurrentChange = (value) => {
      console.log(value)
      store.commit("optionsAccount/changePageNum", value)
      store.dispatch("optionsAccount/pageCompanyinfoAction")
    }
    const handleSizeChange = (value) => {
      console.log(value)
      store.commit("optionsAccount/changePageSize", value)
      store.dispatch("optionsAccount/pageCompanyinfoAction")
    }

    return {
      accountList,
      accountKeyword,
      tableData,
      page,
      listCount,
      handleSearch,
      handleReset,
      handleAdd,
      handleEdit,
      handleDelete,
      handleResetPwd,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.description-categoray {
  padding: 20px;

  .row {
    display: flex;
    margin-bottom: 20px;

    .col {
      margin-right: 10px;
    }

    .name {
      width: 100px;
    }
    .input {
      width: 300px;
    }
  }

  .row:last-child {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .row:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
}
</style>
