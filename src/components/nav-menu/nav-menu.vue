<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- template引入资源固定格式 -->
      <img class="img" src="~@/assets/images/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">智菲科技</span>
    </div>
    <el-menu
      :collapse="collapse"
      active-text-color="#ffd04b"
      background-color="#2c3039"
      class="el-menu-vertical-demo"
      :default-active="defaultValue"
      text-color="#fff"
    >
      <template v-for="item in menus" :key="item.id">
        <!-- 遍历一级菜单 -->
        <template v-if="item.childrenMenu.length !== 0">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.menuName }}</span>
            </template>
            <!-- 遍历二级菜单里面的子菜单 -->
            <template v-for="subitem in item.childrenMenu" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <span>{{ subitem.menuName }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            @click="handleMenuItemClick(item)"
            :index="item.id + ''"
            class="main-menu"
          >
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import store from "@/store"
import { computed, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { pathMapToMenu } from "@/utils/map-menus"
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const menus = computed(() => store.state.login.menu)

    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    const menu = pathMapToMenu(menus.value, currentPath) // 获取当前菜单所对应的menu对象，里面有当菜单所对应的id
    const defaultValue = ref(menu?.id + "")

    const handleMenuItemClick = (item) => {
      router.push({
        path: item.path
      })
    }

    return {
      menus,
      handleMenuItemClick,
      defaultValue
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  height: 100%;
  background-color: #20222a;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #20222a;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;

    // 目录
    .el-sub-menu {
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
      }
    }

    ::v-deep .el-sub-menu__title {
      background-color: #20222a !important;
    }

    // hover 高亮
    .el-menu-item:hover {
      color: #fff !important; // 菜单
      background: #2c3039;
    }

    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #394352 !important;
    }

    .main-menu {
      background-color: #20222a;
    }

    .main-menu.is-active {
      background-color: #20222a !important;
    }

    .main-menu:hover {
      background-color: #20222a !important;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px; //宽度自己掌握
  height: calc(100% - 48px);
}
</style>
