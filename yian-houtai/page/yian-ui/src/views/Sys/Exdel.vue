<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:5px;padding-left:5px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="姓名" style="width:130px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.telephone" placeholder="手机号" style="width:130px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.expressName" placeholder="快递公司" style="width:130px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.statusExp" placeholder="快递状态" style="width:130px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.giftSend" placeholder="礼物是否发送" style="width:130px"></el-input>
			</el-form-item>
			  <el-date-picker
				v-model="valueDateRange" unlink-panels type="daterange" value-format="yyyy-MM-dd HH:mm:ss" style="height:33px"
				range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    		</el-date-picker>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:exdel:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-trash" :label="$t('action.reset')" perms="sys:exdel:view" type="primary" @click="handleReset" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:exdel:add" type="primary" @click="handleAdd" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.leadout')" perms="sys:exdel:exportExp" type="primary" @click="handleExportExp(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button type="primary" icon="fa fa-search" :label="$t('action.leadin')" perms="sys:exdel:leadin" @click="leadin(null)" />
				<input type="file" ref="myfile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.query')" perms="sys:exdel:query" type="primary" @click="handleQuery" />
			</el-form-item>	
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.sync')" perms="sys:exdel:leadout" type="primary" @click="leadout(null)"/>
			</el-form-item>		
		</el-form>
	</div>
	<!--表格内容栏 permsQuery="sys:exdel:query" @handleQuery="handleQuery"-->
	<kt-table :height="350"  permsEdit="sys:exdel:edit" permsDelete="sys:exdel:delete" 
		:data="pageResult" :columns="columns" @findPage="findPage"  @handleEdit="handleEdit" @handleDelete="handleDelete" >
	</kt-table>

	<!--新增界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="110px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="ID" prop="id"  v-if="false">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
				<el-form-item label="营销名称 " prop="activityname">
				<el-input v-model="dataForm.activityname" v-bind:disabled="operation==false" auto-complete="off" style="width:380px"></el-input>
				</el-form-item>
				<el-form-item label="客户姓名" prop="name">
				<el-input v-model="dataForm.name" v-bind:disabled="operation==false" auto-complete="off" @blur='ruleNameTrue' @input="nameOpt" style="width:380px"></el-input>
				<div class="reminder" v-show="nameShow">
            	<span class="el-icon-warning"></span>{{nameText}}
      			</div>
			</el-form-item>
			<el-form-item label="联系方式" prop="telephone">
				<el-input v-model="dataForm.telephone" v-bind:disabled="operation==false" auto-complete="off" 
				maxlength="11" @keyup.native="Mobilerule" @blur='ruleTelephoneTrue' @input="Mobileadopt" style="width:380px"></el-input>
				<div class="reminder" v-show="contactMobileShow">
            	<span class="el-icon-warning"></span>{{contactMobileText}}
        		</div>
			</el-form-item>	
			<el-form-item label="目的地" prop="toLocation">
				<el-input v-model="dataForm.toLocation" auto-complete="off" style="width:380px"></el-input>
			</el-form-item>
			<el-form-item label="发送地" prop="fromLocation">
				<el-input v-model="dataForm.fromLocation" style="width:380px"></el-input>
			</el-form-item>
			<el-form-item label="快递名称" prop="expressName">
				<el-input v-model="dataForm.expressName" style="width:380px"></el-input>
			</el-form-item>
			<el-form-item label="快递单号" prop="expressNumber">
				<el-input v-model="dataForm.expressNumber" auto-complete="off" style="width:380px"></el-input>
			</el-form-item>
			<el-form-item label="发货时间" prop="sendtime">
			<el-date-picker v-model="dataForm.sendtime" type="date" value-format="yyyy-MM-dd" style="width:380px">
			</el-date-picker>
			</el-form-item>
			<el-form-item label="礼品" prop="giftname">
				<el-input v-model="dataForm.giftname" auto-complete="off" style="width:380px"></el-input>
			</el-form-item>
			<el-form-item label="礼物是否发送" prop="giftSend">
			 <el-select v-model="dataForm.giftSend" placeholder="请选择" style="width:380px">
					<el-option
						v-for="item in giftSend"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="item.disabled">
					</el-option>
				</el-select>

			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>

	
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
import XLSX from 'xlsx';

