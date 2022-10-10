<template>
  <div class="nav-header">
    <el-icon class="fold-menu" text @click="handleFoldClick">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <my-breadcrumbVue :breadcrumbs="breadcrumbs" />
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              class="avatar"
              size="small"
              :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            /><span>{{ "埃克森" }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="CircleClose" @click="handleExitClick"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item
                divided
                icon="Setting"
                @click="handleChangeClick"
                >修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import localCache from "@/utils/cache"
import MyBreadcrumbVue from "@/base-ui/breadcrumb"
import { pathMap } from "./config/map-path"

export default {
  components: {
    MyBreadcrumbVue
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    const router = useRouter()
    const handleExitClick = () => {
      ElMessageBox.confirm("确定要退出登录吗？").then(() => {
        localCache.removeCache("token")
        router.push("/login")
        ElMessage.success({
          message: "已退出"
        })
      })
    }

    const handleChangeClick = () => {
      router.push({ name: "password-reset" })
    }

    const breadcrumbs = computed(() => {
      // 把依赖的数据包裹进来
      const route = useRoute()
      const currentPath = route.path // 其实就是path变了就会重新计算
      const isEdit = route.query.isEdit
      return pathMap(currentPath, isEdit)
    })

    return {
      isFold,
      handleFoldClick,
      handleExitClick,
      breadcrumbs,
      handleChangeClick
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;

    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;

      .avatar {
        margin-right: 5px !important;
      }
    }
  }
}
</style>
