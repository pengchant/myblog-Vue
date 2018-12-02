<template>
  <div class="commitem">
    <el-row>
      <el-col :span="20">
        <router-link to="/" class="inline_item">
          <img :src="comment.userfaceurl" class="userface">
          <span class="span_text">{{ comment.nickname }}:</span>
        </router-link>
        <span class="span_text">{{ comment.message }}</span>
      </el-col>
      <el-col :span="4">{{ comment.commenttime }}</el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "CommentsItem",
  props: {
    comment: {
      id: "",
      userfaceurl: "",
      nickname: "",
      message: "",
      commenttime: ""
    }
  },
  data() {
    return {};
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
  text-decoration:none;
  display:inline-block;
  position: relative;
}
.span_text {
  display:inline-block; 
}
</style>
