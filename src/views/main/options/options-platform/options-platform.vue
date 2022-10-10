<template>
  <div class="options-platform">
    <div class="row">
      <div class="col">
        <el-input v-model="companyKeyword" placeholder="编号/手机号/姓名" />
      </div>
      <div class="col">
        <el-select v-model="companyStatus" class="m-2" placeholder="选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="col">
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <div class="row">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="companyList" stripe style="width: 100%">
        <el-table-column label="企业编号" prop="id" min-width="90" />
        <el-table-column label="企业名称" prop="company" min-width="120" />
        <el-table-column label="管理员姓名" prop="createBy" min-width="100" />
        <el-table-column label="管理员手机号" prop="tel" min-width="110" />
        <el-table-column label="创建时间" prop="createTime" min-width="100" />
        <el-table-column label="到期时间" prop="expireTime" min-width="100" />
        <el-table-column label="状态" prop="status" min-width="60" />
        <el-table-column label="创始人" prop="createBy" min-width="120" />
        <el-table-column min-width="200" fixed="right">
          <template #header> 操作 </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              @click="handleStatus(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

export default {
  setup() {
    // 请求公司列表
    store.dispatch("optionsPlatform/listCompanyAction")
    // 获取公司列表
    const companyList = computed(() => store.state.optionsPlatform.companyList)

    // 搜索相关参数
    const companyKeyword = ref("")
    const companyStatus = ref("")

    const statusList = [
      {
        value: "",
        label: "全部状态"
      },
      {
        value: "0",
        label: "停用中"
      },
      {
        value: "1",
        label: "启用中"
      }
    ]

    const handleEdit = (index, row) => {
      console.log(index, row)
      router.push({
        path: "/main/options/options-companyadd",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleStatus = (index, row) => {
      console.log(index, row)
    }

    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    const router = useRouter()

    const handleAddClick = () => {
      router.push({ name: "options-companyadd" })
    }

    // 分页器相关
    const currentPage = computed(() => store.state.optionsPlatform.pageNum)
    const pageSize = computed(() => store.state.optionsPlatform.pageSize)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }
    const listCount = computed(() => store.state.optionsPlatform.pageTotal)

    const handleCurrentChange = (value) => {
      console.log(value)
      store.commit("optionsPlatform/changePageNum", value)
      store.dispatch("optionsPlatform/pageCompanyinfoAction")
    }
    const handleSizeChange = (value) => {
      console.log(value)
      store.commit("optionsPlatform/changePageSize", value)
      store.dispatch("optionsPlatform/pageCompanyinfoAction")
    }

    return {
      companyKeyword,
      companyList,
      statusList,
      companyStatus,
      handleAddClick,
      handleEdit,
      handleStatus,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      page,
      listCount
    }
  }
}
</script>

<style lang="scss" scoped>
.options-platform {
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
