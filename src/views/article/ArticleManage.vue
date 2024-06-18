<script setup>
import articleHead from '@/components/article-head.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { articleGetListService } from '@/api/article'
import ChannelSelete from './components/ChannelSelete.vue'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const loading = ref(false)
const params = ref({
  pagenum: 1, //当前页码数
  pagesize: 5, //当前页的条数
  cate_id: '',
  state: ''
})
const articleList = ref([])
const total = ref(0)
// 基于params参数获取文章列表
const artGetList = async () => {
  loading.value = true
  const res = await articleGetListService(params.value)
  // console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
artGetList()

// 处理分页
const handleSizeChange = (size) => {
  console.log('当前每页条数变化了', size)
  params.value.pagenum = 1
  params.value.pagesize = size
  artGetList()
}
const handleCurrentChange = (page) => {
  console.log('页码变化了', page)
  params.value.pagenum = page
  artGetList()
}

// 搜索=按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1 //重置页码
  artGetList()
}
// 重置-将筛选条件清空，重新检索
const onReset = () => {
  params.value.pagenum = 1 //重置页码
  params.value.cate_id = ''
  params.value.state = ''
  artGetList()
}

const articleEditRef = ref()
// 发布
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const onEditArt = (row) => {
  // console.log(row)
  articleEditRef.value.open(row)
}
// 删除
const onDelArt = (row) => {
  console.log(row)
}
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  artGetList()
}
</script>

<template>
  <articleHead title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="文章分类">
        <channel-selete v-model="params.cate_id"></channel-selete>
      </el-form-item>
      <el-form-item label="发布状态" v-model="params.state">
        <el-select placeholder="请选择" clearable style="width: 120px">
          <el-option label="已发布" value="shanghai" />
          <el-option label="草稿" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date " label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pubdate) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            plain
            circle
            @click="onEditArt(row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            plain
            circle
            @click="onDelArt(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 7]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </articleHead>
</template>

<style scoped lang="scss"></style>
