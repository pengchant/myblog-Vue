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
        <a style="margin-left:20px;">
          <span class="el-icon-edit"></span>
          &nbsp;{{ suber }}
        </a>
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
        <div v-if="islogined">
          <div class="endit">
            <el-form>
              <el-form-item>
                <el-col :span="2">
                  <img class="user_face" :src="getuserimgurl()" alt>
                </el-col>
                <el-col :span="10">
                  <el-input type="textarea" v-model="addedcomments" placeholder="输入评论内容"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addComments">评论</el-button>
                <el-button @click="clearInput">清空</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <p v-else style="text-align:center;"><span class="el-icon-warning">请登录后再评论</span></p>
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
      commentLists: [],
      addedcomments: "" 
    };
  },
  methods: {
    initData() {
      let arcid = this.$route.query.arcid;
      this.arcid = arcid;
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
          // 设置评论
          this.commentLists = resp.articleComments;
          // 判断当前用户是否与作者相同，如果不相同则累加阅读次数
          if (this.userinfo.userId != this.suberid) {
            this.$api
              .increaseViewed(this.arcid)
              .then(r => {
                console.log(r);
              })
              .catch(e => { 
              });
          }
        })
        .catch(e => {});
    },
    addComments() {
      var vm = this;
      this.$confirm("是否提交评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(r => {
          // 添加评论
          this.$api
            .addComments({
              articleid: vm.arcid, // 文章编号
              suberid: vm.userinfo.userId, // 当前用户编号
              subername: vm.userinfo.nickname, // 昵称
              comments: vm.addedcomments // 评论内容
            })
            .then(r => { 
              vm.addedcomments = "";
              vm.$message.success("评论成功!");
              // 重新加载数据
              vm.$api
                .queryComments(vm.arcid)
                .then(r => {
                  vm.commentLists = r.data.data;
                })
                .catch(e => { 
                });
            });
        })
        .catch(e => {
          vm.addedcomments = "";
        });
    },
    clearInput() {
      this.addedcomments = "";
    }
  },
  components: {
    // 记住这边一定也要注册，否则会找不到！
    CommentsItem
  },
  computed: {
    ...mapState(["islogined", "userinfo"]),
    ...mapGetters(["getuserimgurl"])
  },
  mounted() {
    this.initData();
    
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
