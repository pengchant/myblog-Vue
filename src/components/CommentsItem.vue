<template>
  <div class="commitem">
    <el-row>
      <el-col :span="20">
        <a @click="handleclick" class="inline_item">
          <img :src="getuserimgurl(comment.suberimgurl)" class="userface">
          <span class="span_text">{{ comment.subername }}:</span>
        </a>
        <span class="span_text">{{ comment.comments }}</span>
      </el-col>
      <el-col :span="4">{{ comment.subtime }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "CommentsItem",
  props: {
    comment: {
      articleid: "",
      suberimgurl: "",
      subername: "",
      comments: "",
      subtime: "",
      suberid: ""
    }
  },
  data() {
    return {
      touser: ""
    };
  },
  computed: {
    ...mapGetters(["getuserimgurl"]),
    ...mapState(["userinfo"])
  },
  mounted() {
    this.touser = "/bloguser?userid=" + this.comment.suberid;
  },
  methods: {
    handleclick() {
      if (this.userinfo != null) {
        this.$router.push(this.touser);
      } else {
        this.$message.error("请先登录再查看哦~");
      }
    }
  }
};
</script>

<style scope>
.commitem {
  border-top: dotted 1px rgb(247, 247, 247);
  padding: 5px;
}

.userface {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
}

.inline_item {
  text-decoration: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.span_text {
  display: inline-block;
}
</style>
