<template>
  <div class="newarticle">

    <el-row class="my_row">
      <!-- 输入文章标题 -->
      <el-input  placeholder="请输入文章标题" clearable v-model="tilecontent"></el-input>
    </el-row>

    <el-row class="my_row">
      <!-- 文本编辑器区域 -->
      <div id="editorElem" style="text-align:left"></div>
    </el-row>

    <el-row class="my_row">
      <el-button type="primary" @click="getContent">立即创建</el-button>
      <el-button>取消</el-button>
    </el-row>

    <!-- 回显富文本编辑器内容 -->
    <div v-html="editorContent" class="w-e-text" style="overflow-y:hidden;"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "NewArticle",
  data() {
    return {
      editorContent: "",
      tilecontent: ""
    };
  },
  methods: {
    getContent: function() {// 获取富文本编辑器的内容
      alert(this.editorContent);
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  }
};
</script>

<style scope>
.my_row{
    margin-bottom: 30px;
    text-align: center;
}
</style>