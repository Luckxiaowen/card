<template>
  <div class="member-staff">
    <div class="row">
      <div class="col">
        <el-input
          v-model.trim="staffNameOrCode"
          sortable
          placeholder="员工编号/名称"
        />
      </div>
      <div class="col">
        <el-tree-select
          v-model="staffDepartment"
          :data="departmentList"
          :render-after-expand="false"
        />
      </div>
      <div class="col">
        <el-date-picker
          v-model="staffCreateTime"
          width="style:100%"
          startPlaceholder="开始时间"
          endPlaceholder="结束时间"
          type="daterange"
        ></el-date-picker>
      </div>
      <div class="col">
        <el-button @click="handleSearchClick">查询</el-button>
        <el-button @click="handleResetClick">重置</el-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <el-button @click="handleAddClick" type="primary">新增</el-button>
        <el-button @click="handleImportClick" :loading="loading" type="primary"
          >导入</el-button
        >
        <input
          ref="uploadInputRef"
          class="excel-upload-input"
          accept=".xlsx, .xls"
          @change="handleUploadChange"
          type="file"
        />
      </div>
      <div class="col">
        <el-link
          href="http://124.222.39.14:8001/images/%E5%91%98%E5%B7%A5%E8%A1%A8%E6%A8%A1%E6%9D%BF.xlsx"
          type="primary"
          @click="handleDownloadClick"
          >导入模板下载</el-link
        >
      </div>
    </div>
    <div class="row">
      <el-table :data="staffList" stripe fit style="width: 100%">
        <el-table-column
          label="员工编号"
          :sort-orders="['descending', null]"
          prop="id"
          sortable
          min-width="120"
        />
        <el-table-column label="姓名" prop="username" min-width="100" />
        <el-table-column label="部门" prop="dep_name" min-width="120" />
        <el-table-column label="岗位" prop="station" min-width="120" />
        <el-table-column
          label="访客"
          prop="visitorNum"
          sortable
          min-width="100"
        />
        <el-table-column
          label="客户"
          prop="clientNum"
          sortable
          min-width="100"
        />
        <el-table-column
          label="活跃"
          prop="activeNum"
          sortable
          min-width="100"
        />
        <el-table-column label="留言" prop="noteNum" sortable min-width="100" />
        <el-table-column
          label="名片被保存"
          prop="saveCardNum"
          sortable
          min-width="125"
        />
        <el-table-column
          label="被添加通讯录"
          prop="saveContactNum"
          sortable
          min-width="135"
        />
        <el-table-column prop="stay" sortable min-width="175">
          <template #header> 客户次均停留(min) </template>
          <template #default="scope">
            {{
              getAverageStayTime(scope.row.averageStayMin, scope.row.stayNum)
            }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="120" />
        <el-table-column label="创建人" prop="createName" min-width="120" />
        <el-table-column min-width="200" fixed="right">
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
              @click="handlePreviewClick(scope.$index, scope.row)"
              >预览</el-button
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
  <importDialog :dialogVisible="dialogVisible" :gridData="importStaff" />
</template>

<script>
import store from "@/store"
import importDialog from "@/base-ui/import-dialog/import-dialog.vue"
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import {
  getExcelData,
  transformExcelData,
  transformToId
} from "@/utils/excel-import"
import { getAverageStayTime } from "./utils/filter"
import { ElMessageBox } from "element-plus"

export default {
  components: {
    importDialog
  },
  setup() {
    // 获取部门列表
    store.dispatch("optionsOrganize/getCompanyFrameAction")
    // 获取员工列表
    store.dispatch("memberStaff/pageSyaffAction")

    const router = useRouter()

    // 部门/员工数据
    const departmentList = computed(() => [
      { value: 0, label: "全部部门" },
      ...store.state.optionsOrganize.departmentList
    ])
    const staffList = computed(() => store.state.memberStaff.staffList)

    // 查询参数
    const staffDepartment = ref(0)
    const staffNameOrCode = ref("")
    const staffSortType = ref(0)
    const staffCreateTime = ref(null)

    // 分页参数
    const currentPage = computed(() => store.state.memberStaff.pageNum)
    const pageSize = computed(() => store.state.memberStaff.pageSize)
    const listCount = computed(() => store.state.memberStaff.pageTotal)
    const page = { currentPage: currentPage.value, pageSize: pageSize.value }

    // 搜索/重置事件
    const handleSearchClick = () => {}
    const handleResetClick = () => {}

    // 新增/导入事件
    const handleAddClick = () => {
      router.push({ name: "member-add" })
    }

    // excel导入相关
    const loading = ref(false)
    const uploadInputRef = ref(null)
    const dialogVisible = ref(false)
    const importStaff = ref([])

    const handleImportClick = () => {
      uploadInputRef.value.click()
    }

    const handleUploadChange = async (e) => {
      const files = e.target.files
      const rawFile = files[0]
      if (!rawFile) return

      loading.value = true
      // 获取excel表头和表体
      const res = await getExcelData(rawFile)
      // 转换表头为相应参数
      importStaff.value = transformExcelData({
        data: res.result,
        callback() {
          setTimeout(() => {
            dialogVisible.value = true
            loading.value = false
          }, 100)
        }
      })
      // 将表体文字传成相应id
      const realRes = transformToId(importStaff.value)

      // console.log(realRes)

      // TODO：发起请求
      // store.dispatch("memberStaff/excelImportAction", {
      //   data: realRes,
      //   callback() {
      //     uploadInputRef.value.value = null
      //   }
      // })
    }

    const handleDownloadClick = () => {}

    const handleEdit = (index, row) => {
      router.push({
        path: "/main/member/member-add",
        query: { index: index, id: row.id, isEdit: true }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("确定要删除吗？")
        .then(() => {
          store.dispatch("memberStaff/deleteStaffAction", row.id)
        })
        .catch(() => {})
    }

    const handlePreviewClick = (index, row) => {
      window.open(`#/preview/${row.id}`, "_blank")
    }

    const handleCurrentChange = (value) => {
      store.commit("memberStaff/changePageNum", value)
      store.dispatch("memberStaff/pageSyaffAction")
    }
    const handleSizeChange = (value) => {
      store.commit("memberStaff/changePageSize", value)
      store.dispatch("memberStaff/pageSyaffAction")
    }

    return {
      staffList,
      departmentList,
      staffSortType,
      staffDepartment,
      staffNameOrCode,
      staffCreateTime,
      loading,
      uploadInputRef,
      dialogVisible,
      page,
      listCount,
      importStaff,
      getAverageStayTime,
      handleSearchClick,
      handleResetClick,
      handleAddClick,
      handleImportClick,
      handleUploadChange,
      handleDownloadClick,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      handlePreviewClick
    }
  }
}
</script>

<style lang="scss" scoped>
.member-staff {
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

.excel-upload-input {
  display: none;
}
</style>
