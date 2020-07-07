<template>

  <el-form
    :model="loginForm"
    ref="loginForm"
    label-position="left"
    label-width="20px"
    :rules="rules"
  >
   
    <!--定义下拉菜单--> <!--@open="handleOpen"
          @close="handleClose" -->
    <el-row style="right:110px">
      <el-col :span="27">
        <el-menu default-active="2"  class="el-menu-vertical-demo"  background-color="#F4F4F6" text-color="#555555" active-text-color="#ffffff">
            <el-menu-item-group>
                  <router-link to="/">
                    <img style="width:20px;height:20px;position:absolute; top:18px;left:10px;" src="@/assets/icon_back@2x.png" />
                   </router-link>
                    <span style="font-family: PingFangSC-Regular;font-size: 18px;color: #000000;letter-spacing: 0;text-align: center;line-height: 24px;">基本信息（必填）</span>
                <br>  <br>  <br> 
              <el-form-item header-align="center" prop="name" label="医院名称" label-width="220px" >
                <el-input
                style="width:150px;right:15px;" 
                  type="text"
                  header-align="left"
                  label-width="25px"
                  placeholder="请输入医院名称"
                  v-model="loginForm.name"
                  auto-complete="off"
                  onkeyup="(this.v=function(){this.value=this.value.replace(/^[\u4e00-\u9fa5]{6}$/,'');}).call(this)"    maxlength="5"
                >
                <!-- <div class="reminder" v-show="nameShow">
            	<span class="el-icon-warning"></span>{{nameText}}
      			</div> --></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="address" label="地址" label-width="190px">
                <el-input
                  style="width:150px;right:0px;"
                  type="text"
                  header-align="left"
                  label-width="15px"
                  placeholder="请输入地址"
                  v-model="loginForm.address"
                  maxlength="15" 
                ></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="contacts" label="设备科联系人" label-width="190px">
                <el-input
                style="width:150px;right:0px;top:0px;font-size:13px" 
                  header-align="left"
                  label-width="15px"
                  v-model.number="loginForm.contacts"
                  auto-complete="off"
                  placeholder="请输入设备科联系人"
                  maxlength="10" 
                  
                >
             </el-input>  </el-form-item>
				<el-form-item header-align="center" prop="telephone" label="电话" label-width="190px">
            <el-input v-model="loginForm.telephone" auto-complete="off" style="width:150px;font-size:13px"  placeholder="请输入11位手机号码"
				 maxlength="11" @keyup.native="Mobilerule" type="text"></el-input>
			
              </el-form-item>
              <el-form-item header-align="center" prop="officephone" label="办公电话" label-width="190px">
               <el-input v-model="loginForm.officephone" placeholder="请输入办公电话" style="width:150px;right:0px;"
				onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"
        		oninput="if(value.length>11)value=value.slice(0,15)" ></el-input>
              </el-form-item>
               <el-form-item header-align="center" prop="verificationcode" label="手机验证码" label-width="190px">
                <el-input
                 style="width:80px;left:0px;" 
                  header-align="left"
                  label-width="15px"
                  v-model.number="loginForm.verificationcode"
                  auto-complete="off"
                  placeholder=""
                  maxlength="4"
                  type="text" 
                ></el-input>
                <el-link v-show="!show1" @click="getCode" style="font-family: PingFangSC-Regular;font-size: 16px;color: #854FC1;line-height: 18px;text-align: center;line-height: 24px;right:0px;">点击发送</el-link>
   <span v-show="!show" class="count"   style="font-family: PingFangSC-Regular;font-size: 16px;color: #854FC1;line-height: 18px;text-align: center;line-height: 24px;margin-left:0px;">{{count}}(s)后重试</span>
              </el-form-item>
              <el-form-item header-align="center" label="装机科室" prop="office" label-width="190px">
			<el-input
                 style="width:150px;right:0px;top:0px;" 
                  type="text"
                  header-align="left"
                  label-width="15px"
                  placeholder="请输入装机科室"
                  v-model="loginForm.office"
                  auto-complete="off"
                  maxlength="10" 
                ></el-input>
			</el-form-item>
          <el-form-item header-align="center" label="科室主任" prop="officer" label-width="190px">
			<el-input
                 style="width:150px;right:0px;top:0px;" 
                  type="text"
                  header-align="left"
                  label-width="15px"
                  placeholder="请输入科室主任"
                  v-model="loginForm.officer"
                  auto-complete="off"
                  maxlength="10" 
                ></el-input>
			</el-form-item>
            </el-menu-item-group>
          
          <!--下拉菜单二-->
           <el-submenu index="2"> 
            <template slot="title">
              <i class="el-icon-location"></i>
               <span style="font-family: PingFangSC-Regular;font-size: 18px;color: #000000;letter-spacing: 0;text-align: center;line-height: 24px;">产品购买信息</span>
            </template>
                 <el-form-item header-align="center" prop="serialnumber" label="出厂编号（SN码）" label-width="190px">
                <el-input
                 style="width:190px;right:10px;font-size:9px;" 
                  type="text"
                  header-align="left"
                  label-width="15px"
                font-size="10px"
                  placeholder="请按照案例中编号（SN码）录入"
                  v-model="loginForm.serialnumber"
                  auto-complete="off" @blur='ruleSerialnumber' @input='Serialnumberopt'  maxlength="14"
                ></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="producttype" label="产品型号" label-width="190px">
             <el-input
                 style="width:170px;right:10px;" 
                  type="text"
                  header-align="left"
                  label-width="15px"
                font-size="10px"
                  placeholder="请输入产品型号"
                  v-model="loginForm.producttype"
                  maxlength="25"
                ></el-input>
              </el-form-item>
                 <el-form-item header-align="center" prop="sellername" label="销售商品名称" label-width="190px">
                <el-input style="width:170px;right:10px;"  type="text" header-align="left" label-width="25px" placeholder="请输入销售商品名称" v-model="loginForm.sellername" auto-complete="off"></el-input>
                </el-form-item>
               <el-form-item header-align="center" prop="purchasedate" label="购买日期" label-width="190px">
             <el-date-picker :editable="false" style="width:170px;right:10px;" v-model="loginForm.purchasedate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"  value-format="yyyy-MM-dd" ></el-date-picker>              </el-form-item>  
    </el-submenu>
          <!--下拉菜单三-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
                <span style="font-family: PingFangSC-Regular;font-size: 18px;color: #000000;letter-spacing: 0;text-align: center;line-height: 24px;">产品安装信息</span>
            </template>
            <el-menu-item-group>
              <el-form-item header-align="center" prop="requirements" label="使用条件是否满足要求" label-width="250px">
              <el-input style="width:100px;right:10px" type="text" header-align="left" label-width="25px" placeholder="符合" v-model="loginForm.requirements" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="selftest" label="开机自检测试及工作情况" label-width="250px">
              <el-input style="width:100px;right:10px"  type="text" header-align="left" label-width="25px" placeholder="正常" v-model="loginForm.selftest" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="usertraining" label="用户培训情况" label-width="230px">
              <el-input style="width:100px;right:0px"  type="text" header-align="left" label-width="25px" placeholder="操作培训" v-model="loginForm.usertraining" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="logoplacement" label="中文标识是否准确放置" label-width="230px">
              <el-input style="width:100px;right:0px" type="text" header-align="left" label-width="25px" placeholder="是"  maxlength="15"  v-model="loginForm.logoplacement" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="installconclusion" label="装机结论" label-width="190px"></el-form-item>
              <el-input  style="width:300px;bottom:20px;left:20px;"   type="textarea" :rows="4" placeholder="请输入描述:" v-model="loginForm.installconclusion"  maxlength="50" show-word-limit  auto-complete="off"></el-input>        
              <el-form-item header-align="center" prop="installer" label="安装人" label-width="190px">
              <el-input style="width:120px;right:0px" type="text" header-align="left" label-width="25px" placeholder="请输入安装人" maxlength="10"  v-model="loginForm.installer" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="installdate" label="安装日期" label-width="190px">
              <el-date-picker style="width:140px;right:0px;"  v-model="loginForm.installdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>              </el-form-item>
              <el-form-item header-align="center" prop="acceptor" label="验收人" label-width="190px">
              <el-input style="width:120px;right:0px" type="text" header-align="left" label-width="25px" placeholder="请输入验收人" maxlength="10"   v-model="loginForm.acceptor" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item header-align="center" prop="acceptdate" label="验收日期" label-width="190px">
              <el-date-picker style="width:140px;right:0px;"  v-model="loginForm.acceptdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>              </el-form-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-form-item>
          <el-button
            type="info"
            style="width:80%;height:38px;position:absolute;top:15px;right:80px;background: #854FC1;border-radius: 19px;"
            perms="sys:cardhospital:add"  @click="submitForm">提交</el-button>
          <div
            style="width:80%;height:30px;position:absolute;top:50px;right:65px;"
          >咨询热线：400-610-8333</div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
