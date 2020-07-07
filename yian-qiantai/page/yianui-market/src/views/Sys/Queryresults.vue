<template>

        <el-form  label-position="left" class="demo-ruleForm login-container">
        <img style="width:131px;height:25px;position:relative;margin-right:220px;margin-top:60px;"  src="@/assets/logo.png" />   
    <el-form-item>
    <el-col :span="20" class="cw-1">
       查询结果：
    </el-col>
   <br>
   <el-col :span="20" class="cw-111">
     <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{productmodel}}</p>
    </el-col>
		


    <el-col :span="20" class="cw-11">
      
          <br>主机，湿化器保修2年，水罐保修1年。
          <br>管路面罩保修30天。
    </el-col>
    </el-form-item>
    <el-form-item>
        <img style="width:375px;height:265px; position:relative;margin-top:10px;"  src="@/assets/a577e1cc5b187e383830d565dac714c.png" />   
    </el-form-item>
    <template>
</template>
  </el-form>
</template>


<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
import XLSX from 'xlsx'
export default {
  name: 'HelloWorld',
  data () {
    return {
      productmodel:'',
      productmodel222:'',
      msg: '',
      checked: false,
     routerParams:'',
     serialnumber:'',
     xuliehao:'',
    }
  },

      mounted:function(){
       this.getserialnumber();//需要触发的函数
      },

  methods:{
  	getserialnumber: function() {
      let bailing=
    // var serialnumber = this.$route.query.name;
    this.serialnumber = this.$route.query.name;   
		this.$api.queryresults.getDetails(this.serialnumber).then((res) => {   
        this.productmodel=res.msg
			 })
    },
  }
 }
</script>

<style lang="scss" scoped>
.div-inline{ 
  float:left;
  } 
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
position: relative; 
right:170px;
 //margin: 0px auto;
  width: 420px;
  height:600px;
  padding: 0px 0px 0px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 0px #cac6c6;
}

.cw-1{
position:relative;
right:85px;
margin-top:50px;
font-family: PingFangSC-Regular;
font-size: 21px;
color: #333333;
line-height: 30px;
}
.cw-111{
position:relative;
margin-left:35px;
margin-top:0px;
font-family: PingFangSC-Regular;
font-size: 17.8px;
color: #333333;
line-height: 30px;
}
.cw-11{
position:relative;
margin-left:35px;
margin-top:0px;
font-family: PingFangSC-Regular;
font-size: 17px;
color: #aaa7a7;
line-height: 30px;
}

</style>
