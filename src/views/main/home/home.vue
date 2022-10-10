<template>
  <div class="home">
    <div class="row">
      <div class="col">
        <div class="title" style="font-size: 18px; font-weight: bold">
          名片曝光
        </div>
        <div class="main">
          <div
            ref="exposureRef"
            :style="{ width: '100%', height: '500px' }"
          ></div>
        </div>
      </div>
      <div class="col">
        <div class="title" style="font-size: 18px; font-weight: bold">
          客户数量
        </div>
        <div class="main">
          <div
            ref="clientRef"
            :style="{ width: '100%', height: '500px' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">
        <div style="font-size: 18px; font-weight: bold">本月优秀人员</div>
        <div style="display: flex; align-items: center">
          <el-link type="primary"
            >人员详情
            <el-icon style="margin-left: 2px" color="#409eff"
              ><ArrowRight /></el-icon
          ></el-link>
        </div>
      </div>
      <div class="main">
        <div class="person">
          <div class="top">TOP1</div>
          <div class="info">
            <div class="row">
              <span style="font-weight: bold">吴磊</span
              >（智菲科技-技术部-Java组）
            </div>
            <div class="row">
              <span> 访客 {{ 99 }} </span>
              <span> 客户 {{ 39 }} </span>
              <span> 活跃 {{ 59 }} </span>
            </div>
          </div>
        </div>
        <div class="person">
          <div class="top">TOP2</div>
          <div class="info">
            <div class="row">
              <span style="font-weight: bold">吴磊</span
              >（智菲科技-技术部-Java组）
            </div>
            <div class="row">
              <span> 访客 {{ 99 }} </span>
              <span> 客户 {{ 39 }} </span>
              <span> 活跃 {{ 59 }} </span>
            </div>
          </div>
        </div>
        <div class="person">
          <div class="top">TOP3</div>
          <div class="info">
            <div class="row">
              <span style="font-weight: bold">吴磊</span
              >（智菲科技-技术部-Java组）
            </div>
            <div class="row">
              <span> 访客 {{ 99 }} </span>
              <span> 客户 {{ 39 }} </span>
              <span> 活跃 {{ 59 }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title" style="font-size: 18px; font-weight: bold">
        部门统计
      </div>
      <div class="main">
        <div class="row">
          <el-row :gutter="10">
            <el-col :lg="9">
              时间范围：
              <el-date-picker
                width="style:100%"
                startPlaceholder="开始时间"
                endPlaceholder="结束时间"
                type="daterange"
                @update:modelValue="handleValueChange($event)"
              ></el-date-picker>
            </el-col>
            <el-col :lg="8">
              统计阶层：
              <el-button type="primary">一级部门</el-button>
              <el-button>二级部门</el-button>
              <el-button>三级部门</el-button>
            </el-col>
            <el-col :lg="7">
              排名维度：
              <el-select v-model="value" class="m-2" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :lg="5">
              <el-button>查询</el-button>
              <el-button>重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="row">
          <el-table :data="staffData" style="width: 100%">
            <el-table-column label="部门名称" prop="departmentName" />
            <el-table-column label="部门人数" prop="departmentNum" />
            <el-table-column label="访客量" prop="visitNum" />
            <el-table-column label="人均访客量" prop="averageVisitNum" />
            <el-table-column label="客户数" prop="clientNum" />
            <el-table-column label="人均客户数" prop="averageClientNum" />
            <el-table-column label="活跃度" prop="activityNum" />
            <el-table-column label="人均活跃度" prop="averageActivityNum" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
export default {
  setup() {
    const exposureRef = ref(null)
    const clientRef = ref(null)

    onMounted(() => {
      // 1. 初始化echarts实例
      const exposure = echarts.init(exposureRef.value)
      const client = echarts.init(clientRef.value)
      // 2. 编写配置文件
      const exposureOpt = {
        xAxis: {
          type: "category",
          data: [
            "2022/9/28",
            "2022/9/29",
            "2022/9/30",
            "2022/10/01",
            "2022/10/02",
            "2022/10/03",
            "2022/10/04"
          ],
          axisLabel: {
            interval: 0, // 设置数据间隔
            rotate: -20, // 标题倾斜
            margin: 10 //刻度标签与轴线之间的距离
            // textStyle: {
            //  fontSize: 9, //横轴字体大小
            //  color: "#000000",//颜色
            // },
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      }

      const clientOpt = {
        xAxis: {
          type: "category",
          data: [
            "2022/9/28",
            "2022/9/29",
            "2022/9/30",
            "2022/10/01",
            "2022/10/02",
            "2022/10/03",
            "2022/10/04"
          ],
          axisLabel: {
            interval: 0, // 设置数据间隔
            rotate: -20, // 标题倾斜
            margin: 10 //刻度标签与轴线之间的距离
            // textStyle: {
            //  fontSize: 9, //横轴字体大小
            //  color: "#000000",//颜色
            // },
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
          }
        ]
      }
      // 3. 设置配置，并且开始配置
      exposure.setOption(exposureOpt)
      client.setOption(clientOpt)
    })

    const staffData = [
      {
        departmentName: "人事部",
        departmentNum: 99,
        visitNum: 10,
        averageVisitNum: 2,
        clientNum: 10,
        averageClientNum: 10,
        activityNum: 10,
        averageActivityNum: 10
      },
      {
        departmentName: "人事部",
        departmentNum: 99,
        visitNum: 10,
        averageVisitNum: 2,
        clientNum: 10,
        averageClientNum: 10,
        activityNum: 10,
        averageActivityNum: 10
      },
      {
        departmentName: "人事部",
        departmentNum: 99,
        visitNum: 10,
        averageVisitNum: 2,
        clientNum: 10,
        averageClientNum: 10,
        activityNum: 10,
        averageActivityNum: 10
      }
    ]

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

    const handleValueChange = (value) => {
      console.log(value)
    }
    return { exposureRef, clientRef, staffData, options, handleValueChange }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;

  > .row {
    margin-bottom: 60px;
    .title {
      margin-bottom: 15px;
    }
  }

  > .row:first-child {
    display: flex;
    justify-content: space-between;

    .col {
      flex: 1;

      .main {
        padding: 15px 30px;
        box-sizing: border-box;
        margin-left: -15px;
      }
    }
  }

  > .row:nth-child(2) {
    .title {
      display: flex;
      justify-content: space-between;
    }

    .main {
      display: flex;

      .person {
        display: flex;
        height: 50px;
        margin-right: 50px;

        .top {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 700;
          color: #555;
          padding: 0 25px;
        }

        .info {
          padding-top: 8px;
          line-height: 20px;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
  }

  > .row:nth-child(3) {
    margin-bottom: 20px;
    .main {
      .row {
        display: flex;
        margin-bottom: 20px;

        .col {
          margin-right: 80px;
        }
      }
    }
  }
}

.el-col {
  margin-bottom: 15px !important;
}
</style>
