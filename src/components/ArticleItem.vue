<template>
  <el-card class="arc_warpper">
    <div class="my_articleli_content">
      <!-- 标题 -->
      <div class="arc_title">
        <router-link :to="myarticleurl">{{ article.title }}</router-link>
      </div>
      <!-- 描述 -->
      <p class="describtion">{{ handledescribtion(article.describtion) }}</p>
      <!--作者信息-->
      <div class="article_footer">
        <span class="arc_userinfo">
          <a @click="handleuser" style="cursor:pointer">
            <img :src="getuserimgurl(article.imgurl)" alt class="user_arc_img">
            <span class="arc_username">{{ article.nickname }}</span>
          </a>
          <span class="el-icon-time arc_subtime">&nbsp;{{ article.subtime }}</span>
        </span>
        <span class="viewed el-icon-view">&nbsp;阅读量：{{ handlerViewd(article.viewed) }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "ArticleItem",
  props: {
    article: {
      articleid: "", // 文章编号
      describtion: "", // 描述
      imgurl: "", // 头像url
      nickname: "", // 昵称
      suberid: "", // 提交者编号
      subtime: "", // 提交时间
      title: "", // 标题
      viewed: "" // 阅览次数
    }
  },
  data() {
    return {
      myarticleurl: "",
      touser: ""
    };
  },
  beforeCreate() {},
  created() {},
  computed: {
    ...mapGetters(["getuserimgurl"]),
    ...mapState(['userinfo'])
  },
  mounted() {
    this.myarticleurl = "/article?arcid=" + this.article.articleid;
    this.touser = "/bloguser?userid=" + this.article.suberid;
  },
  methods: {
    handlerViewd: value => {
      if (value == null || value === "null") {
        value = 0;
      }
      return value;
    },
    handleHeaderimg: value => {
      if (value == null || value === "null") {
        let img_url = require("../assets/logo.png");
        value = img_url;
      }
      return value;
    },
    handledescribtion: value => {
      if (value != null && value.length > 50) {
        value = value.substr(0, 50) + "......";
      }
      return value;
    },
    handleuser() {
      if (this.userinfo != null) {
        this.$router.push(this.touser);
      } else {
        this.$message.error("请先登录！");
      }
    }
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