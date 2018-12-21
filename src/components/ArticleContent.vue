<template>
  <!-- 这是指文章主要内容 -->
  <div class="articlecontent">
    <!-- 头部 -->
    <el-row>
      <!-- 文章标题-->
      <div class="myarc_title">{{ title }}</div>

      <!-- 作者信息 -->
      <div class="myartcile_headline">
        <span class="el-icon-date">&nbsp;{{ subtime }}</span>
        <router-link to="/" style="margin-left:20px;">
          <span class="el-icon-edit"></span>
          &nbsp;{{ suber }}
        </router-link>
        <span style="float:right;" class="el-icon-view">&nbsp;阅读数：{{ views }}</span>
      </div>
    </el-row>

    <!-- 主体内容 -->
    <el-row>
      <div class="mainarticle_content">
        <!-- 回显富文本编辑器内容 -->
        <div v-html="bodyhtml" class="w-e-text" style="overflow-y:hidden;"></div>
      </div>
    </el-row>

    <!-- 评论 -->
    <el-row>
      <div class="comments">评论：
        <div class="endit">
          <el-form>
            <el-form-item>
              <el-col :span="2">
                <img class="user_face" src alt>
              </el-col>
              <el-col :span="10">
                <el-input type="textarea" placeholder="输入评论内容"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="makeComments">评论</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 显示评论 -->
        <CommentsItem v-for="comment in commentLists" :key="comment.id" :comment="comment"></CommentsItem>
      </div>
    </el-row>
  </div>
</template>

<script>
import CommentsItem from "@/components/CommentsItem";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "ArticleContent",
  data() {
    return {
      arcid: "--",
      title: "--",
      subtime: "--",
      suber: "--",
      suberid: "--",
      views: "--",
      bodyhtml: "--",
      commentLists: [
        {
          id: "1",
          userfaceurl: "",
          nickname: "小鹏",
          message: "这是一套房间辣房间看电视",
          commenttime: "2018-01-09"
        }
      ]
    };
  },
  methods: {
    makeComments: function() {
      //TODO::
    }
  },
  components: {
    // 记住这边一定也要注册，否则会找不到！
    CommentsItem
  },
  computed: {
    ...mapState(["islogined", "userinfo"])
  },
  mounted() {
    let arcid = this.$route.query.arcid;
    this.arcid = arcid;
    console.log(arcid);
    // 发起请求
    this.$api
      .showArticle({
        articleid: arcid
      })
      .then(r => {
        let resp = r.data.data;
        // 设置内容
        this.title = resp.title;
        this.subtime = resp.subtime;
        this.views = resp.viewed;
        this.bodyhtml = resp.content;
        this.suber = resp.subername;
        this.suberid = resp.suberid;
        // 判断当前用户是否与作者相同，如果不相同则累加阅读次数
        if (this.userinfo.userId != this.suberid) {
          this.$api
            .increaseViewed(this.arcid)
            .then(r => {
              console.log(r);
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {});
  }
};
</script>

<style scrope>
.myartcile_headline {
  border-bottom: solid 1px rgb(228, 223, 223);
  color: #858585;
  height: 30px;
  line-height: 30px;
}
.myartcile_headline > a {
  text-decoration: none;
  color: gray;
}

.myarc_title {
  font-weight: 800;
  font-size: 25px;
  height: 56px;
  line-height: 56px;
}

.description {
  font-size: 14px;
  line-height: 22px;
  color: #999;
  font-weight: 400;
  margin-bottom: 0;
  display: block;
  padding: 16px;
  margin: 0 0 24px;
  border-left: 8px solid #dddfe4;
  background: #eef0f4;
  overflow: auto;
}

.comments {
  border-top: solid 1px #dddfe4;
  padding-top: 20px;
}

.user_face {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
}
</style>
