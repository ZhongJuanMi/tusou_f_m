<template>
  <div>
    <van-nav-bar :title="title"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)"
                 class="header" />
    <div class="empty"></div>
  </div>

</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common/var.scss';
.header {
    height: 86px;
    width: 100%;
    text-align: center;
    line-height: 86px;
    background-color: $primary;
    position: fixed;
    top: 0;
    left: 0;
}
.empty {
    margin-bottom: 86px;
}
</style>

