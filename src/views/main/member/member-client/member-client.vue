<template>
  <div class="member-client">
    <div class="row">
      <div class="col input">
        <el-input v-model="input" placeholder="客户编号/名称/员工编号/名称" />
      </div>
      <div class="col">
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <div class="row">
      <el-table :data="clientData" stripe style="width: 100%">
        <el-table-column label="客户编号" prop="clientCode" />
        <el-table-column label="手机号" prop="phonenumber" />
        <el-table-column label="客户称谓" prop="called" />
        <el-table-column label="访问次数" prop="visitNum" />
        <el-table-column label="保存名片次数" prop="saveNum" />
        <el-table-column label="保存通讯录次数" prop="contactNum" />
        <el-table-column label="转发次数" prop="shareNum" />
        <el-table-column label="留言次数" prop="messageNum" />
        <el-table-column label="所属员工" prop="belongTo" />
        <el-table-column label="记录时间" prop="recordTime" />
        <el-table-column label="最近访问" prop="latelyTime" />
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
import { ref } from "vue"
import { useRouter } from "vue-router"

export default {
  setup() {
    const value = ref("")

    const options = [
      {
        value: "Option1",
        label: "Option1"
      },
      {
        value: "Option2",
        label: "Option2"
      },
      {
        value: "Option3",
        label: "Option3"
      },
      {
        value: "Option4",
        label: "Option4"
      },
      {
        value: "Option5",
        label: "Option5"
      }
    ]

    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    const clientData = [
      {
        clientCode: "YG43985739",
        phonenumber: "xxxxxxxxxxx",
        called: "张先生",
        visitNum: "xxx",
        saveNum: 10,
        contactNum: 10,
        shareNum: 10,
        messageNum: 10,
        belongTo: "张三/ZH287498",
        recordTime: "2022-12-12 23:59",
        latelyTime: "2022-12-12 23:59"
      },
      {
        clientCode: "YG43985739",
        phonenumber: "xxxxxxxxxxx",
        called: "张先生",
        visitNum: "xxx",
        saveNum: 10,
        contactNum: 10,
        shareNum: 10,
        messageNum: 10,
        belongTo: "张三/ZH287498",
        recordTime: "2022-12-12 23:59",
        latelyTime: "2022-12-12 23:59"
      },
      {
        clientCode: "YG43985739",
        phonenumber: "xxxxxxxxxxx",
        called: "张先生",
        visitNum: "xxx",
        saveNum: 10,
        contactNum: 10,
        shareNum: 10,
        messageNum: 10,
        belongTo: "张三/ZH287498",
        recordTime: "2022-12-12 23:59",
        latelyTime: "2022-12-12 23:59"
      }
    ]

    const router = useRouter()

    const handleAddClick = () => {
      router.push({ name: "content-addarticle" })
    }

    const page = { currentPage: 0, pageSize: 10 }
    const listCount = 50
    const handleSizeChange = () => {}
    const handleCurrentChange = () => {}

    return {
      handleAddClick,
      clientData,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      page,
      listCount,
      options,
      value
    }
  }
}
</script>

<style lang="scss" scoped>
.member-client {
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
