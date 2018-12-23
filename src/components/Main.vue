<template>
  <div class="main">
    <!-- 文章列表 -->
    <ArticleItem v-for="article in articles" :article="article" :key="article.articleid"></ArticleItem>

    <!-- 分页 -->
    <el-row style="text-align:center;margin-top: 20px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem";

export default {
  name: "Main",
  data() {
    return {
      currentPage: 1, // 初始页
      pageSize: 5, // 页面大小
      total: 0, // 总的记录数
      articles: [],
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
  methods: {},
  created() {
    // 加载数据
    this.handleArticleList();
  },
  methods: {
    handleCurrentChange: function(value) { 
      this.currentPage = value;
      this.handleArticleList();
    },
    handleArticleList() {
      // 加载数据
      this.$api
        .getArticles({
          pageno: this.currentPage,
          pagesize: this.pageSize
        })
        .then(r => { 
          let mydata = r.data.data;
          var result = mydata.list;
          this.articles = result;
          // 设置当前页
          this.total = mydata.total;
          this.pagecount = mydata.pages;
        })
        .catch(e => { 
        });
    }
  }
};
</script>

<style scope>
</style>