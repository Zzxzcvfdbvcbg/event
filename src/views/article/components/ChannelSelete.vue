<script setup>
import { articleChannelService } from '@/api/article.js'
import { ref } from 'vue'
// defineProps({
//   modelValue: {
//     type: [String, Number]
//   }
// })
// const emit = defineEmits(['update:modelValue'])
const model = defineModel({ type: [String, Number] })

const channelList = ref([])
const getChannelList = async () => {
  const res = await articleChannelService()
  //   console.log(res)
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <!-- @update:modelValue="emit('update:modelValue', $event)" -->
  <!-- :modelValue="modelValue" -->
  <el-select
    v-model="model"
    placeholder="请选择"
    clearable
    style="width: 120px"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    />
  </el-select>
</template>

<style scoped lang="less"></style>
