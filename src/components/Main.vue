<template>
  <div class="main">
    <!-- 文章列表 -->
    <ArticleItem v-for="article in articles" :article="article" :key="article.id"></ArticleItem>

    <!-- 测试后台 -->
    <el-row>
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    {{ loginmsg }}
    <el-row>
      <el-button @click="logout" type="success">退出登录</el-button>
    </el-row>
    {{ logoutmsg }}
    <!-- 分页 -->
    <el-row style="text-align:center;margin-top: 20px;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem";

export default {
  name: "Main",
  data() {
    return {
      articles: [
        {
          id: "1",
          title: "21 天零基础入门机器学习 ， 高薪 Offer 就在眼前",
          describtion:
            "今天，想真诚地讲个故事，分享给大家一个来自《极简机器学习入门》的学员天明同学的真实学习事例。",
          imgurl: "./assets/logo.png",
          username: "111",
          subtime: "2018-09-09 10:09:00",
          viewed: "1212"
        },
        {
          id: "2",
          title: "21 天零基础入门机器学习 ， 高薪 Offer 就在眼前",
          describtion:
            "今天，想真诚地讲个故事，分享给大家一个来自《极简机器学习入门》的学员天明同学的真实学习事例。",
          imgurl: "./assets/logo.png",
          username: "111",
          subtime: "2018-09-09 10:09:00",
          viewed: "1212"
        },
        {
          id: "3",
          title: "21 天零基础入门机器学习 ， 高薪 Offer 就在眼前",
          describtion:
            "今天，想真诚地讲个故事，分享给大家一个来自《极简机器学习入门》的学员天明同学的真实学习事例。",
          imgurl: "./assets/logo.png",
          username: "111",
          subtime: "2018-09-09 10:09:00",
          viewed: "1212"
        }
      ],
      user: {
        userId: "",
        pwd: ""
      },
      loginmsg: "",
      logoutmsg: ""
    };
  },
  components: {
    ArticleItem
  },
  methods: {
    onSubmit: function() {
      // 登录
      var vm = this;
      this.$api
        .userLogin(this.user)
        .then(r => {
          this.loginmsg = r.data;  
        })
        .catch(e => {
          console.log(e);
        });
    },
    logout: function() {
      // 退出登录
      var vm = this;
      this.$api
        .userLogout(this.user.userId)
        .then(r => {
          this.logoutmsg = r.data;
        })
        .catch(e => {});
    }
  }
};
</script>

<style scope>
</style>