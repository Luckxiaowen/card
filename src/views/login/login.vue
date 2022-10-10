<template>
  <div class="login">
    <login-board></login-board>
  </div>
</template>

<script>
import loginBoard from "@/components/login-board/login-board.vue"

export default {
  components: {
    loginBoard
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* 加载背景图 */
  background-image: url(@/assets/images/login-bg.jpg);
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}
</style>
