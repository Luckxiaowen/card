<template>
  <div class="description-categoray">
    <div class="row">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="companyinfoList" stripe style="width: 100%">
        <el-table-column label="分类名称" prop="infoName" />
        <el-table-column label="创建时间" prop="createTime">
          <template #default="scope">
            {{ formatTimestamp(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createName" />
        <el-table-column>
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
              class="move-up"
              size="small"
              @click="handleUp(scope.$index, scope.row)"
              >上移</el-button
            >
            <el-button
              class="move-down"
              size="small"
              @click="handleDown(scope.$index, scope.row)"
              >下移</el-button
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
import { useRouter } from "vue-router"
import { computed } from "vue"
import { formatTimestamp } from "@/utils/date-format"

export default {
  setup() {
    // 请求公司分类
    store.dispatch("descriptionCategory/pageCompanyinfoAction")
    // 获取公司分类
    const companyinfoList = computed(
      () => store.state.descriptionCategory.companyinfo
    )

    const router = useRouter()

    // 操作相关逻辑
    const handleEdit = (index, row) => {
      router.push({
        path: "/main/description/description-addcate",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("确定要删除吗？").then(() => {
        store.dispatch("descriptionCategory/deleteCompanyinfoAction", row.id)
      })
    }

    const handleUp = (index, row) => {
      const data = {
        companyInfoId: row.id,
        sortStr: "up"
      }
      store.dispatch("descriptionCategory/updateSortAction", data)
    }
    const handleDown = (index, row) => {
      const data = {
        companyInfoId: row.id,
        sortStr: "down"
      }
      store.dispatch("descriptionCategory/updateSortAction", data)
    }

    const handleAddClick = () => {
      router.push({ name: "description-addcate" })
    }

    // 分页相关逻辑
    const currentPage = computed(() => store.state.descriptionCategory.pageNum)
    const pageSize = computed(() => store.state.descriptionCategory.pageSize)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }
    const listCount = computed(() => store.state.descriptionCategory.pageTotal)

    const handleCurrentChange = (value) => {
      console.log(value)
      store.commit("descriptionCategory/changePageNum", value)
      store.dispatch("descriptionCategory/pageCompanyinfoAction")
    }
    const handleSizeChange = (value) => {
      console.log(value)
      store.commit("descriptionCategory/changePageSize", value)
      store.dispatch("descriptionCategory/pageCompanyinfoAction")
    }

    return {
      companyinfoList,
      formatTimestamp,
      handleEdit,
      handleDelete,
      handleUp,
      handleDown,
      handleAddClick,
      handleSizeChange,
      handleCurrentChange,
      page,
      listCount
    }
  }
}
</script>

<style lang="scss" scoped>
.description-categoray {
  padding: 20px;

  .row {
    margin-bottom: 10px;
  }

  .row:last-child {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
}

.el-table__row:first-child {
  .move-up {
    display: none !important;
  }
}

.el-table__row:last-child {
  .move-down {
    display: none !important;
  }
}
</style>
