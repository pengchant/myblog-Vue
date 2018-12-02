<template>
  <div id="app">
    <div class="container">
      <!-- banner -->
      <Banner/>

      <!-- main_content -->
      <el-container >

        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>

        <el-aside width="300px">
          <!-- 用户信息 -->
          <UserInfo />
        </el-aside> 

      </el-container> 
      
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import UserInfo from '@/components/UserInfo';

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Banner,
    UserInfo
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

.container {
  width: 100%;  
}
</style>
