<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:5px;padding-left:5px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="姓名" style="width:200px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.type" placeholder="Type" style="width:200px"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:sales:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-trash" :label="$t('action.reset')" perms="sys:sales:view" type="primary" @click="handleReset" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:sales:add" type="primary" @click="handleAdd" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.leadout')" perms="sys:sales:exportSalesInfo" type="primary" @click="exportSalesInfo(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button type="primary" icon="fa fa-search" :label="$t('action.leadin')" perms="sys:sales:importSalesInfo" 					
					 @click="importSalesInfo(null)" />
				   <input type="file" ref="myfile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">	 
			</el-form-item>
			
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table :height="350" permsEdit="sys:sales:edit" permsDelete="sys:sales:delete"
		:data="pageResult" :columns="columns" @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="ID" prop="id"  v-if="false">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="dataForm.name" v-bind:disabled="operation==false" style="width:250px" ></el-input>
			</el-form-item>
			<el-form-item label="Type" prop="type">
				<el-input v-model="dataForm.type" auto-complete="off" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item label="Status" prop="status">
				<el-input v-model="dataForm.status" auto-complete="off" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item label="省份" prop="provincial">
				<el-input v-model="dataForm.provincial" style="width:250px" ></el-input>
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
			size: 'small',
			filters: {
				name: '',
				type:''
			},
			columns: [
				//{prop:"id", label:"ID", minWidth:50},
				{prop:"name", label:"姓名", minWidth:100},
				{prop:"type", label:"Type", minWidth:100},
				{prop:"status", label:"Status", minWidth:100},
				{prop:"provincial", label:"省份", minWidth:100}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					   { required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				type: '',
				status: '',
				provincial: ''
			},
		}
	},
	methods: {
		handleReset: function() {
			this.filters.name = ''
			this.filters.type = ''
		},
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},type: {name:'type', value:this.filters.type}}
			this.$api.sales.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.sales.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				name: '',
				type: '',
				status: '',
				provincial: ''
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
						this.$api.sales.save(params).then((res) => {
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
		exportSalesInfo: function(data) {
			let le=[["姓名","Type","Status","省份"]];//"序号",	
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},type: {name:'type', value:this.filters.type}}
			this.$api.sales.exportSalesInfo(this.pageRequest).then((res) => {
				let datalist =res.data
				datalist.map(dres=>{
							let arr =[];
							//arr.push(dres.id)
							arr.push(dres.name)
							arr.push(dres.type)
							arr.push(dres.status)
							arr.push(dres.provincial)
							le.push(arr)
						})											
					   	var wb=XLSX.utils.book_new(),
						ws=	XLSX.utils.aoa_to_sheet(le);
						XLSX.utils.book_append_sheet(wb,ws,"销售员信息");
						XLSX.writeFile(wb,"销售员信息.xlsx");		
			}).then(data!=null?data.callback:'')
		},
		
		importSalesInfo: function(data)
		{
				let myfile = this.$refs.myfile;
				let files = myfile.files;
				let file = files[0];
				var formData = new FormData();
				formData.append("file", file);
			    this.$api.sales.importSalesInfo(formData).then(res => {	
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