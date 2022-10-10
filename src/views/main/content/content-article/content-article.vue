<template>
  <div class="content-article">
    <div class="row">
      <div class="col">
        <el-input v-model.trim="articleName" placeholder="文章编号/名称" />
      </div>
      <div class="col">
        <el-select v-model="articleType" class="select" placeholder="选择分类">
          <el-option
            v-for="item in categoray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="col">
        <el-button @click="handleSearchClick">查询</el-button>
      </div>
      <div class="col">
        <el-button @click="handleResetClick">重置</el-button>
      </div>
    </div>
    <div class="row">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="companycaseList" stripe style="width: 100%">
        <el-table-column label="文章编号" prop="id" min-width="65" />
        <el-table-column label="文章名称" prop="title" min-width="200" />
        <el-table-column label="浏览量" prop="baseVisitorNum" min-width="65" />
        <el-table-column label="实际浏览量" prop="visitorNum" min-width="65" />
        <el-table-column label="所属分类" prop="caseName" min-width="65" />
        <el-table-column label="创建时间" prop="updateTime" min-width="65" />
        <el-table-column label="创建人" prop="createName" min-width="65" />
        <el-table-column min-width="100px">
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
import { computed, ref } from "vue"

export default {
  setup() {
    // 获取案例分类
    store.dispatch("contentCategoray/listCompanycateAction")
    // 获取案例详情
    store.dispatch("contentArticle/pageCompanycaseAction")

    const router = useRouter()

    const articleType = ref("")
    const articleName = ref("")

    const companycaseList = computed(() => {
      return store.state.contentArticle.companycase
    })

    const categoray = computed(() => {
      return [
        { label: "全部选择", value: "" },
        ...store.state.contentCategoray.categoray
      ]
    })

    // 分页相关参数
    const currentPage = computed(() => store.state.contentArticle.pageNum)
    const pageSize = computed(() => store.state.contentArticle.pageSize)
    const listCount = computed(() => store.state.contentArticle.pageTotal)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }

    const handleSearchClick = () => {
      const data = {
        NumOrStr: articleName.value,
        caseType: articleType.value
      }

      store.dispatch("contentArticle/casecontentConditionsAction", data)
    }

    const handleResetClick = () => {
      articleType.value = ""
      articleName.value = ""
      store.dispatch("contentArticle/pageCompanycaseAction")
    }

    const handleCurrentChange = (value) => {
      store.commit("contentArticle/changePageNum", value)
      store.dispatch("contentArticle/pageCompanycaseAction")
    }
    const handleSizeChange = (value) => {
      store.commit("contentArticle/changePageSize", value)
      store.dispatch("contentArticle/pageCompanycaseAction")
    }

    const handleEdit = (index, row) => {
      console.log(index, row)
      router.push({
        path: "/main/content/content-addarticle",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("确定要删除吗？").then(() => {
        store.dispatch("contentArticle/deleteCompanycaseAction", row.id)
      })
    }

    const handleAddClick = () => {
      router.push({ name: "content-addarticle" })
    }

    return {
      companycaseList,
      page,
      listCount,
      categoray,
      articleType,
      articleName,
      handleSearchClick,
      handleResetClick,
      handleCurrentChange,
      handleSizeChange,
      handleAddClick,
      handleEdit,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.content-article {
  padding: 20px;

  .row {
    display: flex;
    margin-bottom: 20px;
    .col {
      margin-right: 10px;
    }
  }

  .row:last-child {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
}
</style>
