<template>
  <div class="mybriefbloglist">
    <!-- 博客列表 -->
    <MyBlogArticleItem
      v-for="myaric in myarticlelist.articlelsit"
      :key="myaric.id"
      :mybriefartic="myaric"
    />

    <!-- 分页 -->
    <el-row style="text-align:center;margin-top: 20px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="parseInt(myarticlelist.pageno)"
        :page-size="parseInt(myarticlelist.pagesize)"
        :total="parseInt(myarticlelist.total)"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import MyBlogArticleItem from "@/components/MyBlogArticleItem";

export default {
  name: "MyBlogArticle",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userinfo", "myarticlelist"])
  },
  components: {
    MyBlogArticleItem
  },
  mounted: function() {
    // 设置分页数据
    this.SET_MYARTICLEPAGE({
      pageno: 1,
      pagesize: 8
    });
    // 调用action
    this.loadData(1);
  },
  methods: {
    ...mapActions(["getMyArticle"]),
    ...mapMutations(["SET_MYARTICLEPAGE"]), 
    loadData(value) {
      this.SET_MYARTICLEPAGE({
        pageno: value,
        pagesize: "8"
      });
      this.getMyArticle();
    },
    handleCurrentChange: function(value) {
      this.loadData(value);
    },
    
  }
};
</script>

<style scope>
</style>