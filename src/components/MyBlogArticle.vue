<template>
  <div class="mybriefbloglist">
    <!-- 博客列表 --> 
     <MyBlogArticleItem v-for="myaric in mybriefartics" :key="myaric.id" :mybriefartic="myaric"/>
   

    <!-- 分页 -->
    <el-row style="text-align:center;margin-top: 20px;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import MyBlogArticleItem from "@/components/MyBlogArticleItem";

export default {
  name: "MyBlogArticle",
  data() {
    return {
      mybriefartics: [
        {
          id: "1",
          title: "机器学习算法实践1",
          time: "2018-10-09",
          views: "123"
        },
        {
          id: "2",
          title: "机器学习算法实践2",
          time: "2018-10-09",
          views: "123"
        },
        {
          id: "3",
          title: "机器学习算法实践3",
          time: "2018-10-09",
          views: "123"
        },
        {
          id: "4",
          title: "机器学习算法实践4",
          time: "2018-10-09",
          views: "123"
        },
        {
          id: "5",
          title: "机器学习算法实践5",
          time: "2018-10-09",
          views: "123"
        }
      ]
    };
  },
  components: {
    MyBlogArticleItem
  }
};
</script>

<style scope>
</style>