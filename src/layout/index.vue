<!--  -->
<template>
  <div class="app-wrapper">
      <logo />
      <side-bar />
      <div class="main-container">
          <app-main />
      </div>
  </div>
</template>

<script>
import logo from './logo'
import sideBar from './sideBar'
import AppMain from './AppMain'
export default {
    components:{
        logo,sideBar,AppMain
    },
  data() {
    return {};
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>