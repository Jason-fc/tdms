<!--  -->
<template>
  <div class="app-wrapper">
    <logo />
    <side-bar />
    <app-main />
  </div>
</template>

<script>
import logo from "./logo";
import sideBar from "./sideBar";
import AppMain from "./AppMain";
export default {
  components: {
    logo,
    sideBar,
    AppMain,
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.app-wrapper {
  width: 1280px;
  margin: 0 auto;
  height: 728px;
}
/* @import url(); 引入css类 */
</style>