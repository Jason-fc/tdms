<!-- logo -->
<template>
  <div class="logo">
    <img :src="logourl" alt="logo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logourl: require("../../assets/logo_images/logo.jpg"),
    };
  },
};
</script>
<style scoped lang="scss">
.logo{
    height: 109px;
    img{
        width: 100%;
        height: 109px;
    }
}
/* @import url(); 引入css类 */
</style>