<template>
  <el-card class="arc_warpper">
    <div class="my_articleli_content">
      <!-- 标题 -->
      <div class="arc_title">
        <router-link to="/article">{{ article.title }}</router-link>
      </div>
      <!-- 描述 -->
      <p class="describtion">{{ article.describtion }}</p>
      <!--作者信息-->
      <div class="article_footer">
        <span class="arc_userinfo">
          <a href="#">
            <img src="https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543729025" alt class="user_arc_img">
            <span class="arc_username">{{ article.username }}</span>
          </a>
          <span class="el-icon-time arc_subtime">&nbsp;{{ article.subtime }}</span>
        </span>
        <span class="viewed el-icon-view">&nbsp;阅读量：{{ article.viewed }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      id: "",
      title: "",
      describtion: "",
      imgurl: "",
      username: "",
      subtime: "",
      viewed: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style scope>
.my_articleItem {
  width: 100%;
  padding: 10px;
  font-family: "Hiragino Sans GB";
}

/*标题*/
.arc_title > a {
  max-width: 98%;
  color: #3d3d3d;
  display: block;
  line-height: 24px;
  height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 700;
  font-size: 19px;
  text-decoration: none;
}

/*description*/
.describtion {
  color: #8a8a8a;
  font-size: 15px;
  line-height: 24px;
}

.viewed {
  float: right;
}

.article_footer {
  font-size: 14px;
}

.arc_userinfo > a {
  text-decoration: none;
}

.user_arc_img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: gray;
  display: inline-block;
  position: absolute;
  margin-top: -6px;
}

.arc_subtime {
  margin-left: 10px;
}

.arc_username {
    margin-left: 30px;
}

.arc_warpper:hover {
    background: #f3f3f3;
}
</style>