export default {
	components:{			
			KtTable,
			KtButton
	},
	data() {
		return {
			giftSend: [
				{
				value: 'Yes',
				label: 'Yes'
				},
				{
				value: 'No',
				label: 'No'
				}
			],

			size: 'small',
			filters: {
				name: '',
				telephone: '',
				expressName:'',
				statusExp:'',
				giftSend: ''				
			},
			columns: [
				//{prop:"id", label:"ID", minWidth:60},
				{prop:"activityname", label:"营销名称", minWidth:100},
				{prop:"name", label:"客户姓名", minWidth:100},
				{prop:"telephone", label:"联系方式", minWidth:100},
				{prop:"toLocation", label:"目的地", minWidth:100},
				{prop:"fromLocation", label:"发送地", minWidth:100},				
				{prop:"expressName", label:"快递名称", minWidth:100},
				{prop:"expressNumber", label:"快递单号", minWidth:130},
				{prop:"giftname", label:"礼品", minWidth:100},
				{prop:"statusExp", label:"快递状态", minWidth:100},
				{prop:"giftSend", label:"礼物是否发送", minWidth:120},
				//{prop:"sparam", label:"返回数据格式", minWidth:120},				
				//{prop:"sign", label:"授权码", minWidth:100},
				{prop:"sendtime", label:"发货时间", minWidth:150}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},
			valueDateRange:'',
			contactMobileShow:false,
			contactMobileText:'',
			nameShow:false,
			nameText:'',
			operation: true, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {	
				activityname: [
					   { required: true, message: '请输入营销名称', trigger: 'blur' }
				],
				name: [
					   { required: true, message: '请输入名称', trigger: 'blur' }
				],
				telephone: [
					   { required: true, message: '请输入11位手机号码', trigger: 'blur' }
				],
				toLocation: [
					   { required: true, message: '请输入目的地址', trigger: 'blur' }
				],
				fromLocation: [
					   { required: true, message: '请输入发送地址', trigger: 'blur' }
				],
				expressName: [
					   { required: true, message: '请输入快递名称', trigger: 'blur' }
				],
				expressNumber: [
					   { required: true, message: '请输入快递单号', trigger: 'blur' }
				],
				giftname: [
					   { required: true, message: '请输入礼品名称', trigger: 'blur' }
				],
				giftSend: [
					   { required: true, message: '请选择Yes或No', trigger: 'blur' }
				],
				sendtime: [
					   { required: true, message: '请输入发货时间', trigger: 'blur' }
				],
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				activityname:'',
				name: '',
				telephone: '',
				toLocation: '',
				fromLocation: '',
				expressName: '',
				expressNumber:'',
				giftname:'',
				giftSend:'',
				sparam:'',
				sign:'',
				sendtime:''
			}
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
				this.nameText = '姓名不能为空'
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
		handleExportExp: function(data) {
			let le=[["营销名称","客户姓名","手机号","详细地址","发送地","快递名称","快递单号","礼品","礼品是否发送","发货时间"]];//"序号",
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  telephone: {name:'telephone', value:this.filters.telephone},
											  expressName: {name:'expressName', value:this.filters.expressName},
											  statusExp: {name:'statusExp', value:this.filters.statusExp},
											  giftSend: {name:'giftSend', value:this.filters.giftSend},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.exdel.exportExp(this.pageRequest).then((res) => {
				let datalist =res.data
				datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							arr.push(dres.activityname)
							arr.push(dres.name)
							arr.push(dres.telephone)
							arr.push(dres.toLocation)
							arr.push(dres.fromLocation)
							arr.push(dres.expressName)
							arr.push(dres.expressNumber)
							arr.push(dres.giftname)
							arr.push(dres.giftSend);
							arr.push(dres.sendtime);
							le.push(arr)
						})											
					   	var wb=XLSX.utils.book_new(),
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"未发送礼品_快递信息");
						XLSX.writeFile(wb,"未发送礼品_快递信息.xlsx");	
			}).then(data!=null?data.callback:'')
		},
		handleReset: function() {
			this.filters.name = ''
			this.filters.telephone = ''
			this.filters.expressName = ''
			this.filters.statusExp = ''
			this.filters.giftSend = ''
			this.valueDateRange = ''
		},
		// 获取分页数据
		findPage: function (data) {
			console.log(this.valueDateRange[0])
			console.log(this.valueDateRange[1])
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  telephone: {name:'telephone', value:this.filters.telephone},
											  expressName: {name:'expressName', value:this.filters.expressName},
											  statusExp: {name:'statusExp', value:this.filters.statusExp},
											  giftSend: {name:'giftSend', value:this.filters.giftSend},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.exdel.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				activityname:'',
				name: '',
				telephone: '',
				toLocation: '',
				fromLocation: '',
				expressName: '',
				expressNumber:'',
				giftname:'',
				giftSend:'',
				sparam:'',
				sign:'',
				sendtime:''
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params.row)
		},
		// 编辑
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true						
						let params = Object.assign({}, this.dataForm)
						console.log("test----")
						console.log(params)
						this.$api.exdel.save(params).then((res) => {
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
		//查询所有快递状态
		handleQuery: function () {
			this.$api.exdel.query().then((res) => {
				this.findPage(null)
			})
		},
		handleDelete: function (data) {
			this.$api.exdel.batchDelete(data.params).then(data!=null?data.callback:'')
			//let params = Object.assign({}, this.dataForm)
			//this.$api.exdel.query(params).then(data!=null?data.callback:'')
		},

		leadin: function(data)
		{
				let myfile = this.$refs.myfile;
				let files = myfile.files;
				let file = files[0];
				var formData = new FormData();
				formData.append("file", file);
			    this.$api.exdel.leadin(formData).then(res => {	
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
		leadout: function(data) {
				this.$api.exdel.leadout().then(res => {							
					this.editLoading = true
					this.findPage(null)		  	    				   
				});
			/*
			let le=[["客户姓名","手机号","详细地址","发送地","快递名称","快递单号","礼品","礼品是否发送","发货时间"]];//"序号",								
					this.$api.exdel.leadout().then(res => {						
						//console.log("???:"+JSON.stringify(res.data))
						let datalist =res.data
			            datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							arr.push(dres.name)
							arr.push(dres.telephone)
							arr.push(dres.toLocation)
							arr.push(dres.fromLocation)
							arr.push(dres.expressName)
							arr.push(dres.expressNumber)
							arr.push(dres.giftname)
							arr.push(dres.giftSend);
							arr.push(dres.sendtime);
							le.push(arr)
						})											
					   	var wb=XLSX.utils.book_new(),
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"客户_快递_信息");
						XLSX.writeFile(wb,"客户_快递_信息.xlsx");	
						this.editLoading = true
						this.findPage(null)		  	    				   
				});	*/
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