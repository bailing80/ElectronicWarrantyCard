<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:5px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item label="医院名称:" prop="name">
				<el-input v-model="filters.name" style="width:95px"></el-input>
			</el-form-item>
			<el-form-item label="医院编码:" prop="customercode">
				<el-input v-model="filters.customercode" style="width:95px"></el-input>
			</el-form-item>
			<el-form-item label="装机科室:" prop="office">
				<el-input v-model="filters.office" style="width:95px"></el-input>
			</el-form-item>
			<el-form-item label="手机号:" prop="telephone">
				<el-input v-model="filters.telephone" style="width:95px"></el-input>
			</el-form-item>
			<el-form-item label="城市:" prop="address">
				<el-input v-model="filters.address" style="width:95px"></el-input>
			</el-form-item>
			<el-form-item label="创建时间:" prop="createtime">
				<el-date-picker
					v-model="valueDateRange" unlink-panels type="daterange" value-format="yyyy-MM-dd HH:mm:ss" style="height:33px"
					range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
		</el-form>
	</div>
	<div class="toolbar" style="float:left;padding-top:5px;padding-left:15px;">
		<el-form :inline="true" :size="size">
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:cardhospital:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-trash" :label="$t('action.reset')" perms="sys:cardhospital:view" type="primary" @click="handleReset" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:cardhospital:add" type="primary" @click="handleAdd" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.exportExcel')" perms="sys:cardhospital:exportExcel" type="primary" @click="exportExcel(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button type="primary" icon="fa fa-search" :label="$t('action.importExcel')" perms="sys:cardhospital:importExcel"  @click="importExcel(null)" />
				<input type="file" ref="myfile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">	 
			</el-form-item>	
		</el-form>
	</div>
	<!--表格内容栏-->
	<card-table :height="350" permsExport="sys:cardhospital:exportExcel" permsDetail="sys:cardhospital:getDetails" permsEdit="sys:cardhospital:edit" permsDelete="sys:cardhospital:delete"
		:data="pageResult" :columns="columns" @findPage="findPage" @handleExport="handleExport" @handleDetails="handleDetails" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</card-table>
	<!--新增编辑界面 "operation?'新增':'编辑'"-->
	<el-dialog :title="titleText" width="45%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="医院信息" v-if="operation==0 || operation==2">
			</el-form-item>
			<el-form-item label="医院名称" prop="name">
				<el-input v-model="dataForm.name" v-bind:disabled="operation==1 || operation==2"  placeholder= "请输入医院名称" @blur='ruleNameTrue' @input="nameOpt" style="width:300px"></el-input>
				<div class="reminder" v-show="nameShow">
            	<span class="el-icon-warning"></span>{{nameText}}
      			</div>
			</el-form-item>
			<el-form-item label="地址 " prop="address">
				<el-input v-model="dataForm.address" placeholder="请输入地址" auto-complete="off" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="设备科联系人" prop="contacts">
				<el-input v-model="dataForm.contacts" placeholder="请输入设备科联系人" auto-complete="off" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="办公电话" prop="officephone">
				<el-input v-model="dataForm.officephone" placeholder="请输入办公电话" style="width:300px" v-bind:disabled="operation==2"
				onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"
        		oninput="if(value.length>11)value=value.slice(0,11)" ></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="telephone">
				<el-input v-model="dataForm.telephone" auto-complete="off" style="width:300px" v-bind:disabled="operation==1 || operation==2" placeholder="请输入11位手机号码"
				 maxlength="11" @keyup.native="Mobilerule" @blur='ruleTelephoneTrue' @input="Mobileadopt" type="text"></el-input>
				<div class="reminder" v-show="contactMobileShow">
            	<span class="el-icon-warning"></span>{{contactMobileText}}
        		</div>
			</el-form-item>
			<el-form-item label="装机科室 " prop="office">
				<el-input v-model="dataForm.office" placeholder="请输入装机科室" auto-complete="off" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="科室主任" prop="officer">
				<el-input v-model="dataForm.officer" placeholder="请输入科室主任" auto-complete="off" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<!--
		</el-form>
		<el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size">
			-->
			<el-divider v-if="operation==0 || operation==2"></el-divider>
    		<el-form-item label="产品购买信息" v-if="operation==0 || operation==2">
			</el-form-item> 
			
			<el-form-item label="序列号" prop="serialnumber" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.serialnumber" placeholder="请输入序列号" v-bind:disabled="operation==2"  maxlength="14" @blur='ruleSerialnumber' @input='Serialnumberopt' style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="产品型号" prop="productmodel"  v-if="operation==0 || operation==2">
			<el-input v-model="dataForm.productmodel" placeholder="根据序列号前三位自动生成" v-bind:disabled="true" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="销售商名称" prop="sellername" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.sellername" placeholder="请输入销售商名称" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="购买日期" prop="purchasedate" v-if="operation==0 || operation==2">
				<el-date-picker v-model="dataForm.purchasedate" placeholder= "请输入购买日期" v-bind:disabled="operation==2" type="date" value-format="yyyy-MM-dd" style="width:300px">
				</el-date-picker>
			</el-form-item>
			<!--
		</el-form>

		<el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size">
			-->
			<el-divider v-if="operation==0 || operation==2"></el-divider>
    		<el-form-item label="产品安装与培训" v-if="operation==0 || operation==2">
			</el-form-item>
			<el-form-item label="使用条件是否满足要求" prop="requirements"  v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.requirements" placeholder="满足"  v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="开机自检测试及工作情况" prop="selftest" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.selftest" placeholder="正常" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="用户培训情况" prop="usertraining" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.usertraining" placeholder="操作培训" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="中文标识是否准确放置" prop="logoplacement" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.logoplacement" placeholder="请输入中文标识是否准确放置" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="装机结论" prop="installconclusion" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.installconclusion" placeholder="请输入描述" v-bind:disabled="operation==2" type="textarea" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="安装人" prop="installer" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.installer" placeholder="请输入安装人" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>			
			<el-form-item label="安装日期" prop="installdate" v-if="operation==0 || operation==2">
				<el-date-picker v-model="dataForm.installdate"  v-bind:disabled="operation==2" type="date" value-format="yyyy-MM-dd" style="width:300px">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="验收人" prop="acceptor" v-if="operation==0 || operation==2">
				<el-input v-model="dataForm.acceptor" placeholder="请输入验收人" v-bind:disabled="operation==2" style="width:300px"></el-input>
			</el-form-item>			
			<el-form-item label="验收日期" prop="acceptdate" v-if="operation==0 || operation==2">
				<el-date-picker v-model="dataForm.acceptdate"  v-bind:disabled="operation==2" type="date" value-format="yyyy-MM-dd" style="width:300px">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" v-if="operation==0 || operation==1" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" v-if="operation==2" type="primary" style="width:80px;" @click.native="editDialogVisible = false">{{$t('action.ok')}}</el-button>
			<el-button :size="size" v-if="operation==0 || operation==1" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import CardTable from "@/views/Core/CardTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
