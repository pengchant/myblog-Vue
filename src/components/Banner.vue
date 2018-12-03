<template>
  <div class="my_banner">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">我的博客</el-menu-item>  
      <el-menu-item index="6">新建博客</el-menu-item>
      <el-menu-item index="4">我的圈子</el-menu-item>
      <el-menu-item index="3">个人信息</el-menu-item>

      <el-submenu index="5" style="float:right;">
        <template slot="title">welcome, admin</template>
        <el-menu-item index="5-1">退出登录</el-menu-item>
        <el-menu-item index="5-2">修改密码</el-menu-item>
        <el-menu-item index="5-3">个人信息</el-menu-item>
      </el-submenu> 
    </el-menu> 
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      activeIndex: "1",
      input_search: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if(key==="1"){
        this.$router.push("/");
      }
      if(key ==="2"){
        this.$router.push("/myarticle")
      }
      if(key==="6"){
        this.$router.push("/newartic");
      }
      if(key === "4"){
        this.$router.push("/friends");
      }
      if(key === "3"){
        this.$router.push("/myinfo");
      }
      
      console.log(key, keyPath);
    }
  }
};
</script>

<style scope>
</style>