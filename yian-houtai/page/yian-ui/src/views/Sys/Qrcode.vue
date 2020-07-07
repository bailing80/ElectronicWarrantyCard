<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.stats" placeholder="可用状态"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:qrcode:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-trash" :label="$t('action.reset')" perms="sys:qrcode:view" type="primary" @click="handleReset" />
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:qrcode:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
		
	</div>

	<!--表格内容栏-->
	<E-Table :height="350"  permsEdit="sys:qrcode:edit" permsDelete="sys:qrcode:delete"
		:data="pageResult" :columns="columns" @findPage="findPage"  @handleEdit="handleEdit" @handleDelete="handleDelete">	
		 
	</E-Table>

	<!--新增界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="120px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="ID" prop="id"  v-if="false">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
				<el-form-item label="二维码名称" prop="name">
				<el-input v-model="dataForm.name" v-bind:disabled="operation==false" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="状态是否可用" prop="stats">
			<el-select v-model="dataForm.stats" placeholder="请选择">
					<el-option
						v-for="item in stats"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="item.disabled">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="二维码" prop="qrcodetext" >
				<!--<el-input v-model="dataForm.qrcodetext" auto-complete="off"></el-input> -->
				<input  type="file" ref="myfile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" :required="true"/>
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
import ETable from "@/views/Core/ETable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"

export default {
	components:{			
			ETable,
			KtButton,
	},
	data() {
		
		return {
			stats: [
				{
				value: 'YES',
				label: 'YES'
				},
				{
				value: 'NO',
				label: 'NO'
				}
			],
			size: 'small',
			filters: {
				name: '',
				stats:''			
			},	
			
			columns: [
				//{prop:"id", label:"ID", minWidth:50},
				{prop:"name", label:"二维码名称", minWidth:120},        
				{label:"二维码",prop:"pathqrcode",},
				{prop:"stats", label:"状态", minWidth:100},
				{prop:"createtime", label:"创建时间", minWidth:120}
			],
			
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},

			operation: true, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			
			editLoading: false,
			dataFormRules: {
				name: [
					   { required: true, message: '请输入名称', trigger: 'blur' }
				],
				stats: [
					   { required: true, message: '请选择是否可用', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				stats: '',
				qrcodetext:''
			}
		}
		
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name},
											  stats: {name:'stats', value:this.filters.stats}}
			this.$api.qrcode.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		handleReset: function() {
			this.filters.name = ''
			this.filters.stats=''
		},
		getFile: function(data)
		{
			console.log("二维码文件 :")
			this.file =event.target.files[0];
			console.log("二维码文件 :"+ this.file)
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				name: '',
				stats:'',
				qrcodetext:''
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
			if(this.operation == true && this.$refs.myfile.value == '')
			{
				this.$message({ message: '请先选择二维码文件。', type: 'Error' })
				return
			}
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true	
						let myfile = this.$refs.myfile;
						let files = myfile.files;
						let file = files[0];
						var formData = new FormData();
						formData.append("file", file);
						formData.append("name",this.dataForm.name);
						formData.append("stats",this.dataForm.stats);
						this.$api.qrcode.save(formData).then((res) => {
							this.$message({ message: '提示： ' + res.msg, type: 'success' })
							/*if(res.code == 200) {
								this.$message({ message: '操作成功, ' + res.msg, type: 'success' })
							} else {
								this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}*/
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.$refs.myfile.value='';
							this.editDialogVisible = false
							this.findPage(null)
						})
					})
				}
			})
		},
		handleDelete: function (data) {
			this.$api.qrcode.batchDelete(data.params).then(data!=null?data.callback:'')
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