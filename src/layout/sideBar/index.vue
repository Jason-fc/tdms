<!--  -->
<template>
  <div class="nav flex-row-spaceBetween">
    <div class="bar-item flex-column-center" v-for="item in sideBar" :key="item.name" :class="item.name === routePath?'checkeditem':''">
      <p>{{item.title}}</p>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        sideBar:[
           {
                name:"Home",
                title:"首页"
            },
            {
                name:"CCA",
                title:"国航"
            },
            {
                name:"CAO",
                title:"国货航"
            },
            {
                name:"Customers",
                title:"协议客户"
            },
            {
                name:"CMM",
                title:"附件手册"
            },
            {
                name:"Specifications",
                title:"标准/规范"
            },
            {
                name:"SB/SL/SIL",
                title:"通告/函件"
            },
             {
                name:"EM/MT",
                title:"EM/MT"
            },
            {
                name:"Search",
                title:"查询"
            },
             {
                name:"Effective",
                title:"有效清单"
            },
             {
                name:"Task/Notice",
                title:"任务/通知"
            },
            
        ]
    };
  },
  computed:{
      routePath(){
          return this.$route.name
      }
  }
};
</script>
<style scoped lang="scss">
.nav {
  height: 50px;
  background-color: #3770ae;
  .checkeditem{
      background-color: rgb(78, 142, 195);
  }
  .bar-item {
    flex: 1;
    height: 50px;
    position: relative;
    cursor: pointer;
    p {
      margin: 2px 0;
      color: #eaeaea;
    }

    p:first-child {
      font-size: 18px;
    }
    p:last-child {
      font-size: 14px;
    }
  }
  .bar-item::after {
      position: absolute;
      content: '';
      display: block;
      top: 25%;
      right: 0;
      width: 1px;
      height: 50%;
      background-color: #eaeaea;
      border-left: 2px solid rgb(124,165,206);
  }
  .bar-item:last-child::after{
      display: none;
  }
  .bar-item:hover {
    font-weight: 700;
  }
}
/* @import url(); 引入css类 */
</style>