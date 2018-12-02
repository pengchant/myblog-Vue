<template>
  <div class="friendsitem">
    <!-- 朋友 -->
    <el-row>
      <el-col :span="4">
        <!-- 用户图片 -->
        <img :src="friends.userface" alt>
      </el-col>
      <el-col :span="4">{{ friends.nickname }}</el-col>
      <el-col :span="16">
        <!-- 关注按钮 -->
        <el-button type="danger" plain>关注</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "FriendsItem",
  props: {
    friends: {
      id: "",
      userface: "",
      nickname: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style scope>
</style>