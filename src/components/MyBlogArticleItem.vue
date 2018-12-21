<template>
  <div>
    <el-card class="mybloglist">
      <div class="header">
        <router-link :to="myarticleurl" class="bertitle">{{ mybriefartic.title }}</router-link>
      </div>
      <div class="footer">
        <span class="el-icon-edit">&nbsp;&nbsp;{{ formatdate(mybriefartic.subtime) }}</span>
        <span class="el-icon-view viewers">&nbsp;&nbsp;{{ mybriefartic.viewed }}</span>
        <span>
          <router-link :to="myarticleurl" class="see">
            <el-button icon="el-icon-document" type="primary" plain circle></el-button>
          </router-link>&nbsp;
        </span>
        <span class="see">
          <el-button icon="el-icon-delete" @click="handledel" type="danger" plain circle></el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "MyBlogArticleItem",
  props: {
    mybriefartic: {
      articleId: "",
      title: "",
      subtime: "",
      viewed: ""
    }
  },
  data() {
    return {
      myarticleurl: ""
    };
  },
  computed: {
    ...mapState(["userinfo"])
  },
  methods: {
    ...mapActions(["getMyArticle"]),
    ...mapMutations(["SET_MYARTICLEPAGE"]),
    formatdate: val => {
      let mydate = new Date(val);
      return (
        mydate.getFullYear() +
        "-" +
        (mydate.getMonth() + 1) +
        "-" +
        mydate.getDate() +
        " " +
        mydate.getHours() +
        ":" +
        mydate.getMinutes() +
        ":" +
        mydate.getMinutes()
      );
    },
    handledel() {
      var vm = this;
      vm.$confirm(
        "请问你是否确定要删除《" + vm.mybriefartic.title + "》？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(r => {
          vm.$api
            .delmyarticle(vm.mybriefartic.articleId, vm.userinfo.userId)
            .then(r => {
              vm.$message({
                message: "删除成功",
                type: "success"
              });
              // 重新获取数据
              vm.SET_MYARTICLEPAGE({
                pageno: 1,
                pagesize: 8
              });
              vm.getMyArticle();
            });
        })
        .catch(e => {});
    }
  },
  mounted: function() {
    this.myarticleurl = "/article?arcid=" + this.mybriefartic.articleId;
  }
};
</script>

<style scope>
.mybloglist {
  margin-bottom: 20px;
}

.bertitle {
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  color: rgb(90, 89, 89);
}

.footer {
  font-size: 15px;
  margin-top: 10px;
  color: rgb(165, 158, 158);
}
.see {
  text-decoration: none;
  float: right;
  color: rgb(185, 183, 183);
  margin: -28px 10px 0px 10px;
}

.mybloglist:hover {
  background: rgb(243, 240, 240);
}

.viewers {
  margin-left: 30px;
}
</style>