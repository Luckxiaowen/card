<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '230px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChange="handlefoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from "vue"
import NavHeader from "@/components/nav-header/nav-header.vue"
import NavMenu from "@/components/nav-menu/nav-menu.vue"

export default {
  components: { NavHeader, NavMenu },
  setup() {
    const isCollapse = ref(false)
    const handlefoldChange = (isFold) => {
      isCollapse.value = isFold
    }

    return { isCollapse, handlefoldChange }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%;
  }

  .el-header {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #2c3039;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    height: calc(100% - 48px);
    color: #333;
    background-color: #f0f2f5;

    .page-info {
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
