<template>
  <div class="main">
    <!-- 文章列表 -->
    <ArticleItem v-for="article in articles" :article="article" :key="article.id"></ArticleItem>
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
      ]
    };
  },
  components: {
    ArticleItem
  }
};
</script>

<style scope>
</style>