import XLSX from 'xlsx';

export default {
	components:{			
			CardTable,
			KtButton
	},
	data() {
		return {
			contactMobileShow:false,
			contactMobileText:'',
			nameShow:false,
			nameText:'',
			loading: false,
			size: 'small',
			filters: {
				customercode:'',
				name: '',
				telephone:'',
				office:'',
				address:''
			},
			columns: [
				//{prop:"id", label:"ID", minWidth:50},
				{prop:"customercode", label:"医院编码", minWidth:130},
				{prop:"name", label:"医院名称", minWidth:100},
				{prop:"office", label:"装机科室", minWidth:100},
				{prop:"serialnumber", label:"序列号", minWidth:120},
				{prop:"sellername", label:"销售商名称", minWidth:120},	
				{prop:"installdate", label:"装机日期", minWidth:150},
				{prop:"createtime", label:"创建时间", minWidth:150}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},
			detailResult: {},
			valueDateRange:'',
			operation: 1, // 0:新增, 1:编辑, 2: 查看详情
			titleText:'',//对话框标题内容
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name:         [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
				address:      [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
				contacts:     [{ required: true, message: '请输入设备科联系人', trigger: 'blur' }],
				officephone:  [{ required: true, message: '请输入办公电话', trigger: 'blur' }],
				telephone:    [{ required: true, message: '请输入11位手机号码', trigger: 'blur' }],
				office:  	  [{ required: true, message: '请输入装机科室', trigger: 'blur' }],
				officer:   	  [{ required: true, message: '请输入科室主任', trigger: 'blur' }],
				productmodel: [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
				serialnumber: [{ required: true, message: '请输入序列号', trigger: 'blur' }],
				sellername:   [{ required: true, message: '请输入销售商名称', trigger: 'blur' }],
				purchasedate: [{ required: true, message: '请输入购买日期', trigger: 'blur' }],
			


			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				//customercode:'',
				name: '',
				address:'',
				contacts:'',
				telephone: '',
				officephone: '',
				office: '',
				officer:'',
				//createtime:''

				productmodel:'',
				serialnumber:'',	
				sellername:'',
				purchasedate:'',

				requirements:'',
				selftest:'',
				usertraining:'',
				logoplacement:'',
				installconclusion:'',
				installer:'',
				installdate:'',
				acceptor:'',
				acceptdate:''
			},
		}
	},
	methods: {
		// 手机号的输入规则
		Mobilerule () {
			this.dataForm.telephone = this.dataForm.telephone.replace( /[^\d]/g,  ''  )
		},
		// 验证手机号是否正确
		ruleTelephoneTrue () {
			var reg = new RegExp(/^1\d{10}$/)
			if (!this.dataForm.telephone) {
				this.contactMobileShow = true
				this.contactMobileText = '手机号不能为空'
			} else if (!reg.test(this.dataForm.telephone)) {
				this.contactMobileShow = true
				this.contactMobileText = '请输入11位手机号，以1开头'
			} else {
				this.contactMobileShow = false
			}
		},
		// 手机号通过输入规则，则隐藏提示
		Mobileadopt () {
			var reg = new RegExp(/^1\d{10}$/)
			if (this.dataForm.telephone && reg.test(this.dataForm.telephone)
			) {
				this.contactMobileShow = false
			}
		},
		// 验证客户姓名是否正确
		ruleNameTrue () {
			var reg = new RegExp(/^[\u0391-\uFFE5]+$/)
			if (!this.dataForm.name) {
				this.nameShow = true
				this.nameText = '医院名称不能为空'
			} else if (!reg.test(this.dataForm.name)) {
				this.nameShow = true
				this.nameText = '请输入汉字'
			} else {
				this.nameShow = false
			}
		},
		//客户姓名通过输入规则，则隐藏提示
		nameOpt () {
			var reg = new RegExp(/^[\u0391-\uFFE5]+$/)//只能输入汉字
			if (this.dataForm.name && reg.test(this.dataForm.name)
			) {
				this.nameShow = false
			}
		},
		handleReset: function() {
			this.filters.name = ''
			this.filters.telephone = ''
			this.filters.office = ''
			this.filters.address = ''
			this.filters.customercode = ''
			this.valueDateRange = ''
		},
			// 序列号通过输入规则，则隐藏提示
		Serialnumberopt () {
			var reg = new RegExp(/^AS\d{12}$/)
			if (this.dataForm.serialnumber && reg.test(this.dataForm.serialnumber))
			{
				this.serialnumberShow = false
				this.dataForm.productmodel = this.dataForm.serialnumber.slice(0,3)
			}
		},
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  telephone: {name:'telephone', value:this.filters.telephone},
											  office: {name:'office', value:this.filters.office},
											  address: {name:'address', value:this.filters.address},
											  customercode: {name:'customercode', value:this.filters.customercode},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.cardhospital.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.cardhospital.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = 0
			this.titleText = "医院客户--新增"
			this.dataForm = {
				id: 0,
				customercode:'',
				name: '',
				address:'',
				contacts:'',
				telephone: '',
				officephone: '',
				office: '',
				officer:'',
				//createtime:''

				productmodel:'',
				serialnumber:'',	
				sellername:'',
				purchasedate:'',

				requirements:'',
				selftest:'',
				usertraining:'',
				logoplacement:'',
				installconclusion:'',
				installer:'',
				installdate:'',
				acceptor:'',
				acceptdate:''
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.editDialogVisible = true
			this.operation = 1
			this.titleText = "医院客户--编辑"
			this.dataForm = Object.assign({}, params.row)
			//console.log(this.dataForm.name)		
		},
		//查看详情
		handleDetails: function(params) {
			this.editDialogVisible = true
			this.operation = 2
			this.titleText = "医院客户--查看详情"
			this.dataForm = Object.assign({}, params.row)
			console.log(this.dataForm.id)
			this.$api.cardhospital.getDetails(this.dataForm.id).then((res) => {
				this.detailResult = res.data
				//console.log(this.detailResult)
				this.dataForm = Object.assign({}, this.detailResult)
				console.log(this.dataForm)
				if(!this.dataForm.requirements) this.dataForm.requirements = ' '
				if(!this.dataForm.selftest) this.dataForm.selftest = ' '
				if(!this.dataForm.usertraining) this.dataForm.usertraining = ' '
				if(!this.dataForm.logoplacement) this.dataForm.logoplacement = ' '
				if(!this.dataForm.installconclusion) this.dataForm.installconclusion = ' '
				if(!this.dataForm.installer) this.dataForm.installer = ' '
				if(!this.dataForm.installdate) this.dataForm.installdate = ''
				if(!this.dataForm.acceptor) this.dataForm.acceptor = ' '
				if(!this.dataForm.acceptdate) this.dataForm.acceptdate = ' '
			})
		},
		// 编辑
		submitForm: function () {
			console.log(this.dataForm.name)
			this.$refs.dataForm.validate((valid) => {
				console.log(valid) 	
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true						
						let params = Object.assign({}, this.dataForm)	
						this.$api.cardhospital.save(params).then((res) => {
							this.$message({ message: '提示： ' + res.msg })
							/*
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
							} else {
								this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}*/
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
							this.findPage(null)
						})
					})
				}
			})
		},

		//批量导出
		handleExport: function(data) {
			let le=[["客户信息","产品购买信息","产品安装及培训"],["医院名称","地址","设备科联系人","办公电话","手机号码","装机科室","科室主任",
			"产品型号","序列号","销售商名称","购买日期",
			"使用条件是否满足要求","开机自检测试及工作情况","用户培训情况","中文标识是否准确放置","装机结论","安装人","安装日期","验收人","验收日期"]];//"序号",
			this.$api.cardhospital.batchExport(data.params).then((res) => {
				let datalist =res.data
				datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							//arr.push(dres.customercode)
							arr.push(dres.name)
							arr.push(dres.address)
							arr.push(dres.contacts)
							arr.push(dres.officephone)
							arr.push(dres.telephone)
							arr.push(dres.office)
							arr.push(dres.officer)
							//arr.push(dres.createtime)

							arr.push(dres.productmodel)
							arr.push(dres.serialnumber)
							arr.push(dres.sellername)
							arr.push(dres.purchasedate)

							arr.push(dres.requirements)
							arr.push(dres.selftest)
							arr.push(dres.usertraining)
							arr.push(dres.logoplacement)
							arr.push(dres.installconclusion)
							arr.push(dres.installer)
							arr.push(dres.installdate)
							arr.push(dres.acceptor)
							arr.push(dres.acceptdate)
							le.push(arr)
						})											
						var wb=XLSX.utils.book_new(),
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"电子保修卡-医院客户");
						XLSX.writeFile(wb,"电子保修卡-医院客户.xlsx");		
			}).then(data!=null?data.callback:'')
		},
		//导出满足查询条件的数据
		exportExcel: function(data) {
			let le=[["客户信息","产品购买信息","产品安装及培训"],["医院名称","地址","设备科联系人","办公电话","手机号码","装机科室","科室主任",
					 "产品型号","序列号","销售商名称","购买日期",
					 "使用条件是否满足要求","开机自检测试及工作情况","用户培训情况","中文标识是否准确放置","装机结论","安装人","安装日期","验收人","验收日期"]];//"序号",

			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {customercode: {name:'customercode', value:this.filters.customercode},
											  name: {name:'name', value:this.filters.name},
											  telephone: {name:'telephone', value:this.filters.telephone},
											  office: {name:'office', value:this.filters.office},
											  address: {name:'address', value:this.filters.address},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.cardhospital.exportExcel(this.pageRequest).then((res) => {
				let datalist =res.data
				datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							//arr.push(dres.customercode)
							arr.push(dres.name)
							arr.push(dres.address)
							arr.push(dres.contacts)
							arr.push(dres.officephone)
							arr.push(dres.telephone)
							arr.push(dres.office)
							arr.push(dres.officer)
							//arr.push(dres.createtime)

							arr.push(dres.productmodel)
							arr.push(dres.serialnumber)
							arr.push(dres.sellername)
							arr.push(dres.purchasedate)

							arr.push(dres.requirements)
							arr.push(dres.selftest)
							arr.push(dres.usertraining)
							arr.push(dres.logoplacement)
							arr.push(dres.installconclusion)
							arr.push(dres.installer)
							arr.push(dres.installdate)
							arr.push(dres.acceptor)
							arr.push(dres.acceptdate)
							le.push(arr)
						})											
						var wb=XLSX.utils.book_new(),
						//ws=	XLSX.utils.aoa_to_sheet(leHead);
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"电子保修卡-医院客户");
						XLSX.writeFile(wb,"电子保修卡-医院客户.xlsx");		
			}).then(data!=null?data.callback:'')
		},
		
		importExcel: function(data)
		{
				let myfile = this.$refs.myfile;
				let files = myfile.files;
				let file = files[0];
				var formData = new FormData();
				formData.append("file", file);
			    this.$api.cardhospital.importExcel(formData).then(res => {	
				if(res.code == 200) {
					
					this.$message({ message: '操作成功', type: 'success' })
				} else {
					this.$message({message: '操作失败, ' + res.msg, type: 'error'})
				}
				this.findPage(null)
				this.editLoading = false
				this.editDialogVisible = false
			})	
		},
		// 时间格式化
      	dateFormat: function (row, column, cellValue, index)
		{
          	return format(row[column.property])
      	}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>