import XLSX from 'xlsx'
import { mapState } from "vuex"
import Cookies from "js-cookie"
import { provinceAndCityData,CodeToText, TextToCode} from "element-china-area-data"
    
export default {
  data() {
      return {
      contactMobileText:'',
      contactMobileShow:false,
      loadingCity: false,
      province: "",
      show: true,
      show1:false,
      show2: true,
      count: '',
      yanzhengma:"",
      city: "",
      options: provinceAndCityData,
      selectedOptions: [],
      salesnamelist: [],
      hospitalNameList: [],
      list: [],
      isloading: false,
      allHospitalInfo: [],
      loading: false,sex: [{
				value: '男',
				label: '男'
				},{
				value: '女',
				label: '女'
				}],
			buychannel: [{
				value: '网购',
				label: '网购'
				},{
				value: '门店',
				label: '门店'
				}],
			size: 'small',
			filters: {
				customercode:'',
				name: '',
				telephone:'',
				sex:'',
				buychannel: '',
				provinceandcity: '',
				province:'',
        city: '',
        purchasedata:"",
			},
      loginForm: {
				//customercode:'',
				name: '',
				address:'',
				contacts:'',
				telephone: '',
				officephone: '',
				office: '',
				officer:'',
				//createtime:''
        verificationcode:'',
			//	productmodel:'',
				serialnumber:'',	
				sellername:'',
				purchasedate:'',
 	      hospital:'',
				room:'',	
				breathetype:'',
				othersA:'',
				psgresult:'',
				saturation:'',
				complication:'',
				othersB:'',
				parameters:'',
      	compllication:'',
				sellername:'',
				appearance:'',
				packing:'',
				accessories:'',
				remarks:'',
				requirements:'',
				selftest:'',
				usertraining:'',
				logoplacement:'',
				installconclusion:'',
				installer:'',
				installdate:'',
				acceptor:'',
				acceptdate:'',
      },
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, 
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },  
        value1: '',
        value2: '',
        value3: '', 
        rules:  { 
				        name:             [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
                address:          [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
                verificationcode: [{ required: true, message: '请输入4位验证码', trigger: 'blur' }],
		 	         	contacts:         [{ required: true, message: '请输入设备科联系人', trigger: 'blur' }],
			        	officephone:      [{ required: true, message: '请输入办公电话', trigger: 'blur' }],
			        	telephone:        [{ required: true, message: '请输入11位手机号码', trigger: 'blur' }],
				        office:  	        [{ required: true, message: '请输入装机科室', trigger: 'blur' }],
                officer:      	  [{ required: true, message: '请输入科室主任', trigger: 'blur' }],
                serialnumber:     [{ required: true, message: '请输入序列号', trigger: 'blur' }],
                sellername:       [{ required: true, message: '请输入销售商名称', trigger: 'blur' }],
                purchasedate:     [{ required: true, message: '请选择购买日期', trigger: 'blur' }],
                producttype:     [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
                installdate:     [{ required: true, message: '请输入产品型号', trigger: 'blur' }]

                


			},
    };
  },

  methods: {
    getCode: function (){
      if(!this.loginForm.telephone){
          this.$message({ message: "请输入手机号 ！", type: "error" });
      }else{
      
           let params = Object.assign({}, this.loginForm)
           this.$api.cardpersonal.sendMessage(params).then((res) =>       
            {
              if(res.msg != null){
              this.$message({ message: '提示： ' + "验证码发送成功" })}
              this.yanzhengma=res.msg
              // if(res.msg=this.loginForm.verificationcode){
              // this.$message({ message: '输入正确 '})
              // }
            //  this.$refs['loginForm'].resetFields()
							this.editLoading = false
							this.editDialogVisible = false
						//	this.findPage(null)      if (!this.timer) {
        const TIME_COUNT = 60;
       this.count = TIME_COUNT;
       this.timer = setInterval(() => {    
          this.show = false;
       if (this.count > 0 && this.count <= TIME_COUNT) {
        this.count--;
        this.show1=true;
        } 
        else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
         this.show1= false;  
        }
       }, 1000)
      })

   } } ,
   handleChange (value) {
			this.filters.province=CodeToText[value[0]]
			this.filters.city=CodeToText[value[1]]
			console.log(this.filters.province)
			console.log(this.filters.city)
    },
    handleChangeAdd (value) {
			if(this.operation != 2)//新增或者编辑时从控件值中分解出省份和城市
			{
				this.loginForm.province=CodeToText[value[0]]
				this.loginForm.city=CodeToText[value[1]]
			}
      	},	// 手机号的输入规则
		Mobilerule () {
			this.loginForm.telephone = this.loginForm.telephone.replace( /[^\d]/g,  ''  )
		},
		// 验证手机号是否正确
		ruleTelephoneTrue () {
			var reg = new RegExp(/^1\d{10}$/)
			if (!this.loginForm.telephone) {
				this.contactMobileShow = true
				this.contactMobileText = '手机号不能为空'
			} else if (!reg.test(this.loginForm.telephone)) {
				this.contactMobileShow = true
				this.contactMobileText = '请输入11位手机号，以1开头'
			} else {
				this.contactMobileShow = false
			}
		},
		// 手机号通过输入规则，则隐藏提示
		Mobileadopt () {
			var reg = new RegExp(/^1\d{10}$/)
			if (this.loginForm.telephone && reg.test(this.loginForm.telephone)
			) {
				this.contactMobileShow = false
			}
		},
		//验证序列号是否正确，AS开头，后跟12位数字
		ruleSerialnumber () {
			var reg = new RegExp(/^AS\d{12}$/)
			if (!this.loginForm.serialnumber) {
				this.serialnumberShow = true
				this.serialnumberText = '序列号不能为空'
			} else if (!reg.test(this.loginForm.serialnumber)) {
				this.serialnumberShow = true
				this.serialnumberText = '序列号输入格式：AS开头，后跟12位数字'
			} else {
				this.serialnumberShow = false
			//	this.loginForm.productmodel = this.loginForm.serialnumber.slice(0,3)
			}
		},
		// 序列号通过输入规则，则隐藏提示
		// Serialnumberopt () {
		// 	var reg = new RegExp(/^AS\d{12}$/)
		// 	if (this.loginForm.serialnumber && reg.test(this.loginForm.serialnumber))
		// 	{
		// 		this.serialnumberShow = false
		// 		this.loginForm.productmodel = this.loginForm.serialnumber.slice(0,3)
		// 	}
		// },
		
        submitForm: function () {
        let lentelephone=this.loginForm.telephone.length
        if(lentelephone == 11){
        if(this.contactMobileShow = true){
			  this.$refs.loginForm.validate((valid) => {	
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true						
            let params = Object.assign({}, this.loginForm)
                console.log("000000000000000000")	
            this.$api.cardhospital.save(params).then((res) => 
            {
               console.log("2222222222222222")
              this.$message({ message: '提示： ' + res.msg })
              this.$refs['loginForm'].resetFields()
							this.editLoading = false
							this.editDialogVisible = false
						})
					})
				}
      })}

        }else{ 
           this.$confirm('请输入正确的手机号码', '提示', {}).then(() => {})
}  
    },
    refreshCaptcha: function() {
      this.$api.login.srcmarket().then(res => {
        if (res.code == 200) {
          this.loginForm.qrcodeId = res.data.id;
          this.loginForm.activityname = res.data.name;
          //console.log("res.data :"+res.data.name)
          this.loginForm.src = res.data.pathqrcode;
        } else {
          this.$message({ message: "加载失败... " });
        }
      });
    },
  handleReset: function() {
			this.filters.name = ''
			this.filters.address = ''
			this.filters.contacts = ''
			this.filters.officephone = ''
      this.filters.office = ''
      this.filters.officer = ''
			this.filters.telephone = ''
      //this.filters.productmodel = ''
      this.filters.serialnumber = ''
      this.filters.purchasedate = ''
			this.valueDateRange = ''
      this.filters.buychannel = ''
       this.filters.verificationcode = ''
       
		},
  },
     
  computed: {
    ...mapState({
      themeColor: state => st+ate.app.themeColor
    })
  },
  value1: '',
  value2: '',
  value3:'',
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
right:35px;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  width: 185px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0px 0px 0px 0px;
  position: absolute;
  padding: 35px 35px 120px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 30px auto 30px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>