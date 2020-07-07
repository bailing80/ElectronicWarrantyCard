<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:5px;padding-left:5px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.activityname" placeholder="营销名称" style="width:110px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.name" placeholder="客户姓名" style="width:100px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.tel" placeholder="手机号" style="width:110px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.hospital" placeholder="医院名称" style="width:100px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.departmentoffices" placeholder="科室" style="width:100px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.sellname" placeholder="销售员姓名" style="width:100px"></el-input>
			</el-form-item>
			<el-date-picker
				v-model="valueDateRange" unlink-panels type="daterange" value-format="yyyy-MM-dd HH:mm:ss" style="height:33px"
				range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    		</el-date-picker>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:mark:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-trash" :label="$t('action.reset')" perms="sys:mark:view" type="primary" @click="handleReset" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:mark:add" type="primary" @click="handleAdd" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.nameDuplicate')" perms="sys:mark:nameDuplicateCheck" type="primary" @click="nameDuplicateCheck(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.telDuplicate')" perms="sys:mark:telDuplicateCheck" type="primary" @click="telDuplicateCheck(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.leadout')" perms="sys:mark:leadout" type="primary" @click="leaddGout(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button type="primary" icon="fa fa-search" :label="$t('action.leadin')" perms="sys:mark:leadin" 					
					 @click="leaddGin(null)" />
				   <input type="file" ref="myfile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">	 
			</el-form-item>
			
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table :height="350" permsEdit="sys:mark:edit" permsDelete="sys:mark:delete"
		:data="pageResult" :columns="columns" @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--姓名查重结果显示界面-->
	<el-dialog :title="姓名查重结果" width="92%" :visible.sync="nameDuplicateDialogVisible" :close-on-click-modal="false">
		<kt-table :height="600" style="width:1200px" permsEdit="sys:mark:edit" permsDelete="sys:mark:delete"
			:data="nameDuplicatePageResult" :columns="columns" @findPage="nameDuplicateCheck" @handleEdit="handleEdit" @handleDelete="handleDelete">
		</kt-table>
	</el-dialog>
	<!--手机号查重结果显示界面-->
	<el-dialog :title="手机号查重结果" width="92%" :visible.sync="telDuplicateDialogVisible" :close-on-click-modal="false">
		<kt-table :height="600" style="width:1200px" permsEdit="sys:mark:edit" permsDelete="sys:mark:delete"
			:data="telDuplicatePageResult" :columns="columns" @findPage="telDuplicateCheck" @handleEdit="handleEdit" @handleDelete="handleDelete">
		</kt-table>
	</el-dialog>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="ID" prop="id"  v-if="false">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="客户姓名" prop="name">
				<el-input v-model="dataForm.name" v-bind:disabled="operation==false" auto-complete="off" @blur='ruleNameTrue' @input="nameOpt" style="width:250px"></el-input>
				<div class="reminder" v-show="nameShow">
            	<span class="el-icon-warning"></span>{{nameText}}
      			</div>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="dataForm.tel" v-bind:disabled="operation==false" auto-complete="off" style="width:250px" placeholder="请输入11位手机号码"
				 maxlength="11" @keyup.native="Mobilerule" @blur='ruleTelephoneTrue' @input="Mobileadopt" type="text"></el-input>
				<div class="reminder" v-show="contactMobileShow">
            	<span class="el-icon-warning"></span>{{contactMobileText}}
        		</div>
			<!--
				onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"
        		oninput="if(value.length>11)value=value.slice(0,11)" 
			-->
			</el-form-item>
			<el-form-item label="医院名称" prop="hospital">
				<el-select v-model="dataForm.hospital" filterable remote reserve-keyword 
						placeholder="请输入关键字" :remote-method="remoteMethod" :loading="loading " style="width:250px">
					<el-option v-for="item in hospitalNameList" :key="item.id" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="科室" prop="departmentoffices">
				<el-input v-model="dataForm.departmentoffices" style="width:250px" ></el-input>
			</el-form-item>
			<el-form-item label="医院地址 " prop="address">
				<el-input v-model="dataForm.address" auto-complete="off" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item label="营销名称 " prop="activityname">
				<el-input v-model="dataForm.activityname" v-bind:disabled="operation==false" auto-complete="off" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item label="销售员姓名 " prop="sellname">
				<el-select v-model="dataForm.sellname" filterable placeholder="请选择" style="width:250px">
					<el-option v-for="item in salesnamelist" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
			contactMobileShow:false,
			contactMobileText:'',
			nameShow:false,
			nameText:'',
			salesnamelist:[],
			hospitalNameList:[],
			list: [],
			loading: false,
			allHospitalInfo:[],
			states: ["北京第一医院", "天津第二医院", "上海第三医院"],
			size: 'small',
			filters: {
				activityname:'',
				name: '',
				tel:'',
				hospital:'',
				departmentoffices:'',
				sellname:''
			},
			columns: [
				//{prop:"id", label:"ID", minWidth:50},
				{prop:"name", label:"客户姓名", minWidth:100},
				{prop:"tel", label:"手机号", minWidth:100},
				{prop:"hospital", label:"医院名称", minWidth:100},
				{prop:"departmentoffices", label:"科室", minWidth:80},
				{prop:"address", label:"医院地址", minWidth:120},
				{prop:"activityname", label:"营销活动", minWidth:120},
				{prop:"sellname", label:"销售员姓名", minWidth:120},
				{prop:"createtime", label:"创建时间", minWidth:150}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},
			nameDuplicatePageRequest: { pageNum: 1, pageSize: 10 },
			nameDuplicatePageResult:{},
			telDuplicatePageRequest: { pageNum: 1, pageSize: 10 },
			telDuplicatePageResult:{},
			valueDateRange:'',
			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			nameDuplicateDialogVisible: false, //查重结果界面是否显示
			telDuplicateDialogVisible:false,
			editLoading: false,
			dataFormRules: {
				name: [
					   { required: true, message: '请输入姓名', trigger: 'blur' }
				],
				tel: [
					   { required: true, message: '请输入11位手机号码', trigger: 'blur' }
				],
				hospital: [
					   { required: true, message: '请输入医院名称', trigger: 'blur' }
				],
				departmentoffices: [
					   { required: true, message: '请输入科室名称', trigger: 'blur' }
				],
				address: [
					   { required: true, message: '请输入详细地址', trigger: 'blur' }
				],
				activityname: [
					   { required: true, message: '请输入营销活动名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				tel: '',
				hospital: '',
				departmentoffices: '',
				address: '',
				activityname:'',
				sellname:'',
				createtime:''
			},
		}
	},
	methods: {
		// 手机号的输入规则
		Mobilerule () {
			this.dataForm.tel = this.dataForm.tel.replace( /[^\d]/g,  ''  )
		},
		// 验证手机号是否正确
		ruleTelephoneTrue () {
			var reg = new RegExp(/^1\d{10}$/)
			if (!this.dataForm.tel) {
				this.contactMobileShow = true
				this.contactMobileText = '手机号不能为空'
			} else if (!reg.test(this.dataForm.tel)) {
				this.contactMobileShow = true
				this.contactMobileText = '请输入11位手机号，以1开头'
			} else {
				this.contactMobileShow = false
			}
		},
		// 手机号通过输入规则，则隐藏提示
		Mobileadopt () {
			var reg = new RegExp(/^1\d{10}$/)
			if (this.dataForm.tel && reg.test(this.dataForm.tel)
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
		remoteMethod(query) {
			console.log("query is  " + query)
			if (query !== '') {
				//依据query关键字，进行远程搜索
				this.getHospitalNames(query);
				
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					//将搜索结果Map到特定格式的List数组
					this.list = this.allHospitalInfo.map(item => {
						return {value: item.name, label: item.name};
					});
					console.log("Mapped list is ");
					console.log(this.list)
					//在List数组中根据query进行查询，此项可省略
					this.hospitalNameList = this.list.filter(item => {
						return item.label.indexOf(query)>-1;
							});
					}, 1000);
			} else {
				this.hospitalNameList = [];
			}
	    },
		getSalesNames: function() {
			this.$api.mark.getSalesNames().then(res=>{
				if(res.code == 200){
					this.salesnamelist = res.data
				}
				else {
					console.log("fail to get seller names")
				}
			}).catch(function(error) {
				this.$message({message: '系统错误', type: 'error'})
			})
		},
		getHospitalNames: function(query) {
			console.log("getHospitalNames( " + query + " )")
			this.$api.mark.getHospitalNames(query).then(res=>{
				this.allHospitalInfo = res.data;
				console.log("getHospitalNames Result: ");
				console.log(this.allHospitalInfo)
			});
		},
		handleReset: function() {
			this.filters.name = ''
			this.filters.tel = ''
			this.filters.hospital = ''
			this.filters.departmentoffices = ''
			this.filters.activityname = ''
			this.filters.sellname = ''
			this.valueDateRange = ''
		},
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  tel: {name:'tel', value:this.filters.tel},
											  hospital: {name:'hospital', value:this.filters.hospital},
											  departmentoffices: {name:'departmentoffices', value:this.filters.departmentoffices},
											  activityname: {name:'activityname', value:this.filters.activityname},
											  sellname: {name:'sellname', value:this.filters.sellname},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.mark.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		//姓名查重
		nameDuplicateCheck:function(data) {
			if(data !== null) {
				this.nameDuplicatePageRequest = data.pageRequest
			}
			this.$api.mark.nameDuplicateCheck(this.nameDuplicatePageRequest).then((res) => {
				this.nameDuplicatePageResult = res.data
			}).then(data!=null?data.callback:'')

			this.telDuplicateDialogVisible = false;
			this.nameDuplicateDialogVisible = true;
		},
		//手机号查重
		telDuplicateCheck:function(data) {
			if(data !== null) {
				this.telDuplicatePageRequest = data.pageRequest
			}
			this.$api.mark.telDuplicateCheck(this.telDuplicatePageRequest).then((res) => {
				this.telDuplicatePageResult = res.data
			}).then(data!=null?data.callback:'')

			this.nameDuplicateDialogVisible = false;
			this.telDuplicateDialogVisible = true;
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.mark.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				name: '',
				tel: '',
				hospital: '',
				departmentoffices: '',
				address: '',
				activityname:'',
				sellname:'',
				createtime:''
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
						this.$api.mark.save(params).then((res) => {
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
		leaddGout: function(data) {
			let le=[["营销活动","客户姓名","手机号","医院名称","科室","详细地址","销售员名称","创建时间"]];//"序号",	
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  tel: {name:'tel', value:this.filters.tel},
											  hospital: {name:'hospital', value:this.filters.hospital},
											  departmentoffices: {name:'departmentoffices', value:this.filters.departmentoffices},
											  activityname: {name:'activityname', value:this.filters.activityname},
											  sellname: {name:'sellname', value:this.filters.sellname},
											  startTime: {name:'startTime', value:this.valueDateRange[0]},
											  endTime: {name:'endTime', value:this.valueDateRange[1]}}
			this.$api.mark.leadgGout(this.pageRequest).then((res) => {
				let datalist =res.data
				datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							arr.push(dres.activityname)
							arr.push(dres.name)
							arr.push(dres.tel)
							arr.push(dres.hospital)
							arr.push(dres.departmentoffices)
							arr.push(dres.address)
							arr.push(dres.sellname)
							arr.push(dres.createtime)
							le.push(arr)
						})											
					   	var wb=XLSX.utils.book_new(),
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"客户信息");
						XLSX.writeFile(wb,"客户信息.xlsx");		
			}).then(data!=null?data.callback:'')
		},
		
		leaddGin: function(data)
		{
	
				let myfile = this.$refs.myfile;
				let files = myfile.files;
				let file = files[0];
				var formData = new FormData();
				formData.append("file", file);
			    this.$api.mark.leadGin(formData).then(res => {	
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
		this.getSalesNames();
		//this.getHospitalNames();
		//this.list = this.states.map(item => {
		//return { value: item, label: item };
		//});
	}
}
</script>

<style scoped>

</style>