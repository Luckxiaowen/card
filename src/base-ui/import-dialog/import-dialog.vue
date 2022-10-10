<template>
  <div class="excel-import">
    <el-dialog v-model="dialogVisible" title="导入预览">
      <el-table
        :data="gridData"
        max-height="300"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          align="center"
          type="index"
          label="索引"
          min-width="70"
        ></el-table-column>
        <el-table-column
          align="center"
          property="username"
          label="员工姓名"
          width="150"
        />
        <el-table-column
          align="center"
          property="depId"
          label="所属部门"
          width="150"
        />
        <el-table-column
          align="center"
          property="station"
          label="岗位名称"
          width="150"
        />
        <el-table-column
          align="center"
          property="phonenumber"
          label="手机号"
          width="150"
        />
        <el-table-column
          align="center"
          property="email"
          label="邮箱"
          min-width="200"
        />
        <el-table-column
          align="center"
          property="telWeixin"
          label="微信号"
          min-width="200"
        />
      </el-table>
      <span style="color: #f56c6c; display: block; margin: 25px 10px 0px"
        >第2、3行格式有误，请修改后上传</span
      >
      <template #footer>
        <span class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="dialogVisible = false" disabled
            >上传</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    gridData: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const tableRowClassName = ({ row, rowIndex }) => {
      // 检查格式是否有误，返回一个布尔值
      console.log(row)
      if (rowIndex === 1) {
        return "warning-row"
      } else if (rowIndex === 3) {
        return "success-row"
      }
      return ""
    }

    return {
      tableRowClassName
    }
  }
}
</script>

<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  border: 0 !important;
}
</style>
