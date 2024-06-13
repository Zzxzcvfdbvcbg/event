<script setup>
import { articleAddService, articleEditService } from '@/api/article'
import { ref } from 'vue'
const dialogVisible = ref(false)
const formRef = ref()
const emit = defineEmits(['success'])
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '必须是1-10非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '必须是1-15字母或数字',
      trigger: 'blur'
    }
  ]
}
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
}
const onSubmit = async () => {
  await formRef.value.validate() //表单校验
  const isEdit = formModel.value.id
  if (isEdit) {
    await articleEditService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await articleAddService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form :model="formModel" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          placeholder="请输入分类名称"
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          placeholder="请输入分类别名"
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
