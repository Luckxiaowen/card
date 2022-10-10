<template>
  <div class="content-categoray">
    <div class="row">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="companycateList" stripe style="width: 100%">
        <el-table-column label="分类名称" prop="caseName" />
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
        layout="prev, pager, next,sizes"
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
    // 请求文章分类
    store.dispatch("contentCategoray/pageCompanycateAction")

    const companycateList = computed(
      () => store.state.contentCategoray.companycate
    )

    const router = useRouter()

    // 分页相关参数
    const currentPage = computed(() => store.state.contentCategoray.pageNum)
    const pageSize = computed(() => store.state.contentCategoray.pageSize)
    const listCount = computed(() => store.state.contentCategoray.pageTotal)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }

    // 分页相关回调
    const handleCurrentChange = (value) => {
      store.commit("contentCategoray/changePageNum", value)
      store.dispatch("contentCategoray/pageCompanycateAction")
    }

    const handleSizeChange = (value) => {
      store.commit("contentCategoray/changePageSize", value)
      store.dispatch("contentCategoray/pageCompanycateAction")
    }

    // 操作相关回调
    const handleAddClick = () => {
      router.push({ name: "content-addcate" })
    }

    const handleEdit = (index, row) => {
      router.push({
        path: "/main/content/content-addcate",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("确定要删除吗？").then(() => {
        // 删除缓存
        store.dispatch("contentCategoray/deleteCompanycateAction", row.id)
      })
    }

    const handleUp = (index, row) => {
      const data = {
        companyCaseId: row.id,
        sortStr: "up"
      }
      store.dispatch("contentCategoray/companycateUpdateSortAction", data)
    }

    const handleDown = (index, row) => {
      const data = {
        companyCaseId: row.id,
        sortStr: "down"
      }

      store.dispatch("contentCategoray/companycateUpdateSortAction", data)
    }

    return {
      companycateList,
      formatTimestamp,
      handleAddClick,
      handleSizeChange,
      handleCurrentChange,
      page,
      listCount,
      handleEdit,
      handleDelete,
      handleUp,
      handleDown
    }
  }
}
</script>

<style lang="scss" scoped>
.content-categoray {
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
