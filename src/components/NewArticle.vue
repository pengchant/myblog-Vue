<template>
  <div class="newarticle">
    <el-row class="my_row">
      <!-- 输入文章标题 -->
      <el-input placeholder="请输入文章标题" clearable v-model="tilecontent"></el-input>
    </el-row>

    <el-row class="my_row">
      <!-- 描述 -->
      <el-input placeholder="请输入描述" clearable v-model="describ"></el-input>
    </el-row>

    <el-row class="my_row">
      <!-- 文本编辑器区域 -->
      <div id="editorElem" style="text-align:left"></div>
    </el-row>

    <el-row class="my_row">
      <el-button type="primary" @click="submitcontent">立即创建</el-button>
      <el-button @click="clearconent">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import E from "wangeditor";

export default {
  name: "NewArticle",
  data() {
    return {
      editorContent: "",
      tilecontent: "",
      myeditor: null,
      describ: ""
    };
  },
  computed: {
    ...mapState(["islogined", "userinfo"])
  },
  methods: { 
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    submitcontent: function() {
      this.$confirm("请问你是否确定要添加文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 添加文章
          this.$api
            .writeArticle({
              title: this.tilecontent, // 标题
              content: this.editorContent, // 文章内容
              suber: this.userinfo.userId, // 发布者
              describ: this.describ // 简述
            })
            .then(r => {  
              if (r.data.ok) {
                this.tilecontent = "";
                this.editorContent = "";
                this.describ = "";
                this.$message.success(r.data.msg);
                this.myeditor.txt.html('<p><br></p>');
                // 更新用户状态
                this.RECORD_USERINFO(r.data.data);
              } else {
                this.$message.error(r.data.msg);
              }
            })
            .catch(e => {
              this.$message.error("对不起添加失败，请稍后重试!");
            });
        })
        .catch(e => { 
        });
    },
    clearconent: function(){
      this.$confirm("请问你是否确定清空当前内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(r=>{
        this.myeditor.txt.html("<p><br/></p>");
      }).catch(e=>{
        this.$message.info("信息未撤销!");
      })
      
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
    this.myeditor = editor;
  }
};
</script>

<style scope>
.my_row {
  margin-bottom: 30px;
  text-align: center;
}

.w-e-text-container{
  z-index: 1!important;
}

div.w-e-menu {
  z-index: 2!important;
}
</style>