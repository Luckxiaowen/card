<template>
  <div class="options-role">
    <div class="row">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    <div class="row">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="角色名称" prop="name" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="创建人" prop="createUser" />
        <el-table-column>
          <template #header> 操作 </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="
                $router.push({
                  name: 'options-roleadd',
                  query: {
                    title: '更新角色',
                    id: scope.row.id,
                    name: scope.row.name
                  }
                })
              "
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
import { useRouter } from "vue-router"
import {
  getCompanyRole,
  delCompanyRole
} from "@/service/main/options/options-role"
import { onMounted } from "vue"
import { ref } from "vue"
export default {
  setup() {
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(row.id)
      ElMessageBox.confirm(`确定要删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await delCompanyRole(row.id)
        console.log(res)
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "删除成功"
          })
          tableData.value.splice(index, 1)
        }
      })
    }

    const tableData = ref([])
    const getRole = async () => {
      let res = await getCompanyRole()
      tableData.value = res.data
      // console.log(tableData.value);
    }

    onMounted(() => {
      getRole()
    })

    const router = useRouter()

    const handleAddClick = () => {
      router.push({ name: "options-roleadd", query: { title: "新增用户" } })
    }

    const page = { currentPage: 0, pageSize: 10 }
    const listCount = 50
    const handleSizeChange = () => {}
    const handleCurrentChange = () => {}

    return {
      handleAddClick,
      tableData,
      handleEdit,
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
.options-role {
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
</style>
