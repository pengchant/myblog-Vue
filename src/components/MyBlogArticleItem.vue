<template>
  <div>
    <el-card class="mybloglist"> 
      <div class="header">
        <router-link to="/article" class="bertitle">{{ mybriefartic.title }}</router-link>
      </div>
      <div class="footer">
        <span class="el-icon-edit">{{ mybriefartic.time }}</span>
        <span class="el-icon-view viewers">{{ mybriefartic.views }}</span>
        <span>
          <router-link to="/" class="see">查看</router-link>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyBlogArticleItem",
  props: {
    mybriefartic: {
      id: "",
      title: "",
      time: "",
      views: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style scope>
    .mybloglist{
        margin-bottom: 20px;
    }

    .bertitle {
        text-decoration: none;
        font-weight:400;
        font-size:20px;
        color:rgb(90, 89, 89);
    }

    .footer{
        font-size: 15px;
        margin-top: 10px;
        color:rgb(165, 158, 158);
    }
    .see{
        text-decoration: none;
        float:right;
        color:rgb(185, 183, 183);
    }

    .mybloglist:hover{
        background: rgb(243, 240, 240);
    }

    .viewers{
        margin-left: 30px;
    }
</style>