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
  margin: 0 40px;
}
/* @import url(); 引入css类 */
</style>