<template>
  <!-- 这是指文章主要内容 -->
  <div class="articlecontent">
    <!-- 头部 -->
    <el-row style="padding: 0 27px 10px 22px;">
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
                <img
                  class="user_face"
                  src="https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543729025"
                  alt
                >
              </el-col>
              <el-col :span="22">
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

export default {
  name: "ArticleContent",
  data() {
    return {
      title: "java 基础 native 关键字",
      subtime: "2018-09-09",
      suber: "小鹏要逆袭",
      views: "1233",
      bodyhtml:
        '<div class="w-e-text" style="overflow-y: hidden;"><h1><span style="font-weight: bold;">江苏科技大学</span></h1><div><div label-module="para">江苏科技大学坐落在风景秀丽的国家历史文化名城——江苏省镇江市，是一所以工为主、特色鲜明、具备培养学士、硕士、博士的完整教育体系的普通高等学校，是江苏省重点建设高校，教育部本科教学工作水平评估优秀学校，教育部卓越工程师教育培养计划高校，国家国防科技工业局共建高校。<sup>&nbsp;[1]</sup><a name="ref_[1]_52645">&nbsp;</a></div><div label-module="para"><a name="ref_[1]_52645"><br></a></div><div label-module="para">学校办学历史源远流长，多源合流，文化底蕴深厚。1952年第一工业机械部船舶工业局筹建新中国第一所造船中等专业学校——上海船舶工业学校。1953年8月上海船舶工业学校正式创办，开始招生。1970年迁至镇江，更名为镇江船舶工业学校，1978年升格为本科并更名镇江船舶学院，1993年更名为华东船舶工业学院。1999年学校从原中国船舶工业总公司划转江苏省管理。2004年学校更名为江苏科技大学。2012年江苏省人民政府与中国船舶工业集团公司、中国船舶重工集团公司共建江苏科技大学。2016年国家国防科技工业局与江苏省人民政府共建江苏科技大学。</div><div label-module="para"><br></div><div label-module="para">学校拥有镇江东、南、西3个校区和张家港校区，占地2492亩。一个占地2350余亩的镇江市丹徒新区十里长山新校区正在全面建设之中。学校有15个学院，学校教学科研仪器设备总值4.98亿元，教学科研设备总台套数30400台（套）；纸质图书211.07万册、电子图书270余万种。2018年6月19日，教育部办公厅批准终止江苏科技大学与法国巴黎高等计算机学院合作举办计算机科学与技术专业本科教育项目。<sup>&nbsp;[2-3]</sup><a name="ref_[2-3]_52645">&nbsp;</a></div></div><div label-module="para"><a name="ref_[2-3]_52645"><img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=48d81b086f380cd7f213aabfc02dc651/8694a4c27d1ed21bf652ca5da76eddc450da3feb.jpg" style="max-width:100%;"><br></a></div><div label-module="para"><a name="ref_[2-3]_52645"><br></a></div></div><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>',
      commentLists: [
        {
          id: "1",
          userfaceurl:
            "https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543729025",
          nickname: "小鹏",
          message: "这是一套房间辣房间看电视",
          commenttime: "2018-01-09"
        },
        {
          id: "2",
          userfaceurl:
            "https://avatar.csdn.net/4/2/9/1_w3chhhhhh.jpg?1543729025",
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
