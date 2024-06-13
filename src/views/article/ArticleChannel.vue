<script setup>
import { articleChannelService, articleDelService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await articleChannelService()
  // console.log(res)
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <articleHead title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <!-- 主体内容 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            @click="onEditChannel(row, $index)"
            circle
            type="primary"
            plain
          ></el-button>
          <el-button
            :icon="Delete"
            @click="onDelChannel(row, $index)"
            circle
            type="danger"
            plain
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </articleHead>
</template>

<style scoped lang="scss"></style>
